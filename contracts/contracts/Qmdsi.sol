// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Swap.sol";


contract UserAccount {

    address internal _user;
    address internal _admin;
    QMGTSwap internal swap;


    struct TransferStruct {
        address token;
        address to;
        uint amount;
    }
    

    modifier onlyAdmin() {
        require(msg.sender == _admin, "Only admin");
        _;
    }


    modifier onlyOwnerAndAdmin() {
        require(msg.sender == _user || msg.sender == _admin, "Only Admin or Owner");
        _;
    }
    

    constructor() {
        _admin  = msg.sender;
    } 


    function config(address user, address _swap) external onlyAdmin {
        _user = user;
        swap = QMGTSwap(_swap);
    } 


    function owner() external view returns(address) {
        return _user;
    }


    function buyQmgt(uint usdAmount) external onlyOwnerAndAdmin returns(uint amount) {
        address usdt = swap.getUsdtAddress();
        ERC20(usdt).approve(address(swap), usdAmount);
        amount = swap.buyQmgt(usdAmount);
    } 


    function sellQmgt(uint tokenAmount) external onlyOwnerAndAdmin returns(uint amount) {
        address token = swap.getTokenAddress();
        ERC20(token).approve(address(token), tokenAmount);
        amount = swap.buyQmgt(tokenAmount);
        
    }

    
    function transferTokens(TransferStruct[] calldata transfers) external onlyOwnerAndAdmin {
        uint _len = transfers.length;

        for(uint i; i < _len; i++) {
            TransferStruct memory transfer = transfers[i];
            ERC20(transfer.token).transfer(transfer.to, transfer.amount);
        }
    }


    function changeSwapAddress(address _swap) onlyAdmin external {
        swap = QMGTSwap(_swap);
    } 


}



contract QMDSIAdmin {

    address internal _owner; 
    address internal _swapAddress;
    mapping(address => bool) whitelisted;

    modifier onlyOwner {
        require(msg.sender == _owner, "Only owner");
        _;
    }

    modifier onlyWhitelisted() {
        require(whitelisted[msg.sender], "Only whitelisted");
        _;
    }


    constructor(address swapAddress) {
        _owner = msg.sender;
        whitelisted[msg.sender] = true;
        _swapAddress = swapAddress;
    }


    function getUserAccount(address user) public view returns(address) {
     
        bytes memory bytecode = type(UserAccount).creationCode;
        uint _salt = uint256(keccak256(abi.encodePacked(user)));
        
        bytes32 hash = keccak256(
            abi.encodePacked(bytes1(0xff), address(this), _salt, keccak256(bytecode))
        );

        // NOTE: cast last 20 bytes of hash to address
        return address(uint160(uint(hash)));
    
    }

   
    function initAccount (address user) external returns(address accountAddress) {
        accountAddress = setupUserAccount(user);
    }


    function initUserAccount (address user) internal returns(address addr){
        bytes memory bytecode = type(UserAccount).creationCode;
        uint salt = uint256(keccak256(abi.encodePacked(user)));
        
        assembly {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
            if iszero(extcodesize(addr)) { revert(0, 0) }
        }
    }


    function setupUserAccount (address user) internal returns(address accountAddress) {
        accountAddress = initUserAccount(user);
        UserAccount(accountAddress).config(user, _swapAddress);
    }

    function whitelistAddress (address _address) external onlyOwner {
        whitelisted[_address] = true;
    }


    function transferTokens(
    address _from, 
    UserAccount.TransferStruct[] calldata transfers
    ) external onlyWhitelisted {
        address accountAddress = getUserAccount(_from);
        UserAccount(accountAddress).transferTokens(transfers);
    } 

}
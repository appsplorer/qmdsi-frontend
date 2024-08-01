// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract QMGTToken is ERC20 {
    mapping(address => bool) canList;

    address private _owner; 

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only owner");
        _;
    }

    constructor(uint256 initialSupply, 
            string memory _name, 
            string memory symbol)
             ERC20(_name, symbol) {
        _owner = msg.sender;
        _mint(msg.sender, initialSupply);
    }

    function mint(address _to, uint _amount) external onlyOwner() {
        _mint(_to, _amount);
    }

    function burn(uint _amount) external {
        _burn(msg.sender, _amount);
    }

    function enableListing(address _address) external onlyOwner {
        canList[_address] = true;
    }


    function disableListing(address _address) external onlyOwner {
        canList[_address] = false;
    }



}
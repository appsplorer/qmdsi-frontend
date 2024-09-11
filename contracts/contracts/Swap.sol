// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface AggregatorV3Interface {

  function latestRoundData()
    external
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);

    function decimals() external view returns(uint8);

}



contract QMGTSwap {

    address private _owner;
    address usdt;
    address token;
    address treasury;
    uint usdtDecimals;
    uint qmgtDecimals;
    uint feedDecimals;
    uint fee = 3;
    uint256 public constant GRAMS_PER_QMGT = 1002;
    AggregatorV3Interface internal priceFeed;

    struct PriceData {
        uint price;
        uint adjustedPrice;
    }


    constructor (address _priceFeed, address _usdt, address _token, address _treasury) {
        _owner = msg.sender;
        usdt = _usdt;
        token = _token;
        priceFeed = AggregatorV3Interface(_priceFeed);
        treasury = _treasury;
        usdtDecimals = ERC20(_usdt).decimals();
        qmgtDecimals = ERC20(_token).decimals();
        feedDecimals = uint(AggregatorV3Interface(_priceFeed).decimals());
    }

     function getLatestGoldPrice() public view returns (uint) {
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price");

        return uint(price);
    }

    function buyQmgt(uint usdAmount) external returns(uint tokens) {        
        ERC20(usdt).transferFrom(msg.sender, address(this), usdAmount);
        uint _fee = 1;
        if(usdAmount >= 150 * 10**usdtDecimals){
            _fee = 2;
        }
        uint feeAmt = usdAmount * _fee / 1000;
        
        tokens = getQmgtAmount(usdAmount - feeAmt);
        
        ERC20(token).transfer(msg.sender, tokens);
        ERC20(usdt).transfer(treasury, feeAmt);
    }


    function getQmgtAmount(uint usdAmount) public  view returns(uint qmgtAmount) {    
        uint goldPrice = getLatestGoldPrice() / 31;
        
         uint256 valuePerQMGT = (goldPrice * GRAMS_PER_QMGT * (10**usdtDecimals)) 
                                / (1000 * (10**(feedDecimals + qmgtDecimals)));
        qmgtAmount = usdAmount / valuePerQMGT;
        } 
    
    
    function sellQmgt(uint tokenAmount) external returns (uint usdAmount) {
        ERC20(token).transferFrom(msg.sender, address(this), tokenAmount);
        
        usdAmount = getUsdAmount(tokenAmount);
        uint _fee = 1;
        if(usdAmount >= 150 * 10**usdtDecimals){
            _fee = 2;
        }
        uint feeAmt = usdAmount * _fee / 1000;
        ERC20(usdt).transfer(msg.sender, usdAmount - feeAmt);
        ERC20(usdt).transfer(treasury, feeAmt);
    }


    function getUsdAmount(uint tokenAmount) public view returns (uint usdAmount) {
        uint256 goldPrice = getLatestGoldPrice() / 31;
        
        uint256 valuePerQMGT = (goldPrice * GRAMS_PER_QMGT * (10**usdtDecimals)) 
                                / (1000 * (10**(feedDecimals + qmgtDecimals)));
        
        usdAmount = tokenAmount * valuePerQMGT;
    }


    function withdrawToken(address _token, uint amount) external {
        require(msg.sender == _owner, "Only owner");
        ERC20(_token).transfer(msg.sender, amount);
    }

    function getUsdtAddress () external view returns(address){
        return usdt;
    }

    function getTokenAddress() external view returns(address) {
        return token;
    }
   
}
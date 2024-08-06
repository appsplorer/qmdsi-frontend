// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface AggregatorV3Interface {

  function latestRoundData()
    external
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
}

contract QMGTSwap {

    address private _owner;
    address usdt;
    address token;
    AggregatorV3Interface internal priceFeed;


    constructor (address _priceFeed, address _usdt, address _token) {
        _owner = msg.sender;
        usdt = _usdt;
        token = _token;
        priceFeed = AggregatorV3Interface(_priceFeed);

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
        IERC20(usdt).transferFrom(msg.sender, address(this), usdAmount);
        tokens = getQmgtAmount(usdAmount);
        IERC20(token).transfer(msg.sender, tokens);
    }

    function getQmgtAmount(uint usdAmount) public  view returns(uint tokens) {    
        uint goldPrice = getLatestGoldPrice();
        uint256 priceDecimals = 10 ** 8;
        uint256 tokenDecimals = 10 ** 18;
        tokens = (usdAmount * tokenDecimals) / (goldPrice * tokenDecimals / priceDecimals);
    }

    
    function sellQmgt(uint tokenAmount) external returns (uint tokens) {
        
        uint256 usdAmount = getUsdAmount(tokenAmount);
        IERC20(token).transferFrom(msg.sender, address(this), tokenAmount);
        IERC20(usdt).transfer(msg.sender, usdAmount);
        return usdAmount;
    }

    function getUsdAmount (uint tokenAmount) public view returns (uint usdAmount) {
        uint256 goldPrice = getLatestGoldPrice(); // Gold price in USD with 8 decimals
        uint256 tokenDecimals = 10 ** 18; // 10^18 for token decimals
        uint256 priceDecimals = 10 ** 8; // 10^8 for price decimals
        usdAmount = (tokenAmount * goldPrice * priceDecimals) / (tokenDecimals * tokenDecimals);
    }
}
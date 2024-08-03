// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AggregatorV3 {



    constructor() {

    }

    function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound){
        return (0, 2441 * 10**8, 0, 0, 0);
    }


}
// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract QMGTToken is ERC20 {
    constructor(uint256 initialSupply, 
            string memory _name, 
            string memory symbol)
             ERC20(_name, symbol) {
        _mint(msg.sender, initialSupply);
    }
}
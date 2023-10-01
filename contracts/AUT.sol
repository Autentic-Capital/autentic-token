// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./token/ERC20.sol";
import "./extensions/ERC20Burnable.sol";

/**
 * Autentic Utility Token
 * https://autentic.capital
 */
contract AUT is ERC20, ERC20Burnable {

    constructor(string memory name_, string memory symbol_, uint256 amount)
    ERC20(name_, symbol_)
    {
        _mint(_msgSender(), amount);
    }
}

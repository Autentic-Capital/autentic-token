// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./token/ERC20.sol";
import "./extensions/ERC20Burnable.sol";
import "./access/Ownable2Step.sol";

contract AUt is ERC20, ERC20Burnable, Ownable2Step {

    constructor(string memory name_, string memory symbol_, uint256 amount)
    ERC20(name_, symbol_)
    Ownable(_msgSender()) {
        // Дополнительные действия в конструкторе производного контракта

        _mint(_msgSender(), amount);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract SimpleStorage {
    uint256 c;


    function setter(uint256 _c) public {
        c = _c;
    }

    function getter() public view returns (uint256) {
        return c;
    }
}
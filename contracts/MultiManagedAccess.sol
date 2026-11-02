// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

abstract contract MultiManagedAccess {
    address public owner;
    address[] public managers;
    mapping(address => bool) public confirmed;

    constructor(address _owner, address[] memory _managers) {
        owner = _owner;
        managers = _managers;
    }

    function isManager(address _addr) internal view returns (bool) {
        for (uint256 i = 0; i < managers.length; i++) {
            if (managers[i] == _addr) {
                return true;
            }
        }
        return false;
    }

    function allConfirmed() internal view returns (bool) {
        for (uint256 i = 0; i < managers.length; i++) {
            if (!confirmed[managers[i]]) {
                return false;
            }
        }
        return true;
    }

    function confirm() external {
        require(isManager(msg.sender), "You are not a manager");
        confirmed[msg.sender] = true;
    }

    modifier onlyAllConfirmed() {
        require(isManager(msg.sender), "You are not a manager");
        require(allConfirmed(), "Not all confirmed yet");
        _;
    }
}
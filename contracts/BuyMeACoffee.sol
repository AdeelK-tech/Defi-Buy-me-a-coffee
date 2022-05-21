//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract BuyMeACoffee {
    event newMemo(string, string, address, uint256);
    struct Memo {
        string name;
        string message;
        address from;
        uint256 timestamp;
    }
    Memo[] memos;
    address payable owner;

    constructor() {
        owner =payable(msg.sender);
    }

    function BuyACoffee(string memory _name, string memory _message)
        public
        payable
    {
        require(msg.value > 0, "cant buy a coffee with 0 ETH");
        Memo memory memo = Memo(_name, _message, msg.sender, block.timestamp);
        emit newMemo(_name, _message, msg.sender, block.timestamp);
        memos.push(memo);
        
    }
    function withdrawTips()public{
        require(msg.sender==owner);
        owner.transfer(address(this).balance);
    }
    function getMemos()public view returns(Memo[]memory){
        return memos;
    }
}

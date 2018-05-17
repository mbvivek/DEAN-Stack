pragma solidity ^0.4.20;


/* Greet Contract */
contract GreetContract {

    /* attributes */
    uint createdTime;
    address owner;
    string greetMessage;

    /* events */
    event GreetContractDeployed(uint time, address indexed owner, string greetMessage);
    event GreetContractUpdated(uint time, string greetMessage);

    /* constructor */
    constructor(string _greetMessage) public payable {
        createdTime = now;
        owner = msg.sender;
        greetMessage = _greetMessage;
        emit GreetContractDeployed(createdTime, owner, greetMessage);
    }

    /* method */
    function updateMessage(string _greetMessage) public payable returns(bool) {
        if (msg.sender == owner) {
            greetMessage = _greetMessage;
            emit GreetContractUpdated(now, greetMessage);
            return true;
        } else {
            return false;
        }
    }
}
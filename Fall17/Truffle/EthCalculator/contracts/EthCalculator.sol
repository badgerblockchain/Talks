pragma solidity ^0.4.17;

contract EthCalculator {
    address owner;

    function EthCalculator() public {
        owner = msg.sender;
    }

    function add(int256 lhs, int256 rhs) pure public returns(int256) {
        return lhs + rhs;
    }

    // Implement int256 subtraction here!!! Be sure to follow the format of the other functions.
    // Be sure to name the function 'subtract'
    

    function multiply(int256 lhs, int256 rhs) pure public returns(int256){
        return lhs * rhs;
    }

    // Implement int256 division here!!! Be sure to follow the format of the other functions.
    // Be sure to name the function 'divide'. 

    function mod(int256 lhs, int256 rhs) pure public returns(int256){
        return lhs % rhs;
    }
}
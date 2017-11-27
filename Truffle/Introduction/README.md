# Introduction to Truffle
## Introduction
### Assumptions
I assume that you have looked at solidity before, but by no means an expert. I also assume that you are comfortable with the CLI on your machine. For this talk, I'll be working on Ubuntu 16.04 Xenial. 
### What is Truffle?
Truffle is a must have in a Solidity developers toolkit. Truffle is a a framework that enables developers to develop, test, and deploy smart contracts quickly and reliably. If you'd like to read more about it, [here's their website](http://truffleframework.com/)
### Dependencies
* [nodejs](https://nodejs.org/en/download/package-manager/)
Installing node on the appropriate platform should install npm (Node Package Manager) as well. That's really all you need!
* [testrpc](https://www.npmjs.com/package/ethereumjs-testrpc)
### Installing Truffle
To verify that you've installed node and npm, run 
```
which node
which npm
```
This should output the location of the executable of the package, which should look like this if you installed with sudo
```
/usr/bin/node
/usr/bin/npm
```
After you've installed node and npm, all you need to run is
```
sudo npm install -g truffle
sudo npm install -g ethereumjs-testrpc
```
To verify that truffle and testrpc are installed correctly, run
```
which truffle
which testrpc
```
The output should look like this if you installed with sudo
```
/usr/bin/truffle
/usr/bin/testrpc
```
the testrpc package is a node package that will run a small local blockchain on your machine at localhost:8545. This is really helpful for testing and development (instant validation).
That's it! Truffle and testrpc is now installed.
## Let's make the Eth Calculator!
### Initialize a Truffle Project
The first thing you need to do is make a directory, we'll call it `EthCalculator` and `cd` into it. 
```
mkdir EthCalculator
cd $_
```
Now we're in our project directory. The first truffle command we need to run is init.
```
truffle init
```
This will create three folders and two javascript files called `truffle.js` and `truffle-config.js`.
```
contracts/
migrations/
test/
truffle.js
```
The `contracts/` folder is the directory containing the Solidity files, `migrations/` contains javascript files to automate the deployment process of your smart contracts, and `test/` contains javascript files to test your smart contracts.
### The Eth Calculator Smart Contract
We're going to write a five functioned basic calculator. I won't spend any time talking about Solidity - we'll save that for another day. The Solidity file is available [here](EthCalculator/contracts/EthCalculator.sol). I'd like for you to implement the `subtract` and `divide` functions. 


Now that you've written your smart contract, let's switch your cli to develop mode. Develop mode  To compile your smart contract, run
```
truffle develop
compile
```
The compiler will throw some errors and warnings. You should do your best to fix them. The output should be
```
Compiling ./contracts/EthCalculator.sol...
Writing artifacts to ./build/contracts
```

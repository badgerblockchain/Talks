# Introduction to Truffle Talk 11/30/17
## Introduction
### Assumptions
I assume that you have looked at solidity before, but by no means are an expert. I also assume that you are comfortable with the CLI on your machine. For this talk, I'll be working on Ubuntu 16.04 Xenial. 
### What is Truffle?
Truffle is a must have in a Solidity developers toolkit. Truffle is a framework that enables developers to develop, test, and deploy smart contracts quickly and reliably. If you'd like to read more about it, [here's their website](http://truffleframework.com/).
### Dependencies
* [nodejs](https://nodejs.org/en/download/package-manager/) - 
Follow the platform specific instructions for your machine on nodejs's site. When you install node, you'll also install npm (Node Package Manager).
* [testrpc](https://www.npmjs.com/package/ethereumjs-testrpc) - The testrpc package is a node package that will run a small local blockchain on your machine at localhost:8545 (default port is 8545, but you can modify it with the `-p <new port number>` flag. Running a local blockchain on your machine allows you to instantly validate transactions, so you can rapidly test your smart contract.
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
After you've installed node and npm, all you need to run is:
```
sudo npm install -g truffle
sudo npm install -g ethereumjs-testrpc
```
To verify that truffle and testrpc are installed correctly, run:
```
which truffle
which testrpc
```
The output should look like this if you installed with sudo:
```
/usr/bin/truffle
/usr/bin/testrpc
```
That's it! Truffle and testrpc are now installed.
## Let's make the Eth Calculator!
### Initialize a Truffle Project
The first thing you need to do is make a directory for your truffle project, we'll call it `EthCalculator`. Now let's `cd` into `EthCalculator`. 
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
truffle-config.js
```
#### What are these folders?
The `contracts/` folder is the directory containing the Solidity files, `migrations/` contains javascript files to automate the deployment process of your smart contracts, and `test/` contains javascript files to test your smart contracts.
#### What are these javascript files?
You may be asking yourself "what's the difference between `truffle.js` and `truffle-config.js`. The answer is they're the same - kinda. Both files are config files for truffle. If you're on a UNIX system, you can delete `truffle-config.js`. If you're on Windows and using command prompt, `truffle.js` will cause a naming conflict with the executable command `truffle`.
##### How do I fix Windows naming conflicts? 
There are a few remedies actually. One way is to delete `truffle.js` and use `truffle-config.js`. The other remedies are documented [here](http://truffleframework.com/docs/advanced/configuration#resolving-naming-conflicts-on-windows).
### The Eth Calculator Smart Contract
#### What are we going to do?
We're going to write a five functioned basic calculator. I won't spend any time talking about Solidity - we'll save that for another day. The Solidity file is available [here](EthCalculator/contracts/EthCalculator.sol). 
#### What do I want you to do?
I'd like for you to implement the `subtract` and `divide` functions. 
#### Bonus challenge
If you're feeling really fancy, then you can add a state variable to your calculator. I'd recommend using a mapping from strings to ints, and then having a setter that checks if the command has been called before, if so return it, else do the command and insert it into the mapping and return the value to msg.sender. 

Now that you've written your smart contract, let's switch your cli to develop mode. To compile your smart contract, run
```
truffle develop
compile
```
Now that you're in develop mode, you no longer need to preface your truffle commands with `truffle`. You've created your own javascript REPL (Read Evaluate Print Loop) with truffle commands and web3 (more on this later) built in.
The compiler could throw some errors and warnings. You should do your best to fix them. The output should be
```
Compiling ./contracts/EthCalculator.sol...
Writing artifacts to ./build/contracts
```
After you've compilled your smart contracts, we can deploy them by entering the `migrate` command.
```
 migrate
```
This should output something like the following.
```
Using network develop

Running migration: 1_eth_calculator_migration.js
... <tx addr>
... EthCalculator: <contract addr>
Saving artifacts...
```
Now if you enter
```
EthCalculator
```
Into your REPL, you'll get a long output of JSON data. This means you did everything correctly and your Smart Contract has been deployed! If you want to test it out, then enter the following code into the REPL (NOTE: The lines with `**OUTPUT**` indicate the output from the REPL and should not be entered when you run the code).
```
var outputPromise
**OUTPUT**undefined
var output
**OUTPUT**undefined
EthCalculator.deployed().then(function(instance){outputPromise = instance})
**OUTPUT**undefined
output = outputPromise.add(10,15)
**OUTPUT**undefined
output.then(function(realOutput){console.log(realOutput.toString(10))})
**OUTPUT**25
**OUTPUT**undefined
```

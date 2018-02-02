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
**The install location of node packages may be different on your platform. IE for OSX, node installs to `/usr/local/bin/`, not `/usr/bin/`.**
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

### Creating Migration scripts
Now it's time to add a migration script to your project. All of the scripts in the migration folder will execute when you call `migrate`. The firs thing that we need to do is specify a network in the `truffle.js` or `truffle-config.js`. If you're not using `truffle-config.js`, then you can safely delete that file. 
The content of `truffle.js` is below.
```
module.exports = {
 networks: {
  development: {
   host: "localhost",
   port: 9545,
   network_id: "*"
  }
 }
};
```
The `networks` section contains all of the deployable networks that you specify. The `development` JSON object is a single network that I've specified. Because there is only one network, `development` will be called by default. If you create multiple networks, you can deploy to a specific one by calling `truffle migrate <network name: development>`. We still haven't written the migration file though, so don't call `truffle migrate` now.

Now let's write the migration file. Let's create a file called `1_eth_calculator_migration.js` in the `migrations/` folder.
The first line of our migration file should be 
```
var EthCalcMigration = artifacts.require('EthCalculator');
```
This loads a reference to the smart contract so that truffle can deploy it. The rest of the code is relatively simple.
```
module.exports = function(deployer) {
 deployer.deploy(EthCalcMigration);
}
```
That's it! If your `truffle develop` REPL is still running, run

```
migrate
```
If your REPL isn't running, then run the following commands
```
truffle develop
compile
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
### Let's write real test scripts
Truffle built its testing framework on something called [Mocha](https://mochajs.org/). 
Mocha is a testing framework for javascript.

First things first, we need to make a testing script inside of the `test/` folder. Every
file in the `test/` folder will execute when we call `truffle test`. I followed the naming convention provided in the sample Truffle box.

The first line in your test script should be importing your smart contract.
```
// var <name of contract> = artifacts.require('<name of contract>');
var EthCalculator = artifacts.require('EthCalculator');
```
It's very important that you do not include the `.sol` extension in the name of the contract in 
the require statement. This is because Solidity files can contain several contracts, so we need
to specify which one we want imported.

You can have as many smart contracts as you want in one testing file. All you need to do is have
multiple require statements with a new variable for each smart contract.

Next we will write our actual test.
```
// We will be adding more tests to this so the contract does not have a closing '}'.
contract('EthCalculator', function(accounts) {
    it("Verify that all of the accounts have more than 0 eth in them.", function() {
        return EthCalculator.deployed().then(function(instance) {
            for(var i = 0; i < accounts.length; i++) {
                return accounts[i];
            }
        }).then(function(account) {
            // Uncomment below assertion to show that it will fail properly.
            // assert.isBelow(web3.fromWei(web3.eth.getBalance(balance), 'ether').toNumber(), 0, "Account " + account + " has a non 0 balance");
            assert.isAbove(web3.fromWei(web3.eth.getBalance(account), 'ether').toNumber(), 0, "Account " + account + " has a 0 balance");
        });
    });
```
#### contract
For each contract that you'd like to test, you need to add another `contract` call.
```
contract('<name of smart contract', function(<arguments being passed to it>) { ...
 ...
});
```
#### it
`it` is a test. The first argument to `it` is a description of what the test is. The second arguement is a chain of javascript promises.
#### assert
The `assert` module is the bread and butter of writing your tests. There are hundreds of static functions you can run on 
the `assert` module (`is() isAbove() isBelow() ....`). The complete list is [here](http://chaijs.com/api/assert/)

The `assert` call is what actually checks that your output is valid.
```
assert.<your function operator>(<insert code here to get a value>, <what the value should be>, "Error message if the assert fails");
```
That's all there is to it. Here's the rest of the test file that I wrote as an example. Please copy and paste the following code into your test script. 
```

    it("Should add 5 + 3 correctly.", function() {
        return EthCalculator.deployed().then(function(instance) {
            instance.add(5, 3).then(function(output) {
                assert.equal(output.toNumber(), 8, "The output of 5 + 3 should be 8, but" +
                " your code output: " + output.toNumber());
            });
        });
    });
    
    it("Should multiply 5 * 3 correctly.", function() {
        return EthCalculator.deployed().then(function(instance) {
            instance.multiply(5, 5).then(function(output) {
                assert.equal(output.toNumber(), 25, "The output of 5 * 3 should equal 15, but" +
                    " the code output " + output.toNumber());
            });
        });
    });

    it("Should mod 5 % 3 correctly.", function() {
        return EthCalculator.deployed().then(function(instance) {
            instance.mod(5, 3).then(function(output) {
                assert.equal(output.toNumber(), 2, "The output of 5 % 3 should be 2, but your code "
                + " output: " + output.toNumber());
            });
        });
    });

    // If you decide to implement subtraction and division, uncomment these tests and see 
    // if your code passes!
    // it("Should subtract 5 - 3 correctly.", function() {
    //     return EthCalculator.deployed().then(function(instance) {
    //         instance.subtract(5, 3).then(function(output) {
    //             assert.equal(output.toNumber(), 2, "The output of 5 - 3 should be 2, but your code "
    //             + " output: " + output.toNumber());
    //         });
    //     });
    // });

    // it("Should divide 5 / 3 correctly.", function() {
    //     return EthCalculator.deployed().then(function(instance) {
    //         instance.divide(5, 3).then(function(output) {
    //             assert.equal(output.toNumber(), 1, "The output of 5 / 3 should be 1, but your code "
    //             + " output: " + output.toNumber());
    //         });
    //     });
    // });
});
```
### Run your test
Now let's run your tests! To do so, run the command `truffle test` from command line, or `test` if you're in the `truffle develop` REPL. You will either see several check marks saying that your automated tests passed, or you will receive the error messages that you wrote. 

For now, this is where I'll end this tutorial. I plan on adding more to this tutorial - ie full dapp development, deploying to ropsten or the mainnet, etc. etc. If there's anything you'd like to see in this tutorial, please fill out an issue tag with the details!

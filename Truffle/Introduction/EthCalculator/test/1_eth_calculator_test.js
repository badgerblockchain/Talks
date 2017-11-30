var EthCalculator = artifacts.require('EthCalculator');

contract('EthCalculator', function(accounts) {
    it("Verify that all of the accounts have more than 0 eth in them.", function() {
        return EthCalculator.deployed().then(function(instance) {
            for(var i = 0; i < accounts.length; i++) {
                return accounts[i];
            }
        }).then(function(balance) {
            // Uncomment below assertion to show that it will fail properly.
            // assert.is(web3.fromWei(web3.eth.getBalance(balance), 'ether').toNumber(), 0, "Greater than 0 balance");
            assert.isAbove(web3.fromWei(web3.eth.getBalance(balance), 'ether').toNumber(), 0, "Greater than 0 balance");
        });
    });

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

    // it("Should subtract 5 - 3 correctly.", function() {
    //     return EthCalculator.deployed().then(function(instance) {
    //         instance.subtract(5, 3).then(function(output) {
    //             assert.equal(output.toNumber(), 2, "The output of 5 - 3 should be 2, but your code "
    //             + " output: " + output.toNumber());
    //         });
    //     });
    // });

    // it("Should mod 5 / 3 correctly.", function() {
    //     return EthCalculator.deployed().then(function(instance) {
    //         instance.divide(5, 3).then(function(output) {
    //             assert.equal(output.toNumber(), 1, "The output of 5 / 3 should be 1, but your code "
    //             + " output: " + output.toNumber());
    //         });
    //     });
    // });

});
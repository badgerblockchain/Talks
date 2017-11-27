var EthCalcMigration = artificats.require('EthCalculator');

// TODO: Create a network param to deploy to certain networks. 
module.exports = function(deployer) {
    deployer.deploy(EthCalcMigration);
}
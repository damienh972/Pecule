
const PeculeTokensManager = artifacts.require("PeculeTokensManager");


module.exports = function(deployer) {
  deployer.deploy(PeculeTokensManager);
};

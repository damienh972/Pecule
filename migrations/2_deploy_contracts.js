
const PeculeTokenManager = artifacts.require("PeculeTokenManager");

module.exports = function(deployer) {
  deployer.deploy(PeculeTokenManager);
};

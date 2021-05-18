const { BN } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { providers, Contract } = require("ethers");
require('dotenv').config()
const { MNEMONIC, API_URL } = process.env;
const { ethers } =  require( "ethers");
const PeculeTokensManager = artifacts.require("PeculeTokensManager");
 
contract("PeculeTokensManager", async function () {
  describe("PeculeTokensManager contract", function () {
    it("Should have been deployed", async function () {
      const instance = await PeculeTokensManager.deployed();
      //const walletProvider = new HDWalletProvider(MNEMONIC, API_URL,);
      //const provider = new ethers.providers(walletProvider);
      //const signer = await provider.getSigner();
      //const owner = await signer.getAddress();
      //console.log(signer);
      //console.log(provider);
      console.log(instance.class_defaults.from);

      
       
      // [owner, addr1, addr2] = await ethers.Signers();
          // peculeContractInstance = new ethers.Contract(
          //   0x986fef7c312ce066b245f944850f46d8dcdc3b07,
          //   PeculeTokensManager.abi,
          //   signer
          // );
          //console.log(peculeContractInstance)
     
        expect(instance.class_defaults.from).to.equal(
          "0x88fa7d3427651ee1808739d410e53cf294790c75"
        );
    })

    //   const buyer = accounts[2];
    //   const _name = ("paris");
    //   const totalSupply = new BN(1000);
    //   const yearROI = new BN(8);
    //   const estatePrice = new BN(200000);
    //   const tokenPrice = new BN(50);
    //   const id = new BN(0);
    // //const tokenPriceUSD = new BN(50)
    // const amount = new BN(23635059939451240);

    //const amount = new BN();
    //PeculeManagerInstance = await PeculeManager.new({ from: admin });

    it("get token price in wei", async () => {
      let price;
      const tokenPrice = new BN(50); //ethers.utils.parseEther("0.023635059939451240");
      await instance.getTokenPriceInwei(tokenPrice).then((response) => {
        console.log(`The token price is : ${response}`);
        price = response;
      });

      //PeculeManagerInstance = await PeculeManager.new({ from: admin });
      // console.log(buyer);
      // console.log(_name);
      // console.log(totalSupply);
      // console.log(yearROI);
      //console.log( PeculeManagerInstance.balanceOf(PeculeManagerInstance.address));

      // const tokenToSent = amount/(
      //   PeculeManagerInstance._getTokenPriceInwei(tokenPrice)
      // );
      //console.log(`The token price is : ${tokenPrice}`);
      // resultCreation = await PeculeManagerInstance.getTokenPriceInwei(
      //   tokenPrice,
      //   {
      //     from: admin,
      //   }
      // );
      //console.log(resultCreation.receipt.logs);
      console.log("here");

      //expect(price).to.be.bignumber.equal(50000000);
      //expectEvent(resultCreation, "PriceResult");
    });

    // it("Buy tokens", async () => {
    //     const amountValue =  new BN(40000000000000000)
    //     resultPayment = await PeculeManagerInstance.buyTokens(
    //       id,
    //      amountValue,
    //       { from: buyer, value: amountValue }
    //     );
    //     //let amountDepositOfSeller = await SmartRetailEscrowInstance.getDepositsOf({from:seller});

    //     let tokenToSent = amountValue.div(
    //       PeculeManagerInstance._getTokenPriceInwei(id)
    //     );
    //     expect(PeculeManagerInstance.balanceOf(buyer)).to.be.bignumber.equal(
    //         tokenToSent
    //     );
    //     expectEvent(resultPayment, 'FundSendToContract');

    // });
  });
});

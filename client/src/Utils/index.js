import { ethers } from "ethers";

export const getConnectionParams = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const { abi } = require("../contracts/PeculeTokenManager.json");
  const contract = new ethers.Contract(
    "0xfCDBb7f244d225d998982806B6abA4Ef2f9DaEB0",
    abi,
    signer
  );
  //console.log(signer.getAddress());
  const address = window.ethereum.selectedAddress;
  return { address, contract };
};

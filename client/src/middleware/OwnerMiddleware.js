import { CREATE_ASSET, OPEN_SALES } from "../actions/owner.js";
import { setInfoMessage } from "../actions/user.js";
import { getConnectionParams } from "../Utils";
import { ethers } from "ethers";

const UserMiddleware = (store) => (next) => (action) => {
  // let peculeManager;
  // let account;
  // if (store.getState().user.drizzle.contracts !== undefined) {
  //   //peculeManager = store.getState().user.drizzle.contracts.PeculeTokenManager;
  //   console.log(store.getState().user.drizzle.contracts);
  //   //account = peculeManager.options.from;
  // } const provider = new ethers.providers.Web3Provider(window.ethereum);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const { abi } = require("../contracts/PeculeTokenManager.json");
  const contract = new ethers.Contract(
    "0xfCDBb7f244d225d998982806B6abA4Ef2f9DaEB0",
    abi,
    signer
  );
  //const params = getConnectionParams();
  switch (action.type) {
    case CREATE_ASSET: {
      console.log(contract);
      // if (peculeManager && account) {
      const payment = async function () {
        const asset = await contract.TokenizeEstate(
          action.name,
          action.totalSupply,
          action.yearROI,
          action.estatePrice,
          action.tokenPrice
        );
      };
      payment()
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      // } else {
      //   store.dispatch(setInfoMessage("une erreur s'est produite"));
      // }
      next(action);

      break;
    }

    default:
      next(action);
  }
  switch (action.type) {
    case OPEN_SALES: {

console.log("open sales")
      const openSaleStatus = async function () {
        const sale = await contract.openSale();
      };
      openSaleStatus()
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      next(action);

      break;
    }

    default:
      next(action);
  }
};
export default UserMiddleware;

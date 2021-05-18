import { PAY_WITH_MM } from "../actions/payment.js";
import { ethers } from "ethers";

const UserMiddleware = (store) => (next) => (action) => {
  // const BigNumber = require("bignumber.js");
  // let peculeManager;
  // if (store.getState().user.drizzle.contracts) {
  //   peculeManager = store.getState().user.drizzle.contracts.PeculeTokenManager;
  // }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const { abi } = require("../contracts/PeculeTokensManager.json");
  const managerContract = new ethers.Contract(
    "0xfCDBb7f244d225d998982806B6abA4Ef2f9DaEB0",
    abi,
    signer
  );
  managerContract.on("PriceResult", (tokenPrice, priceFeed) => {
    console.log(tokenPrice);
    console.log(priceFeed);
  });
   console.log(managerContract);
  switch (action.type) {
    case PAY_WITH_MM: {
      const overrides = {
        value: ethers.utils.parseEther("0.05"),
        gasLimit: 100000,
      };
      const amount = ethers.utils.parseEther("0.05")
        console.log(amount);
     
      const buy = async function () {
       
        const tokens = await managerContract.getTokenPriceInwei(amount).then((response) => {
          console.log(response);
        })
          // .buyTokens(
          //   0,
          //   ethers.utils.parseEther("0.05"),
          //   overrides
          // )
          .catch((error) => {
            console.log(error);
          });

        console.log(tokens);
      };
      buy().then((response) => {
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

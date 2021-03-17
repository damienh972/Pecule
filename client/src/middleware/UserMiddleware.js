import drizzleOptions from "drizzleOptions";
import { Drizzle } from "@drizzle/store";

import {
  CONNECT_TO_MM,
  fetchDrizzle,
  setIsMMConnected,
  setInfoMessage,
  setMMButtonDisplay,
} from "../actions/user";

const UserMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case CONNECT_TO_MM: {
      try {
        let isUserConnected;
        const message =
          "Welcome to GAM! We need you to accept for ethereum connexion we hope you will get pleasure to visit our website!";
        const signer = window.ethereum.selectedAddress;
        console.log(signer);

        const userConnected = Promise.resolve(
          window.ethereum.request({
            method: "personal_sign",
            params: [signer, message],
          })
        );
        const userNotConnected = Promise.resolve(
          window.ethereum
            .request({
              method: "eth_requestAccounts",
              params: [{ eth_accounts: {} }],
            })
            .then((permissions) => {
              const accountsPermission = permissions.find(
                (permission) => permission.parentCapability === "eth_accounts"
              );
              if (accountsPermission) {
                console.log("eth_accounts permission successfully requested!");
                console.log(accountsPermission);
              }
            })
        );
        if (signer) {
          isUserConnected = userConnected;
        } else {
          isUserConnected = userNotConnected;
        }

        isUserConnected

          .then(() => {
            let getDrizzle;
            getDrizzle = new Drizzle(drizzleOptions, store);
            store.dispatch(fetchDrizzle(getDrizzle));
          })
          .then(() => {
            store.dispatch(setIsMMConnected(true));
            store.dispatch(
              setInfoMessage(
                //`connected address : ${accountsPermission.caveats[1].value[0]}`
                "Connected"
              )
            );
            store.dispatch(setMMButtonDisplay("none"));
          });
      } catch (error) {
        console.log(error);
      }
      next(action);
      break;
    }

    default:
      next(action);
  }
};
export default UserMiddleware;

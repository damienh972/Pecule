import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "../../drizzleOptions";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "../Components/Components.js";
import LandingPage from "../LandingPage/LandingPage.js";
import ProfilePage from "../ProfilePage/ProfilePage.js";
import LoginPage from "../LoginPage/LoginPage.js";
import Test from "../Test/Test.js";

import Button from "components/CustomButtons/Button.js";

export default function Init() {
  const [currentAccount, setCurrentAccount] = React.useState("");
  // We use another react hook in order to make a new component render each time the currentAccount
  // variable change his value, learn more at https://fr.reactjs.org/docs/hooks-effect.html
  // React.useEffect(() => {
  //   connectWithMetamask();
  // }, [currentAccount]);
  var hist = createBrowserHistory();
  // It instanciate new drizzle object with our drizzleOptions
  const drizzle = new Drizzle(drizzleOptions);

  const getAccount = async function () {
    const accounts = await window.ethereum.enable();
    setCurrentAccount(accounts[0]);
  };
  window.ethereum.on("accountsChanged", () => {
    getAccount();
  });

  const connectWithMetamask = () => {
    window.ethereum
      .request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      })
      .then((permissions) => {
        const accountsPermission = permissions.find(
          (permission) => permission.parentCapability === "eth_accounts"
        );
        if (accountsPermission) {
          console.log("eth_accounts permission successfully requested!");
          getAccount();
        }
      })
      .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log("Permissions needed to continue.");
        } else {
          console.error(error);
        }
      });
  };

  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {(drizzleContext) => {
          const { drizzleState } = drizzleContext;
          {
            /* return !initialized ? (
            <div>Loading...</div>
          ) : ( */
          }
          return (
            <Router history={hist}>
              {!currentAccount && (
                <Button
                  color="warning"
                  size="lg"
                  onClick={() => connectWithMetamask()}
                >
                  Connecter metamask
                </Button>
              )}
              {currentAccount !== "" && (
                <p
                  style={{
                    fontSize: "1.2em",
                    fontWeight: "bold",
                  }}
                >
                  {currentAccount}
                </p>
              )}

              <Switch>
                <Route path="/landing-page">
                  <LandingPage
                    drizzle={drizzle}
                    account={currentAccount}
                    drizzleState={drizzleState}
                    component={LandingPage}
                  />
                </Route>
                <Route path="/test-page">
                  <Test
                    drizzle={drizzle}
                    account={currentAccount}
                    drizzleState={drizzleState}
                    component={Test}
                  />
                </Route>
                <Route path="/profile-page" component={ProfilePage} />
                <Route path="/login-page" component={LoginPage} />
                <Route path="/" component={Components} />
              </Switch>
            </Router>
          );
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

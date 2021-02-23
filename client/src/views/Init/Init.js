import React, { useEffect } from "react";
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
  const hist = createBrowserHistory();
  const [currentAccount, setCurrentAccount] = React.useState([]);
  const [stateForDrizzle, setStateForDrizzle] = React.useState(null);
  const [mmConnected, setMMConnected] = React.useState(false);
  const [chainId, setChainId] = React.useState(null);
  const getChain = async function () {
    await window.ethereum.request({ method: "eth_chainId" }).then((chainId) => {
      console.log(chainId);
      setChainId(parseInt(chainId, 16));
    });
  };

  window.ethereum.on("accountsChanged", () => {
    getAccount();
  });
  window.ethereum.on("chainChanged", (_chainId) => {
    setChainId(parseInt(_chainId, 16));
    //window.location.reload();
  });

  window.ethereum.on("disconnect", (error) => {
    console.log(error);
  });

  const getAccount = async function () {
    await window.ethereum
      .request({ method: "eth_accounts" })
      .then((account) => {
        console.log(account);
        setCurrentAccount(account);
        if (account.length === 0) {
          setMMConnected(false);
        }
      });
  };

  let message;
  const connectWithMetamask = async function () {
    let getDrizzle;
    try {
      await window.ethereum
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
          }
        })
        .then(() => {
          if (chainId === 42) {
            getDrizzle = new Drizzle(drizzleOptions);
            setStateForDrizzle(getDrizzle);
            setMMConnected(true);
            message = "Chargement ...";
          } else {
            setStateForDrizzle(null);
            setMMConnected(false);
            message = "Veuillez vous connecter au réseaux kovan";
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deconnectMetamask = () => {};
  console.log(currentAccount);
  useEffect(() => {
    getChain();
    getAccount();
    //setIsConnected(window.ethereum.isConnected());
  }, []);
  console.log(chainId);

  return (
    <div>
      {mmConnected && currentAccount !== null && (
        <DrizzleContext.Provider drizzle={stateForDrizzle}>
          <DrizzleContext.Consumer>
            {(drizzleContext) => {
              const { drizzleState, initialized } = drizzleContext;
              return !initialized ? (
                <h1>{message}</h1>
              ) : (
                <Router history={hist}>
                  <Button
                    color="warning"
                    size="lg"
                    onClick={() => deconnectMetamask()}
                  >
                    deconnecter metamask
                  </Button>
                  {chainId !== 42 && (
                    <p
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Veuillez vous connecter au réseau kovan
                    </p>
                  )}
                  <h4
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {drizzleState.accounts[0]}
                  </h4>
                  <Switch>
                    <Route path="/landing-page">
                      <LandingPage
                        // drizzle={drizzle}
                        account={currentAccount}
                        //drizzleState={drizzleState}
                        component={LandingPage}
                      />
                    </Route>
                    <Route path="/test-page">
                      <Test
                        drizzle={stateForDrizzle}
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
      )}
      {!mmConnected && (
        <div>
          {chainId === 42 && currentAccount.length === 0 && (
            <Button color="warning" size="lg" onClick={connectWithMetamask}>
              Connecter metamask
            </Button>
          )}
          {chainId !== 42 && currentAccount.length === 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
              }}
            >
              <Button
                disabled
                color="warning"
                size="lg"
                onClick={connectWithMetamask}
              >
                Connecter metamask
              </Button>
              <p
                style={{
                  marginLeft: "2em",
                  fontWeight: "bold",
                }}
              >
                Veuillez vous connecter au réseau kovan
              </p>
            </div>
          )}
          <Router history={hist}>
            <Switch>
              <Route path="/landing-page">
                <LandingPage account={currentAccount} component={LandingPage} />
              </Route>
              <Route path="/test-page">
                <Test component={Test} />
              </Route>
              <Route path="/profile-page" component={ProfilePage} />
              <Route path="/login-page" component={LoginPage} />
              <Route path="/" component={Components} />
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

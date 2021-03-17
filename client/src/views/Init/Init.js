import React, { useEffect, useState } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";

import store from "../../store";

import "assets/scss/material-kit-react.scss?v=1.9.0";

import DappRouter from "./DappRouter.js";

import GridContainer from "components/Grid/GridContainer.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import MMButton from "../../containers/Header/MMButton.js";
import SearchBar from "components/Header/SearchBar.js";

import Warning from "../../assets/img/icons/warning.svg";

export default function Init(props) {
  const [chainMessage, setChainMessage] = useState("");

  const stateAccount = store.getState().accounts[0];

  const getChain = async function () {
    await window.ethereum.request({ method: "eth_chainId" }).then((idChain) => {
      if (parseInt(idChain, 16) !== 42) {
        setChainMessage("Please connect to kovan network");
        props.setMMButtonIsDisabled(true);
      } else {
        setChainMessage("");
        props.setMMButtonIsDisabled(false);
      }
    });
  };

  useEffect(() => {
    if (
      window.ethereum !== undefined &&
      window.ethereum.isMetaMask !== undefined
    ) {
      getChain();
    }
  }, []);

  if (window.ethereum.isMetaMask !== undefined) {
    window.ethereum.on("accountsChanged", (account) => {
      if (stateAccount && account[0]) {
        if (stateAccount.toUpperCase() === account[0].toUpperCase()) {
          props.setInfoMessage("Connected");
          props.setMMButtonDisplay("none");
          props.setIsMMConnected(true);
        }

        if (stateAccount.toUpperCase() !== account[0].toUpperCase()) {
          props.setInfoMessage(
            " Disconnected : please reconnect your account or log with another"
          );
          props.setMMButtonDisplay("flex");
          props.setIsMMConnected(false);
        }
      } else {
        props.setInfoMessage(
          " Disconnected : please reconnect your account or log with another"
        );
        props.setMMButtonDisplay("flex");
        props.setIsMMConnected(false);
      }
    });
    window.ethereum.on("chainChanged", (_chainId) => {
      if (parseInt(_chainId, 16) !== 42) {
        setChainMessage("Please connect to kovan network");
        props.setMMButtonIsDisabled(true);
      } else {
        setChainMessage("");
        props.setMMButtonIsDisabled(false);
      }
    });
  }

  if (window.ethereum === undefined) {
    setChainMessage("Please change your browser and install metamask");
    return <DappRouter />;
  }
  if (window.ethereum.isMetaMask === undefined) {
    setChainMessage("Please install metamask");
  }

  console.log(props);
  return (
    <GridContainer style={{ justifyContent: " flex-end" }}>
      <Header
        color="dark"
        brand="Pécule"
        rightLinks={<HeaderLinks />}
        MMButton={<MMButton />}
        SearchBar={<SearchBar />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
      />
      {chainMessage && (
        <div
          style={{
            width: "100%",
            position: "fixed",
            zIndex: 1200,
            color: "#f1c40f",
          }}
        >
          <p
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              backgroundColor: "black",
              margin: 0,
            }}
          >
            <img
              src={Warning}
              alt="metamask icon"
              style={{
                width: "15px",
                height: "15px",
                marginRight: "0.4em",
                marginTop: "2px",
              }}
            />
            {chainMessage}
          </p>
        </div>
      )}
      {props.infoMessage && props.infoMessage !== "Connected" && (
        <div
          style={{
            width: "100%",
            position: "fixed",
            top: "9%",
            zIndex: 1200,
            color: "#f1c40f",
          }}
        >
          <h4
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              backgroundColor: "black",
              margin: 0,
            }}
          >
            <img
              src={Warning}
              alt="warning icon"
              style={{
                width: "20px",
                height: "20px",
                fontWeight: "bold",
                // boxShadow: "",
                marginBottom: "6px",
              }}
            />

            {props.infoMessage}
          </h4>
        </div>
      )}
      {!props.isMMConnected && (
        <div
          style={{
            width: "100%",
          }}
        >
          <DappRouter />
        </div>
      )}

      {props.isMMConnected && props.stateAccount !== null && (
        <DrizzleContext.Provider store={store} drizzle={props.stateDrizzle}>
          <DrizzleContext.Consumer>
            {(drizzleContext) => {
              const { drizzleState, initialized } = drizzleContext;
              console.log(drizzleContext);
              return !initialized ? (
                <h1
                  style={{
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {"Loading, please wait  ..."}
                </h1>
              ) : (
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <DappRouter
                    drizzle={props.stateDrizzle}
                    drizzleState={drizzleState}
                  />
                </div>
              );
            }}
          </DrizzleContext.Consumer>
        </DrizzleContext.Provider>
      )}
      {props.mmConnected && props.stateDrizzle === undefined && (
        <h1>chargement</h1>
      )}
    </GridContainer>
  );
}

/* eslint-disable react/no-unescaped-entities */
import React from "react";
import transakSDK from "@transak/transak-sdk";
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";

import { makeStyles } from "@material-ui/core/styles";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import { cardTitle } from "assets/jss/material-kit-react.js";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);

export default function Test(props) {
  const classes = useStyles();
  const { ...rest } = props;
  console.log(props);
  console.log(rest);

  let transak = new transakSDK({
    apiKey: "48c256d9-3a98-4dbe-80c7-34d025de0048", // Your API Key
    environment: "STAGING", // STAGING/PRODUCTION
    defaultCryptoCurrency: "ETH",
    walletAddress: "0xC96822B34c7F892B09A39F080B2659105af00146", // Your customer's wallet address
    themeColor: "000000", // App theme color
    fiatCurrency: "", // INR/GBP
    email: "", // Your customer's email address
    redirectURL: "",
    hostURL: window.location.origin,
    widgetHeight: "550px",
    widgetWidth: "450px",
  });

  const RampInstanceOverlay = new RampInstantSDK({
    hostAppName: "Pecule",
    hostLogoUrl:
      "https://static.wixstatic.com/media/bbe3c0_362f98b2ac7e418ea2e7fbe5143d59b8~mv2.png/v1/crop/x_0,y_0,w_1983,h_536/fill/w_226,h_61,al_c,q_85,usm_0.66_1.00_0.01/logo%20blanc%201.webp",
  });

  // To get all the events
  transak.on(transak.ALL_EVENTS, (data) => {
    console.log(data);
  });

  // This will trigger when the user marks payment is made.
  transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
    console.log(orderData);
    transak.close();
  });

  return (
    <div
      className={classes.container}
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2em",
          fontWeight: "bold",
          color: "#ff9800",
        }}
      >
        Découvrez nos propriétés
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Card
          style={{
            width: "20rem",
            textAlign: "center",
          }}
        >
          <img
            style={{ height: "180px", width: "100%", display: "block" }}
            className={classes.imgCardTop}
            src="https://lh3.googleusercontent.com/arWG1CMl_RxYBq8x7QJ36VhKYZy4S2zn87RmEysf_QdxNRxQeKQhS27MpOUxyiSFtM-G-tRepM_lWKeuqs-22cZzpTVK4YgZL18cJg=rj-w1440-h843-n-l70"
            alt="Card-img-cap"
          />
          <CardBody>
            <h4 className={classes.cardTitle}>Cassis</h4>
            <p>Propriété dans le var avec domaine viticole et piscine</p>
            <Button color="twitter" size="lg" onClick={() => transak.init()}>
              J'achetète avec transak !
            </Button>
          </CardBody>
        </Card>
        <Card
          style={{
            width: "20rem",
            textAlign: "center",
          }}
        >
          <img
            style={{ height: "180px", width: "100%", display: "block" }}
            className={classes.imgCardTop}
            src="https://lh3.googleusercontent.com/arWG1CMl_RxYBq8x7QJ36VhKYZy4S2zn87RmEysf_QdxNRxQeKQhS27MpOUxyiSFtM-G-tRepM_lWKeuqs-22cZzpTVK4YgZL18cJg=rj-w1440-h843-n-l70"
            alt="Card-img-cap"
          />
          <CardBody>
            <h4 className={classes.cardTitle}>Sanary</h4>
            <p>Propriété dans le var avec domaine viticole et piscine</p>
            <Button
              color="success"
              size="lg"
              onClick={() => RampInstanceOverlay.show()}
            >
              J'achetète avec Ramp !
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

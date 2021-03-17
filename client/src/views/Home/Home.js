import React, { useState, useEffect } from "react";

// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();

  console.log(props);

  const handleModal = () => {
    return props.openDrizzleModal();
  };
  return (
    <div>
      <Parallax
        filter
        image={require("assets/img/backgrounds/purple_art.jpg")}
        style={{
          maxHeight: "600px",
        }}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              {/* <nft-card
                tokenAddress="0x28c3c0C73084EEcee3eBEA52B933983Ce2d1Ecc8"
                tokenId="2"
                network="rinkeby"
                orientationMode="auto"
                width="250px"
                height="200px"
                vertical
              ></nft-card> */}
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <GridItem md={12} className={classes.textCenter}>
          {!props.drizzle ? (
            <Button onClick={handleModal} color="primary" size="lg" simple>
              View Test Page
            </Button>
          ) : (
            <Link to={"/test-page"} className={classes.link}>
              <Button color="primary" size="lg" simple>
                View Test Page drizzle
              </Button>
            </Link>
          )}
        </GridItem>
      </div>
      {/* <Modal /> */}
      <Parallax>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Material Kit React.</h1>
                <h3 className={classes.subtitle}>
                  A Badass Material-UI Kit based on Material Design.
                </h3>
              </div>
            </GridItem>
            <Link to={"/owner-page"} className={classes.link}>
              <Button color="primary" size="lg" simple>
                View Owner Page
              </Button>
            </Link>
          </GridContainer>
        </div>
      </Parallax>
    </div>
  );
}

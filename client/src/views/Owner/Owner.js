import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import Icon from "@material-ui/core/Icon";
// // @material-ui/icons
// import Email from "@material-ui/icons/Email";
// import People from "@material-ui/icons/People";
// core components

import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

const useStyles = makeStyles(styles);

export default function Owner(props) {
  const [name, setName] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [roi, setRoi] = useState("");
  const [estatePrice, setEstatePrice] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  console.log(props);

  const handleName = (evt) => {
    setName(evt.target.value);
  };
  const handleTotalSupply = (evt) => {
    setTotalSupply(evt.target.value);
  };
  const handleRoi = (evt) => {
    setRoi(evt.target.value);
  };
  const handleEstatePrice = (evt) => {
    setEstatePrice(evt.target.value);
  };
  const handleTokenPrice = (evt) => {
    setTokenPrice(evt.target.value);
  };
  const handleSubmission = () => {
    props.createAsset(name, totalSupply, roi, estatePrice, tokenPrice);
  };

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={
          {
            //backgroundImage: "url(" + image + ")",
            //backgroundSize: "cover",
            //backgroundPosition: "top center",
          }
        }
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Tokeniser ma propriété</h4>
                  </CardHeader>
                  <p className={classes.divider}>
                    *tous les champs sont obligatoires
                  </p>
                  <CardBody>
                    <CustomInput
                      labelText="Nom..."
                      id="Name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        onChange: handleName,
                        // endAdornment: (
                        //   <InputAdornment position="end">
                        //     <People className={classes.inputIconsColor} />
                        //   </InputAdornment>
                        // ),
                      }}
                    />
                    <CustomInput
                      labelText="Nombre de token..."
                      id="totalSupply"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "number",
                        onChange: handleTotalSupply,
                        // endAdornment: (
                        //   <InputAdornment position="end">
                        //     <Email className={classes.inputIconsColor} />
                        //   </InputAdornment>
                        // ),
                      }}
                    />
                    <CustomInput
                      labelText="ROI..."
                      id="roi"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "number",
                        onChange: handleRoi,
                        // endAdornment: (
                        //   <InputAdornment position="end">
                        //     <Icon className={classes.inputIconsColor}>
                        //       lock_outline
                        //     </Icon>
                        //   </InputAdornment>
                        // ),
                        //autoComplete: "off",
                      }}
                    />
                    <CustomInput
                      labelText="Prix du bien..."
                      id="estatePrice"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "number",
                        onChange: handleEstatePrice,
                        // endAdornment: (
                        //   <InputAdornment position="end">
                        //     <Icon className={classes.inputIconsColor}>
                        //       lock_outline
                        //     </Icon>
                        //   </InputAdornment>
                        // ),
                        //autoComplete: "off",
                      }}
                    />
                    <CustomInput
                      labelText="Prix du token..."
                      id="tokenPrice"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "number",
                        onChange: handleTokenPrice,
                        // endAdornment: (
                        //   <InputAdornment position="end">
                        //     <Icon className={classes.inputIconsColor}>
                        //       lock_outline
                        //     </Icon>
                        //   </InputAdornment>
                        // ),
                        //autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      onClick={handleSubmission}
                      color="primary"
                      size="lg"
                    >
                      Valider
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

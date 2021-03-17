import React from "react";

// core components

import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

export default function ProfilePage(props) {
  const { ...rest } = props;
  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
        </GridItem>
      </GridContainer>

      <Footer />
    </div>
  );
}

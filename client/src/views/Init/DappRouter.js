import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../../containers/Home/Home.js";
import LandingPage from "../LandingPage/LandingPage.js";
import ProfilePage from "../ProfilePage/ProfilePage.js";
import LoginPage from "../LoginPage/LoginPage.js";
import Test from "../../containers/Test/Test.js";
import Owner from "../../containers/Owner/Owner.js";
import Modal from "../../containers/Modal/Modal.js";

export default function DappRouter({ drizzle }) {
  console.log(drizzle);
  return (
    <div>
      <Modal />
      <Switch>
        <Route exact path="/landing-page">
          <LandingPage component={LandingPage} />
        </Route>
        <Route exact path="/test-page">
          <Test drizzle={drizzle} />
        </Route>
        <Route exact path="/profile-page" component={ProfilePage} />
        <Route exact path="/login-page" component={LoginPage} />
        <Route exact path="/owner-page">
          <Owner drizzle={drizzle} />
        </Route>
        <Route exact path="/">
          <Home drizzle={drizzle} />
        </Route>
      </Switch>
    </div>
  );
}

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import store from "./store";

// pages for this product
import Init from "./containers/Init/Init.js";

ReactDOM.render(
  // Here is native drizzle components who helps to Dapp initialisation
  <Provider store={store}>
    <BrowserRouter>
      <Init />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

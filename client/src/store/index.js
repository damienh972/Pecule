import { generateStore } from "@drizzle/store";
import drizzleOptions from "../drizzleOptions";

import userReducer from "../reducers/UserReducer.js";
import UserMiddleware from "../middleware/UserMiddleware";
import PaymentMiddleware from "../middleware/PaymentMiddleware";
import OwnerMiddleware from "../middleware/OwnerMiddleware";
const appMiddlewares = [UserMiddleware, PaymentMiddleware, OwnerMiddleware];
const appReducers = {
  user: userReducer,
  
};
// create the store
const store = generateStore({
  drizzleOptions,
  appReducers,
  appMiddlewares,
  disableReduxDevTools: false, // enable ReduxDevTools!
});

export default store;

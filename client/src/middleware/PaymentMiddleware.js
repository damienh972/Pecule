import { PAY_WITH_MM } from "../actions/payment.js";

const UserMiddleware = (store) => (next) => (action) => {
  const BigNumber = require("bignumber.js");
  let peculeManager;
  if (store.getState().user.drizzle.contracts) {
    peculeManager = store.getState().user.drizzle.contracts.PeculeTokenManager;
  }
  switch (action.type) {
    case PAY_WITH_MM: {
      console.log(peculeManager);
      console.log(action);
      next(action);

      break;
    }

    default:
      next(action);
  }
};
export default UserMiddleware;

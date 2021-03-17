import { CREATE_ASSET } from "../actions/owner.js";
import { setInfoMessage } from "../actions/user.js";

const UserMiddleware = (store) => (next) => (action) => {
  let peculeManager;
  let account;
  if (store.getState().user.drizzle.contracts !== undefined) {
    //peculeManager = store.getState().user.drizzle.contracts.PeculeTokenManager;
    console.log(store.getState().user.drizzle.contracts);
    //account = peculeManager.options.from;
  }
  switch (action.type) {
    case CREATE_ASSET: {
      if (peculeManager && account) {
        const payment = async function () {
          await peculeManager.methods
            .TokenizeEstate(
              action.name,
              action.totalSupply,
              action.yearROI,
              action.estatePrice,
              action.tokenPrice
            )
            .send({
              from: account,
            });
        };
        payment().then((response) => {
          console.log(response);
        });
      } else {
        store.dispatch(setInfoMessage("une erreur s'est produite"));
      }
      next(action);

      break;
    }

    default:
      next(action);
  }
};
export default UserMiddleware;

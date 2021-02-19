import PeculeTokenManager from "./contracts/PeculeTokenManager.json";

// Here you can add data usefull for drizzle object initialisation
// like contracts, events, or provider
const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    },
  },
  contracts: [PeculeTokenManager],
  events: {
    SimpleStorage: ["StorageSet"],
  },
};

export default options;

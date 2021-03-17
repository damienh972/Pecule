import { connect } from "react-redux";
import {
  fetchDrizzle,
  setMMButtonDisplay,
  setIsMMConnected,
  setInfoMessage,
  setMMButtonIsDisabled,
} from "../../actions/user";

import Init from "../../views/Init/Init.js";

const mapStateToProps = (state) => ({
  stateDrizzle: state.user.drizzle,
  isMMConnected: state.user.isMMConnected,
  infoMessage: state.user.infoMessage,
  //MMButtonDisplay: state.user.MMButtonDisplay,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDrizzle: (drizzle) => {
    dispatch(fetchDrizzle(drizzle));
  },
  setIsMMConnected: (bool) => {
    dispatch(setIsMMConnected(bool));
  },
  setMMButtonDisplay: (display) => {
    dispatch(setMMButtonDisplay(display));
  },
  setInfoMessage: (message) => {
    dispatch(setInfoMessage(message));
  },
  setMMButtonIsDisabled: (message) => {
    dispatch(setMMButtonIsDisabled(message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Init);

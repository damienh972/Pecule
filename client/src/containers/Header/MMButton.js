import { connect } from "react-redux";
import {
  fetchDrizzle,
  setMMButtonDisplay,
  setIsMMConnected,
  setInfoMessage,
  connectToMM,
} from "../../actions/user";

import MMButton from "../../components/Header/MMButton.js";

const mapStateToProps = (state) => ({
  stateDrizzle: state.user.drizzle,
  isMMConnected: state.user.isMMConnected,
  infoMessage: state.user.infoMessage,
  display: state.user.MMButtonDisplay,
  isDisabled: state.user.isDisabled,
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
  connectToMM: () => {
    dispatch(connectToMM());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MMButton);

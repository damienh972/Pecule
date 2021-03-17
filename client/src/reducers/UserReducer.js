import {
  FETCH_DRIZZLE,
  OPEN_DRIZZLE_MODAL,
  CLOSE_DRIZZLE_MODAL,
  SET_IS_MM_CONNECTED,
  SET_INFO_MESSAGE,
  SET_MM_BUTTON_DISPLAY,
  SET_MM_BUTTON_IS_DISABLED,
} from "../actions/user";

const initialState = {
  drizzle: "",
  isDrizzleModalOpen: false,
  isMMConnected: false,
  infoMessage: "",
  MMButtonDisplay: "flex",
  isDisabled: false,
};
const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_DRIZZLE:
      return {
        ...state,
        drizzle: action.drizzle,
      };
    case OPEN_DRIZZLE_MODAL:
      return {
        ...state,
        isDrizzleModalOpen: true,
      };
    case CLOSE_DRIZZLE_MODAL:
      return {
        ...state,
        isDrizzleModalOpen: false,
      };
    case SET_IS_MM_CONNECTED:
      return {
        ...state,
        isMMConnected: action.isMMConnected,
      };
    case SET_INFO_MESSAGE:
      return {
        ...state,
        infoMessage: action.message,
      };
    case SET_MM_BUTTON_DISPLAY:
      return {
        ...state,
        MMButtonDisplay: action.display,
      };
    case SET_MM_BUTTON_IS_DISABLED:
      return {
        ...state,
        isDisabled: action.bool,
      };
    default:
      return state;
  }
};

export default userReducer;

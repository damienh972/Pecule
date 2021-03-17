export const FETCH_DRIZZLE = "FETCH_DRIZZLE";
export const OPEN_DRIZZLE_MODAL = "OPEN_DRIZZLE_MODAL";
export const CLOSE_DRIZZLE_MODAL = "CLOSE_DRIZZLE_MODAL";
export const SET_IS_MM_CONNECTED = "SET_IS_MM_CONNECTED";
export const SET_INFO_MESSAGE = "SET_INFO_MESSAGE";
export const SET_MM_BUTTON_DISPLAY = "SET_MM_BUTTON_DISPLAY";
export const SET_MM_BUTTON_IS_DISABLED = "SET_MM_BUTTON_IS_DISABLED";
export const CONNECT_TO_MM = "CONNECT_TO_MM";
export const fetchDrizzle = (drizzle) => ({
  type: FETCH_DRIZZLE,
  drizzle,
});
export const openDrizzleModal = () => ({
  type: OPEN_DRIZZLE_MODAL,
});
export const closeDrizzleModal = () => ({
  type: CLOSE_DRIZZLE_MODAL,
});
export const setIsMMConnected = (bool) => ({
  type: SET_IS_MM_CONNECTED,
  bool,
});
export const setInfoMessage = (message) => ({
  type: SET_INFO_MESSAGE,
  message,
});
export const setMMButtonDisplay = (display) => ({
  type: SET_MM_BUTTON_DISPLAY,
  display,
});
export const setMMButtonIsDisabled = (bool) => ({
  type: SET_MM_BUTTON_IS_DISABLED,
  bool,
});
export const connectToMM = () => ({
  type: CONNECT_TO_MM,
});

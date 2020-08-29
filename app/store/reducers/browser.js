import {
  BROWSER_LOGIN,
  BROWSER_LOGOUT,
  BROWSER_REGISTER,
} from "../actions/browser";

const browser = (state = null, action) => {
  switch (action.type) {
    case BROWSER_LOGIN:
      return action.browser;
    case BROWSER_REGISTER:
      return action.browser;
    case BROWSER_LOGOUT:
      return null;
    default:
      return state;
  }
};

export default browser;

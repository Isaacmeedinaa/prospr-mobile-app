import { BROWSER_LOGIN } from "../actions/browser";

const browser = (state = null, action) => {
  switch (action.type) {
    case BROWSER_LOGIN:
      return state;
    default:
      return state;
  }
};

export default browser;

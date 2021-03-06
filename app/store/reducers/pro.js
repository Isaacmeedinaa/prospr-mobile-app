import { PRO_LOGIN, PRO_LOGOUT, PRO_REGISTER } from "../actions/pro";

const pro = (state = null, action) => {
  switch (action.type) {
    case PRO_LOGIN:
      return action.pro;
    case PRO_REGISTER:
      return action.pro;
    case PRO_LOGOUT:
      return null;
    default:
      return state;
  }
};

export default pro;

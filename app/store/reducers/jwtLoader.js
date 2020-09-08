import { JWT_IS_LOADING, JWT_IS_NOT_LOADING } from "../actions/jwtLoader";

const jwtLoader = (state = false, action) => {
  switch (action.type) {
    case JWT_IS_LOADING:
      return true;
    case JWT_IS_NOT_LOADING:
      return false;
    default:
      return state;
  }
};

export default jwtLoader;

import { SET_JWT_AND_TYPE } from "../actions/loggedInUser";

const intialState = {
  userType: null,
  jwt: null,
};

const jwt = (state = intialState, action) => {
  switch (action.type) {
    case SET_JWT_AND_TYPE:
      return {
        userType: action.loggedInUser.userType,
        jwt: action.loggedInUser.jwt,
      };
    default:
      return state;
  }
};

export default jwt;

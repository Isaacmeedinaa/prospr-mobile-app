import { SET_JWT_TYPE_AND_ID } from "../actions/loggedInUser";

const intialState = {
  userType: null,
  jwt: null,
  id: null,
};

const jwt = (state = intialState, action) => {
  switch (action.type) {
    case SET_JWT_TYPE_AND_ID:
      return {
        userType: action.loggedInUser.userType,
        jwt: action.loggedInUser.jwt,
        id: action.loggedInUser.id,
      };
    default:
      return state;
  }
};

export default jwt;

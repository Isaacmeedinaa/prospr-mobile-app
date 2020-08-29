import { combineReducers } from "redux";

import loader from "./loader";
import loggedInUser from "./loggedInUser";
import browser from "./browser";
import pro from "./pro";

const rootReducer = combineReducers({
  loader,
  loggedInUser,
  browser,
  pro,
});

export default rootReducer;

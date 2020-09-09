import { combineReducers } from "redux";

import loader from "./loader";
import jwtLoader from "./jwtLoader";
import recommendationsLoader from "./recommendationsLoader";
import loggedInUser from "./loggedInUser";
import browser from "./browser";
import pro from "./pro";
import recommendations from "./recommendations";

const rootReducer = combineReducers({
  loader,
  jwtLoader,
  recommendationsLoader,
  loggedInUser,
  browser,
  pro,
  recommendations,
});

export default rootReducer;

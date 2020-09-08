import { combineReducers } from "redux";

import loader from "./loader";
import jwtLoader from "./jwtLoader";
import recommendationsLoader from "./recommendationsLoader";
import loggedInUser from "./loggedInUser";
import browser from "./browser";
import pro from "./pro";
import allRecommendations from "./allRecommendations";

const rootReducer = combineReducers({
  loader,
  jwtLoader,
  recommendationsLoader,
  loggedInUser,
  browser,
  pro,
  allRecommendations,
});

export default rootReducer;

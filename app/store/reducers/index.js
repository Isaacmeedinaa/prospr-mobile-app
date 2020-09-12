import { combineReducers } from "redux";

import loader from "./loaders/loader";
import jwtLoader from "./loaders/jwtLoader";
import recommendationsLoader from "./loaders/recommendationsLoader";
import recommendationLoader from "./loaders/recommendationLoader";
import loggedInUser from "./loggedInUser";
import browser from "./browser";
import pro from "./pro";
import recommendations from "./recommendations";

const rootReducer = combineReducers({
  loader,
  jwtLoader,
  recommendationsLoader,
  recommendationLoader,
  loggedInUser,
  browser,
  pro,
  recommendations,
});

export default rootReducer;

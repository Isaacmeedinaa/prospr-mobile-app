import {
  RECOMMENDATION_IS_POSTING,
  RECOMMENDATION_IS_NOT_POSTING,
} from "../../actions/loaders/recommendationLoader";

const loader = (state = false, action) => {
  switch (action.type) {
    case RECOMMENDATION_IS_POSTING:
      return true;
    case RECOMMENDATION_IS_NOT_POSTING:
      return false;
    default:
      return state;
  }
};

export default loader;

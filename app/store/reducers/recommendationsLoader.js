import {
  RECOMMENDATIONS_ARE_LOADING,
  RECOMMENDATIONS_ARE_NOT_LOADING,
  RECOMMENDATIONS_ARE_REFRESHING,
  RECOMMENDATIONS_ARE_NOT_REFRESHING,
} from "../actions/recommendationsLoader";

const initialState = {
  recommendationsAreLoading: false,
  recommendationsAreRefreshing: false,
};

const recommendationsLoader = (state = initialState, action) => {
  switch (action.type) {
    case RECOMMENDATIONS_ARE_LOADING:
      return {
        ...state,
        recommendationsAreLoading: true,
      };
    case RECOMMENDATIONS_ARE_NOT_LOADING:
      return {
        ...state,
        recommendationsAreLoading: false,
      };
    case RECOMMENDATIONS_ARE_REFRESHING:
      return {
        ...state,
        recommendationsAreRefreshing: true,
      };
    case RECOMMENDATIONS_ARE_NOT_REFRESHING:
      return {
        ...state,
        recommendationsAreRefreshing: false,
      };
    default:
      return state;
  }
};

export default recommendationsLoader;

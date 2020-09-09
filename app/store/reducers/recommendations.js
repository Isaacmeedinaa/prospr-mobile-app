import {
  SET_INITIAL_RECOMMENDATIONS,
  SET_NEXT_RECOMMENDATIONS,
  CREATE_RECOMMENDATION,
  DELETE_RECOMMENDATION,
} from "../actions/recommendations";

const recommendations = (state = [], action) => {
  switch (action.type) {
    case SET_INITIAL_RECOMMENDATIONS:
      return action.recommendations;
    case SET_NEXT_RECOMMENDATIONS:
      return [...state, ...action.nextRecommendations];
    case CREATE_RECOMMENDATION:
      state.pop();
      return [action.recommendation, ...state];
    case DELETE_RECOMMENDATION:
      return state.filter(
        (recommendation) => recommendation.id !== action.recommendationId
      );
    default:
      return state;
  }
};

export default recommendations;

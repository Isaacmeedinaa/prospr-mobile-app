import {
  SET_INITIAL_RECOMMENDATIONS,
  SET_NEXT_RECOMMENDATIONS,
} from "../actions/recommendations";

const allRecommendations = (state = [], action) => {
  switch (action.type) {
    case SET_INITIAL_RECOMMENDATIONS:
      return action.recommendations;
    case SET_NEXT_RECOMMENDATIONS:
      return [...state, ...action.nextRecommendations];
    default:
      return state;
  }
};

export default allRecommendations;

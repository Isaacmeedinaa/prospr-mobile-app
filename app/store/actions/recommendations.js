import { BASE_URL } from "../../constants/urls";

import { IS_LOADING, IS_NOT_LOADING } from "./loader";
import {
  RECOMMENDATIONS_ARE_LOADING,
  RECOMMENDATIONS_ARE_NOT_LOADING,
  RECOMMENDATIONS_ARE_REFRESHING,
  RECOMMENDATIONS_ARE_NOT_REFRESHING,
} from "./recommendationsLoader";

export const SET_INITIAL_RECOMMENDATIONS = "SET_INITIAL_RECOMMENDATIONS";
export const SET_NEXT_RECOMMENDATIONS = "SET_NEXT_RECOMMENDATIONS";

export const fetchInitialRecommendations = () => {
  return (dispatch) => {
    dispatch({ type: IS_LOADING });
    fetch(`${BASE_URL}/recommendations?page=1`)
      .then((resp) => resp.json())
      .then((recommendations) => {
        dispatch({
          type: SET_INITIAL_RECOMMENDATIONS,
          recommendations: recommendations,
        });
        dispatch({ type: IS_NOT_LOADING });
      });
  };
};

export const refreshInitialRecommendations = () => {
  return (dispatch) => {
    dispatch({ type: RECOMMENDATIONS_ARE_REFRESHING });
    fetch(`${BASE_URL}/recommendations?page=1`)
      .then((resp) => resp.json())
      .then((recommendations) => {
        dispatch({
          type: SET_INITIAL_RECOMMENDATIONS,
          recommendations: recommendations,
        });
        dispatch({ type: RECOMMENDATIONS_ARE_NOT_REFRESHING });
      });
  };
};

export const fetchNextRecommendations = (pageNumber) => {
  return (dispatch) => {
    dispatch({ type: RECOMMENDATIONS_ARE_LOADING });
    fetch(`${BASE_URL}/recommendations?page=${pageNumber}`)
      .then((resp) => resp.json())
      .then((recommendations) => {
        dispatch({
          type: SET_NEXT_RECOMMENDATIONS,
          nextRecommendations: recommendations,
        });
        dispatch({ type: RECOMMENDATIONS_ARE_NOT_LOADING });
      });
  };
};

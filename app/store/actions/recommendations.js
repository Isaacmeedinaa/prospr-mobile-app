import { Alert } from "react-native";

import { BASE_URL } from "../../constants/urls";

import { IS_LOADING, IS_NOT_LOADING } from "./loaders/loader";
import {
  RECOMMENDATIONS_ARE_LOADING,
  RECOMMENDATIONS_ARE_NOT_LOADING,
  RECOMMENDATIONS_ARE_REFRESHING,
  RECOMMENDATIONS_ARE_NOT_REFRESHING,
} from "./loaders/recommendationsLoader";
import {
  RECOMMENDATION_IS_POSTING,
  RECOMMENDATION_IS_NOT_POSTING,
} from "./loaders/recommendationLoader";

export const SET_INITIAL_RECOMMENDATIONS = "SET_INITIAL_RECOMMENDATIONS";
export const SET_NEXT_RECOMMENDATIONS = "SET_NEXT_RECOMMENDATIONS";
export const SET_RECOMMENDATIONS = "SET_RECOMMENDATIONS";
export const CREATE_RECOMMENDATION = "CREATE_RECOMMENDATION";
export const UPDATE_RECOMMENDATION = "UPDATE_RECOMMENDATION";
export const DELETE_RECOMMENDATION = "DELETE_RECOMMENDATION";

export const fetchAllRecommendations = () => {
  return (dispatch) => {
    dispatch({ type: IS_LOADING });
    fetch(`${BASE_URL}/recommendations`)
      .then((resp) => resp.json())
      .then((recommendations) => {
        dispatch({
          type: SET_RECOMMENDATIONS,
          recommendations: recommendations,
        });
        dispatch({ type: IS_NOT_LOADING });
      })
      .catch((err) => console.log(err));
  };
};

export const refreshAllRecommendations = () => {
  return (dispatch) => {
    fetch(`${BASE_URL}/recommendations`)
      .then((resp) => resp.json())
      .then((recommendations) => {
        dispatch({
          type: SET_RECOMMENDATIONS,
          recommendations: recommendations,
        });
      })
      .catch((err) => console.log(err));
  };
};

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
      })
      .catch((err) => console.log(err));
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
      })
      .catch((err) => console.log(err));
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
      })
      .catch((err) => console.log(err));
  };
};

export const createRecommendation = (title, content, mediaObjs, navigation) => {
  return (dispatch, getState) => {
    const browserId = getState().loggedInUser.id;
    const userToken = getState().loggedInUser.jwt;

    const recommendationData = {
      title: title,
      content: content,
      media_objs: mediaObjs,
      browser_id: browserId,
    };

    const reqObj = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify(recommendationData),
    };

    dispatch({ type: RECOMMENDATION_IS_POSTING });
    fetch(`${BASE_URL}/recommendations`, reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status !== 200) {
          Alert.alert("Please Try Again.", data.error_messages[0], [
            { title: "OK" },
          ]);
          dispatch({ type: RECOMMENDATION_IS_NOT_POSTING });
        } else {
          // dispatch({
          //   type: CREATE_RECOMMENDATION,
          //   recommendation: data.recommendation,
          // });
          dispatch(fetchAllRecommendations());
          navigation.goBack();
        }
      })
      .catch((err) => console.log(err));
  };
};

export const updateRecommendation = (
  recommendationId,
  title,
  content,
  images,
  navigation,
  goBackFunc
) => {
  return (dispatch, getState) => {
    const browserId = getState().loggedInUser.id;
    const userToken = getState().loggedInUser.jwt;

    const recommendationData = {
      recommendation: {
        title: title,
        content: content,
        browser_id: browserId,
      },
    };

    const reqObj = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify(recommendationData),
    };

    fetch(`${BASE_URL}/recommendations/${recommendationId}`, reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status !== 200) {
          Alert.alert("Please Try Again.", data.error_messages[0], [
            { title: "OK" },
          ]);
        } else {
          dispatch({
            type: UPDATE_RECOMMENDATION,
            recommendation: data.recommendation,
            recommendationId: recommendationId,
          });
        }
      })
      .then((data) => {
        if (goBackFunc) {
          goBackFunc();
        }
      })
      .then((data) => navigation.goBack())
      .catch((err) => console.log(err));
  };
};

export const deleteRecommendation = (recommendationId, navigation) => {
  return (dispatch, getState) => {
    const userToken = getState().loggedInUser.jwt;

    const reqObj = {
      method: "DELETE",
      headers: {
        Authorization: `Berear ${userToken}`,
        Accepts: "application/json",
      },
    };

    fetch(`${BASE_URL}/recommendations/${recommendationId}`, reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status !== 200) {
          Alert.alert("Please Try Again.", data.error_messages[0], [
            { title: "OK" },
          ]);
        } else {
          dispatch({
            type: DELETE_RECOMMENDATION,
            recommendationId: recommendationId,
          });
          navigation.goBack();
        }
      })
      .catch((err) => console.log(err));
  };
};

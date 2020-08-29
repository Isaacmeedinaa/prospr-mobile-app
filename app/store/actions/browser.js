import React from "react";
import { Alert, AsyncStorage } from "react-native";

import { IS_LOADING, IS_NOT_LOADING } from "./loader";
import { SET_JWT_AND_TYPE } from "./loggedInUser";
import { BASE_URL } from "../../constants/urls";

export const BROWSER_LOGIN = "BROWSER_LOGIN";
export const BROWSER_LOGOUT = "BROWSER_LOGOUT";

export const browserLogin = (email, password) => {
  return (dispatch) => {
    const browserLoginData = {
      browser: {
        email: email.toLowerCase(),
        password: password,
      },
    };

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify(browserLoginData),
    };

    dispatch({ type: IS_LOADING });
    fetch(`${BASE_URL}/browser_login`, reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status !== 200) {
          Alert.alert(data.error_message, "Please try again.", [
            { text: "OK" },
          ]);
        } else {
          dispatch({ type: BROWSER_LOGIN, browser: data.browser });
          dispatch({
            type: SET_JWT_AND_TYPE,
            loggedInUser: { userType: "browser", jwt: data.jwt_token },
          });
          saveDataToStorage(data.jwt_token, "browser");
        }
        dispatch({ type: IS_NOT_LOADING });
      })
      .catch((err) => console.log(err));
  };
};

export const browserAutoLogin = (jwt_token, userType) => {
  return (dispatch) => {
    const reqObj = {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };

    dispatch({ type: IS_LOADING });
    fetch(`${BASE_URL}/browser_auto_login`, reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status !== 200) {
          return;
        } else {
          dispatch({ type: BROWSER_LOGIN, browser: data.browser });
          dispatch({
            type: SET_JWT_AND_TYPE,
            loggedInUser: { userType: userType, jwt: jwt_token },
          });
        }
      });
    dispatch({ type: IS_NOT_LOADING });
  };
};

export const browserLogout = () => {
  return (dispatch) => {
    AsyncStorage.removeItem("userData");
    dispatch({ type: BROWSER_LOGOUT });
    dispatch({
      type: SET_JWT_AND_TYPE,
      loggedInUser: { userType: null, jwt: null },
    });
  };
};

const saveDataToStorage = (jwt_token, userType) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({ jwt_token: jwt_token, userType: userType })
  );
};

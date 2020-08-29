import React from "react";
import { Alert, AsyncStorage } from "react-native";

import { IS_LOADING, IS_NOT_LOADING } from "./loader";
import { SET_JWT_AND_TYPE } from "./loggedInUser";
import { BASE_URL } from "../../constants/urls";

export const PRO_LOGIN = "PRO_LOGIN";
export const PRO_LOGOUT = "PRO_LOGOUT";

export const proLogin = (email, password) => {
  return (dispatch) => {
    const proLoginData = {
      pro: {
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
      body: JSON.stringify(proLoginData),
    };

    dispatch({ type: IS_LOADING });
    fetch(`${BASE_URL}/pro_login`, reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status !== 200) {
          Alert.alert(data.error_message, "Please try again.", [
            { text: "OK" },
          ]);
        } else {
          dispatch({ type: PRO_LOGIN, pro: data.pro });
          dispatch({
            type: SET_JWT_AND_TYPE,
            loggedInUser: { userType: "pro", jwt: data.jwt_token },
          });
          saveDataToStorage(data.jwt_token, "pro");
        }
        dispatch({ type: IS_NOT_LOADING });
      })
      .catch((err) => console.log(err));
  };
};

export const proAutoLogin = (jwt_token, userType) => {
  return (dispatch) => {
    const reqObj = {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };

    dispatch({ type: IS_LOADING });
    fetch(`${BASE_URL}/pro_auto_login`, reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status !== 200) {
          return;
        } else {
          dispatch({ type: PRO_LOGIN, pro: data.pro });
          dispatch({
            type: SET_JWT_AND_TYPE,
            loggedInUser: { userType: userType, jwt: jwt_token },
          });
        }
      });
    dispatch({ type: IS_NOT_LOADING });
  };
};

export const proLogout = () => {
  return (dispatch) => {
    AsyncStorage.removeItem("userData");
    dispatch({ type: PRO_LOGOUT });
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
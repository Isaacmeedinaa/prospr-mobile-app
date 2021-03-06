import React from "react";
import { Alert, AsyncStorage } from "react-native";

import { JWT_IS_LOADING, JWT_IS_NOT_LOADING } from "./loaders/jwtLoader";
import { IS_LOADING, IS_NOT_LOADING } from "./loaders/loader";
import { SET_JWT_TYPE_AND_ID } from "./loggedInUser";
import { BASE_URL } from "../../constants/urls";

export const BROWSER_LOGIN = "BROWSER_LOGIN";
export const BROWSER_REGISTER = "BROWSER_REGISTER";
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
          dispatch({ type: IS_NOT_LOADING });
        } else {
          dispatch({ type: BROWSER_LOGIN, browser: data.browser });
          dispatch({
            type: SET_JWT_TYPE_AND_ID,
            loggedInUser: {
              userType: "browser",
              jwt: data.jwt_token,
              id: data.browser.id,
            },
          });
          saveDataToStorage(data.jwt_token, "browser", data.browser.id);
          dispatch({ type: IS_NOT_LOADING });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const browserRegister = (
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  confirmPassword
) => {
  return (dispatch) => {
    const browserRegisterData = {
      browser: {
        first_name: firstName,
        last_name: lastName,
        email: email.toLowerCase(),
        phone_number: phoneNumber,
        password: password,
        password_confirmation: confirmPassword,
      },
    };

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify(browserRegisterData),
    };

    dispatch({ type: IS_LOADING });
    fetch(`${BASE_URL}/browser_register`, reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status !== 200) {
          Alert.alert("Unable to Register", data.error_messages[0], [
            { text: "OK" },
          ]);
          dispatch({ type: IS_NOT_LOADING });
        } else {
          dispatch({ type: BROWSER_REGISTER, browser: data.browser });
          dispatch({
            type: SET_JWT_TYPE_AND_ID,
            loggedInUser: {
              userType: "browser",
              jwt: data.jwt_token,
              id: data.browser.id,
            },
          });
          saveDataToStorage(data.jwt_token, "browser", data.browser.id);
          dispatch({ type: IS_NOT_LOADING });
        }
      });
  };
};

export const browserAutoLogin = (jwt_token, userType, id) => {
  return (dispatch) => {
    const reqObj = {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };

    dispatch({ type: JWT_IS_LOADING });
    fetch(`${BASE_URL}/browser_auto_login`, reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status !== 200) {
          return;
        } else {
          dispatch({ type: BROWSER_LOGIN, browser: data.browser });
          dispatch({
            type: SET_JWT_TYPE_AND_ID,
            loggedInUser: {
              userType: userType,
              jwt: jwt_token,
              id: id,
            },
          });
          dispatch({ type: JWT_IS_NOT_LOADING });
        }
      });
  };
};

export const browserLogout = () => {
  return (dispatch) => {
    AsyncStorage.removeItem("userData");
    dispatch({ type: BROWSER_LOGOUT });
    dispatch({
      type: SET_JWT_TYPE_AND_ID,
      loggedInUser: { userType: null, jwt: null, id: null },
    });
  };
};

const saveDataToStorage = (jwt_token, userType, id) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({ jwt_token: jwt_token, userType: userType, id: id })
  );
};

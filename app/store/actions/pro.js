import React from "react";
import { Alert, AsyncStorage } from "react-native";

import { IS_LOADING, IS_NOT_LOADING } from "./loader";
import { SET_JWT_TYPE_AND_ID } from "./loggedInUser";
import { BASE_URL } from "../../constants/urls";

export const PRO_LOGIN = "PRO_LOGIN";
export const PRO_REGISTER = "PRO_REGISTER";
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
          Alert.alert("Please try again", data.error_message, [{ text: "OK" }]);
        } else {
          dispatch({ type: PRO_LOGIN, pro: data.pro });
          dispatch({
            type: SET_JWT_TYPE_AND_ID,
            loggedInUser: {
              userType: "pro",
              jwt: data.jwt_token,
              id: data.pro.id,
            },
          });
          saveDataToStorage(data.jwt_token, "pro", data.pro.id);
        }
        dispatch({ type: IS_NOT_LOADING });
      })
      .catch((err) => console.log(err));
  };
};

export const proRegister = (
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
    fetch(`${BASE_URL}/pro_register`, reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status !== 200) {
          Alert.alert("Unable to Register", data.error_messages[0], [
            { text: "OK" },
          ]);
        } else {
          console.log(data.pro);
          dispatch({ type: PRO_REGISTER, pro: data.pro });
          dispatch({
            type: SET_JWT_TYPE_AND_ID,
            loggedInUser: {
              userType: "pro",
              jwt: data.jwt_token,
              id: data.pro.id,
            },
          });
          saveDataToStorage(data.jwt_token, "pro", data.pro.id);
        }
        dispatch({ type: IS_NOT_LOADING });
      });
  };
};

export const proAutoLogin = (jwt_token, userType, id) => {
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
            type: SET_JWT_TYPE_AND_ID,
            loggedInUser: {
              userType: userType,
              jwt: jwt_token,
              id: id,
            },
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

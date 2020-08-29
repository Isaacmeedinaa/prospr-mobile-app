import React, { Component } from "react";
import {
  AsyncStorage,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { connect } from "react-redux";
import { browserAutoLogin } from "../store/actions/browser";
import { proAutoLogin } from "../store/actions/pro";

import {
  AuthStackNavigator,
  BrowserStackNavigator,
  ProStackNavigator,
} from "./ScreenStacks";
import colors from "../constants/colors";

class AppNavigator extends Component {
  componentDidMount() {
    const autoLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const jsonUserData = JSON.parse(userData);
      const { jwt_token, userType } = jsonUserData;

      if (!jwt_token) {
        return;
      } else if (jwt_token && userType === "browser") {
        this.props.browserAutoLogin(jwt_token, userType);
      } else if (jwt_token && userType === "pro") {
        this.props.proAutoLogin(jwt_token, userType);
      }
    };

    autoLogin();
  }

  render() {
    if (this.props.loader) {
      return (
        <View style={styles.screen}>
          <ActivityIndicator size="large" color={colors.primaryColor} />
        </View>
      );
    } else if (
      !this.props.loggedInUser.jwt &&
      !this.props.loggedInUser.userType
    ) {
      return (
        <NavigationContainer>
          <AuthStackNavigator />
        </NavigationContainer>
      );
    } else if (
      this.props.loggedInUser.jwt &&
      this.props.loggedInUser.userType === "browser"
    ) {
      return (
        <NavigationContainer>
          <BrowserStackNavigator />
        </NavigationContainer>
      );
    } else if (
      this.props.loggedInUser.jwt &&
      this.props.loggedInUser.userType === "pro"
    ) {
      return (
        <NavigationContainer>
          <ProStackNavigator />
        </NavigationContainer>
      );
    }
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    loader: state.loader,
    loggedInUser: state.loggedInUser,
    browser: state.browser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    browserAutoLogin: (jwt_token, userType) =>
      dispatch(browserAutoLogin(jwt_token, userType)),
    proAutoLogin: (jwt_token, userType) =>
      dispatch(proAutoLogin(jwt_token, userType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);

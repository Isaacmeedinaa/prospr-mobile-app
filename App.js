import React, { Component, useState } from "react";
import { AsyncStorage } from "react-native";
import { Provider } from "react-redux";
import store from "./app/store/store";

import { AppLoading } from "expo";
import * as Font from "expo-font";

import AppNavigator from "./app/navigation/AppNavigator";

const fetchFonts = () => {
  return Font.loadAsync({
    "montserrat-thin": require("./app/assets/fonts/Montserrat-Thin.ttf"),
    "montserrat-light": require("./app/assets/fonts/Montserrat-Light.ttf"),
    "montserrat-regular": require("./app/assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-medium": require("./app/assets/fonts/Montserrat-Medium.ttf"),
    "montserrat-semi-bold": require("./app/assets/fonts/Montserrat-SemiBold.ttf"),
    "montserrat-bold": require("./app/assets/fonts/Montserrat-Bold.ttf"),
  });
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      fontIsLoaded: false,
    };
  }

  render() {
    if (!this.state.fontIsLoaded) {
      return (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => this.setState({ fontIsLoaded: true })}
        />
      );
    }

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;

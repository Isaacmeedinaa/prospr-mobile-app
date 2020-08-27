import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";

import {
  AuthStackNavigator,
  BrowserStackNavigator,
  ProStackNavigator,
} from "./ScreenStacks";

class AppNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <AuthStackNavigator />
      </NavigationContainer>
    );
  }
}

export default AppNavigator;

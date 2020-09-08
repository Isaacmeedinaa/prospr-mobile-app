import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import colors from "../constants/colors";

class LoadingScreen extends Component {
  render() {
    return (
      <View style={styles.activityIndicatorScreen}>
        <ActivityIndicator size="large" color={colors.primaryColor} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicatorScreen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default LoadingScreen;

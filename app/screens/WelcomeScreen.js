import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class WelcomeScreen extends Component {
  render() {
    return (
      <View>
        <Text style={styles.text}>WelcomeScreen.js</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "montserrat-regular",
  },
});

export default WelcomeScreen;

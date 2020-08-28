import React, { Component } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

class WelcomeScreen extends Component {
  render() {
    return (
      <SafeAreaView>
        <View>
          <Text style={styles.text}>WelcomeScreen.js</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "montserrat-regular",
  },
});

export default WelcomeScreen;

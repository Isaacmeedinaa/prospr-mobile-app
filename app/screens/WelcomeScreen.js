import React, { Component } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

import AuthButton from "../components/UI/AuthButton";

import colors from "../constants/colors";

class WelcomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.screen}>
          <View style={styles.elementsContainer}>
            <Text style={styles.appName}>PROSPR</Text>
            <Text style={styles.subHeading}>
              The first official{"\n"}economic{"\n"}
              self-comsumption{"\n"}platform
            </Text>
            <Text style={styles.smallHeading}>
              Post your services{"\n"}or browse a database{"\n"}of businesses
            </Text>
            <AuthButton
              onPress={() => this.props.navigation.push("BrowserLogin")}
              btnStyle={styles.btnStyleOne}
              btnText="I'm a Browser"
            />
            <AuthButton
              onPress={() => this.props.navigation.push("ProLogin")}
              btnStyle={styles.btnStyleTwo}
              btnText="I'm a Pro"
            />
            <AuthButton
              onPress={() => console.log("hi")}
              btnStyle={styles.btnStyleTwo}
              btnText="Visit Our Website"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.secondaryLight,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.secondaryLight,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  elementsContainer: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  appName: {
    fontFamily: "montserrat-bold",
    fontSize: 25,
  },
  subHeading: {
    marginTop: 70,
    fontFamily: "montserrat-light",
    fontSize: 22,
    lineHeight: 33,
  },
  smallHeading: {
    marginTop: 50,
    fontFamily: "montserrat-light",
    fontSize: 17,
    lineHeight: 25,
  },
  btnStyleOne: {
    marginTop: 40,
    backgroundColor: colors.darkColor,
    shadowColor: colors.darkColor,
    shadowOpacity: 0.4,
    shadowOffset: { height: 8, width: 0 },
    shadowRadius: 15,
  },
  btnStyleTwo: {
    marginTop: 20,
    backgroundColor: colors.primaryColor,
    shadowColor: colors.primaryColor,
    shadowOpacity: 0.4,
    shadowOffset: { height: 8, width: 0 },
    shadowRadius: 15,
  },
});

export default WelcomeScreen;

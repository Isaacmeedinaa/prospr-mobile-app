import React, { Component } from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AuthButton from "../../../components/UI/AuthButton";

import colors from "../../../constants/colors";
import { color } from "react-native-reanimated";

class BrowserLoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          listViewDisplayed={false}
          contentContainerStyle={styles.browserLoginScrollView}
        >
          <View style={styles.screen}>
            <View style={styles.elementsContainer}>
              <Text style={styles.appName}>PROSPR</Text>
              <Text style={styles.subHeading}>Welcome Back</Text>
              <Text style={styles.smallHeading}>
                Login to browse our business{"\n"}and services database
              </Text>
              <TextInput
                style={styles.authInput}
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="gray"
                value={this.state.email}
                onChangeText={(email) => this.setState({ email: email })}
              />
              <TextInput
                style={styles.authInput}
                secureTextEntry
                placeholder="Password"
                placeholderTextColor="gray"
                value={this.state.password}
                onChangeText={(password) =>
                  this.setState({ password: password })
                }
              />
              <View style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                <Text
                  style={styles.forgotPasswordBtn}
                  onPress={() =>
                    console.log("forgot password (browser) component")
                  }
                >
                  Tap Here
                </Text>
              </View>
              <AuthButton
                onPress={() => console.log("hi")}
                btnStyle={styles.loginBtn}
                btnText="Login"
              />
              <AuthButton
                onPress={() => console.log("hi")}
                btnStyle={styles.registerBtn}
                btnText="Create an Account"
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.secondaryLight,
  },
  browserLoginScrollView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  screen: {
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
    marginTop: 30,
    fontFamily: "montserrat-light",
    fontSize: 17,
    lineHeight: 25,
  },
  authInput: {
    marginTop: 30,
    width: "100%",
    height: 38,
    fontSize: 16,
    borderBottomColor: colors.darkColor,
    borderBottomWidth: 1.2,
    fontFamily: "montserrat-regular",
    color: colors.darkColor,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    marginTop: 18,
    width: "100%",
  },
  forgotPasswordText: {
    fontFamily: "montserrat-regular",
    color: colors.darkColor,
  },
  forgotPasswordBtn: {
    fontFamily: "montserrat-semi-bold",
    color: colors.primaryColor,
    marginStart: 5,
  },
  loginBtn: {
    width: "100%",
    marginTop: 30,
    backgroundColor: colors.darkColor,
    shadowColor: colors.darkColor,
    shadowOpacity: 0.4,
    shadowOffset: { height: 8, width: 0 },
    shadowRadius: 15,
  },
  registerBtn: {
    width: "100%",
    marginTop: 30,
    backgroundColor: colors.primaryColor,
    shadowColor: colors.primaryColor,
    shadowOpacity: 0.4,
    shadowOffset: { height: 8, width: 0 },
    shadowRadius: 15,
  },
});

export default BrowserLoginScreen;

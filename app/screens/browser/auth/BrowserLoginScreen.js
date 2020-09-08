import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { connect } from "react-redux";
import { browserLogin } from "../../../store/actions/browser";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AuthButton from "../../../components/UI/AuthButton";

import colors from "../../../constants/colors";

class BrowserLoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  handleLoginOnPress = () => {
    if (this.state.email !== "" || this.state.password !== "") {
      this.props.browserLogin(this.state.email, this.state.password);
    }
    this.setState({
      email: "",
      password: "",
    });
  };

  render() {
    if (this.props.loader) {
      return (
        <View style={styles.activityIndicatorScreen}>
          <ActivityIndicator size="large" color={colors.primaryColor} />
        </View>
      );
    }

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
                onPress={this.handleLoginOnPress}
                btnStyle={styles.loginBtn}
                btnText="Login"
              />
              <AuthButton
                onPress={() => this.props.navigation.push("BrowserRegister")}
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
  activityIndicatorScreen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.secondaryLight,
  },
  browserLoginScrollView: {
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
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
    // shadowColor: colors.darkColor,
    // shadowOpacity: 0.4,
    // shadowOffset: { height: 8, width: 0 },
    // shadowRadius: 15,
  },
  registerBtn: {
    width: "100%",
    marginTop: 30,
    backgroundColor: colors.primaryColor,
    // shadowColor: colors.primaryColor,
    // shadowOpacity: 0.4,
    // shadowOffset: { height: 8, width: 0 },
    // shadowRadius: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    loader: state.loader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    browserLogin: (email, password) => dispatch(browserLogin(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowserLoginScreen);

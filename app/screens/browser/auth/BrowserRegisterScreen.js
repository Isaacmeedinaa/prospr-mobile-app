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
import { browserRegister } from "../../../store/actions/browser";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AuthButton from "../../../components/UI/AuthButton";

import colors from "../../../constants/colors";

class BrowserRegisterScreen extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleRegisterOnPress = () => {
    if (
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.email !== "" ||
      this.state.phoneNumber === "" ||
      this.state.password !== "" ||
      this.state.confirmPassword !== ""
    ) {
      this.props.browserRegister(
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.phoneNumber,
        this.state.password,
        this.state.confirmPassword
      );
    }
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
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
          contentContainerStyle={styles.browserRegisterScrollView}
        >
          <View style={styles.screen}>
            <View style={styles.elementsContainer}>
              <Text style={styles.appName}>PROSPR</Text>
              <Text style={styles.subHeading}>Join Us</Text>
              <Text style={styles.smallHeading}>
                Register to browse our business{"\n"}and services database
              </Text>
              <TextInput
                style={styles.authInput}
                keyboardType="default"
                placeholder="First Name"
                placeholderTextColor="gray"
                value={this.state.firstName}
                onChangeText={(firstName) =>
                  this.setState({ firstName: firstName })
                }
              />
              <TextInput
                style={styles.authInput}
                keyboardType="default"
                placeholder="Last Name"
                placeholderTextColor="gray"
                value={this.state.lastName}
                onChangeText={(lastName) =>
                  this.setState({ lastName: lastName })
                }
              />
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
                keyboardType="phone-pad"
                placeholder="Phone Number"
                placeholderTextColor="gray"
                value={this.state.phoneNumber}
                onChangeText={(phoneNumber) =>
                  this.setState({ phoneNumber: phoneNumber })
                }
              />
              <TextInput
                style={styles.authInput}
                keyboardType="default"
                secureTextEntry
                placeholder="Password"
                placeholderTextColor="gray"
                value={this.state.password}
                onChangeText={(password) =>
                  this.setState({ password: password })
                }
              />
              <TextInput
                style={styles.authInput}
                keyboardType="default"
                secureTextEntry
                placeholder="Confirm Password"
                placeholderTextColor="gray"
                value={this.state.confirmPassword}
                onChangeText={(confirmPassword) =>
                  this.setState({ confirmPassword: confirmPassword })
                }
              />
              <AuthButton
                onPress={this.handleRegisterOnPress}
                btnStyle={styles.registerBtn}
                btnText="Register"
              />
              <AuthButton
                onPress={() => this.props.navigation.goBack()}
                btnStyle={styles.loginBtn}
                btnText="Login"
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
  browserRegisterScrollView: {
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 50,
    paddingBottom: 50,
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
  loginBtn: {
    width: "100%",
    marginTop: 30,
    backgroundColor: colors.primaryColor,
    // shadowColor: colors.primaryColor,
    // shadowOpacity: 0.4,
    // shadowOffset: { height: 8, width: 0 },
    // shadowRadius: 15,
  },
  registerBtn: {
    width: "100%",
    marginTop: 30,
    backgroundColor: colors.darkColor,
    // shadowColor: colors.darkColor,
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
    browserRegister: (
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword
    ) =>
      dispatch(
        browserRegister(
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
          confirmPassword
        )
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowserRegisterScreen);

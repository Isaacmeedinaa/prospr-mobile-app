import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import colors from "../../constants/colors";

class AuthButton extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={this.props.onPress}
        style={[styles.btn, this.props.btnStyle]}
      >
        <Text style={[styles.btnText, this.props.btnTextStyle]}>
          {this.props.btnText}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    display: "flex",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    color: colors.primaryLight,
    fontFamily: "montserrat-semi-bold",
  },
});

export default AuthButton;
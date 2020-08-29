import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import { connect } from "react-redux";
import { browserLogout } from "../../../store/actions/browser";

import AuthButton from "../../../components/UI/AuthButton";

import colors from "../../../constants/colors";

class BrowserProfileScreen extends Component {
  render() {
    return (
      <View>
        <AuthButton
          onPress={() => this.props.browserLogout()}
          btnStyle={styles.registerBtn}
          btnText="Logout"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  registerBtn: {
    width: 150,
    marginTop: 30,
    backgroundColor: colors.primaryColor,
    shadowColor: colors.primaryColor,
    shadowOpacity: 0.4,
    shadowOffset: { height: 8, width: 0 },
    shadowRadius: 15,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    browserLogout: () => dispatch(browserLogout()),
  };
};

export default connect(null, mapDispatchToProps)(BrowserProfileScreen);

import React, { Component } from "react";
import { TouchableOpacity, Alert } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../../../../constants/colors";

class HeaderBackLeftComponent extends Component {
  onButtonPressHandler = () => {
    Alert.alert(
      "Discard Recommendation?",
      "If you leave now, you will loose your changes.",
      [
        { text: "Continue" },
        {
          text: "Discard Recommendation",
          style: "destructive",
          onPress: () =>
            this.props.navigation.navigate("BrowserRecommendations"),
        },
      ]
    );
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this.onButtonPressHandler}
        style={{
          height: "100%",
          width: 50,
          marginLeft: 15,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="ios-arrow-back" size={32} color={colors.primaryColor} />
      </TouchableOpacity>
    );
  }
}

export default HeaderBackLeftComponent;

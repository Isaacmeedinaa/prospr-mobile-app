import React, { Component } from "react";
import { TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../../../../constants/colors";

class HeaderRightComponent extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("BrowserNewRecommendation")
        }
        style={{
          height: "100%",
          marginRight: 15,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons
          name={this.props.name}
          size={26}
          color={colors.primaryColor}
        />
      </TouchableOpacity>
    );
  }
}

export default HeaderRightComponent;

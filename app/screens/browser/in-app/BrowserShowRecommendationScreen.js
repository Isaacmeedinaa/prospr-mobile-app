import React, { Component } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

import { connect } from "react-redux";
import { deleteRecommendation } from "../../../store/actions/recommendations";

class BrowserShowRecommendationScreen extends Component {
  onDeleteRecommendationPressHandler = () => {
    Alert.alert(
      "Are you sure?",
      "Are you sure you want to delete this recommendation? This can't be undone.",
      [
        {
          text: "Yes",
          style: "destructive",
          onPress: () =>
            this.props.deleteRecommendation(
              this.props.route.params.recommendation.id,
              this.props.navigation
            ),
        },
        { text: "Cancel" },
      ]
    );
  };

  render() {
    return (
      <View>
        {this.props.route.params.recommendation.browser.id !==
        this.props.browserId ? null : (
          <Button
            title="Delete Recommendation"
            onPress={this.onDeleteRecommendationPressHandler}
          ></Button>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recommendations: state.recommendations,
    browserId: state.loggedInUser.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRecommendation: (recommendationId, navigation) =>
      dispatch(deleteRecommendation(recommendationId, navigation)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowserShowRecommendationScreen);

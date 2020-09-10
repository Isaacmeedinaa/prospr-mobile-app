import React, { Component } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

import { connect } from "react-redux";
import { deleteRecommendation } from "../../../store/actions/recommendations";

class BrowserShowRecommendationScreen extends Component {
  constructor(props) {
    super(props);

    const selectedRecommendation = props.recommendations.find(
      (recommendation) =>
        recommendation.id === props.route.params.recommendationId
    );

    this.state = {
      recommendation: selectedRecommendation,
    };
  }

  onEditRecommendationPressHandler = () => {
    this.props.navigation.push("BrowserEditRecommendation", {
      recommendationId: this.props.route.params.recommendationId,
      onGoBack: () => this.updateRecommendationState(),
    });
  };

  updateRecommendationState = async () => {
    const selectedRecommendation = this.props.recommendations.find(
      (recommendation) =>
        recommendation.id === this.props.route.params.recommendationId
    );
    await this.setState({
      recommendation: selectedRecommendation,
    });
  };

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
              this.props.route.params.recommendationId,
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
        <Text>{this.state.recommendation.title}</Text>
        {this.state.recommendation.browser.id !==
        this.props.browserId ? null : (
          <Button
            title="Edit Recommendation"
            onPress={this.onEditRecommendationPressHandler}
          ></Button>
        )}
        {this.state.recommendation.browser.id !==
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

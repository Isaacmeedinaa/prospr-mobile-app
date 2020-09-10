import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { connect } from "react-redux";
import { updateRecommendation } from "../../../store/actions/recommendations";

import CustomButton from "../../../components/UI/CustomButton";

import colors from "../../../constants/colors";

class BrowserEditRecommendationScreen extends Component {
  constructor(props) {
    super(props);

    const selectedRecommendation = props.recommendations.find(
      (recommendation) =>
        recommendation.id === props.route.params.recommendationId
    );

    this.state = {
      id: selectedRecommendation.id,
      title: selectedRecommendation.title,
      content: selectedRecommendation.content,
      images: selectedRecommendation.recommendation_images,
    };
  }

  onUpdateRecommendationPressHandler = () => {
    this.props.updateRecommendation(
      this.state.id,
      this.state.title,
      this.state.content,
      this.state.images,
      this.props.navigation,
      this.props.route.params.onGoBack
    );
  };

  render() {
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        listViewDisplayed={false}
        contentContainerStyle={styles.newRecommendationScrollView}
      >
        <View style={styles.screen}>
          <TextInput
            style={styles.editRecommendationInput}
            placeholder="Recommendation Title"
            placeholderTextColor="gray"
            value={this.state.title}
            onChangeText={(title) => this.setState({ title: title })}
          />
          <TextInput
            style={{ ...styles.editRecommendationInput, height: 100 }}
            multiline={true}
            placeholder="Recommendation Content"
            placeholderTextColor="gray"
            value={this.state.content}
            onChangeText={(content) => this.setState({ content: content })}
          />
          {this.state.images.length === 0 ? null : (
            <View style={styles.newRecommendationImagesContainer}></View>
          )}
          {this.state.images.length >= 6 ? null : (
            <CustomButton
              btnStyle={styles.editRecommendationImageBtn}
              btnText="Choose Images"
            />
          )}
          <CustomButton
            btnStyle={styles.editRecommendationUpdateBtn}
            btnText="Update Recommendation"
            onPress={this.onUpdateRecommendationPressHandler}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  newRecommendationScrollView: {
    flex: 1,
    backgroundColor: colors.secondaryLight,
  },
  screen: {
    flex: 1,
    alignItems: "center",
  },
  editRecommendationInput: {
    marginTop: 30,
    width: 320,
    height: 38,
    fontSize: 16,
    borderBottomColor: colors.darkColor,
    borderBottomWidth: 1.2,
    fontFamily: "montserrat-regular",
    color: colors.darkColor,
  },
  newRecommendationImagesContainer: {
    marginTop: 30,
    width: 320,
  },
  editRecommendationImageBtn: {
    marginTop: 30,
    width: 320,
    backgroundColor: colors.darkColor,
  },
  editRecommendationUpdateBtn: {
    marginTop: 20,
    width: 320,
    backgroundColor: colors.primaryColor,
  },
});

const mapStateToProps = (state) => {
  return {
    recommendations: state.recommendations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateRecommendation: (
      recommendationId,
      title,
      content,
      images,
      navigation,
      goBackFunc
    ) =>
      dispatch(
        updateRecommendation(
          recommendationId,
          title,
          content,
          images,
          navigation,
          goBackFunc
        )
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowserEditRecommendationScreen);

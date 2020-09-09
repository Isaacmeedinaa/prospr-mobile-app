import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { connect } from "react-redux";
import { createRecommendation } from "../../../store/actions/recommendations";

import CustomButton from "../../../components/UI/CustomButton";

import colors from "../../../constants/colors";

class BrowserNewRecommendationScreen extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      content: "",
      images: [],
    };
  }

  onPostRecommendationPressHandler = () => {
    this.props.createRecommendation(
      this.state.title,
      this.state.content,
      this.state.images,
      this.props.navigation
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
            style={styles.newRecommendationInput}
            placeholder="Recommendation Title"
            placeholderTextColor="gray"
            value={this.state.title}
            onChangeText={(title) => this.setState({ title: title })}
          />
          <TextInput
            style={{ ...styles.newRecommendationInput, height: 100 }}
            multiline={true}
            placeholder="Recommendation Content"
            placeholderTextColor="gray"
            value={this.state.content}
            onChangeText={(content) => this.setState({ content: content })}
          />
          {this.state.images.length === 0 ? null : (
            <View style={styles.newRecommendationImagesContainer}></View>
          )}
          <CustomButton
            btnStyle={styles.newRecommendationImageBtn}
            btnText="Choose Images"
          />
          <CustomButton
            btnStyle={styles.newRecommendationPostBtn}
            btnText="Post Recommendation"
            onPress={this.onPostRecommendationPressHandler}
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
  newRecommendationInput: {
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
  newRecommendationImageBtn: {
    marginTop: 30,
    width: 320,
    backgroundColor: colors.darkColor,
  },
  newRecommendationPostBtn: {
    marginTop: 20,
    width: 320,
    backgroundColor: colors.primaryColor,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    createRecommendation: (title, content, images, navigation) =>
      dispatch(createRecommendation(title, content, images, navigation)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(BrowserNewRecommendationScreen);

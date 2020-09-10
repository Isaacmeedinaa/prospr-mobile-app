import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Video } from "expo-av";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

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
      media: [],
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== "granted") {
      Alert.alert("Error", "Please enable camera roll permissions", [
        { text: "OK" },
      ]);
    }
  };

  pickMedia = async () => {
    if (this.state.media.length === 3) {
      Alert.alert("Error", "You can only choose 3 images/videos", [
        { text: "OK" },
      ]);
    } else {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          allowsMultipleSelection: true,
        });

        if (!result.cancelled) {
          const newMedinaObj = { type: result.type, uri: result.uri };
          this.setState({
            ...this.state,
            media: [...this.state.media, newMedinaObj],
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  onDeleteMediaPressHandler = (type, index) => {
    Alert.alert(
      `Delete this ${type}?`,
      `Are you sure you want to delete this ${type}?`,
      [
        { text: "No" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            this.state.media.splice(index, 1);
            this.setState({
              media: this.state.media,
            });
          },
        },
      ]
    );
  };

  onPostRecommendationPressHandler = () => {
    this.props.createRecommendation(
      this.state.title,
      this.state.content,
      this.state.media,
      this.props.navigation
    );
  };

  render() {
    // console.log(this.state.media);
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
          {this.state.media.length === 0 ? null : (
            <View style={styles.newRecommendationMediaContainer}>
              {this.state.media.map((media, index) =>
                media.type === "image" ? (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() =>
                      this.onDeleteMediaPressHandler(media.type, index)
                    }
                  >
                    <Image
                      key={index}
                      source={{ uri: media.uri }}
                      style={styles.image}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() =>
                      this.onDeleteMediaPressHandler(media.type, index)
                    }
                  >
                    <Video
                      key={index}
                      style={styles.video}
                      source={{ uri: media.uri }}
                      rate={1.0}
                      volume={1.0}
                      isMuted
                      resizeMode="cover"
                      shouldPlay
                      isLooping
                    />
                  </TouchableOpacity>
                )
              )}
            </View>
          )}
          <CustomButton
            btnStyle={styles.newRecommendationImageBtn}
            btnText="Choose Images or Videos"
            onPress={this.pickMedia}
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
  newRecommendationMediaContainer: {
    marginTop: 30,
    width: 320,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: colors.primaryColor,
  },
  video: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: colors.primaryColor,
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

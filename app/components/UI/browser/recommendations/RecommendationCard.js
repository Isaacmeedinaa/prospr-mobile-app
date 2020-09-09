import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";

import { connect } from "react-redux";
import { deleteRecommendation } from "../../../../store/actions/recommendations";

import { Ionicons } from "@expo/vector-icons";

import colors from "../../../../constants/colors";

class RecommendationCard extends Component {
  constructor() {
    super();

    this.state = {
      isLiked: false,
    };
  }

  renderRecommendationImages = () => {
    const recommendationImages = this.props.recommendationData.item
      .recommendation_images;
    return recommendationImages.map((recommendationImage) => (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.recommendationImageButton}
        key={recommendationImage.id}
      >
        <Image
          style={styles.recommendationImage}
          source={{ uri: recommendationImage.img_url }}
        />
      </TouchableOpacity>
    ));
  };

  likeRecommendationOnPress = () => {
    this.setState((prevState) => {
      return {
        isLiked: !prevState.isLiked,
      };
    });
  };

  commentRecommendationOnPress = () => {};

  onRecommendationLongPressHandler = () => {
    Alert.alert("Report", "Would you like to report this recommendation?", [
      {
        text: "Report",
        style: "destructive",
        onPress: () => {
          console.log("reported!");
        },
      },
      { text: "Cancel", style: "default" },
    ]);
  };

  onRecommendationCardPressHandler = () => {
    this.props.navigation.push("BrowserShowRecommendation", {
      recommendation: this.props.recommendationData.item,
    });
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onLongPress={this.onRecommendationLongPressHandler}
        onPress={this.onRecommendationCardPressHandler}
        style={{ marginTop: 25 }}
      >
        <View style={styles.recommendationCardContainer}>
          <View style={styles.browserInfoContainer}>
            <Image
              style={styles.browserPfp}
              source={{
                uri: this.props.recommendationData.item.browser.profile_img_url,
              }}
            />
            <View style={styles.browserInfoTextContainer}>
              <Text style={styles.browserName} numberOfLines={1}>
                {this.props.recommendationData.item.browser.first_name}{" "}
                {this.props.recommendationData.item.browser.last_name}
              </Text>
              <Text style={styles.browserLocation} numberOfLines={1}>
                {this.props.recommendationData.item.browser.city}{" "}
                {this.props.recommendationData.item.browser.state},{" "}
                {this.props.recommendationData.item.browser.country}
              </Text>
            </View>
          </View>
          <View style={styles.recommendationInfoContainer}>
            <Text style={styles.recommendationTitle}>
              {this.props.recommendationData.item.title}
            </Text>
            <Text style={styles.recommendationContent}>
              {this.props.recommendationData.item.content}
            </Text>
            {this.props.recommendationData.item.recommendation_images === 0
              ? null
              : this.renderRecommendationImages()}
          </View>
          <View style={styles.recommendationCardIconsContainer}>
            <TouchableOpacity
              style={styles.likeBtn}
              activeOpacity={0.7}
              onPress={this.likeRecommendationOnPress}
            >
              <Ionicons
                name="ios-heart"
                size={20}
                color={
                  this.state.isLiked
                    ? colors.primaryColor
                    : colors.iconFillColor
                }
              />
              <Text style={styles.likeCount}>
                {this.props.recommendationData.item.recommendation_likes.length}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.commentBtn}
              activeOpacity={0.7}
              onPress={this.commentRecommendationOnPress}
            >
              <Ionicons
                name="ios-chatboxes"
                size={22}
                color={colors.iconFillColor}
              />
              <Text style={styles.likeCount}>
                {
                  this.props.recommendationData.item.recommendation_comments
                    .length
                }
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.postedOn}>
            {this.props.recommendationData.item.posted_on}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  recommendationCardContainer: {
    width: 340,
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "#fff",
    shadowColor: colors.darkColor,
    shadowOpacity: 0.15,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 15,
    borderRadius: 5,
    elevation: 5,
  },
  browserInfoContainer: {
    width: "100%",
    flexDirection: "row",
  },
  browserPfp: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  browserInfoTextContainer: {
    flexShrink: 1,
    height: 60,
    justifyContent: "center",
  },
  browserName: {
    marginStart: 20,
    fontSize: 16,
    fontFamily: "montserrat-semi-bold",
  },
  browserLocation: {
    marginTop: 6,
    marginStart: 20,
    fontSize: 15,
    fontFamily: "montserrat-regular",
  },
  recommendationInfoContainer: {
    flexShrink: 1,
    width: "100%",
    marginTop: 20,
  },
  recommendationTitle: {
    fontSize: 17,
    fontFamily: "montserrat-semi-bold",
  },
  recommendationContent: {
    marginTop: 10,
    fontSize: 15,
    fontFamily: "montserrat-regular",
  },
  recommendationImageButton: {
    width: "100%",
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  recommendationImage: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  recommendationCardIconsContainer: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
  },
  likeBtn: {
    flexDirection: "row",
    alignSelf: "center",
  },
  likeCount: {
    position: "relative",
    top: 0.5,
    fontFamily: "montserrat-regular",
    fontSize: 16,
    marginStart: 7,
  },
  commentBtn: {
    marginStart: 20,
    flexDirection: "row",
    alignSelf: "center",
    alignSelf: "center",
  },
  commentCount: {
    position: "relative",
    top: 0.5,
    fontFamily: "montserrat-regular",
    fontSize: 16,
    marginStart: 7,
  },
  postedOn: {
    marginTop: 20,
    fontFamily: "montserrat-regular",
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRecommendation: (recommendationId, navigation) =>
      dispatch(deleteRecommendation(recommendationId, navigation)),
  };
};

export default connect(null, mapDispatchToProps)(RecommendationCard);

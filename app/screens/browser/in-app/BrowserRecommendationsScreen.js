import React, { Component, Fragment } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { connect } from "react-redux";
import {
  fetchAllRecommendations,
  refreshAllRecommendations,
  fetchInitialRecommendations,
  refreshInitialRecommendations,
  fetchNextRecommendations,
} from "../../../store/actions/recommendations";

import RecommendationCard from "../../../components/UI/browser/recommendations/RecommendationCard";

import colors from "../../../constants/colors";

class BrowserRecommendationsScreen extends Component {
  constructor(props) {
    super();

    this.state = {
      page: 1,
      refreshing: false,
    };
  }

  componentDidMount() {
    // this.props.fetchInitialRecommendations();
    this.props.fetchAllRecommendations();
  }
  handleRefresh = () => {
    // this.setState({ refershing: true }, () =>
    //   this.props.refreshInitialRecommendations()
    // );
    // this.setState({ page: 1, refreshing: false });
    this.setState({ refreshing: true }, () =>
      this.props.refreshAllRecommendations()
    );
    this.setState({ refreshing: false });
  };

  loadMoreRecommendations = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => this.props.fetchNextRecommendations(this.state.page)
    );
  };

  resetPageCount = () => {
    this.setState({
      page: 1,
    });
  };

  render() {
    if (this.props.loader) {
      return (
        <View style={styles.activityIndicatorScreen}>
          <ActivityIndicator size="large" color={colors.primaryColor} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.flatList}
          data={this.props.recommendations}
          renderItem={(item) => (
            <RecommendationCard
              key={item.id}
              id={item.id}
              recommendationData={item}
              navigation={this.props.navigation}
              videoIsPlaying={this.state.videoIsPlaying}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              onRefresh={() => this.handleRefresh()}
              refreshing={this.props.recommendationsAreRefreshing}
            />
          }
          // onEndReachedThreshold={0}
          // onEndReached={this.loadMoreRecommendations}
          extraData={this.props.recommendations}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicatorScreen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: colors.secondaryLight,
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.secondaryLight,
  },
  flatList: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    loader: state.loader,
    recommendationsAreLoading:
      state.recommendationsLoader.recommendationsAreLoading,
    recommendationsAreRefreshing:
      state.recommendationsLoader.recommendationsAreRefreshing,
    recommendations: state.recommendations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllRecommendations: () => dispatch(fetchAllRecommendations()),
    refreshAllRecommendations: () => dispatch(refreshAllRecommendations()),
    fetchInitialRecommendations: () => dispatch(fetchInitialRecommendations()),
    refreshInitialRecommendations: () =>
      dispatch(refreshInitialRecommendations()),
    fetchNextRecommendations: (pageNumber) =>
      dispatch(fetchNextRecommendations(pageNumber)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowserRecommendationsScreen);

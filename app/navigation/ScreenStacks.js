import React from "react";
import { Button } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

// welcome screen
import WelcomeScreen from "../screens/WelcomeScreen";

// auth screens
import BrowserLoginScreen from "../screens/browser/auth/BrowserLoginScreen";
import BrowserRegisterScreen from "../screens/browser/auth/BrowserRegisterScreen";
import ProLoginScreen from "../screens/pro/auth/ProLoginScreen";
import ProRegisterScreen from "../screens/pro/auth/ProRegisterScreen";

// browser screens
import BrowserProfileScreen from "../screens/browser/in-app/BrowserProfileScreen";
import BrowserSettingsScreen from "../screens/browser/in-app/BrowserSettingsScreen";
import BrowserNewRecommendationScreen from "../screens/browser/in-app/BrowserNewRecommendationScreen";
import BrowserEditRecommendationScreen from "../screens/browser/in-app/BrowserEditRecommendationScreen";
import BrowserShowRecommendationScreen from "../screens/browser/in-app/BrowserShowRecommendationScreen";
import BrowserRecommendationsScreen from "../screens/browser/in-app/BrowserRecommendationsScreen";
import BrowserServicesScreen from "../screens/browser/in-app/BrowserServicesScreen";
import BrowserHomeScreen from "../screens/browser/in-app/BrowserHomeScreen";

// Header Buttons
import HeaderRightComponent from "../components/UI/browser/recommendations/HeaderRightComponent";
import HeaderBackLeftComponent from "../components/UI/browser/recommendations/HeaderBackLeftComponent";

// pro screens
import ProProfileScreen from "../screens/pro/in-app/ProProfileScreen";
import ProSettingsScreen from "../screens/pro/in-app/ProSettingsScreen";
import ProNewProspScreen from "../screens/pro/in-app/ProNewProspScreen";
import ProEditProspScreen from "../screens/pro/in-app/ProEditProspScreen";
import ProShowProspScreen from "../screens/pro/in-app/ProShowProspScreen";
import colors from "../constants/colors";

const AuthStack = createStackNavigator();

const authStackScreenOptions = {
  headerShown: false,
};

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={authStackScreenOptions}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="BrowserLogin" component={BrowserLoginScreen} />
      <AuthStack.Screen
        name="BrowserRegister"
        component={BrowserRegisterScreen}
      />
      <AuthStack.Screen name="ProLogin" component={ProLoginScreen} />
      <AuthStack.Screen name="ProRegister" component={ProRegisterScreen} />
    </AuthStack.Navigator>
  );
};

const BrowserRecommendationsStack = createStackNavigator();

const browserStackScreenOptions = {
  headerTitleStyle: {
    color: colors.darkColor,
    fontFamily: "montserrat-bold",
  },
  headerStyle: {
    backgroundColor: colors.secondaryLight,
    shadowColor: "transparent",
  },
  headerTintColor: colors.primaryColor,
};

const BrowserRecommendationsScreens = (props) => {
  return (
    <BrowserRecommendationsStack.Navigator
      initialRouteName="BrowserRecommendations"
      screenOptions={browserStackScreenOptions}
    >
      <BrowserRecommendationsStack.Screen
        name="BrowserRecommendations"
        component={BrowserRecommendationsScreen}
        options={{
          title: "RECOMMENDATIONS",
          headerTitleAlign: "left",
          headerRight: () => (
            <HeaderRightComponent
              navigation={props.navigation}
              name="ios-create"
            />
          ),
        }}
      />
      <BrowserRecommendationsStack.Screen
        name="BrowserNewRecommendation"
        component={BrowserNewRecommendationScreen}
        options={{
          gestureEnabled: false,
          title: "NEW RECOMMENDATION",
          headerLeft: () => (
            <HeaderBackLeftComponent navigation={props.navigation} />
          ),
        }}
      />
      <BrowserRecommendationsStack.Screen
        name="BrowserEditRecommendation"
        component={BrowserEditRecommendationScreen}
        options={{
          title: "EDIT RECOMMENDATION",
          headerBackTitleVisible: false,
        }}
      />
      <BrowserRecommendationsStack.Screen
        name="BrowserShowRecommendation"
        component={BrowserShowRecommendationScreen}
        options={{ title: "RECOMMENDATION", headerBackTitleVisible: false }}
      />
    </BrowserRecommendationsStack.Navigator>
  );
};

const BrowserTabs = createBottomTabNavigator();

const browserTabBarOptions = {
  style: {
    backgroundColor: "#ffffff",
    elevation: 5,
    borderTopWidth: 0,
    shadowColor: colors.darkColor,
    shadowOpacity: 0.2,
    shadowOffset: { height: 8, width: 0 },
  },
  activeTintColor: colors.primaryColor,
  inactiveTintColor: "gray",
  showLabel: false,
};

export const BrowserTabsNavigator = () => {
  return (
    <BrowserTabs.Navigator
      tabBarOptions={browserTabBarOptions}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "BrowserHomeTab") {
            iconName = focused ? "ios-home" : "ios-home";
          } else if (route.name === "BrowserRecommendationsTab") {
            iconName = focused ? "ios-apps" : "ios-apps";
          } else if (route.name === "BrowserServicesTab") {
            iconName = focused ? "ios-list-box" : "ios-list-box";
          } else if (route.name === "BrowserProfileTab") {
            iconName = focused ? "ios-person" : "ios-person";
          }
          return <Ionicons name={iconName} size={28} color={color} />;
        },
      })}
    >
      <BrowserTabs.Screen name="BrowserHomeTab" component={BrowserHomeScreen} />
      <BrowserTabs.Screen
        name="BrowserRecommendationsTab"
        component={BrowserRecommendationsScreens}
      />
      <BrowserTabs.Screen
        name="BrowserServicesTab"
        component={BrowserServicesScreen}
      />
      <BrowserTabs.Screen
        name="BrowserProfileTab"
        component={BrowserProfileScreen}
      />
    </BrowserTabs.Navigator>
  );
};

const ProTabs = createBottomTabNavigator();

const ProTabsNavigator = () => {
  return (
    <ProTabs.Navigator>
      <ProTabs.Screen name="ProProfileTab" component={ProProfileScreen} />
      <ProTabs.Screen name="ProSettingsTab" component={ProSettingsScreen} />
    </ProTabs.Navigator>
  );
};

const ProStack = createStackNavigator();

export const ProStackNavigator = () => {
  return (
    <ProStack.Navigator initialRouteName="ProTabs">
      <ProStack.Screen name="ProTabs" component={ProTabsNavigator} />
      <ProStack.Screen name="ProNewProsp" component={ProNewProspScreen} />
      <ProStack.Screen name="ProEditProsp" component={ProEditProspScreen} />
      <ProStack.Screen name="ProShowProsp" component={ProShowProspScreen} />
    </ProStack.Navigator>
  );
};

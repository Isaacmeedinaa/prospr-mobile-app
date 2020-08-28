import React from "react";
import {} from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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

// pro screens
import ProProfileScreen from "../screens/pro/in-app/ProProfileScreen";
import ProSettingsScreen from "../screens/pro/in-app/ProSettingsScreen";
import ProNewProspScreen from "../screens/pro/in-app/ProNewProspScreen";
import ProEditProspScreen from "../screens/pro/in-app/ProEditProspScreen";
import ProShowProspScreen from "../screens/pro/in-app/ProShowProspScreen";

const AuthStack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Welcome"
      screenOptions={screenOptions}
    >
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

const BrowserTabs = createBottomTabNavigator();

const BrowserTabsNavigator = () => {
  return (
    <BrowserTabs.Navigator>
      <BrowserTabs.Screen
        name="BrowserProfileTab"
        component={BrowserProfileScreen}
      />
      <BrowserTabs.Screen
        name="BrowserSettingsTab"
        component={BrowserSettingsScreen}
      />
    </BrowserTabs.Navigator>
  );
};

const BrowserStack = createStackNavigator();

export const BrowserStackNavigator = () => {
  return (
    <BrowserStack.Navigator initialRouteName="BrowserTabs">
      <BrowserStack.Screen
        name="BrowserTabs"
        component={BrowserTabsNavigator}
      />
      <BrowserStack.Screen
        name="BrowserNewRecommendation"
        component={BrowserNewRecommendationScreen}
      />
      <BrowserStack.Screen
        name="BrowserEditRecommendation"
        component={BrowserEditRecommendationScreen}
      />
      <BrowserStack.Screen
        name="BrowserShowRecommendation"
        component={BrowserShowRecommendationScreen}
      />
    </BrowserStack.Navigator>
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
    <ProStack.Navigator initialRouteName="BrowserTabs">
      <ProStack.Screen name="ProTabs" component={ProTabsNavigator} />
      <ProStack.Screen name="ProNewProsp" component={ProNewProspScreen} />
      <ProStack.Screen name="ProEditProsp" component={ProEditProspScreen} />
      <ProStack.Screen name="ProShowProsp" component={ProShowProspScreen} />
    </ProStack.Navigator>
  );
};

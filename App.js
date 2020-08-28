import React from "react";
import {} from "react-native";
import { Provider } from "react-redux";
import store from "./app/store/store";

import AppNavigator from "./app/navigation/AppNavigator";

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;

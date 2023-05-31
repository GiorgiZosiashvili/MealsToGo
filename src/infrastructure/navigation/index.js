import React, { useContext } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import AppNavigator from "./app.navigator";
import { NavigationContainer } from "@react-navigation/native";

import AccountNavigator from "./account.navigator";
const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;

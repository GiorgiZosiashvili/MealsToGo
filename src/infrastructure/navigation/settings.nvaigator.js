import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import SettingsScreen from "../../features/settings/screens/settings.screen";
import FavoritesScreen from "../../features/settings/screens/favorites.screen";
import CameraScreen from "../../features/settings/screens/camera.screen";
export const SettingsNavigator = ({ route, navigation }) => {
  const SettingsStack = createStackNavigator();
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <SettingsStack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
      />
      <SettingsStack.Screen name="CameraScreen" component={CameraScreen} />
    </SettingsStack.Navigator>
  );
};

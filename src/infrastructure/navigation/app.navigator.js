import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RestaurantsNavigator from "./restaurants.navigator";
import { Ionicons } from "@expo/vector-icons";
import MapScreen from "../../features/map/screens/map.screen";
import { FavoritesContextProvider } from "../../services/favorites/favorites.context";
import { RestaurantContextProvider } from "../../services/restaurants/restaurants.context";
import { LocationContextProvider } from "../../services/location/location.context";

import { SettingsNavigator } from "./settings.nvaigator";
const AppNavigator = () => {
  const Tab = createBottomTabNavigator();

  const TAB_ICON = {
    Restaurants: "md-restaurant",
    Map: "md-map",
    Settings: "md-settings",
  };

  const tabBarIcon = () => {
    return <Ionicons name={iconName} size={size} color={color} />;
  };
  const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];
    return {
      tabBarIcon: ({ size, color }) => (
        <Ionicons name={iconName} size={size} color={color} />
      ),
    };
  };

  return (
    <FavoritesContextProvider>
      <LocationContextProvider>
        <RestaurantContextProvider>
          <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen
              name="Restaurants"
              component={RestaurantsNavigator}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Map"
              component={MapScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsNavigator}
              options={{ headerShown: false }}
            />
          </Tab.Navigator>
        </RestaurantContextProvider>
      </LocationContextProvider>
    </FavoritesContextProvider>
  );
};

export default AppNavigator;

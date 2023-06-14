import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import RestaurantsNavigator from "./restaurants.navigator";
import MapScreen from "../../features/map/screens/map.screen";
import { FavoritesContextProvider } from "../../services/favorites/favorites.context";
import { RestaurantContextProvider } from "../../services/restaurants/restaurants.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { SettingsNavigator } from "./settings.navigator";
import { DarkModeContext } from "../../services/darkTheme/theme.context";
import CheckoutScreen from "../../features/checkout/screens/checkoutScreen";
import { CartContextProvider } from "../../services/cart/cart.context";
const AppNavigator = () => {
  const { darkTheme } = useContext(DarkModeContext);
  const Tab = createBottomTabNavigator();

  const TAB_ICON = {
    Restaurants: "md-restaurant",
    Map: "md-map",
    Settings: "md-settings",
    Checkout: "md-cart",
  };

  const tabBarIcon = ({ size, color, route }) => {
    const iconName = TAB_ICON[route.name];
    return <Ionicons name={iconName} size={size} color={color} />;
  };

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ size, focused }) =>
      tabBarIcon({ size, color: focused ? "#696AC3" : "gray", route }), // Change the active and inactive icon colors here
    tabBarStyle: { backgroundColor: darkTheme === "dark" ? "#111" : "#fff" },
    activeTintColor: "red", // Change the active color of the tab screen name here
    inactiveTintColor: "gray",
    labelStyle: { fontSize: 12, fontWeight: "bold" },
  });

  return (
    <CartContextProvider>
      <FavoritesContextProvider>
        <LocationContextProvider>
          <RestaurantContextProvider>
            <Tab.Navigator screenOptions={screenOptions}>
              <Tab.Screen
                name="Restaurants"
                component={RestaurantsNavigator}
                options={{
                  headerShown: false,
                  tabBarActiveTintColor: "#696AC3",
                }}
              />
              <Tab.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={{
                  headerShown: false,
                  tabBarActiveTintColor: "#696AC3",
                }}
              />
              <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                  headerShown: false,
                  tabBarActiveTintColor: "#696AC3",
                }}
              />
              <Tab.Screen
                name="Settings"
                component={SettingsNavigator}
                options={{
                  headerShown: false,
                  tabBarActiveTintColor: "#696AC3",
                }}
              />
            </Tab.Navigator>
          </RestaurantContextProvider>
        </LocationContextProvider>
      </FavoritesContextProvider>
    </CartContextProvider>
  );
};

export default AppNavigator;

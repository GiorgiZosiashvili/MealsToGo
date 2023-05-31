import React from "react";
import RestaurantsScreen from "../../features/restaurants/screens/restaurants.screen";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import RestaurantsDetailsScreen from "../../features/restaurants/screens/restaurants.details.screen";

const RestaurantsStack = createStackNavigator();
const RestaurantsNavigator = () => {
  return (
    <RestaurantsStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <RestaurantsStack.Screen
        name="Restaurant"
        component={RestaurantsScreen}
      />
      <RestaurantsStack.Screen
        name="RestaurantDetail"
        component={RestaurantsDetailsScreen}
      />
    </RestaurantsStack.Navigator>
  );
};
export default RestaurantsNavigator;

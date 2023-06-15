import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CheckoutScreen from "../../features/checkout/screens/checkoutScreen";
import SuccessScreen from "../../features/checkout/screens/successScreen";

const CheckOutNavigator = () => {
  const CheckoutStack = createStackNavigator();

  return (
    <CheckoutStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CheckoutStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <CheckoutStack.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{ gestureEnabled: false }}
      />
    </CheckoutStack.Navigator>
  );
};

export default CheckOutNavigator;

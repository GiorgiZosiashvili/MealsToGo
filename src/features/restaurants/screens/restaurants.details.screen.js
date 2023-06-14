import React, { useContext, useState } from "react";
import RestaurantInfoCard from "../components/restaurant.info-card";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import styled from "styled-components/native";
import { Button, List } from "react-native-paper";
import { DarkModeContext } from "../../../services/darkTheme/theme.context";
import { colors } from "../../../infrastructure/theme/colors";
import CartContext from "../../../services/cart/cart.context";
const RestaurantsDetailsScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);
  const { darkTheme } = useContext(DarkModeContext);
  const { addToCart } = useContext(CartContext);
  return (
    <Container darkTheme={darkTheme}>
      <ExpoStatusBar style={darkTheme === "dark" ? "dark" : "light"} />
      <RestaurantInfoCard
        isHome={false}
        restaurant={restaurant}
        navigation={navigation}
      />
      <ListAccordion
        darkTheme={darkTheme}
        title="Breakfast"
        left={(props) => <List.Icon {...props} icon="bread-slice" />}
        expanded={breakfastExpanded}
        onPress={() => setBreakfastExpanded(!breakfastExpanded)}
      >
        <ListItem darkTheme={darkTheme} title="Eggs Benedict" />
        <ListItem darkTheme={darkTheme} title="Classic Breakfast" />
      </ListAccordion>

      <ListAccordion
        darkTheme={darkTheme}
        title="Lunch"
        color="red"
        left={(props) => <List.Icon {...props} icon="hamburger" />}
        expanded={lunchExpanded}
        onPress={() => setLunchExpanded(!lunchExpanded)}
      >
        <ListItem darkTheme={darkTheme} title="Burger w/ Fries" />
        <ListItem darkTheme={darkTheme} title="Steak Sandwich" />
        <ListItem darkTheme={darkTheme} title="Mushroom Soup" />
      </ListAccordion>

      <ListAccordion
        darkTheme={darkTheme}
        title="Dinner"
        left={(props) => <List.Icon {...props} icon="food-variant" />}
        expanded={dinnerExpanded}
        onPress={() => setDinnerExpanded(!dinnerExpanded)}
      >
        <ListItem darkTheme={darkTheme} title="Spaghetti Bolognese" />
        <ListItem
          darkTheme={darkTheme}
          title="Veal Cutlet with Chicken Mushroom Rotini"
        />
        <ListItem darkTheme={darkTheme} title="Steak Frites" />
      </ListAccordion>

      <ListAccordion
        darkTheme={darkTheme}
        title="Drinks"
        left={(props) => <List.Icon {...props} icon="cup" />}
        expanded={drinksExpanded}
        onPress={() => setDrinksExpanded(!drinksExpanded)}
      >
        <ListItem darkTheme={darkTheme} title="Coffee" />
        <ListItem darkTheme={darkTheme} title="Tea" />
        <ListItem darkTheme={darkTheme} title="Modelo" />
        <ListItem darkTheme={darkTheme} title="Coke" />
        <ListItem darkTheme={darkTheme} title="Fanta" />
      </ListAccordion>
      <OrderButton
        icon="cash"
        mode="contained"
        onPress={() => {
          addToCart({ item: "spacial", price: 1299 }, restaurant);
          navigation.navigate("Checkout");
        }}
      >
        Order special only for 12.99$
      </OrderButton>
    </Container>
  );
};

export default RestaurantsDetailsScreen;

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) =>
    props.darkTheme === "dark" ? colors.bg.black : colors.bg.primary};
`;
const ListAccordion = styled(List.Accordion).attrs(({ darkTheme }) => ({
  titleStyle: {
    color: darkTheme !== "dark" ? colors.bg.black : colors.bg.primary,
  },
}))`
  background-color: ${(props) =>
    props.darkTheme === "dark" ? colors.bg.black : colors.bg.primary};
`;
const ListItem = styled(List.Item).attrs(({ darkTheme }) => {
  console.log(darkTheme);
  return {
    titleStyle: {
      color: darkTheme !== "dark" ? colors.bg.black : colors.bg.primary,
    },
  };
})``;
const OrderButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  align-self: center;
  width: 80%;
  margin-top: 130px;
`;

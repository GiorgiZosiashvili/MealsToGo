import React, { useContext, useState } from "react";
import RestaurantInfoCard from "../components/restaurant.info-card";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import styled from "styled-components/native";
import { List } from "react-native-paper";
import { DarkModeContext } from "../../../services/darkTheme/theme.context";
import { colors } from "../../../infrastructure/theme/colors";

const RestaurantsDetailsScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);
  const { darkTheme } = useContext(DarkModeContext);

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
        <ListItem title="Eggs Benedict" />
        <ListItem title="Classic Breakfast" />
      </ListAccordion>

      <ListAccordion
        darkTheme={darkTheme}
        title="Lunch"
        color="red"
        left={(props) => <List.Icon {...props} icon="hamburger" />}
        expanded={lunchExpanded}
        onPress={() => setLunchExpanded(!lunchExpanded)}
      >
        <ListItem title="Burger w/ Fries" />
        <ListItem title="Steak Sandwich" />
        <ListItem title="Mushroom Soup" />
      </ListAccordion>

      <ListAccordion
        darkTheme={darkTheme}
        title="Dinner"
        left={(props) => <List.Icon {...props} icon="food-variant" />}
        expanded={dinnerExpanded}
        onPress={() => setDinnerExpanded(!dinnerExpanded)}
      >
        <ListItem title="Spaghetti Bolognese" />
        <ListItem title="Veal Cutlet with Chicken Mushroom Rotini" />
        <ListItem title="Steak Frites" />
      </ListAccordion>

      <ListAccordion
        darkTheme={darkTheme}
        title="Drinks"
        left={(props) => <List.Icon {...props} icon="cup" />}
        expanded={drinksExpanded}
        onPress={() => setDrinksExpanded(!drinksExpanded)}
      >
        <ListItem title="Coffee" />
        <ListItem title="Tea" />
        <ListItem title="Modelo" />
        <ListItem title="Coke" />
        <ListItem title="Fanta" />
      </ListAccordion>
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
const ListItem = styled(List.Item).attrs(({ darkTheme }) => ({
  titleStyle: {
    color: darkTheme === "dark" ? colors.bg.black : colors.bg.primary,
  },
}))``;

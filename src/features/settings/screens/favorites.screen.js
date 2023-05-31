import { View, Text, FlatList, Alert } from "react-native";
import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import RestaurantInfoCard from "../../restaurants/components/restaurant.info-card";

const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useContext(FavoritesContext);
  if (favorites.length !== 0) {
    return (
      <SafeArea>
        <Container>
          <FavoritesList
            data={favorites}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => {
              return (
                <RestaurantInfoCard
                  isHome={false}
                  navigation={navigation}
                  restaurant={item}
                />
              );
            }}
          />
        </Container>
      </SafeArea>
    );
  } else {
    Alert.alert(
      "You don't have any favorite restaurant",
      "",
      [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  }
};
const Container = styled.View`
  flex: 1;
`;
const FavoritesList = styled(FlatList)``;
export default FavoritesScreen;

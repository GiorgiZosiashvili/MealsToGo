import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import CompactRestaurantInfo from "../../features/map/components/map.callout";
import Navigation from "../../infrastructure/navigation";
import { Text } from "../typography";
const FavoriteView = ({ favorites, navigation }) => {
  if (favorites.length === 0) {
    return null;
  } else {
    return (
      <Container>
        <Text variant="body">Favorites</Text>
        <FavoritesScrollView horizontal showsHorizontalScrollIndicator={false}>
          {favorites.map((restaurant) => {
            const key = restaurant.name;
            return (
              <FavoriteRestaurantsContainer
                onPress={() => {
                  navigation.navigate("RestaurantDetail", { restaurant });
                }}
                contentContainerStyle={{ paddingLeft: 100 }}
                key={key}
              >
                <CompactRestaurantInfo restaurant={restaurant} />
              </FavoriteRestaurantsContainer>
            );
          })}
        </FavoritesScrollView>
      </Container>
    );
  }
};
const Container = styled.View`
  width: 100%;
  height: 150px;
  margin: ${(props) => props.theme.space[2]};
`;
const FavoritesScrollView = styled(ScrollView).attrs({
  contentContainerStyle: {
    paddingRight: 15,
  },
})``;

const FavoriteRestaurantsContainer = styled.TouchableOpacity``;
export default FavoriteView;

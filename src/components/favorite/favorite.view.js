import React, { useContext } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import CompactRestaurantInfo from "../../features/map/components/map.callout";
import { Text } from "../typography";
import { DarkModeContext } from "../../services/darkTheme/theme.context";
const FavoriteView = ({ favorites, navigation }) => {
  const { darkTheme } = useContext(DarkModeContext);

  if (favorites.length === 0) {
    return null;
  } else {
    return (
      <Container>
        <Text
          style={{ color: darkTheme === "dark" ? "#fff" : "#111" }}
          variant="body"
        >
          Favorites
        </Text>
        <FavoritesScrollView horizontal showsHorizontalScrollIndicator={false}>
          {favorites.map((restaurant, i) => {
            const key = restaurant.name;
            return (
              <FavoriteRestaurantsContainer
                onPress={() => {
                  navigation.navigate("RestaurantDetail", { restaurant });
                }}
                contentContainerStyle={{ paddingLeft: 100 }}
                key={`${key + i}`}
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

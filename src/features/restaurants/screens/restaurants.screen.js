import React, { useContext, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import RestaurantInfoCard from "../components/restaurant.info-card";
import styled from "styled-components/native";
import { Alert, FlatList } from "react-native";
import Search from "../components/restaurant.search";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantContext } from "../../../services/restaurants/restaurants.context";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import FavoriteView from "../../../components/favorite/favorite.view";
import FadeInView from "../../../components/animations/fade.animation";

const RestaurantsScreen = ({ navigation }) => {
  const { restaurants, isLoading, error } = useContext(RestaurantContext);
  const { favorites } = useContext(FavoritesContext);
  const [showFavorite, setShowFavorite] = useState(false);

  return (
    <>
      {isLoading && (
        <LoadingContainer>
          <Loading size={70} color="red" animating={true} />
        </LoadingContainer>
      )}
      <SafeArea style={{ backgroundColor: "#fff" }}>
        <Container>
          <Search
            favorites={favorites}
            showFavorite={showFavorite}
            onToggle={() => {
              Object.keys(favorites).length !== 0
                ? setShowFavorite(!showFavorite)
                : Alert.alert("You don't have any favorite restaurant yet");
            }}
          />
          {showFavorite && (
            <FavoriteView navigation={navigation} favorites={favorites} />
          )}
          <RestaurantList
            data={restaurants}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => {
              return (
                <FadeInView>
                  <RestaurantInfoCard
                    isHome
                    navigation={navigation}
                    restaurant={item}
                  />
                </FadeInView>
              );
            }}
          />
        </Container>
      </SafeArea>
    </>
  );
};
//Styles
const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
const LoadingContainer = styled.View`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.05);
`;

const Loading = styled(ActivityIndicator)``;
const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    paddingBottom: 50,
  },
})``;

export default RestaurantsScreen;

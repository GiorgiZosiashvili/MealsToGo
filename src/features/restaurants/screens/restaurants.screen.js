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
import { LocationContext } from "../../../services/location/location.context";
import { colors } from "../../../infrastructure/theme/colors";
import { DarkModeContext } from "../../../services/darkTheme/theme.context";

const RestaurantsScreen = ({ navigation }) => {
  const { darkTheme } = useContext(DarkModeContext);
  const { restaurants, isLoading, error } = useContext(RestaurantContext);
  const { error: locationError } = useContext(LocationContext);
  const { favorites } = useContext(FavoritesContext);
  const [showFavorite, setShowFavorite] = useState(false);

  return (
    <>
      {isLoading && (
        <LoadingContainer>
          <Loading size={70} color="red" animating={true} />
        </LoadingContainer>
      )}
      <SafeArea
        style={{ backgroundColor: darkTheme === "dark" ? "#111" : "#fff" }}
      >
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
          {!!error || !!locationError ? (
            <Error>Something went wrong while retrieving the data</Error>
          ) : (
            <RestaurantList
              data={restaurants}
              keyExtractor={(item) => item.placeId}
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
          )}
        </Container>
      </SafeArea>
    </>
  );
};
//Styles
const Container = styled.View`
  flex: 1;
`;
const LoadingContainer = styled.View`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Loading = styled(ActivityIndicator)``;
const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    paddingBottom: 50,
  },
})``;
const Error = styled.Text`
  font-size: 16px;
  margin-left: 12px;
  color: ${colors.ui.error};
`;

export default RestaurantsScreen;

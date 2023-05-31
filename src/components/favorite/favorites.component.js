import React, { useContext, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";
import { FavoritesContext } from "../../services/favorites/favorites.context";
const Favorite = ({ restaurant }) => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);
  const [favorite, setFavorite] = useState(false);
  const isFavorite = favorites.find((r) => r?.placeId === restaurant?.placeId);

  return (
    <Heart
      onPress={() => {
        !isFavorite
          ? addToFavorites(restaurant)
          : removeFromFavorites(restaurant);
      }}
    >
      <AntDesign
        color={isFavorite ? "red" : "#fff"}
        size={24}
        name={isFavorite ? "heart" : "hearto"}
      />
    </Heart>
  );
};

export default Favorite;

const Heart = styled.TouchableOpacity`
  position: absolute;
  z-index: 100;
  top: 15px;
  right: 15px;
`;

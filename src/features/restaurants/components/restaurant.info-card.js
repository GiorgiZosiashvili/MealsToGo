import React from "react";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import open from "../../../../assets/open";
import { Text } from "../../../components/typography";
import {
  Container,
  RestaurantCard,
  ImageContainer,
  RestaurantImage,
  Info,
  IconsContainer,
  StarsContainer,
  View,
  Icon,
  Closed,
  TouchableOpacity,
  MainView,
} from "./restaurant.info-card.style";
import Favorite from "../../../components/favorite/favorites.component";

const RestaurantInfoCard = ({ restaurant = {}, isHome, navigation }) => {
  const CardContainer = isHome ? TouchableOpacity : MainView;
  const {
    name = "Some restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://images.squarespace-cdn.com/content/v1/5df3ef5985afb46db3ddbc34/1661203009507-L361TUCDU5MTV9RV2886/Mexican+Restaurnt+3.jpg?format=1500w",
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4.3,
    placeId,
  } = restaurant;
  const ratingArray = Array.from(new Array(Math.round(rating)));
  return (
    <Container>
      <Favorite restaurant={restaurant} />
      <CardContainer
        onPress={() => {
          navigation.navigate("RestaurantDetail", { restaurant });
        }}
      >
        <RestaurantCard mode="elevated" elevation={2}>
          {!isOpenNow && (
            <Closed>
              <Text variant="error">CLOSED TEMPORARILY</Text>
            </Closed>
          )}
          <ImageContainer>
            <RestaurantImage source={{ uri: `${photos[0]}` }} />
          </ImageContainer>
          <Info>
            <Text variant="label">{name}</Text>
            <IconsContainer>
              <StarsContainer>
                {ratingArray.map((item, i) => {
                  return (
                    <SvgXml
                      key={`star=${placeId}-${i}`}
                      xml={star}
                      width={20}
                      height={20}
                    />
                  );
                })}
              </StarsContainer>
              <View>
                {isOpenNow ? (
                  <SvgXml xml={open} width={20} height={20} />
                ) : null}
                <Icon source={{ uri: `${icon}` }} />
              </View>
            </IconsContainer>
            <Text variant="caption">{address}</Text>
          </Info>
        </RestaurantCard>
      </CardContainer>
    </Container>
  );
};
//Styles

export default RestaurantInfoCard;

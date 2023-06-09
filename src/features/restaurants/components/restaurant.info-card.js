import React, { useContext } from "react";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import open from "../../../../assets/open";
import { Text } from "../../../components/typography";
import styled from "styled-components/native";
import { Card } from "react-native-paper";
import Favorite from "../../../components/favorite/favorites.component";
import { DarkModeContext } from "../../../services/darkTheme/theme.context";

const RestaurantInfoCard = ({ restaurant = {}, isHome, navigation }) => {
  const CardContainer = isHome ? TouchableOpacity : MainView;
  const { darkTheme } = useContext(DarkModeContext);
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
        <RestaurantCard
          style={{
            backgroundColor: darkTheme === "dark" ? "#141414" : "#fff",
          }}
          mode="elevated"
          elevation={2}
        >
          {!isOpenNow && (
            <Closed>
              <Text variant="error">CLOSED TEMPORARILY</Text>
            </Closed>
          )}
          <ImageContainer>
            <RestaurantImage source={{ uri: `${photos[0]}` }} />
          </ImageContainer>
          <Info>
            <Text
              style={{ color: darkTheme !== "dark" ? "#111" : "#fff" }}
              variant="label"
            >
              {name}
            </Text>
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
            <Text
              style={{ color: darkTheme !== "dark" ? "#111" : "#fff" }}
              variant="caption"
            >
              {address}
            </Text>
          </Info>
        </RestaurantCard>
      </CardContainer>
    </Container>
  );
};
const Container = styled.View`
  padding: ${(props) => props.theme.space[2]};
  position: relative;
`;
const MainView = styled.View``;

const TouchableOpacity = styled.TouchableOpacity``;
const RestaurantCard = styled(Card)``;
const RestaurantImage = styled.Image`
  width: 100%;
  height: 150px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;
const ImageContainer = styled.View`
  overflow: hidden;
  width: 100%;
  height: 150px;
`;
const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
const StarsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const IconsContainer = styled.View`
  flex-direction: row;
  margin-vertical: ${(props) => props.theme.space[2]};
  justify-content: space-between;
`;
const Icon = styled.Image`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;
const View = styled.View`
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`;
const Closed = styled.View`
  position: absolute;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  z-index: 2;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export default RestaurantInfoCard;

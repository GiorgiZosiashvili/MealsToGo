import React, { useContext, useEffect, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import Search from "../components/search.map";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantContext } from "../../../services/restaurants/restaurants.context";
import CompactRestaurantInfo from "../components/map.callout";

const screenHeight = Dimensions.get("screen").height;
const windowWidth = Dimensions.get("window").width;
const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantContext);
  const [latDelta, setLatDelta] = useState(0);
  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    setLatDelta(northeastLat - southwestLat);
  }, [location]);

  return (
    <Container>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.04,
        }}
      >
        {restaurants.map((restaurant) => {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() => {
                  navigation.navigate("RestaurantDetail", { restaurant });
                }}
              >
                <CompactRestaurantInfo restaurant={restaurant} isMap />
              </Callout>
            </Marker>
          );
        })}
      </Map>
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const Map = styled(MapView)`
  height: ${screenHeight}px;
  width: ${windowWidth}px;
`;

export default MapScreen;

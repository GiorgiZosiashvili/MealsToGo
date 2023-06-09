import React, { useContext, useEffect, useState } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import Search from "../components/search.map";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantContext } from "../../../services/restaurants/restaurants.context";
import CompactRestaurantInfo from "../components/map.callout";
import { DarkModeContext } from "../../../services/darkTheme/theme.context";
import { darkMapStyle, lightMapStyle } from "../components/mapStyles";

const screenHeight = Dimensions.get("screen").height;
const windowWidth = Dimensions.get("window").width;
const RestaurantsMap = ({ navigation, location, darkTheme }) => {
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
        provider={PROVIDER_GOOGLE}
        darkTheme={darkTheme}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.01,
        }}
        customMapStyle={darkTheme === "dark" ? darkMapStyle : null}
      >
        {restaurants.map((restaurant, i) => {
          return (
            <MapMarker
              image={require("../../../../assets/marker.png")}
              key={restaurant.name + i}
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
            </MapMarker>
          );
        })}
      </Map>
    </Container>
  );
};

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { darkTheme } = useContext(DarkModeContext);

  if (!location) {
    return (
      <Map
        region={{
          latitude: 0,
          longitude: 0,
          longitudeDelta: 0.01,
        }}
      />
    );
  }
  return (
    <RestaurantsMap
      darkTheme={darkTheme}
      navigation={navigation}
      location={location}
    />
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Map = styled(MapView).attrs({})`
  height: ${screenHeight}px;
  width: ${windowWidth}px;
`;
const MapMarker = styled(Marker)`
  width: 20px;
  height: 20px;
`;
const CustomMapMarker = styled(Marker)`
  background-color: blue;
  with: 120px;
  height: 120px;
`;

export default MapScreen;

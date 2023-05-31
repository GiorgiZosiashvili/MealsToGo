import { View } from "react-native";
import React from "react";
import styled from "styled-components/native";

import WebView from "react-native-webview";
import { Platform } from "react-native";
const isAndroid = Platform.OS === "android";
const CompactRestaurantInfo = ({ restaurant, isMap }) => {
  const Image = isAndroid && isMap ? CompactWebView : CompactImage;
  return (
    <CompactRestaurantContainer>
      <Image source={{ uri: restaurant.photos[0] }} />
      <CompactTitle numberOfLines={1}>{restaurant.name}</CompactTitle>
    </CompactRestaurantContainer>
  );
};

export default CompactRestaurantInfo;
const CompactRestaurantContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const CompactTitle = styled.Text`
  width: 120px;
  text-align: center;
`;
const CompactImage = styled.Image`
  width: 120px;
  height: 100px;
  margin: 5px;
  border-radius: 10px;
`;
const CompactWebView = styled(WebView)`
  width: 120px;
  height: 100px;
  margin: 5px;
  border-radius: 10px;
`;

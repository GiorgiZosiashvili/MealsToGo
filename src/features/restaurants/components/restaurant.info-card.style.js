import styled from "styled-components/native";
import { Card } from "react-native-paper";

const Container = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: ${(props) => props.theme.space[2]};
  position: relative;
`;
const MainView = styled.View``;

const TouchableOpacity = styled.TouchableOpacity``;
const RestaurantCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
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

export {
  Container,
  RestaurantCard,
  RestaurantImage,
  ImageContainer,
  Info,
  StarsContainer,
  IconsContainer,
  Icon,
  View,
  Closed,
  TouchableOpacity,
  MainView,
};

import React from "react";
import styled from "styled-components/native";
const Background = () => {
  return <BackgroundImage resizeMode="cover" />;
};

const BackgroundImage = styled.ImageBackground.attrs({
  source: require("../../../../assets/home-bg.jpg"),
})`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.6;
  z-index: -1;
`;
export default Background;

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";
import Background from "../components/background";
import { Button } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import LottieView from "lottie-react-native";

const AccountScreen = ({ navigation }) => {
  return (
    <Container>
      <Background />
      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../../assets/watermelon.json")}
        />
      </AnimationWrapper>
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthButton
          icon="email"
          buttonColor={`${colors.brand.primary}`}
          mode="contained"
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          Login
        </AuthButton>
        <RegisterButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          Register
        </RegisterButton>
      </AccountContainer>
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const AccountContainer = styled.View`
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[5]};
`;
const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 40px;
`;
const Title = styled.Text`
  margin-bottom: ${(props) => props.theme.space[3]};
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.heading};
`;
const AuthButton = styled(Button).attrs({
  buttonColor: colors.brand.primary,
})`
  margin-bottom: ${(props) => props.theme.space[3]};
  height: 50px;
  align-items: center;
  justify-content: center;
`;
const RegisterButton = styled(Button).attrs({
  buttonColor: colors.brand.primary,
})`
  height: 50px;
  align-items: center;
  justify-content: center;
`;

export default AccountScreen;

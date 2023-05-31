import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import Background from "../components/background";
import { colors } from "../../../infrastructure/theme/colors";
import { ActivityIndicator } from "react-native";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const { error, isLoading, onRegister } = useContext(AuthenticationContext);

  return (
    <Container>
      <Title>Meals To Go</Title>
      <Background />
      <Body>
        <EmailInput
          value={email}
          onChangeText={(e) => setEmail(e)}
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
        />
        <PasswordInput
          value={password}
          onChangeText={(p) => setPassword(p)}
          secureTextEntry
          textContentType="password"
          autoCapitalize="none"
        />
        <RepeatPasswordInput
          value={repeatedPassword}
          onChangeText={(rp) => setRepeatedPassword(rp)}
          secureTextEntry
          textContentType="password"
          autoCapitalize="none"
        />
        {error && <Error>{error}</Error>}
        {!isLoading ? (
          <LoginButton
            onPress={() => {
              onRegister(email, password, repeatedPassword);
            }}
          >
            Register
          </LoginButton>
        ) : (
          <ActivityIndicator size="large" color={colors.brand.primary} />
        )}
      </Body>
      <GoBackButton
        onPress={() => {
          navigation.goBack();
        }}
      >
        Go Back
      </GoBackButton>
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Title = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.h4};
  margin-bottom: ${(props) => props.theme.space[2]};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;
const Body = styled.View`
  width: 85%;
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[5]};
`;
const EmailInput = styled(TextInput).attrs({
  label: "Email",
})`
  margin-bottom: ${(props) => props.theme.space[3]};
`;
const PasswordInput = styled(TextInput).attrs({
  label: "Password",
})`
  margin-bottom: ${(props) => props.theme.space[3]};
`;
const RepeatPasswordInput = styled(TextInput).attrs({
  label: "Repeat password",
})`
  margin-bottom: ${(props) => props.theme.space[3]};
`;
const LoginButton = styled(Button).attrs({
  icon: "email",
  buttonColor: colors.brand.primary,
  textColor: colors.ui.quaternary,
})`
  margin-top: ${(props) => props.theme.space[3]};
`;
const GoBackButton = styled(Button).attrs({
  buttonColor: colors.brand.primary,
  textColor: colors.ui.quaternary,
})`
  margin-top: ${(props) => props.theme.space[3]};
`;
const Error = styled.Text`
  color: ${(props) => props.theme.colors.text.error};
`;

export default RegisterScreen;

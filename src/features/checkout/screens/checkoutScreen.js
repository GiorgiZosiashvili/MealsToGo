import React from "react";
import CreditCardInput from "../components/credit-card.component";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

const CheckoutScreen = () => {
  return (
    <Container>
      <ExpoStatusBar style="dark" />
      <SafeArea>
        <CreditCardInput />
      </SafeArea>
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
`;

export default CheckoutScreen;

import React, { useContext, useState } from "react";
import CreditCardInput from "../components/credit-card.component";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import CartContext from "../../../services/cart/cart.context";
import { Avatar, TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { Text } from "../../../components/typography";
import RestaurantInfoCard from "../../restaurants/components/restaurant.info-card";
import { List } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
const CheckoutScreen = ({ navigation }) => {
  const { cart, restaurant, clearCart, sum } = useContext(CartContext);
  const [name, setName] = useState(null);
  const [card, setCard] = useState(null);

  const onPay = () => {
    if (!card || !card.id) {
      console.log("some error");
      return;
    }
    navigation.navigate("SuccessScreen");
    setCard(null);
    clearCart();
    setName(null);
  };

  if (!cart.length || !restaurant) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon icon="cart-off" />
          <Text>Your card it empty!</Text>
        </CartIconContainer>
      </SafeArea>
    );
  } else {
    return (
      <Container>
        <ExpoStatusBar style="dark" />
        <SafeArea>
          <RestaurantInfoCard restaurant={restaurant} />
          <TextContainer>
            <Text>Your Order:</Text>
            <List.Section>
              {cart.map(({ item, price }, i) => {
                return (
                  <List.Item
                    key={item + i}
                    title={`${item} - ${price / 100 + "$"}`}
                  />
                );
              })}
            </List.Section>
            <Text>Total: {sum}</Text>
          </TextContainer>
          <NameInput
            label="Name"
            value={name}
            onChangeText={(text) => {
              if (text.length) {
                setName(text);
              } else {
                setName(null);
              }
            }}
          />
          {name?.length > 0 && (
            <CreditCardInput name={name} onSuccess={setCard} />
          )}
          {!card?.id && (
            <Text style={{ color: colors.text.error, marginLeft: 8 }}>
              Please fill the card information
            </Text>
          )}
          <Pay
            icon="cash"
            onPress={() => {
              onPay();
            }}
          >
            PAY
          </Pay>
          <Clear
            icon="cart-off"
            onPress={() => {
              clearCart();
              navigation.navigate("Restaurant");
              setName(null);
            }}
          >
            CLEAR CART
          </Clear>
        </SafeArea>
      </Container>
    );
  }
};
const Container = styled.View`
  flex: 1;
`;
const Clear = styled(Button).attrs({
  textColor: colors.bg.primary,
  mode: "contained",
})`
  width: 80%;
  background-color: ${colors.ui.error};
  margin-left: 10%;
  border-radius: 2px;
`;
const Pay = styled(Button).attrs({
  textColor: colors.bg.primary,
  mode: "contained",
})`
  width: 80%;
  background-color: ${colors.brand.primary};
  margin-left: 10%;
  margin-vertical: ${(props) => props.theme.space[2]};
  border-radius: 2px;
`;
const CartIconContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const CartIcon = styled(Avatar.Icon).attrs({
  size: 160,
})``;
const TextContainer = styled.View`
  padding-horizontal: ${(props) => props.theme.space[2]};
`;
const NameInput = styled(TextInput)`
  background-color: null;
  margin-horizontal: ${(props) => props.theme.space[2]};
`;

export default CheckoutScreen;

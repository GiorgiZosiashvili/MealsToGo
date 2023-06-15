import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import styled from "styled-components/native";
import { Avatar } from "react-native-paper";
import { Text } from "../../../components/typography";
import { colors } from "../../../infrastructure/theme/colors";
const SuccessScreen = () => {
  return (
    <SafeArea>
      <CheckIconContainer>
        <CheckIcon icon="check" />
        <Text>Success!</Text>
      </CheckIconContainer>
    </SafeArea>
  );
};
const CheckIconContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const CheckIcon = styled(Avatar.Icon).attrs({
  size: 160,
})`
  background-color: ${colors.text.success};
`;
export default SuccessScreen;

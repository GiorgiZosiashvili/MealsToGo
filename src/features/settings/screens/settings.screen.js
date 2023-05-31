import React, { useCallback, useContext, useState } from "react";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { List, Avatar } from "react-native-paper";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);

  const getProfilePicture = useCallback(async (currentUser) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    setPhoto(photoUri);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getProfilePicture(user);
    }, [getProfilePicture, user])
  );

  return (
    <SafeArea>
      <Container>
        <AvatarContainer>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              navigation.navigate("CameraScreen");
            }}
          >
            {photo && <Avatar.Image size={180} source={{ uri: photo }} />}
            {!photo && (
              <Avatar.Icon size={180} icon="human" backgroundColor="#2182BD" />
            )}
          </TouchableOpacity>
          <Text variant="label">{user.email}</Text>
        </AvatarContainer>
        <List.Section>
          <SettingsItem
            title="Favorites"
            description="View your Favorites"
            left={(props) => (
              <List.Icon {...props} color="black" icon="heart" />
            )}
            onPress={() => navigation.navigate("FavoritesScreen")}
          />
          <SettingsItem
            title="Logout"
            left={(props) => <List.Icon {...props} color="black" icon="door" />}
            onPress={onLogout}
          />
        </List.Section>
      </Container>
    </SafeArea>
  );
};
const ProfileImage = styled.Image``;
const Container = styled.View`
  flex: 1;
`;
const AvatarContainer = styled.View`
  align-items: center;
`;
const SettingsItem = styled(List.Item)`
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export default SettingsScreen;

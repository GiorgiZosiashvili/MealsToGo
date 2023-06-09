import React, { useCallback, useContext, useState } from "react";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { List, Avatar } from "react-native-paper";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { DarkModeContext } from "../../../services/darkTheme/theme.context";
import { colors } from "../../../infrastructure/theme/colors";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

const SettingsScreen = ({ navigation }) => {
  const { darkTheme, toggleTheme } = useContext(DarkModeContext);
  const { onLogout, user, onRemoveAccount } = useContext(AuthenticationContext);
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
    <SafeArea
      style={{
        backgroundColor:
          darkTheme !== "dark" ? colors.bg.primary : colors.bg.black,
      }}
    >
      <ExpoStatusBar style={darkTheme === "dark" ? "light" : "dark"} />
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
          <Text
            style={{
              color: darkTheme === "dark" ? colors.bg.primary : colors.bg.black,
            }}
          >
            {user.email}
          </Text>
        </AvatarContainer>
        <List.Section>
          <SettingsItem
            title="Favorites"
            titleStyle={{
              color: darkTheme === "dark" ? colors.bg.primary : colors.bg.black,
            }}
            description="View your Favorites"
            left={(props) => (
              <List.Icon
                {...props}
                color={darkTheme === "dark" ? "white" : "black"}
                icon="heart"
              />
            )}
            onPress={() => navigation.navigate("FavoritesScreen")}
          />
          <SettingsItem
            title="Theme"
            titleStyle={{
              color: darkTheme === "dark" ? colors.bg.primary : colors.bg.black,
            }}
            left={(props) => (
              <List.Icon
                {...props}
                color={darkTheme === "dark" ? "white" : "black"}
                icon="theme-light-dark"
              />
            )}
            onPress={toggleTheme}
          />
        </List.Section>
        <SettingsItem
          title="Remove Account"
          titleStyle={{
            color: darkTheme === "dark" ? colors.bg.primary : colors.bg.black,
          }}
          left={(props) => (
            <List.Icon
              {...props}
              color={darkTheme === "dark" ? "white" : "black"}
              icon="account-remove"
            />
          )}
          onPress={() => {
            Alert.alert(
              "Remove Account",
              "Are you sure you want to delete you account?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "OK", onPress: () => onRemoveAccount() },
              ]
            );
          }}
        />
        <SettingsItem
          title="Logout"
          titleStyle={{
            color: darkTheme === "dark" ? colors.bg.primary : colors.bg.black,
          }}
          left={(props) => (
            <List.Icon
              {...props}
              color={darkTheme === "dark" ? "white" : "black"}
              icon="door"
            />
          )}
          onPress={onLogout}
        />
      </Container>
    </SafeArea>
  );
};
const Container = styled.View`
  flex: 1;
`;
const Text = styled.Text`
  font-size: 16px;
`;
const AvatarContainer = styled.View`
  align-items: center;
`;
const SettingsItem = styled(List.Item)`
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export default SettingsScreen;

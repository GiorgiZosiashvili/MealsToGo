import React, { useState } from "react";
import { ThemeProvider } from "styled-components/native";
import styled from "styled-components/native";
import { theme } from "./src/infrastructure/theme";

import { initializeApp, getApps } from "firebase/app";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import Navigation from "./src/infrastructure/navigation";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

const firebaseConfig = {
  apiKey: "AIzaSyDlHhLBT7-qQkG8oy3j-OPuf-7rmUvhhG4",
  authDomain: "fooddelivery-b9acf.firebaseapp.com",
  projectId: "fooddelivery-b9acf",
  storageBucket: "fooddelivery-b9acf.appspot.com",
  messagingSenderId: "287027199249",
  appId: "1:287027199249:web:468a557f292e04d17fa0b0",
};
if (!getApps.length) {
  initializeApp(firebaseConfig);
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <View>
      <ExpoStatusBar style="dark" />
      <AuthenticationContextProvider>
        <ThemeProvider theme={theme}>
          <Navigation />
        </ThemeProvider>
      </AuthenticationContextProvider>
    </View>
  );
};

const View = styled.View`
  flex: 1;
  background-color: #fff;
`;

export default App;

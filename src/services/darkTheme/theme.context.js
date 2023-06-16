import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useRef, useState } from "react";

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState("light");

  const mount = useRef(false);

  const toggleTheme = () => {
    mount.current = true;
    setDarkTheme(darkTheme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const saveDarkMode = async () => {
      try {
        await AsyncStorage.setItem("@darkMode", darkTheme);
      } catch (error) {
        console.log("Error saving dark mode:", error);
      }
    };

    if (mount.current) {
      saveDarkMode();
    }
  }, [darkTheme]);

  const retrieveDarkMode = async () => {
    const savedDarkTheme = await AsyncStorage.getItem("@darkMode");
    if (savedDarkTheme) {
      setDarkTheme(savedDarkTheme);
    }
  };

  useEffect(() => {
    retrieveDarkMode();
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext, DarkModeProvider };

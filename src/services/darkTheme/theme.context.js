import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState();
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
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

    saveDarkMode();
  }, [darkTheme]);
  useEffect(() => {
    const retrieveDarkMode = async () => {
      try {
        const savedDarkTheme = await AsyncStorage.getItem("@darkMode");
        if (savedDarkTheme !== null) {
          setDarkTheme(savedDarkTheme);
        }
      } catch (error) {
        console.log("Error retrieving dark mode:", error);
      } finally {
        setLoading(false);
      }
    };

    retrieveDarkMode();
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext, DarkModeProvider };

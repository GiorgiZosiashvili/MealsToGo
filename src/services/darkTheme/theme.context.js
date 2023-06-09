import React, { createContext, useState } from "react";

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState("light");

  const toggleTheme = () => {
    setDarkTheme(darkTheme === "light" ? "dark" : "light");
  };

  return (
    <DarkModeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext, DarkModeProvider };

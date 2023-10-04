import React, { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

import { getSavedDarkMode, setSavedDarkMode } from "../storage/securestorage";

const ThemeContext = createContext(null);
const { Provider } = ThemeContext;

function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const colorScheme = useColorScheme();

  async function setDarkModeTheme(newMode) {
    setDarkMode(newMode);
    await setSavedDarkMode(newMode);
  }

  async function toggleDarkModeTheme() {
    setDarkModeTheme(!darkMode);
  }

  useEffect(() => {
    async function getCurrentDarkMode() {
      const savedDarkMode = await getSavedDarkMode();
      if (savedDarkMode === null) {
        const newMode = colorScheme === "dark";
        setDarkModeTheme(newMode);
      } else {
        setDarkModeTheme(savedDarkMode);
      }
    }
    getCurrentDarkMode();
  }, []);

  const paperTheme = darkMode
    ? {
        ...MD3DarkTheme,
        colors: {
          ...MD3DarkTheme.colors,
          primary: "#b6c0af",
          secondary: "#d0b292",
          tertiary: "#184f42",
          background: "black",
          error: "#ff0000",
          font: "white",
        },
      }
    : {
        ...MD3LightTheme,
        colors: {
          ...MD3LightTheme.colors,
          primary: "#184f42",
          secondary: "#d0b292",
          tertiary: "#b6c0af",
          error: "#ff0000",
          font: "black",
        },
      };

  return (
    <PaperProvider theme={paperTheme}>
      <Provider
        value={{
          darkMode,
          setDarkMode,
          toggleDarkModeTheme,
          paperTheme,
        }}
      >
        {children}
      </Provider>
    </PaperProvider>
  );
}

export { ThemeContext, ThemeProvider };

import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "./providers/hooks.js";
import { AxiosProvider } from "./providers/AxiosProvider";
import { NotificationProvider } from "./providers/NotificationProvider.js";
import { ThemeProvider } from "./providers/ThemeProvider";
import { QueryProvider } from "./providers/QueryProvider.js";
import { BottomNav } from "./components/BottomNav.js";

async function cacheFonts(fonts) {
  for (let i = 0; i < fonts.length; i++) {
    const element = fonts[i];
    await Font.loadAsync(element);
  }
}

const Stack = createNativeStackNavigator();
function GetRoutes() {
  const { paperTheme } = useAppTheme();

  return (
    <NavigationContainer
      theme={{
        colors: { background: paperTheme.colors.background },
      }}
    >
      <BottomNav />
    </NavigationContainer>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await cacheFonts([
          { MagazineLetter: require("./assets/fonts/MagazineLetter.otf") },
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider>
      <NotificationProvider>
        <AxiosProvider>
          <QueryProvider>
            <GetRoutes />
          </QueryProvider>
        </AxiosProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

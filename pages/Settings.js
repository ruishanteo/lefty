import React from "react";
import { SafeAreaView, View } from "react-native";
import { Switch, useTheme } from "react-native-paper";
import { ListItem } from "@rneui/themed";

import { useAppTheme } from "../providers/hooks";
import Layout from "../components/Layout";

export const Settings = ({ navigation }) => {
  const theme = useTheme();
  const { darkMode, toggleDarkModeTheme } = useAppTheme();

  return (
    <SafeAreaView>
      <Layout title="Settings">
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <ListItem
            bottomDivider
            style={{ width: "100%" }}
            containerStyle={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.secondary,
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={{ color: theme.colors.font }}>
                Dark Mode
              </ListItem.Title>
            </ListItem.Content>
            <Switch value={darkMode} onValueChange={toggleDarkModeTheme} />
          </ListItem>

          <ListItem
            bottomDivider
            onPress={() => navigation.navigate("AboutLefty")}
            style={{ width: "100%" }}
            containerStyle={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.secondary,
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={{ color: theme.colors.font }}>
                About Lefty
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

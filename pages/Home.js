import React from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { useAxios } from "../providers/hooks";
import { SPOON_API_URL } from "../config/config";

export function Home({ navigation }) {
  const theme = useTheme();
  const { publicAxios } = useAxios();
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.primary }}>
      <View style={[styles.container]}>
        <Text
          variant="displayMedium"
          style={{
            color: theme.colors.background,
            fontFamily: "MagazineLetter",
          }}
        >
          lefty
        </Text>
      </View>
      <View
        style={{
          backgroundColor: theme.colors.background,
          gap: 20,
          padding: 20,
        }}
      >
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          What to make today?
        </Text>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/lefty.png")}
            style={{ width: "100%", height: 320, marginVertical: 50 }}
          />
          <Button
            mode="contained"
            icon="compass"
            loading={isLoading}
            onPress={async () => {
              setIsLoading(true);
              await publicAxios
                .get(
                  `${SPOON_API_URL}/recipes/complexSearch?sort=random&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true`
                )
                .then((res) => {
                  navigation.navigate("DetailedRecipe", {
                    listing: res.results[0],
                  });
                })
                .catch((error) => {})
                .finally(() => setIsLoading(false));
            }}
          >
            Discover Recipes
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 70,
    flexDirection: "row",
    gap: 15,
  },
});

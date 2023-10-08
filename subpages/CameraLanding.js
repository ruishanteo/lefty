import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { Icon, Slider } from "@rneui/themed";

import Layout from "../components/Layout";

export const CameraLanding = ({ navigation, route }) => {
  const theme = useTheme();

  const [value, setValue] = React.useState(80);

  const { currIngredients, newIngredients } = route.params;

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.tertiary }}>
      <Layout
        title="Ingredients Found"
        iconName="chevron-left"
        onAction={() => navigation.goBack()}
      >
        <View
          style={{
            padding: 20,
            gap: 10,
            backgroundColor: theme.colors.background,
            height: "100%",
          }}
        >
          <Text variant="bodyLarge">
            Use the slider below to adjust the sensitivity!
          </Text>

          <Slider
            value={value}
            onValueChange={setValue}
            maximumValue={100}
            minimumValue={0}
            step={1}
            allowTouchTrack
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.tertiary}
            thumbStyle={{
              height: 20,
              width: 20,
            }}
            thumbProps={{
              children: (
                <Icon
                  name="food"
                  type="material-community"
                  size={20}
                  reverse
                  containerStyle={{
                    bottom: 20,
                    right: 20,
                  }}
                  color={theme.colors.primary}
                />
              ),
            }}
          />
          <Text>Sensitivity: {value}%</Text>
          <View style={{ height: "60%", marginTop: 15, gap: 8 }}>
            {newIngredients.map((ingredient, index) => (
              <Text
                key={index}
                numberOfLines={1}
                style={{
                  color:
                    ingredient.score >= value / 100
                      ? theme.colors.font
                      : theme.colors.secondary,
                }}
                variant="bodyLarge"
              >
                {index + 1}. {ingredient.name}
              </Text>
            ))}
          </View>

          <Button
            onPress={() => {
              const addedIngredients = newIngredients
                .filter((ingredient) => ingredient.score >= value / 100)
                .map((ingredient) => ingredient.name);
              navigation.navigate("Recipe", {
                ingredients: [...currIngredients, ...addedIngredients],
              });
            }}
            mode="contained"
            style={{ alignSelf: "center", width: 300, marginTop: 50 }}
            icon="shaker"
          >
            Confirm
          </Button>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

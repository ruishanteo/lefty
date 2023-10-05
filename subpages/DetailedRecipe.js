import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";
import { WebView } from "react-native-webview";
import { Icon, Image } from "@rneui/themed";

import Layout from "../components/Layout";

function removeDuplicates(arr) {
  let unique = arr.reduce(function (acc, curr) {
    const name = curr.name;
    if (!acc.includes(name)) acc.push(name);
    return acc;
  }, []);
  return unique;
}

function removeTags(str) {
  if (str === null || str === "") return false;
  else str = str.toString();

  return str.replace(/(<([^>]+)>)/gi, "");
}

export function DetailedRecipe({ navigation, route }) {
  const theme = useTheme();
  const { listing } = route.params;

  return (
    <SafeAreaView>
      <Layout
        title={listing.title}
        onAction={() => navigation.goBack()}
        iconName="chevron-left"
      >
        <ScrollView style={{ height: "92%", marginHorizontal: 20 }}>
          <View
            style={{
              marginBottom: 30,
            }}
          >
            <Image
              source={{ uri: listing.image }}
              containerStyle={{
                width: "100%",
                aspectRatio: 1.3,
              }}
            />

            <Text
              variant="headlineSmall"
              style={[styles.headers, { color: theme.colors.primary }]}
            >
              Description
            </Text>
            <Text>{removeTags(listing.summary)}</Text>
            <Text
              variant="headlineSmall"
              style={[styles.headers, { color: theme.colors.primary }]}
            >
              Ingredients
            </Text>
            <View>
              {removeDuplicates(listing.extendedIngredients).map(
                (ingredient, index) => (
                  <Text key={index} style={{ marginLeft: 5 }}>
                    • {ingredient}
                  </Text>
                )
              )}
            </View>
            <Text
              variant="headlineSmall"
              style={[styles.headers, { color: theme.colors.primary }]}
            >
              Steps
            </Text>
            <View>
              {listing.analyzedInstructions.length > 0 &&
                listing.analyzedInstructions[0].steps.map((stepInfo, index) => (
                  <Text style={{ marginLeft: 5, marginBottom: 5 }} key={index}>
                    {index + 1}. {stepInfo.step}
                  </Text>
                ))}
            </View>
          </View>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headers: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
});

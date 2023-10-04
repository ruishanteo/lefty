import { View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { Image } from "@rneui/themed";

export function Listing({ navigation, listing }) {
  const theme = useTheme();

  return (
    <Card
      onPress={() => {
        navigation.navigate("DetailedRecipe", {
          listing,
        });
      }}
      style={{
        backgroundColor: theme.colors.surface,
        alignItems: "center",
        width: 200,
        padding: 10,
        borderRadius: 0,
      }}
    >
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          containerStyle={{
            width: "100%",
            aspectRatio: 1,
          }}
          source={{
            uri: listing.image,
          }}
        />
        <View
          style={{
            height: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text numberOfLines={2} style={{ marginTop: 10 }}>
            {listing.title}
          </Text>
          <Text numberOfLines={2} style={{ marginTop: 5 }}>
            {listing.usedIngredientCount} ingredients match
          </Text>
          <Text numberOfLines={2} style={{ marginTop: 5 }}>
            {listing.missedIngredientCount} ingredients needed
          </Text>
        </View>
      </View>
    </Card>
  );
}

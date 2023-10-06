import { useEffect, useState } from "react";
import { Dimensions, Linking, SafeAreaView, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import { BACKEND_API_URL } from "../config/config";
import { useAxios } from "../providers/hooks";
import Layout from "../components/Layout";
import { LoadingIcon } from "../components/LoadingIcon";

export function CameraScan({ navigation }) {
  const theme = useTheme();
  const { publicAxios } = useAxios();
  const [isLoading, setIsLoading] = useState(false);

  const windowHeight = Dimensions.get("window").height;

  const requestPermissions = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    } catch (error) {}
    try {
      await ImagePicker.requestCameraPermissionsAsync();
    } catch (error) {
      Linking.openSettings();
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  async function handlePicture(result) {
    setIsLoading(true);
    await publicAxios
      .post(`${BACKEND_API_URL}/ingredients`, {
        base64_string: result.base64,
      })
      .then((res) =>
        navigation.navigate("Recipe", {
          ingredients: res.data
            .filter((ingredient) => ingredient.confidence > 75)
            .map((ingredient) => ingredient.name),
        })
      )
      .catch((error) => {});

    setIsLoading(false);
  }

  async function takeImage() {
    setIsLoading(true);
    let result = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 1,
    });
    setIsLoading(false);

    if (!result.canceled) {
      await handlePicture(result.assets[0]);
    }
  }

  async function pickImage() {
    setIsLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 1,
    });
    setIsLoading(false);

    if (!result.canceled) {
      await handlePicture(result.assets[0]);
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.tertiary }}>
      <Layout
        title="Scan Ingredients"
        onAction={() => navigation.goBack()}
        iconName="chevron-left"
      >
        <View
          style={{
            backgroundColor: theme.colors.background,
            height: windowHeight - 150,
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          {isLoading && <LoadingIcon />}
          <Text variant="labelLarge">Upload or take a picture</Text>
          <Button onPress={pickImage} disabled={isLoading} mode="contained">
            Upload from library
          </Button>
          <Button onPress={takeImage} disabled={isLoading} mode="contained">
            Take picture
          </Button>
        </View>
      </Layout>
    </SafeAreaView>
  );
}

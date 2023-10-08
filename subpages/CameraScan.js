import { useEffect, useState } from "react";
import { Dimensions, Linking, SafeAreaView, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { Icon } from "@rneui/themed";

import * as ImagePicker from "expo-image-picker";

import { BACKEND_API_URL, GOOGLE_API_KEY } from "../config/config";
import { useAxios, useNotification } from "../providers/hooks";
import { LoadingIcon } from "../components/LoadingIcon";
import Layout from "../components/Layout";

export function CameraScan({ navigation, route }) {
  const theme = useTheme();
  const { publicAxios } = useAxios();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [isMediaLoading, setIsMediaLoading] = useState(false);
  const { currIngredients } = route.params;

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

  function handleNoIngredients() {
    showNotification({
      title: "No ingredients found",
      description: "Could not find any ingredients in picture",
      type: "warn",
    });
    setIsLoading(false);
  }

  async function handlePicture(result) {
    setIsLoading(true);

    const googleVisionRes = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: result.base64,
              },
              features: [{ type: "LABEL_DETECTION", maxResults: 15 }],
            },
          ],
        }),
      }
    );

    const res = await googleVisionRes.json();

    const detectedIngredients = res.responses[0].labelAnnotations.map(
      (annotation) => ({
        name: annotation.description,
        score: annotation.score,
      })
    );

    if (detectedIngredients.length === 0) {
      return handleNoIngredients();
    }

    await publicAxios
      .post(`${BACKEND_API_URL}/ingredients`, {
        ingredients: detectedIngredients,
      })
      .then((res) => {
        if (res.length === 0) {
          return handleNoIngredients();
        } else {
          navigation.navigate("CameraLanding", {
            newIngredients: res,
            currIngredients: currIngredients,
          });
        }
      })
      .catch((error) => {});
    setIsLoading(false);
  }

  function takeImage() {
    setIsCameraLoading(true);
    ImagePicker.launchCameraAsync({
      base64: true,
      quality: 1,
    })
      .then((res) => {
        if (!res.canceled) {
          handlePicture(res.assets[0]);
        }
      })
      .catch((error) =>
        showNotification({
          title: "Failed to open camera",
          description: error.message,
          type: "error",
        })
      )
      .finally(() => setIsCameraLoading(false));
  }

  function pickImage() {
    setIsMediaLoading(true);
    ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 1,
    })
      .then((res) => {
        if (!res.canceled) {
          handlePicture(res.assets[0]);
        }
      })
      .catch((error) =>
        showNotification({
          title: "Failed to open image library",
          description: error.message,
          type: "error",
        })
      )
      .finally(() => setIsMediaLoading(false));
  }

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.tertiary }}>
      <Layout
        title="Scan Ingredients"
        onAction={() => navigation.goBack()}
        iconName="chevron-left"
      >
        {isLoading ? (
          <View
            style={{ height: "100%", backgroundColor: theme.colors.background }}
          >
            <LoadingIcon fullSize={true} styles={{ marginTop: -100 }} />
          </View>
        ) : (
          <View
            style={{
              backgroundColor: theme.colors.background,
              height: windowHeight - 150,
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="noodles"
                type="material-community"
                size={100}
                color={theme.colors.primary}
              />
              <Icon
                name="emoji-food-beverage"
                type="material-icon"
                size={100}
                color={theme.colors.primary}
              />
              <Icon
                name="food-variant"
                type="material-community"
                size={100}
                color={theme.colors.primary}
              />
            </View>
            <Text variant="bodyLarge">Upload or take a picture</Text>
            <Button
              onPress={pickImage}
              disabled={isLoading || isCameraLoading || isMediaLoading}
              loading={isMediaLoading}
              mode="contained"
              style={{ width: 200, backgroundColor: theme.colors.secondary }}
              contentStyle={{ flexDirection: "row-reverse" }}
              icon="food-croissant"
            >
              Upload from library
            </Button>
            <Button
              onPress={takeImage}
              disabled={isLoading || isCameraLoading || isMediaLoading}
              loading={isCameraLoading}
              mode="contained"
              style={{ width: 200, backgroundColor: theme.colors.secondary }}
              contentStyle={{ flexDirection: "row-reverse" }}
              icon="hamburger"
            >
              Take picture
            </Button>
          </View>
        )}
      </Layout>
    </SafeAreaView>
  );
}

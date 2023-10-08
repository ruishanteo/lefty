import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";
import { Icon } from "@rneui/themed";
import { Formik, FieldArray } from "formik";

import { useAxios, useNotification } from "../providers/hooks";
import { IngredientInput } from "../components/IngredientInput";
import Layout from "../components/Layout";
import { SPOON_API_URL } from "../config/config";

function getIngredients(src) {
  return src?.params?.ingredients ? src?.params?.ingredients : [];
}

export function Recipe({ navigation, route }) {
  const theme = useTheme();
  const { publicAxios } = useAxios();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (route?.params?.ingredients && route?.params?.ingredients.length === 0) {
      showNotification({
        title: "No ingredients found",
        description: "Please try again.",
        type: "warn",
      });
    }
  }, [route]);

  return (
    <SafeAreaView>
      <Formik
        enableReinitialize
        initialValues={{ ingredients: getIngredients(route) }}
        onSubmit={async (values) => {
          const filtered = values.ingredients.filter((i) => i);
          if (filtered.length === 0) {
            return showNotification({
              title: "",
              description: "Please add at least 1 ingredient.",
              type: "error",
            });
          }
          const queryString = filtered.toString();
          setIsLoading(true);
          await publicAxios
            .get(
              `${SPOON_API_URL}/recipes/complexSearch?includeIngredients=${queryString}&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&addRecipeNutrition=false&number=30`
            )
            .then((res) =>
              navigation.navigate("RecipeList", { listings: res.results })
            )
            .catch((error) => {})
            .finally(() => setIsLoading(false));
        }}
      >
        {({ handleSubmit, values, isSubmitting, resetForm, setFieldValue }) => {
          return (
            <Layout
              title="Add Ingredient"
              onAction={() =>
                navigation.navigate("Camera", {
                  currIngredients: values.ingredients,
                })
              }
              actionDisabled={isLoading}
              iconName="camera"
            >
              <FieldArray
                name="ingredients"
                render={(arrayHelpers) => (
                  <ScrollView
                    style={{
                      height: "91.5%",
                    }}
                    contentContainerStyle={{
                      gap: 15,
                      alignItems: "center",
                      paddingBottom: 20,
                    }}
                  >
                    {values.ingredients && values.ingredients.length > 0 ? (
                      values.ingredients.map((ingredient, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            variant="titleMedium"
                            style={{ fontWeight: "bold" }}
                          >
                            {index + 1}.{" "}
                          </Text>
                          <IngredientInput index={index} />

                          <IconButton
                            icon="close"
                            onPress={() => arrayHelpers.remove(index)}
                            disabled={isSubmitting}
                          />
                        </View>
                      ))
                    ) : (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          height: "80%",
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Icon
                            name="stove"
                            type="material-community"
                            size={100}
                            color={theme.colors.primary}
                          />
                          <Icon
                            name="blender"
                            type="material-community"
                            size={100}
                            color={theme.colors.primary}
                          />
                          <Icon
                            name="pasta"
                            type="material-community"
                            size={100}
                            color={theme.colors.primary}
                          />
                        </View>
                        <Text variant="labelLarge">Get started!</Text>
                      </View>
                    )}

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Button
                        icon="plus"
                        onPress={() => arrayHelpers.push("")}
                        disabled={isSubmitting}
                        style={{ alignSelf: "flex-start", margin: 10 }}
                      >
                        Add Ingredient
                      </Button>
                      <Button
                        onPress={() => setFieldValue("ingredients", [])}
                        disabled={isSubmitting}
                        buttonColor={theme.colors.tertiary}
                        textColor="white"
                        style={{
                          width: 100,
                          alignSelf: "flex-end",
                          margin: 10,
                        }}
                        contentStyle={{ flexDirection: "row-reverse" }}
                        icon="kettle-outline"
                      >
                        Clear
                      </Button>
                    </View>
                    <Button
                      onPress={handleSubmit}
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      buttonColor={theme.colors.secondary}
                      textColor="white"
                      mode="contained"
                      style={{ width: 200 }}
                      contentStyle={{ flexDirection: "row-reverse" }}
                      icon="food-fork-drink"
                    >
                      Find recipes
                    </Button>
                  </ScrollView>
                )}
              />
            </Layout>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
}

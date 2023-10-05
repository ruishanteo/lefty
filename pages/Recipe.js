import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";
import { Icon } from "@rneui/themed";
import { Formik, FieldArray } from "formik";

import { useAxios, useNotification } from "../providers/hooks";
import { IngredientInput } from "../components/IngredientInput";
import Layout from "../components/Layout";

function getIngredients(src) {
  return src?.params?.ingredients ? src?.params?.ingredients : [];
}

export function Recipe({ navigation, route }) {
  const theme = useTheme();
  const { publicAxios } = useAxios();
  const { showNotification } = useNotification();

  return (
    <SafeAreaView>
      <Layout
        title="Add Ingredient"
        onAction={() => navigation.navigate("Camera")}
        iconName="camera"
      >
        <Formik
          enableReinitialize
          initialValues={{ ingredients: getIngredients(route) }}
          onSubmit={async (values) => {
            const queryString = values.ingredients.filter((i) => i).toString();
            await publicAxios
              .get(
                `/recipes/complexSearch?includeIngredients=${queryString}&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&addRecipeNutrition=false&number=30`
              )
              .then((res) =>
                navigation.navigate("RecipeList", { listings: res.results })
              )
              .catch((error) => {});
          }}
        >
          {({
            handleSubmit,
            handleChange,
            resetForm,
            handleBlur,
            values,
            touched,
            errors,
            isSubmitting,
          }) => {
            return (
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
                        <Icon
                          name="stove"
                          type="material-community"
                          size={100}
                          color={theme.colors.primary}
                        />
                        <Text variant="labelLarge">Get started!</Text>
                      </View>
                    )}
                    <Button
                      icon="plus"
                      onPress={() => arrayHelpers.push("")}
                      style={{ alignSelf: "flex-start" }}
                    >
                      Add Ingredient
                    </Button>
                    <Button
                      onPress={handleSubmit}
                      buttonColor={theme.colors.secondary}
                      textColor="white"
                      mode="contained"
                      style={{ width: 200 }}
                      contentStyle={{ flexDirection: "row-reverse" }}
                      icon="arrow-right"
                    >
                      Find recipes
                    </Button>
                  </ScrollView>
                )}
              />
            );
          }}
        </Formik>
      </Layout>
    </SafeAreaView>
  );
}

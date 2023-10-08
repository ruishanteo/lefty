import React from "react";
import { Dimensions, FlatList, SafeAreaView, View } from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";
import { BottomSheet, Icon, ListItem, SearchBar } from "@rneui/themed";
import { Formik } from "formik";

import { FilterAccordian } from "../components/FilterAccordian";
import { Listing } from "../components/Listing";
import Layout from "../components/Layout";
import PaginationNav from "../components/PaginationNav";

const itemsPerPage = 10;
const sortingFuncs = {
  missingIngredientsDesc: (a, b) =>
    b.missedIngredientCount - a.missedIngredientCount,
  missingIngredientsAsc: (a, b) =>
    a.missedIngredientCount - b.missedIngredientCount,
  usedIngredientsDesc: (a, b) => b.usedIngredientCount - a.usedIngredientCount,
  usedIngredientsAsc: (a, b) => a.usedIngredientCount - b.usedIngredientCount,
};
const filterProps = [
  {
    type: "orderBy",
    label: "Sort",
    chips: [
      {
        display: "Ingredients Needed - High to Low",
        value: "missingIngredientsDesc",
      },
      {
        display: "Ingredients Needed - Low to High",
        value: "missingIngredientsAsc",
      },
      {
        display: "Ingredients Match - High to Low",
        value: "usedIngredientsDesc",
      },
      {
        display: "Ingredients Match - Low to High",
        value: "usedIngredientsAsc",
      },
    ],
    allowMultiple: false,
  },
  {
    type: "dishType",
    label: "Dish Type",
    chips: [
      { display: "Main Course", value: "main course" },
      { display: "Side Dish", value: "side dish" },
      { display: "Dessert", value: "dessert" },
      { display: "Appetizer", value: "appetizer" },
      { display: "Salad", value: "salad" },
      { display: "Bread", value: "bread" },
      { display: "Breakfast", value: "breakfast" },
      { display: "Soup", value: "soup" },
      { display: "Beverage", value: "beverage" },
      { display: "Sauce", value: "sauce" },
      { display: "Marinade", value: "marinade" },
      { display: "Fingerfood", value: "fingerfood" },
      { display: "Snack", value: "snack" },
      { display: "Drink", value: "drink" },
    ],
    allowMultiple: false,
  },
  {
    type: "cuisines",
    label: "Cuisines",
    chips: [
      { display: "African", value: "African" },
      { display: "Asian", value: "Asian" },
      { display: "American", value: "American" },
      { display: "British", value: "British" },
      { display: "Cajun", value: "Cajun" },
      { display: "Caribbean", value: "Caribbean" },
      { display: "Chinese", value: "Chinese" },
      { display: "Eastern European", value: "Eastern European" },
      { display: "European", value: "European" },
      { display: "French", value: "French" },
      { display: "German", value: "German" },
      { display: "Greek", value: "Greek" },
      { display: "Indian", value: "Indian" },
      { display: "Irish", value: "Irish" },
      { display: "Italian", value: "Italian" },
      { display: "Japanese", value: "Japanese" },
      { display: "Jewish", value: "Jewish" },
      { display: "Korean", value: "Korean" },
      { display: "Latin American", value: "Latin American" },
      { display: "Mediterranean", value: "Mediterranean" },
      { display: "Mexican", value: "Mexican" },
      { display: "Middle Eastern", value: "Middle Eastern" },
      { display: "Nordic", value: "Nordic" },
      { display: "Southern", value: "Southern" },
      { display: "Spanish", value: "Spanish" },
      { display: "Thai", value: "Thai" },
      { display: "Vietnamese", value: "Vietnamese" },
    ],
    allowMultiple: true,
  },
  {
    type: "diet",
    label: "Diet",
    chips: [
      { display: "gluten free", value: "glutenFree" },
      { display: "ketogenic", value: "ketogenic" },
      { display: "vegetarian", value: "vegetarian" },
      { display: "lacto-vegetarian", value: "lactoVegetarian" },
      { display: "ovo-vegetarian", value: "ovoVegetarian" },
      { display: "vegan", value: "vegan" },
      { display: "pescetarian", value: "pescetarian" },
      { display: "paleo", value: "paleo" },
      { display: "primal", value: "primal" },
    ],
    allowMultiple: true,
  },
];

const initialValues = {
  orderBy: "",
  search: "",
  dishType: [],
  cuisines: [],
  diet: [],
  page: 1,
};

function getFilteredListings(listings, values) {
  let filteredListings = listings.slice();

  if (values.search) {
    filteredListings = filteredListings.filter((listing) =>
      listing.title.toLowerCase().includes(values.search.toLowerCase())
    );
  }

  if (values.dishType.length > 0) {
    filteredListings = filteredListings.filter((listing) =>
      values.dishType.includes(listing.dishTypes)
    );
  }

  if (values.cuisines.length > 0) {
    filteredListings = filteredListings.filter((listing) =>
      values.cuisines.some((cuisine) => listing.cuisines.includes(cuisine))
    );
  }

  if (values.diet.length > 0) {
    filteredListings = filteredListings.filter((listing) =>
      values.diet.includes(listing.diets)
    );
  }

  if (values.orderBy) {
    filteredListings.sort(sortingFuncs[values.orderBy]);
  }

  const startIndex = (values.page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    filteredListings: filteredListings.slice(startIndex, endIndex),
    totalItems: filteredListings.length,
  };
}

export function RecipeList({ navigation, route }) {
  const { listings } = route.params;

  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const windowWidth = Dimensions.get("window").width;

  return (
    <Formik
      enableReinitialize
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={(values) => setOpenDrawer(false)}
    >
      {({
        handleSubmit,
        handleChange,
        setFieldValue,
        resetForm,
        handleBlur,
        values,
        touched,
        errors,
      }) => {
        const { filteredListings, totalItems } = getFilteredListings(
          listings,
          values
        );
        const maxPageNumber = Math.ceil(totalItems / itemsPerPage);

        return (
          <SafeAreaView>
            <Layout
              iconName="chevron-left"
              title="Recipes"
              onAction={() => navigation.goBack()}
            >
              <View
                style={{
                  alignItems: "center",
                  width: windowWidth,
                }}
                flexDirection="row"
              >
                <SearchBar
                  placeholder="Search"
                  onChangeText={handleChange("search")}
                  value={values.search}
                  containerStyle={{
                    backgroundColor: "transparent",
                    borderBottomColor: "transparent",
                    borderTopColor: "transparent",
                  }}
                  inputContainerStyle={{
                    backgroundColor: theme.colors.tertiary,
                    width: windowWidth - 80,
                  }}
                  round={true}
                />
                <IconButton
                  onPress={() => setOpenDrawer(true)}
                  iconColor={theme.colors.secondary}
                  icon="tune"
                  size={26}
                />
              </View>
              <View
                style={{
                  marginHorizontal: 15,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {filteredListings.length === 0 ? (
                  <View
                    style={{
                      height: "70%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      name="cookie-alert"
                      type="material-community"
                      size={80}
                      color={theme.colors.font}
                    />
                    <Text variant="labelLarge">No results found.</Text>
                  </View>
                ) : (
                  <FlatList
                    data={filteredListings}
                    style={{ height: "83%", width: "100%" }}
                    renderItem={({ item }) => (
                      <Listing navigation={navigation} listing={item} />
                    )}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    ItemSeparatorComponent={() => (
                      <View style={{ height: 15 }} />
                    )}
                    columnWrapperStyle={{
                      justifyContent: "space-between",
                    }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    ListFooterComponentStyle={{
                      flex: 1,
                      justifyContent: "flex-end",
                    }}
                    ListFooterComponent={
                      <PaginationNav
                        goToPage={(p) => setFieldValue("page", p)}
                        currentPageNumber={values.page}
                        maxPageNumber={maxPageNumber}
                      />
                    }
                    ListHeaderComponent={
                      <Text
                        variant="titleMedium"
                        style={{
                          color: theme.colors.secondary,
                          fontWeight: "bold",
                        }}
                      >
                        DISCOVER RECIPES
                      </Text>
                    }
                  />
                )}
              </View>
            </Layout>

            <BottomSheet
              onBackdropPress={() => setOpenDrawer(false)}
              isVisible={openDrawer}
            >
              <ListItem
                bottomDivider
                containerStyle={{ backgroundColor: theme.colors.background }}
              >
                <View
                  flexDirection="row"
                  style={{
                    flex: 1,
                    alignItems: "center",
                    height: 45,
                    marginTop: 30,
                  }}
                >
                  <IconButton
                    onPress={() => setOpenDrawer(false)}
                    iconColor={theme.colors.secondary}
                    icon="close"
                  />
                  <Text
                    variant="bodyLarge"
                    style={{
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    Filter and Sort
                  </Text>
                  <Button
                    onPress={() => resetForm(initialValues)}
                    textColor={theme.colors.secondary}
                  >
                    Reset
                  </Button>
                </View>
              </ListItem>

              {filterProps.map((filterProp, index) => (
                <FilterAccordian key={index} filterProp={filterProp} />
              ))}

              <ListItem
                bottomDivider
                containerStyle={{ backgroundColor: theme.colors.background }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    padding: 25,
                  }}
                >
                  <Button
                    onPress={handleSubmit}
                    mode="contained"
                    buttonColor={theme.colors.quaternary}
                    textColor={theme.colors.surface}
                    icon="check"
                  >
                    Done
                  </Button>
                </View>
              </ListItem>
            </BottomSheet>
          </SafeAreaView>
        );
      }}
    </Formik>
  );
}

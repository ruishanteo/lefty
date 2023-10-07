import React from "react";
import { SafeAreaView, View } from "react-native";
import { Text } from "react-native-paper";

import Layout from "../components/Layout";

export const AboutLefty = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Layout
        title="About Lefty"
        onAction={() => navigation.goBack()}
        iconName="chevron-left"
      >
        <View style={{ marginHorizontal: 15 }}>
          <Text
            variant="displayMedium"
            style={{
              marginBottom: 15,
              fontFamily: "MagazineLetter",
              alignSelf: "center",
            }}
          >
            Lefty
          </Text>
          <Text style={{ marginBottom: 15 }}>
            Food waste is a global problem of staggering proportions. According
            to the United Nations, approximately one-third of all food produced
            worldwide goes to waste each year, amounting to about 1.3 billion
            tons. In a world where millions go hungry, this is not just an
            ethical concern; it's an environmental and economic crisis as well.
          </Text>
          <Text style={{ marginBottom: 15 }}>
            One significant contributor to food waste is the disposal of
            leftover ingredients, which often occurs because people struggle to
            find creative ways to use them effectively.
          </Text>
          <Text style={{ marginBottom: 15 }}>
            Leftover ingredients, whether it's half an onion, a handful of
            spinach, or a bit of cheese, often end up in the trash. These
            seemingly small portions collectively contribute to the massive
            problem of food waste. Many individuals find it challenging to come
            up with creative recipes using what they have on hand.
          </Text>
          <Text style={{ marginBottom: 15 }}>
            Lefty is designed to bridge the gap between leftover ingredients and
            delicious, waste-reducing meals. Users can input the ingredients
            they have on hand into the app, ranging from fresh produce to pantry
            staples.The app leverages a vast database of recipes and
            sophisticated algorithms to generate customized recipes based on the
            available ingredients. These recipes are not only easy to follow but
            also prioritize using up leftovers.
          </Text>
          <Text style={{ marginBottom: 15 }}>
            By offering users practical and appetizing ways to use their
            leftover ingredients, Lefty empowers them to make the most of what
            they already have, ultimately reducing food waste at home.
          </Text>
          <Text style={{ marginBottom: 15 }}>
            By reducing food waste, Lefty aims to contribute to a more
            sustainable planet by conserving resources and reducing greenhouse
            gas emissions. Together, we can make a positive impact on our planet
            and our kitchens.
          </Text>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

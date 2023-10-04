import React from "react";
import { Animated, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Icon, ListItem } from "@rneui/themed";

import { FilterChip } from "./FilterChip.js";

export const FilterAccordian = ({ filterProp }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <ListItem.Accordion
      animation={{ type: "timing", duration: 0.001 }}
      bottomDivider
      content={
        <ListItem.Content>
          <ListItem.Title style={{ color: theme.colors.font }}>
            {filterProp.label}
          </ListItem.Title>
        </ListItem.Content>
      }
      isExpanded={isExpanded}
      onPress={() => setIsExpanded(!isExpanded)}
      containerStyle={{ backgroundColor: theme.colors.background }}
      icon={
        <Icon
          name={"chevron-down"}
          type="material-community"
          color={theme.colors.font}
        />
      }
    >
      <View
        flexDirection="row"
        flexWrap="wrap"
        style={{
          backgroundColor: theme.colors.background,
          gap: 10,
          padding: 10,
        }}
      >
        {filterProp.chips.map((chip, index) => (
          <FilterChip key={index} filterProp={filterProp} chip={chip} />
        ))}
      </View>
    </ListItem.Accordion>
  );
};

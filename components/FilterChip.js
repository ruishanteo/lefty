import React from "react";
import { useTheme } from "react-native-paper";
import { Chip } from "@rneui/themed";
import { useFormikContext } from "formik";

export const FilterChip = ({ filterProp, chip }) => {
  const theme = useTheme();
  const { setFieldValue, values } = useFormikContext();

  const isChipPressed = filterProp.allowMultiple
    ? values[filterProp.type].includes(chip.value)
    : values[filterProp.type] === chip.value;

  const handlePress = () => {
    if (!filterProp.allowMultiple) {
      setFieldValue(filterProp.type, isChipPressed ? undefined : chip.value);
    } else {
      setFieldValue(
        filterProp.type,
        isChipPressed
          ? values[filterProp.type].filter((v) => v !== chip.value)
          : [...values[filterProp.type], chip.value]
      );
    }
  };

  return (
    <Chip
      title={chip.display}
      onPress={handlePress}
      type={isChipPressed ? "solid" : "outline"}
      buttonStyle={{
        backgroundColor: isChipPressed ? theme.colors.tertiary : "transparent",
        borderColor: theme.colors.primary,
      }}
      titleStyle={{ color: theme.colors.primary }}
    />
  );
};

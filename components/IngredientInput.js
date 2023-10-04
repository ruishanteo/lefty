import React from "react";
import { useFormikContext } from "formik";
import { TextInput } from "react-native-paper";

export const IngredientInput = ({ index }) => {
  const [text, setText] = React.useState("");
  const { handleBlur, handleChange, values, isSubmitting } = useFormikContext();

  return (
    <TextInput
      onChangeText={handleChange(`ingredients.${index}`)}
      onBlur={handleBlur(`ingredients.${index}`)}
      value={values.ingredients[index]}
      disabled={isSubmitting}
      placeholder="Enter your ingredient"
      style={{ width: 300 }}
    />
  );
};

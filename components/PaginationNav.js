import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";

function PaginationNav({ currentPageNumber, goToPage, maxPageNumber }) {
  const deltaPage = (delta) => goToPage(parseInt(currentPageNumber) + delta);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        onPress={() => goToPage(1)}
        disabled={currentPageNumber <= 1}
        icon="page-first"
      />
      <IconButton
        onPress={() => deltaPage(-1)}
        disabled={currentPageNumber <= 1}
        icon="chevron-left"
      />
      <Text>{currentPageNumber}</Text>
      <IconButton
        onPress={() => deltaPage(1)}
        disabled={currentPageNumber >= maxPageNumber}
        icon="chevron-right"
      />
      <IconButton
        onPress={() => goToPage(maxPageNumber)}
        disabled={currentPageNumber >= maxPageNumber}
        icon="page-last"
      />
    </View>
  );
}

export default PaginationNav;

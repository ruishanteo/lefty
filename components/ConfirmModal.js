import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import Modal from "react-native-modal";

import Layout from "./Layout";

export const ConfirmModal = ({ action, open, setOpen }) => {
  const theme = useTheme();

  return (
    <Modal
      animationType="slide"
      visible={open}
      onRequestClose={() => setOpen(false)}
    >
      <View style={styles.centeredView}>
        <View
          style={[styles.modalView, { backgroundColor: theme.colors.tertiary }]}
        >
          <Layout
            title="Are you sure?"
            onAction={() => setOpen(false)}
            iconName="close"
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Text>This action is irreversible.</Text>
              <View flexDirection="row" style={{ gap: 15 }}>
                <Button
                  buttonColor={theme.colors.quaternary}
                  textColor={theme.colors.background}
                  icon="close"
                  onPress={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  buttonColor={theme.colors.quaternary}
                  textColor={theme.colors.background}
                  icon="check"
                  onPress={action}
                >
                  Confirm
                </Button>
              </View>
            </View>
          </Layout>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
});

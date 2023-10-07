import { createContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Easing,
  Notifier,
  NotifierComponents,
  NotifierWrapper,
} from "react-native-notifier";
import * as Device from "expo-device";
import {
  getScheduledNotifications,
  setScheduledNotifications,
} from "../storage/securestorage";

const NotificationContext = createContext(null);
const { Provider } = NotificationContext;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function NotificationProvider({ children }) {
  function showNotification(content) {
    Notifier.showNotification({
      duration: 3000,
      showAnimationDuration: 800,
      showEasing: Easing.ease,
      hideOnPress: true,
      Component: content.type
        ? NotifierComponents.Alert
        : NotifierComponents.Notification,
      componentProps: {
        alertType: content.type,
      },
      ...content,
    });
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotifierWrapper queueMode="reset">
        <Provider
          value={{
            showNotification,
          }}
        >
          {children}
        </Provider>
      </NotifierWrapper>
    </GestureHandlerRootView>
  );
}

export { NotificationContext, NotificationProvider };

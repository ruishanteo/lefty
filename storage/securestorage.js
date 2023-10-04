import * as SecureStore from "expo-secure-store";

export async function saveKeyToStorage(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getKeyFromStorage(key) {
  return await SecureStore.getItemAsync(key);
}

export async function deleteKeyFromStorage(key) {
  await SecureStore.deleteItemAsync(key);
}
const DARK_MODE_KEY = "darkMode";

export async function getSavedDarkMode() {
  return JSON.parse(await getKeyFromStorage(DARK_MODE_KEY));
}

export async function setSavedDarkMode(darkMode) {
  await saveKeyToStorage(DARK_MODE_KEY, JSON.stringify(darkMode));
}

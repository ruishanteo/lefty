import { useContext } from "react";

import { AxiosContext } from "./AxiosProvider";
import { NotificationContext } from "./NotificationProvider";
import { ThemeContext } from "./ThemeProvider";
import { QueryContext } from "./QueryProvider";

export function useAxios() {
  return useContext(AxiosContext);
}

export function useNotification() {
  return useContext(NotificationContext);
}

export function useAppTheme() {
  return useContext(ThemeContext);
}

export function useQueryContext() {
  return useContext(QueryContext);
}

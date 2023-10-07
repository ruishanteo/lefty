import React, { createContext, useContext } from "react";
import axios from "axios";

import { NotificationContext } from "./NotificationProvider";
import { SPOON_API_URL, API_KEY, FAKE_API } from "../config/config";

const AxiosContext = createContext();
const { Provider } = AxiosContext;

function AxiosProvider({ children }) {
  const { showNotification } = useContext(NotificationContext);

  const publicAxios = axios.create();

  publicAxios.interceptors.request.use(
    (config) => {
      config.headers.Accept = "application/json";
      config.headers["x-api-key"] = API_KEY;
      return config;
    },
    (error) => Promise.reject(error)
  );

  publicAxios.interceptors.response.use(
    (response) => response.data,
    (error) => {
      showNotification({
        title: "Request failed",
        description:
          error.response?.data?.message || error.message || "Please try again.",
        type: "error",
      });
      return Promise.reject(error);
    }
  );

  return (
    <Provider
      value={{
        publicAxios,
      }}
    >
      {children}
    </Provider>
  );
}

export { AxiosContext, AxiosProvider };

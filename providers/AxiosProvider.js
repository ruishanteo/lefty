import React, { createContext, useContext } from "react";
import axios from "axios";

import { NotificationContext } from "./NotificationProvider";
import { API_URL, API_KEY, FAKE_API } from "../config/config";
import { fakeData } from "../config/fakeData";

const AxiosContext = createContext();
const { Provider } = AxiosContext;

function AxiosProvider({ children }) {
  const { showNotification } = useContext(NotificationContext);

  const publicAxios = axios.create({
    baseURL: `${API_URL}`,
  });

  publicAxios.interceptors.request.use(
    (config) => {
      if (FAKE_API) {
        throw { isLocal: true, data: fakeData };
      } else {
        config.headers.Accept = "application/json";
        config.headers["x-api-key"] = API_KEY;
      }
      return config;
    },
    (error) => {
      return error?.isLocal ? Promise.resolve(error) : Promise.reject(error);
    }
  );

  publicAxios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      if (error?.isLocal) {
        return Promise.resolve(error.data);
      }

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

import React, { createContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryContext = createContext(null);
const { Provider } = QueryContext;

const queryClient = new QueryClient();

function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider
        value={{
          queryClient,
        }}
      >
        {children}
      </Provider>
    </QueryClientProvider>
  );
}

export { QueryContext, QueryProvider };

// index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter as BrowserRouter } from "react-router-dom";
import UserProvider from "./Contexts/User/UserProvider"; // Assuming UserProvider component is in a JS file
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import store from "./redux/store";

import { AuthProvider } from "react-oidc-context";
import authConfig from "./auth/authConfig.js";
import AuthSync from "./auth/authSync.jsx";

import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider {...authConfig}>
        <AuthSync>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </AuthSync>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
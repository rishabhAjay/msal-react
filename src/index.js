import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";

import { BrowserRouter } from "react-router-dom";

import App from "./App";
import {
  EventType,
  LogLevel,
  PublicClientApplication,
} from "@azure/msal-browser";
import config from "./config/config";

//below is the initialization of the client config object for microsoft auth
const pca = new PublicClientApplication({
  cache: {
    cacheLocation: config.cache_location,
  },
  auth: {
    clientId: config.client_id,
    authority: `https://login.microsoftonline.com/${config.tenant_id}`,
    redirectUri: config.redirect_uri,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
});

pca.addEventCallback((event) => {
  //we set an active account when the user has logged in successfully
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    pca.setActiveAccount(event.payload.account);
  }

  // ONLY FOR B2C
  //the below event checks for the forgot password button trigger
  // if (event.eventType === EventType.LOGIN_FAILURE) {
  //   if (event.error.errorMessage.includes("AADB2C90118")) {
  //     // The user has forgotten their password.
  //     console.log("sdfsdlfkdsfjl");
  //     pca.loginPopup({
  //       authority: config.forgot_password_authority,
  //     });
  //   }
  // }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App msalInstance={pca} />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

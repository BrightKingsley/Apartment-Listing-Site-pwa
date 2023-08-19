import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { ListingContextProvider } from "./context/ListingContext";
import { NotificationContextProvider } from "./context/NotificationContext";
import { StyleContextProvider } from "./context/StyleContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ModalContextProvider } from "./context/ModalContext";
import { ChatContextProvider } from "./context/ChatContext";
import { AdminContextProvider } from "./context/AdminContext";
import { ThemeProvider } from "@mui/material";
import theme from "./MuiCustomization/theme";
import { CheckoutContextProvider } from "./context/CheckoutContext";
import { RentlyContextProvider } from "./context/RentlyContext";
// import "./leaflet.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
// document.getElementById("root").innerHTML = `<h1>Loading</h1>`;

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <NotificationContextProvider>
        <RentlyContextProvider>
          <ModalContextProvider>
            <CheckoutContextProvider>
              <AdminContextProvider>
                <AuthContextProvider>
                  {/* <UserContextProvider> */}
                  <ListingContextProvider>
                    <StyleContextProvider>
                      <ChatContextProvider>
                        <App />
                      </ChatContextProvider>
                    </StyleContextProvider>
                  </ListingContextProvider>
                  {/* </UserContextProvider> */}
                </AuthContextProvider>
              </AdminContextProvider>
            </CheckoutContextProvider>
          </ModalContextProvider>
        </RentlyContextProvider>
      </NotificationContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

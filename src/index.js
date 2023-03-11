import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import "./icons/css/fontawesome.css";
import "./icons/css/solid.css";
import "./icons/css/regular.css";
import "./icons/css/v4-shims.css";
import { ListingContextProvider } from "./context/ListingContext";
import { NotificationContextProvider } from "./context/NotificationContext";
import { StyleContextProvider } from "./context/StyleContext";
import { UserContextProvider } from "./context/UserContext";
import { createPortal } from "react-dom";
import Notification from "./components/Notification";
import { AuthContextProvider } from "./context/AuthContext";
import { ModalContextProvider } from "./context/ModalContext";
import { ChatContextProvider } from "./context/ChatContext";
// import "./leaflet.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotificationContextProvider>
      <ModalContextProvider>
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
      </ModalContextProvider>
    </NotificationContextProvider>
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

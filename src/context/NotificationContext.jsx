import React, { createContext, useEffect, useState } from "react";

export const NotificationContext = createContext({
  showNotification: !null,
  triggerNotification: () => {},
  notificationMessage: "",
});

export const NotificationContextProvider = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const triggerNotification = (message) => {
    setShowNotification(true);
    setNotificationMessage(message);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showNotification, setShowNotification]);

  return (
    <NotificationContext.Provider
      value={{ showNotification, triggerNotification, notificationMessage }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

import React, { useContext } from "react";
import { createPortal } from "react-dom";
// import { FaBell } from "react-icons/fa";

import { useState } from "react";
import { useEffect } from "react";
import { NotificationContext } from "../../context/NotificationContext";
import { CSSTransition } from "react-transition-group";

import classes from "./Notification.module.css";
import "./Notification.css";
import {
  NotificationImportant,
  NotificationsActiveRounded,
  Restaurant,
} from "@mui/icons-material";

const Notification = () => {
  const { showNotification, notificationMessage } =
    useContext(NotificationContext);

  return createPortal(
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={showNotification}
      timeout={{
        enter: 100,
        entering: 100,
        exit: 200,
        exiting: 200,
      }}
      classNames="notification-slide"
    >
      <div className={classes.notification}>
        <span>
          <NotificationsActiveRounded />
        </span>
        <p>{notificationMessage}</p>
      </div>
    </CSSTransition>,
    document.getElementById("notification")
  );
};

export default Notification;

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
import { AnimatePresence, motion } from "framer-motion";

const Notification = () => {
  const { showNotification, notificationMessage } =
    useContext(NotificationContext);

  return createPortal(
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ translateX: "100%" }}
          animate={{ translateX: "0" }}
          exit={{ translateX: "100%" }}
          className={classes.notification}
        >
          <span>
            <NotificationsActiveRounded />
          </span>
          <p>{notificationMessage}</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("notification")
  );
};

export default Notification;

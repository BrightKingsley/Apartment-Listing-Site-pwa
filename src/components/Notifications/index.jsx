import React from "react";
import classes from "./Notifications.module.css";
import { FaCheckDouble, FaIdBadge } from "react-icons/fa";
import { Badge } from "@mui/material";
import { Check, CheckCircleRounded } from "@mui/icons-material";

const notifications = [1, 2, 3, 4, 5, 6, 7, 8];

const Notifications = ({ className }) => {
  return (
    <div className={`${classes.notifications} ${className}`}>
      {notifications.map((_, i) => (
        <div key={Math.random()} className={classes.notification}>
          {/* <span> */}
          {/* <img src={`../assets/${i + 1}.jpg`} alt="notif" /> */}
          {/* <span className={classes.badge}>
              <Badge  />
            </span> */}
          {/* </span> */}
          <p>Notification</p>
          <span className={classes.check}>
            <CheckCircleRounded />
          </span>
        </div>
      ))}
    </div>
  );
};

export default Notifications;

import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookMessenger } from "react-icons/fa";

import classes from "./MessageLink.module.css";
import { IconButton } from "@mui/material";
const MessageLink = () => {
  return (
    <span className={classes.messageLink}>
      <IconButton style={{ width: "100%", height: "100%" }}>
        <Link title="send message" to="message">
          <FaFacebookMessenger />
        </Link>
      </IconButton>
    </span>
  );
};

export default MessageLink;

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookMessenger } from "react-icons/fa";

import classes from "./MessageLink.module.css";
import { IconButton } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";
const MessageLink = () => {
  const { isAuth } = useContext(AuthContext);
  const { triggerModal } = useContext(ModalContext);

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/auth/login");
  };

  const handleClick = () => {
    isAuth
      ? navigate("/message")
      : triggerModal(
          "You must be logged in to send a message. Login now?",
          () => navigateLogin,
          () => triggerModal
        );
  };

  return (
    <span
      onClick={handleClick}
      title="send message"
      className={classes.messageLink}
    >
      <IconButton style={{ width: "100%", height: "100%" }}>
        <FaFacebookMessenger />
      </IconButton>
    </span>
  );
};

export default MessageLink;

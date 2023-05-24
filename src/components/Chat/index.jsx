import React, { useContext } from "react";
import Input from "../MsgInput";
import Messages from "../Messages";
import { ChatContext } from "../../context/ChatContext";
import { StyleContext } from "../../context/StyleContext";

//Style Classes
import classes from "./Chat.module.css";

import { ListRounded, NavigateNext } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import photo from "../../imgs/user.png";
import { AuthContext } from "../../context/AuthContext";

export default function Chat({ showDrawers = true }) {
  const { currentConversation, receiver } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  const { showSide, toggleSidebar, toggleClientList } =
    useContext(StyleContext);

  return (
    <div className={classes.chat}>
      <div className={classes.chatInfo}>
        <div className={classes.chatNav}>
          {showDrawers && (
            <IconButton
              className={classes.hamburger}
              onClick={() => {
                !showSide && toggleSidebar(true);
              }}
            >
              <NavigateNext />
            </IconButton>
          )}
          {currentConversation && (
            <div className={classes.chatName}>
              {/* {data.user?.photoURL && <img src={data.user?.photoURL} alt="" />}
            <span>{data.user?.displayName}</span> */}
              <img src={receiver?.image ? receiver?.image : photo} alt="" />
              <span>
                {/* {receiver?.firstname}  */}
                {user && " - Admin"}
              </span>
            </div>
          )}
          {showDrawers && (
            <IconButton
              className={classes.clientListToggle}
              onClick={() => {
                toggleClientList();
              }}
            >
              <ListRounded />
            </IconButton>
          )}
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

import React, { useContext, useEffect } from "react";
import Input from "../MsgInput";
import Messages from "../Messages";
import { ChatContext } from "../../context/ChatContext";
import Hamburger from "../../svg/Hamburger";
import { StyleContext } from "../../context/StyleContext";

//Style Classes
import classes from "./Chat.module.css";

import photo from "../../imgs/avatar2.png";
import { ListAltRounded } from "@mui/icons-material";
import { ListRounded, MenuBook, NavigateNext } from "@mui/icons-material";
import { FaHamburger } from "react-icons/fa";
import { Menu } from "@mui/material";

export default function Chat() {
  const { currentConversation, currentClient } = useContext(ChatContext);

  const { showSide, showClientsList, toggleSidebar, toggleClientList } =
    useContext(StyleContext);

  return (
    <div className={classes.chat}>
      <div className={classes.chatInfo}>
        <div className={classes.chatNav}>
          <div
            className={classes.hamburger}
            onClick={() => {
              !showSide && toggleSidebar(true);
            }}
          >
            <NavigateNext />
          </div>
          {currentConversation && (
            <div className={classes.chatName}>
              {/* {data.user?.photoURL && <img src={data.user?.photoURL} alt="" />}
            <span>{data.user?.displayName}</span> */}
              <img src={photo} alt="" />
              <span>{currentClient?.firstname}</span>
            </div>
          )}
          <div
            className={classes.clietListToggle}
            onClick={() => {
              toggleClientList();
            }}
          >
            <ListRounded />
          </div>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

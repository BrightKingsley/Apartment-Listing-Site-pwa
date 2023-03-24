import React, { useState, useEffect, useContext } from "react";

import Conversations from "../../../components/Conversations";
import Chat from "../../../components/Chat";
import classes from "./Messages.module.css";
import AllClients from "../../../components/AllClients";
import { ChatContext } from "../../../context/ChatContext";
import { AdminContext } from "../../../context/AdminContext";

const Messages = () => {
  const { adminId } = useContext(AdminContext);
  const { socket } = useContext(ChatContext);

  useEffect(() => {
    socket?.emit("addUser", adminId);
    socket?.on("getUsers", (users) => {
      // console.log("SOCKET_USERS:", users);
    });
  }, [socket, socket?.id, adminId]);

  return (
    <div className={classes.messageSection}>
      {/* <div> */}
      <h1>Messages</h1>
      {/* </div> */}
      <div className={classes.container}>
        <Conversations />
        <Chat />
        <AllClients />
      </div>
    </div>
  );
};

export default Messages;

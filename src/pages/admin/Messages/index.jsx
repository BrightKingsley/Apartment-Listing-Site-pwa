import React, { useState, useEffect, useContext } from "react";

import Conversations from "../../../components/Conversations";
import Chat from "../../../components/Chat";
import classes from "./Messages.module.css";
import { io } from "socket.io-client";
import { useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { connectToSocket } from "../../../api/socket";
import AllClients from "../../../components/AllClients";
import { ChatContext } from "../../../context/ChatContext";

const Messages = () => {
  const { userId } = useContext(AuthContext);
  const { socket } = useContext(ChatContext);

  useEffect(() => {
    socket?.emit("addUser", userId);
    socket?.on("getUsers", (users) => {
      console.log("SOCKET_USERS:", users);
    });
  }, [socket, socket?.id, userId]);

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

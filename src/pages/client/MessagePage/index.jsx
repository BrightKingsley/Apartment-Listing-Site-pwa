import React from "react";
import Chat from "../../../components/Chat";
import Header from "../../../components/Header";
import classes from "./Message.module.css";

const Message = () => {
  return (
    <div className={classes.message}>
      <Header />
      <div className={classes.chatContainer}>
        <Chat />
      </div>
    </div>
  );
};

export default Message;

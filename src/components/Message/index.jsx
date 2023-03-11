import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import photo from "../../imgs/avatar2.png";

import { format, render } from "timeago.js";
import moment from "moment/moment";

import classes from "./Message.module.css";

export default function Message({ messageInfo: message }) {
  const { userId } = useContext(AuthContext);

  // const { data } = useContext(ChatContext);

  // const [msgDate, setMsgDate] = useState("");

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={scrollRef}
      className={`${classes.message} && ${
        message?.senderId === userId && classes.owner
      }`}
    >
      <div className={classes.messageInfo}>
        <img src={photo} alt="" />
      </div>
      <div className={classes.messageContent}>
        {message?.text && <p>{message.text} </p>}
        {/* <img src={photo} alt="" /> */}
        <span>{moment(message?.createdAt).calendar().toLocaleLowerCase()}</span>
      </div>
    </div>
  );
}

import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import photo from "../../imgs/user.png";

// import { format, render } from "timeago.js";
import moment from "moment/moment";

import classes from "./Message.module.css";
import { AdminContext } from "../../context/AdminContext";

export default function Message({ messageInfo: message }) {
  const { adminId, admin } = useContext(AdminContext);
  const { user, userId } = useContext(AuthContext);

  const { receiver } = useContext(ChatContext);

  const [msgImg, setMsgImg] = useState("");

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  useEffect(() => {
    if (admin) {
      if (message?.senderId === adminId) {
        setMsgImg(admin?.image ? admin?.image : photo);
      } else {
        setMsgImg(receiver?.image ? receiver?.image : photo);
      }
    }

    if (user) {
      if (message?.senderId === userId) {
        setMsgImg(user?.image ? user?.image : photo);
      } else {
        setMsgImg(receiver?.image ? receiver?.image : photo);
      }
    }
  }, [message, admin?.image, adminId, receiver, user?.image, userId]);

  return (
    <div
      ref={scrollRef}
      className={`${classes.message} && ${
        (message?.senderId === user?.id || message?.senderId === adminId) &&
        classes.owner
      }`}
    >
      <div className={classes.messageInfo}>
        <img src={msgImg} alt="" />
        {/* <img src={receiver?.image} alt="" /> */}
      </div>
      <div className={classes.messageContent}>
        {message?.text && <p>{message.text} </p>}
        {/* <img src={photo} alt="" /> */}
        <span>{moment(message?.createdAt).calendar().toLocaleLowerCase()}</span>
      </div>
    </div>
  );
}

import React, { useContext, useEffect, useState } from "react";

//Components
import Message from "../Message";

//Context
import { ChatContext } from "../../context/ChatContext";
import { StyleContext } from "../../context/StyleContext";

//Style classes
import classes from "./Messages.module.css";

const Messages = () => {
  const { socket, messages, setMessages, currentConversation } =
    useContext(ChatContext);
  const { showClientsList, showSide, toggleSidebar, toggleClientList } =
    useContext(StyleContext);

  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    socket?.on("getMessage", (message) => {
      console.log("ARRIVALMESSAGE", message);
      setArrivalMessage({
        conversationId: currentConversation?._id,
        senderId: message?.senderId,
        text: message?.text,
        createdAt: Date.now(),
      });
    });
  }, [socket?.id, socket, currentConversation]);

  useEffect(() => {
    arrivalMessage &&
      currentConversation?.members.includes(arrivalMessage?.senderId);
    setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentConversation]);

  useEffect((e) => {
    // setMessages([
    //   {
    //     id: 1,
    //     text: "This is my first test",
    //     owner: true,
    //   },
    //   {
    //     id: 2,
    //     text: "This is my second test",
    //     owner: true,
    //   },
    //   {
    //     id: 3,
    //     text: "This is my third test",
    //     owner: false,
    //   },
    //   {
    //     id: 4,
    //     text: "This is my fourth test",
    //     owner: true,
    //   },
    //   {
    //     id: 5,
    //     text: "This is my fifth test",
    //     owner: false,
    //   },
    // {
    //   id: 5,
    //   text: "This is my fifth test",
    //   owner: false,
    // },
    // {
    //   id: 5,
    //   text: "This is my fifth test",
    //   owner: false,
    // },
    // {
    //   id: 5,
    //   text: "This is my fifth test",
    //   owner: false,
    // },
    // {
    //   id: 5,
    //   text: "This is my fifth test",
    //   owner: false,
    // },
    // {
    //   id: 5,
    //   text: "This is my fifth test",
    //   owner: false,
    // },
    // ]);
  }, []);

  return (
    <div
      className={classes.messages}
      onClick={() => {
        showSide && toggleSidebar(false);
        showClientsList && toggleClientList(false);
      }}
    >
      {currentConversation ? (
        messages?.map((message) => (
          <Message key={message?._id} messageInfo={message} />
        ))
      ) : (
        <div className={classes.msgPlaceholder}>
          <h2>Click on a user to send message</h2>
        </div>
      )}
    </div>
  );
};

export default Messages;

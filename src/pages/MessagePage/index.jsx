import React, { useCallback, useContext, useEffect, useState } from "react";
import Chat from "../../components/Chat";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import classes from "./Message.module.css";
import Unauthorized from "../Unauthorized";
import { addConversation, getConversationAdmin } from "../../api/conversations";

let count = 0;

const Message = () => {
  const { isAuth, userId, token } = useContext(AuthContext);
  const { socket } = useContext(ChatContext);
  const {
    conversations,
    getAllConversations,
    getCurrentConversation,
    setReceiver,
    setConversations,
    // currentConversation,
    // messages,
  } = useContext(ChatContext);

  const [client, setClient] = useState(null);

  // const addNewConversation = async (receiverId) => {
  //   if (conversations.length < 1 && isAuth && userId) {
  //     try {
  //       const response = await addConversation({ userId, receiverId }, token);
  //       const { newConversation } = response.data;
  //       if (newConversation) {
  //         setConversations((prev) => [...prev, newConversation]);
  //         getAdmin();
  //       }
  //     } catch (error) {
  //     }
  //   }
  // };

  useEffect(() => {
    document.title = "Raale. || Message";
  }, []);

  const getConversation = useCallback(async () => {
    try {
      const response = await getConversationAdmin(token);
      const admin = response.data;

      setClient(admin);

      if (admin) {
        const convos = await getAllConversations(userId, token);
        if (convos.length > 0) {
          getCurrentConversation(convos[0], token);
        } else {
          // addNewConversation(client.id, true);
          if (!conversations.length > 0 && isAuth && userId) {
            try {
              const response = await addConversation(
                { senderId: userId, receiverId: admin.id },
                token
              );
              const { newConversation } = response.data;
              if (newConversation) {
                count = 1;
                setConversations((prev) => [...prev, newConversation]);
                getCurrentConversation(newConversation, token);
              }
            } catch (error) {}
          }
        }
      }
    } catch (error) {}
  });

  useEffect(() => {
    socket?.emit("addUser", userId);
    socket?.on("getUsers", (users) => {});
  }, [socket, socket?.id, isAuth, userId]);

  useEffect(() => {
    client && setReceiver(client);

    if (userId) {
      if (conversations.length < 1 && isAuth && userId && count < 1) {
        count = 2;
        getConversation();
      }
    }
  }, []);

  return isAuth ? (
    <main className={classes.message}>
      <Header />
      <div className={classes.chatContainer}>
        <Chat showDrawers={false} />
      </div>
    </main>
  ) : (
    <Unauthorized
      message="You must be logged in to send a message"
      page="/auth/login"
    />
  );
};

export default Message;

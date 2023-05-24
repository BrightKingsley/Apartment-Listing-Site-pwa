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
  //   console.log("CONVO_LENGTH", conversations.length);
  //   if (conversations.length < 1 && isAuth && userId) {
  //     console.log(">---------CREATING--------->");
  //     try {
  //       const response = await addConversation({ userId, receiverId }, token);
  //       const { newConversation } = response.data;
  //       console.log("NEW_CONVERSATION", newConversation);
  //       if (newConversation) {
  //         setConversations((prev) => [...prev, newConversation]);
  //         getAdmin();
  //       }
  //     } catch (error) {
  //       console.log(error);
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
      console.log("ADMIN___!", admin);

      setClient(admin);

      if (admin) {
        const convos = await getAllConversations(userId, token);
        console.log("CONVOSSS___><", convos);
        if (convos.length > 0) {
          getCurrentConversation(convos[0], token);
        } else {
          console.log("else");
          // addNewConversation(client.id, true);
          if (!conversations.length > 0 && isAuth && userId) {
            console.log("OKAy");
            try {
              const response = await addConversation(
                { senderId: userId, receiverId: admin.id },
                token
              );
              console.log(">---------CREATED--------->");
              const { newConversation } = response.data;
              console.log("NEW_CONVERSATION", newConversation);
              if (newConversation) {
                count = 1;
                setConversations((prev) => [...prev, newConversation]);
                getCurrentConversation(newConversation, token);
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    socket?.emit("addUser", userId);
    socket?.on("getUsers", (users) => {
      // console.log("SOCKET_USERS:", users);
    });
  }, [socket, socket?.id, isAuth, userId]);

  useEffect(() => {
    client && setReceiver(client);

    if (userId) {
      if (conversations.length < 1 && isAuth && userId && count < 1) {
        console.log("running");
        count = 2;
        getConversation();
      }
    }
  }, [
    token,
    socket?.id,
    socket,
    client,
    conversations.length,
    getConversation,
    isAuth,
    setReceiver,
    userId,
  ]);

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

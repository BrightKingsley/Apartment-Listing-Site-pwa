import React, { useContext, useEffect, useState } from "react";
import { getUser } from "../../../api/user";
import Chat from "../../../components/Chat";
import Header from "../../../components/Header";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import classes from "./Message.module.css";
import { getAdmin } from "../../../api/admin";
import Unauthorized from "../../Unauthorized";

const Message = () => {
  const { isAuth, userId, token } = useContext(AuthContext);
  const { socket } = useContext(ChatContext);
  const {
    conversations,
    getAllConversations,
    getCurrentConversation,
    setReceiver,
  } = useContext(ChatContext);

  const [client, setClient] = useState(null);

  useEffect(() => {
    const admin = conversations[0]?.members.find((m) => m.id !== userId);

    const getUserAndMsgsById = async () => {
      try {
        const adminRes = await getAdmin(admin.id, token);
        console.log("CLIENT", adminRes.data);
        setClient(adminRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserAndMsgsById();
  }, [isAuth, userId, token, conversations[0]?.members, conversations[0]?._id]);

  useEffect(() => {
    socket?.emit("addUser", userId);
    socket?.on("getUsers", (users) => {
      console.log("SOCKET_USERS:", users);
    });
  }, [socket, socket?.id, isAuth, userId]);

  useEffect(() => {
    userId && getAllConversations(userId, token);
  }, [userId]);

  useEffect(() => {
    console.log("CLIENT_TEST", client);
    client && setReceiver(client);
    getCurrentConversation(conversations[0], token);
  }, [conversations, token, socket?.id, socket, client]);

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

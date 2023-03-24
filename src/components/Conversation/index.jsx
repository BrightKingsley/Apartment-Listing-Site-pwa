import { useEffect, useState, useContext } from "react";
import { getUser } from "../../api/user";
import { AuthContext } from "../../context/AuthContext";
import classes from "./Conversation.module.css";
import { getMessages } from "../../api/messages";
import { ChatContext } from "../../context/ChatContext";
import { StyleContext } from "../../context/StyleContext";
import { convertLength } from "@mui/material/styles/cssUtils";
import { AdminContext } from "../../context/AdminContext";

import userProfile from "../../imgs/user.png";

const Conversation = ({
  index,
  active,
  setActive,
  conversation,
  currentUser,
}) => {
  const { toggleSidebar } = useContext(StyleContext);
  const { adminId, token } = useContext(AdminContext);
  const { setReceiver, messages, getCurrentConversation, getAllMessages } =
    useContext(ChatContext);

  const [message, setMessage] = useState(null);

  const [client, setClient] = useState(null);

  useEffect(() => {
    const clientId = conversation?.members.find((m) => m.id !== adminId);

    const getUserAndMsgsById = async () => {
      try {
        const clientRes = await getUser(clientId.id, token);
        const msgRes = await getMessages(conversation?._id, token);
        setMessage(msgRes.data.messages);
        setClient(clientRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserAndMsgsById();
  }, [adminId, token, conversation?.members, conversation?._id]);

  return (
    <div
      className={`${classes.userChat} ${
        index + 1 === active ? classes.active : null
      }`}
      onClick={() => {
        setActive(index + 1);
        toggleSidebar(false);
        setReceiver(client);
        getCurrentConversation(conversation, token);
      }}
    >
      <span className={classes.conversationImg}>
        <img src={client?.image ? client.image : userProfile} alt="" />
      </span>
      <div className={classes.userChatInfo}>
        <span>{client?.firstname}</span>

        <p className={classes.lastMessage}>
          {message && message[message.length - 1]?.text}
        </p>
      </div>
    </div>
  );
};

export default Conversation;

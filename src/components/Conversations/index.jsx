import React, { useContext, useEffect, useState } from "react";
import Chats from "../Chats-delete";
import Search from "../MsgSearch";
import Navbar from "../MsgNavbar";
import { StyleContext } from "../../context/StyleContext";

import classes from "./Conversations.module.css";
import Conversation from "../Conversation";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { AdminContext } from "../../context/AdminContext";
import { Avatar, Skeleton, Typography } from "@mui/material";
import ActivityIndicator from "../ActivityIndicator/index";

const Conversations = () => {
  const { showSide } = useContext(StyleContext);

  /////////////////////////////////////////////////////////
  const [active, setActive] = useState(1);

  const { adminId, token } = useContext(AdminContext);
  const { convoLoading, conversations, getAllConversations } =
    useContext(ChatContext);

  useEffect(() => {
    adminId && getAllConversations(adminId, token);
  }, [adminId]);

  /////////////////////////////////////////////////////////

  return (
    <div
      className={`${classes.sidebar} ${showSide ? classes.showSide : null} `}
    >
      <Navbar />
      {/* <Search /> */}
      <div className={classes.chats}>
        {convoLoading ? (
          <ActivityIndicator variant="dash" color="accent" bg="trans" />
        ) : (
          conversations?.map((c, i) => (
            <Conversation
              key={c._id}
              active={active}
              index={i}
              setActive={setActive}
              conversation={c}
              currentUser={adminId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Conversations;

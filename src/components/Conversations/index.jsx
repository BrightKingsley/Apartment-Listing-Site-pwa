import React, { useContext, useEffect, useState } from "react";
import Chats from "../Chats-delete";
import Search from "../MsgSearch";
import Navbar from "../MsgNavbar";
import { StyleContext } from "../../context/StyleContext";

import classes from "./Conversations.module.css";
import Conversation from "../Conversation";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Conversations = () => {
  const { showSide } = useContext(StyleContext);
  /////////////////////////////////////////////////////////
  const [active, setActive] = useState(1);

  const { userId } = useContext(AuthContext);
  const { convoLoading, conversations, getAllConversations } =
    useContext(ChatContext);

  useEffect(() => {
    userId && getAllConversations();
  }, [userId]);

  /////////////////////////////////////////////////////////

  return (
    <div
      className={`${classes.sidebar} ${showSide ? classes.showSide : null} `}
    >
      <Navbar />
      {/* <Search /> */}
      <div className={classes.chats}>
        {convoLoading ? (
          <h2>Loading...</h2>
        ) : (
          conversations?.map((c, i) => (
            <Conversation
              key={c._id}
              active={active}
              index={i}
              setActive={setActive}
              conversation={c}
              currentUser={userId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Conversations;

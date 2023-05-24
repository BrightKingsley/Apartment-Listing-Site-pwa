import React, { useContext, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

//Context
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

//Stytle Classes
import classes from "./MsgInput.module.css";
import { ImageRounded, SendRounded } from "@mui/icons-material";
import { sendMessage } from "../../api/messages";
import { AdminContext } from "../../context/AdminContext";

const Input = () => {
  const { currentConversation, receiver, setMessages, socket } =
    useContext(ChatContext);
  const [text, setText] = useState("");
  const { userId, token } = useContext(AuthContext);
  const { adminId, token: adminToken } = useContext(AdminContext);

  const handleSend = async () => {
    const newMessage = {
      conversationId: currentConversation._id,
      senderId: userId || adminId,
      text,
    };

    console.log("SENDER", newMessage.senderId);

    socket?.emit("sendMessage", {
      senderId: userId || adminId,
      receiverId: receiver?.id,
      text,
    });

    try {
      const response = await sendMessage(newMessage, token || adminToken);
      setMessages((prev) => [...prev, response.data]);
      setText("");
    } catch (error) {}
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  return (
    <div className={classes.input}>
      <ReactTextareaAutosize
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
        maxRows={3}
        minRows={1}
      />
      <div className={classes.action}>
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          // onChange={(e) => setImg(e.target.files[0])}
        />
        <label className={classes.imgIcon} htmlFor="file">
          <ImageRounded />
        </label>
        {/* <button id="send" onClick={handleSend} /> */}
        <button id="send" onClick={handleSend} />
        <label htmlFor="send" className={classes.sendIcon}>
          <SendRounded />
        </label>
      </div>
    </div>
  );
};

export default Input;

import React, { useContext, useEffect, useState } from "react";
import photo from "../../imgs/user.png";
import { StyleContext } from "../../context/StyleContext";
import { getUsers } from "../../api/users";
import { AuthContext } from "../../context/AuthContext";
import Button from "../UI/Button/index";
import { CSSTransition } from "react-transition-group";

import classes from "./AllClients.module.css";
import "./AllClients.css";
import { addConversation } from "../../api/conversations";
import { ChatContext } from "../../context/ChatContext";
import Dropdown from "../Dropdown";
import { AdminContext } from "../../context/AdminContext";
import { ListRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const isImage = (val) => {
  return /\.(png|jpe?g)$/.test(val);
};

const AllClients = () => {
  const { showClientsList, toggleClientList } = useContext(StyleContext);
  const { setConversations } = useContext(ChatContext);
  // const { userId, token } = useContext(AuthContext);
  const { adminId, token } = useContext(AdminContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(null);

  const senderId = adminId;
  const addNewConversation = async (receiverId) => {
    try {
      const response = await addConversation({ senderId, receiverId }, token);
      const { newConversation } = response.data;
      console.log("NEW_CONVERSATION", newConversation);
      if (newConversation) {
        setConversations((prev) => [...prev, newConversation]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers(token);
      const users = response.data?.users;
      if (users) {
        setUsers(users);
      } else {
        setError(response.data);
        console.log("ERROR", response.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div
      className={`${classes.allClients} ${
        showClientsList ? classes.showAllClients : null
      }`}
    >
      <IconButton
        className={classes.clientListToggle}
        onClick={() => {
          toggleClientList();
        }}
      >
        <ListRounded />
      </IconButton>
      <div>
        {users?.map((user, index) => {
          return (
            <div className={classes.userWrapper} key={Math.random()}>
              <div onClick={() => setOpen(index + 1)} className={classes.user}>
                <span>
                  <img
                    src={
                      user?.image && user?.image.length > 1
                        ? user?.image
                        : photo
                    }
                    alt="profile"
                  />
                </span>
                <p>{user?.firstname}</p>
              </div>
              <Dropdown
                show={open === index + 1}
                actionCancel={() => {
                  setOpen(null);
                }}
                actionConfirm={() => {
                  setOpen(null);
                  addNewConversation(user._id);
                }}
                text="do you want to start a conversation with this user?"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllClients;

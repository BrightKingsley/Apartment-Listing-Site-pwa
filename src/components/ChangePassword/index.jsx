import React, { useContext, useEffect, useState } from "react";
import Input from "../Input";
import classes from "./ChangePassword.module.css";
import Overlay from "../Overlay";
import { Button, IconButton } from "@mui/material";
import { updateUser } from "../../api/user";
import { AuthContext } from "../../context/AuthContext";
import { Close } from "@mui/icons-material";
import { createPortal } from "react-dom";
import { NotificationContext } from "../../context/NotificationContext";

const ChangePassword = ({ changePassword, setChangePassword }) => {
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirtmPass] = useState("");

  const { token } = useContext(AuthContext);
  const { triggerNotification } = useContext(NotificationContext);

  useEffect(() => {
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await updateUser(token, { prevPassword, newPassword });
      const { user } = response.data;
      if (user) {
        triggerNotification("password changed successfully");
      } else {
        triggerNotification("password operation failed");
      }
    } catch (error) {
      triggerNotification("Something went wrong");
    }
  };

  const handleCancel = () => {
    setChangePassword(false);
    setPrevPassword("");
    setNewPassword("");
    setConfirtmPass("");
  };

  return createPortal(
    <Overlay show={changePassword}>
      <div className={classes.changePassword}>
        <span
          className={classes.close}
          onClick={() => setChangePassword(false)}
        >
          <IconButton>
            <Close />
          </IconButton>
        </span>
        <form action="submit" onSubmit={handleSubmit}>
          <p>Change password:</p>
          <div>
            <Input
              placeholder="previous password"
              value={prevPassword}
              setValue={setPrevPassword}
              type="password"
            />
            <Input
              placeholder="new password"
              value={newPassword}
              setValue={setNewPassword}
              type="password"
            />
            <Input
              className={
                confirmPass === newPassword
                  ? classes.confirmed
                  : classes.notConfirmed
              }
              placeholder="confirm password"
              value={confirmPass}
              setValue={setConfirtmPass}
              type="text"
            />
          </div>
        </form>
        <div className={classes.buttons}>
          <Button
            disableElevation={true}
            style={{
              backgroundColor: "#d34949",
              color: "#fff",
              fontWeight: "bold",
            }}
            onClick={() => {
              handleCancel();
            }}
          >
            cancel
          </Button>
          <Button
            disableElevation={true}
            style={{
              backgroundColor: "#07594b",
              color: "#fff",
              fontWeight: "bold",
            }}
            onClick={() => {
              handleSubmit();
            }}
          >
            confirm
          </Button>
        </div>
      </div>
    </Overlay>,
    document.getElementById("modal")
  );
};

export default ChangePassword;

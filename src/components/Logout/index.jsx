import React, { useContext } from "react";
import classes from "./Logout.module.css";
import { IoLogOut, IoLogOutOutline, IoLogOutSharp } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";

const Logout = () => {
  const { logoutHandler } = useContext(AuthContext);
  const { triggerModal } = useContext(ModalContext);

  return (
    <div
      title="logout"
      className={classes.logout}
      onClick={() =>
        triggerModal(
          "Are you sure you want to log out?",
          () => logoutHandler,
          () => triggerModal
        )
      }
    >
      <span>
        <IoLogOutOutline />
      </span>
      Logout
    </div>
  );
};

export default Logout;

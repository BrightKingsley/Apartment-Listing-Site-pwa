import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../svg/LogoutIcon";

import photo from "../../imgs/avatar2.png";

import classes from "./MsgNavbar.module.css";

export default function MsgNavbar() {
  const { user } = useContext(AuthContext);

  return (
    <div className={classes.navbar}>
      {/* <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
      </div>

      <button
        onClick={() => {
          signOut(auth);
          navigate("/login");
        }}
      >
        <LogoutIcon /> <p>Logout</p>
      </button> */}
      {user && (
        <div className={classes.user}>
          <img src={photo} alt="" />
          <span>{user?.firstname}</span>
        </div>
      )}
    </div>
  );
}

import React, { useContext } from "react";

import photo from "../../imgs/user.png";

import classes from "./MsgNavbar.module.css";
import { AdminContext } from "../../context/AdminContext";
import { IconButton } from "@mui/material";
import { StyleContext } from "../../context/StyleContext";
import { NavigateBeforeRounded } from "@mui/icons-material";

export default function MsgNavbar() {
  const { admin } = useContext(AdminContext);
  const { toggleSidebar } = useContext(StyleContext);

  return (
    <div className={classes.navbar}>
      <span className={classes.hamburger}>
        <IconButton
          onClick={() => {
            toggleSidebar(false);
          }}
        >
          <NavigateBeforeRounded />
        </IconButton>
      </span>
      {admin && (
        <div className={classes.user}>
          <img src={admin?.image ? admin?.image : photo} alt="" />
          <span>{admin?.firstname}</span>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import classes from "./Edit.module.css";
import { IconButton } from "@mui/material";
import { EditRounded } from "@mui/icons-material";
import Dropdown from "../Dropdown/index";

const Edit = ({ text, actionConfirm }) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className={classes.editWrapper}>
      <span
        className={classes.edit}
        onClick={() => {
          setEdit(true);
        }}
      >
        <IconButton>
          <EditRounded />
        </IconButton>
      </span>
      <Dropdown
        className={classes.dropdown}
        show={edit}
        text={text}
        actionCancel={() => {
          setEdit(false);
        }}
        actionConfirm={() => {
          setEdit(false);
          actionConfirm();
        }}
      />
    </div>
  );
};

export default Edit;

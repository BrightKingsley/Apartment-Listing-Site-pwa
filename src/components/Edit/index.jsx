import React, { useContext, useEffect, useState } from "react";
import classes from "./Edit.module.css";
import { IconButton, Button } from "@mui/material";
import { EditRounded } from "@mui/icons-material";
import Dropdown from "../Dropdown/index";
import { AuthContext } from "../../context/AuthContext";

const Edit = ({ text, actionConfirm, images, setImages }) => {
  const [edit, setEdit] = useState(false);
  // const { adminWriteAccess } = useContext(AdminContext);
  const { user, adminWriteAccess } = useContext(AuthContext);

  return (
    adminWriteAccess &&
    user?.isAdmin && (
      <div className={classes.editWrapper}>
        <IconButton
          className={classes.edit}
          onClick={() => {
            setEdit(true);
          }}
        >
          <EditRounded />
        </IconButton>
        <Dropdown
          className={classes.dropdown}
          show={adminWriteAccess && user?.isAdmin}
          text={text}
          actionCancel={() => {
            console.log("DROP_CLICKED");
            setEdit(false);
          }}
          actionConfirm={() => {
            console.log("DROP_CLICKED");
            setEdit(false);
            actionConfirm()();
          }}
          altConfirm={
            images && (
              <Button variant="contained" component="label">
                Upload
                <input
                  onInput={(e) => {
                    setImages(e.target.files);
                  }}
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                />
              </Button>
            )
          }
        />
      </div>
    )
  );
};

export default Edit;

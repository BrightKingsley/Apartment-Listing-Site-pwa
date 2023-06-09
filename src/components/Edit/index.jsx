import React, { useContext, useState } from "react";
import classes from "./Edit.module.css";
import { IconButton, Button } from "@mui/material";
import { EditRounded } from "@mui/icons-material";
import Dropdown from "../Dropdown/index";
import { AdminContext } from "../../context/AdminContext";

const Edit = ({ text, actionConfirm, images, setImages }) => {
  const [edit, setEdit] = useState(false);
  const { adminWriteAccess } = useContext(AdminContext);

  return (
    adminWriteAccess && (
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
          show={edit}
          text={text}
          actionCancel={() => {
            setEdit(false);
          }}
          actionConfirm={() => {
            setEdit(false);
            actionConfirm();
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

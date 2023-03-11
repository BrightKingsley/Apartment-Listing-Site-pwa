import { Edit } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import Dropdown from "../Dropdown";
import Logout from "../Logout";
import ProfileImg from "../ProfileImg";
import classes from "./UserProfile.module.css";
import Button from "../UI/Button/index";
import ImageFile from "../ImageFile";

import profileImg from "../../imgs/avatar3.jpg";
import { updateUser } from "../../api/user";

const UserProfile = () => {
  const { user, token, setUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [img, setImg] = useState(null);

  const [imageURI, setImageURI] = useState(null);

  useEffect(() => {
    console.log("USER:", user);
  }, [user]);

  const readURI = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        setImageURI(ev.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  console.log(user?.image);

  const handleFileSubmit = async () => {
    try {
      const response = await updateUser(token, { image: img });
      console.log("RES_DATA", response.data);
      const { user } = response.data;
      if (user) {
        setUser(user);
      } else {
        return console.log("Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.userProfile}>
      <div className={classes.top}>
        <span>
          <span className={classes.profileImg}>
            <ProfileImg
              img={
                imageURI
                  ? imageURI
                  : user?.image && user?.image.length > 1
                  ? user?.image
                  : profileImg
              }
            />
          </span>
          <span className={classes.edit} onClick={() => setOpen(true)}>
            <Edit />
          </span>
        </span>
        <h3>{user?.firstname}</h3>
        <p>{user?.email}</p>
        <Dropdown
          className={classes.dropdown}
          show={open}
          text="change profile image?"
          actionCancel={() => {
            // setImageURI(user?.image);
            setOpen(false);
          }}
          altConfirm={
            <div>
              <label htmlFor="profileImg" className={classes.inputSelect}>
                confirm
              </label>
              <input
                onChange={(e) => {
                  readURI(e);
                  setImg(e.target.files);
                  setOpen(false);
                  setConfirm(true);
                }}
                hidden
                id="profileImg"
                type="file"
              />
            </div>
          }
        />
        <Dropdown
          className={classes.dropdown}
          show={confirm}
          text="save"
          actionCancel={() => {
            setImageURI(user?.image);
            setConfirm(false);
          }}
          actionConfirm={() => {
            setConfirm(false);
            handleFileSubmit();
          }}
        />
      </div>
      <div className={classes.body}>
        <span>Bookmarks</span>
        <Logout />
      </div>
    </div>
  );
};

export default UserProfile;

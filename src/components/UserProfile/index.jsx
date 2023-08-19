import { Edit } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import Dropdown from "../Dropdown";
import Logout from "../Logout";
import ProfileImg from "../ProfileImg";
import classes from "./UserProfile.module.css";

import profileImg from "../../imgs/user.png";
import { updateUser } from "../../api/user";
import { NotificationContext } from "../../context/NotificationContext";
import ChangePassword from "../ChangePassword";

const UserProfile = ({ user, token, setUser }) => {
  const [open, setOpenDropdown] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [img, setImg] = useState(null);
  const [imageURI, setImageURI] = useState(null);
  const [changePassword, setChangePassword] = useState(false);

  const { triggerNotification } = useContext(NotificationContext);

  const readURI = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        setImageURI(ev.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleFileSubmit = async () => {
    try {
      const response = await updateUser(token, { image: img });
      const profile = response.data.user || response.data.admin;
      if (profile) {
        setUser(profile);
        triggerNotification("Profile updated successfully ");
      } else {
        triggerNotification("Profile update failed");
        setImageURI(user?.image);
        setConfirm(false);
      }
    } catch (error) {
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
          <span className={classes.edit} onClick={() => setOpenDropdown(true)}>
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
            setOpenDropdown(false);
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
                  setOpenDropdown(false);
                  setConfirm(true);
                }}
                accept="image/*"
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
        <div
          className={classes.changePassword}
          onClick={() => setChangePassword(true)}
        >
          <p>Change Password</p>
        </div>
        <Logout />
      </div>
      {changePassword && (
        <ChangePassword
          changePassword={changePassword}
          setChangePassword={setChangePassword}
        />
      )}
    </div>
  );
};

export default UserProfile;

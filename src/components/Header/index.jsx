import React, { useState, useContext, useEffect } from "react";

//Components
import Bookmarks from "../Bookmarks";
import Notifications from "../Notifications";
import Panel from "../Panel";
import SearchInput from "../SearchInput";
import UserProfile from "../UserProfile";
import ProfileImg from "../ProfileImg";
import profileImg from "../../imgs/avatar3.jpg";

// Style classes
import classes from "./Header.module.css";
// import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Bookmark,
  BookmarkRounded,
  NotificationsActiveRounded,
  NotificationsRounded,
} from "@mui/icons-material";
import { Badge, Switch, ToggleButton } from "@mui/material";
const Header = ({ searchbar }) => {
  const [showPanel, setShowPanel] = useState(false);
  const [panelContent, setPanelContent] = useState("");
  const [showAccountItems, setShowAccountItems] = useState(false);

  const { user, userId, isAuth } = useContext(AuthContext);

  useEffect(() => {
    isAuth && userId ? setShowAccountItems(true) : setShowAccountItems(false);
  }, [isAuth, showAccountItems, userId]);

  const togglePanel = (content) => {
    if (panelContent === content) {
      setShowPanel(false);
      setPanelContent("");
    } else {
      setShowPanel(true);
      setPanelContent(content);
    }
  };

  return (
    <header className={classes.header}>
      <div className={classes.left}>
        <span>LOGO</span>
      </div>

      <Switch defaultChecked color="success" />
      <div className={classes.right}>
        {searchbar && <SearchInput />}
        {showAccountItems ? (
          <>
            <span
              className={
                panelContent === "bookmarks" ? classes.activeNav : null
              }
              onClick={() => togglePanel("bookmarks")}
              title="bookmarks"
            >
              <Bookmark />
            </span>
            <span
              className={
                panelContent === "notifications" ? classes.activeNav : null
              }
              onClick={() => togglePanel("notifications")}
              title="notifications"
            >
              <NotificationsRounded />
            </span>
            {/* <span><img src="" alt="" /></span> */}
            <span
              className={`${classes.profileImg} ${
                panelContent === "profile" ? classes.activeNav : null
              }`}
              onClick={() => togglePanel("profile")}
              title="profile"
            >
              <ProfileImg
                img={
                  user?.image && user?.image.length > 1
                    ? user?.image
                    : profileImg
                }
              />
            </span>
          </>
        ) : (
          <>
            <Link to="/auth/login" className={classes.login}>
              Login
            </Link>
            <Link to="/auth/signup" className={classes.signup}>
              Signup
            </Link>
          </>
        )}
      </div>

      {showAccountItems && (
        <Panel
          showPanel={showPanel}
          hidePanel={{ setShowPanel, setPanelContent }}
        >
          {panelContent === "bookmarks" ? (
            <Bookmarks />
          ) : panelContent === "profile" ? (
            <UserProfile />
          ) : panelContent === "notifications" ? (
            <Notifications />
          ) : null}
        </Panel>
      )}
    </header>
  );
};

export default Header;

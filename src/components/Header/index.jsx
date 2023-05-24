import React, { useState, useContext, useEffect } from "react";

//Components
import Bookmarks from "../Bookmarks";
import Notifications from "../Notifications";
import Panel from "../Panel";
import SearchInput from "../SearchInput";
import UserProfile from "../UserProfile";
import ProfileImg from "../ProfileImg";
import profileImg from "../../imgs/user.png";

// Style classes
import classes from "./Header.module.css";
// import { AuthContext } from "../../context/AuthContext";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Bookmark } from "@mui/icons-material";
import { Switch } from "@mui/material";

const Header = ({ searchbar }) => {
  const [showPanel, setShowPanel] = useState(false);
  const [panelContent, setPanelContent] = useState("");
  const [showAccountItems, setShowAccountItems] = useState(false);

  const { user, userId, isAuth, token, setUser, setAdminWriteAccess } =
    useContext(AuthContext);

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

  const hidePanel = () => {
    setShowPanel(false);
    setPanelContent("");
  };

  return (
    <header className={classes.header}>
      <div className={classes.headerWrapper}>
        <div className={classes.left}>
          <span>Raale</span>
        </div>

        {user?.isAdmin && (
          <Switch
            onChange={(e) => setAdminWriteAccess((prev) => !prev)}
            color="accent"
          />
        )}
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
              {/* <span
                className={
                  panelContent === "notifications" ? classes.activeNav : null
                }
                onClick={() => togglePanel("notifications")}
                title="notifications"
              >
                <NotificationsRounded />
              </span> */}
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
          <Panel showPanel={showPanel} hidePanel={hidePanel}>
            {panelContent === "bookmarks" ? (
              <Bookmarks />
            ) : panelContent === "profile" ? (
              <UserProfile user={user} token={token} setUser={setUser} />
            ) : panelContent === "notifications" ? (
              <Notifications />
            ) : null}
          </Panel>
        )}
      </div>
    </header>
  );
};

export default Header;

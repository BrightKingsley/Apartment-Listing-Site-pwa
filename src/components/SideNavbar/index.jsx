import React from "react";
import { NavLink } from "react-router-dom";
import "./SideNavbar.css";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import {
  ChatRounded,
  DashboardRounded,
  ExpandLessRounded,
  ExpandMoreRounded,
  QueueRounded,
  SettingsRounded,
} from "@mui/icons-material";

const SideBar = () => {
  const [showSide, setShowSide] = useState(true);

  const toggleSidebar = () => {
    setShowSide((prev) => !prev);
  };

  return (
    <>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={showSide}
        timeout={{
          enter: 100,
          entering: 100,
          exit: 100,
          exiting: 100,
        }}
        classNames="nav-slide"
      >
        <nav className="nav">
          <div className="navWrapper">
            <span className="logo">LOGO</span>

            <NavLink to="dashboard">
              <DashboardRounded />
            </NavLink>

            <NavLink to="add-listing">
              <QueueRounded />
            </NavLink>

            <NavLink to="messages">
              <ChatRounded />
            </NavLink>
          </div>
          <span className="settings">
            <SettingsRounded />
          </span>
        </nav>
      </CSSTransition>
      <span
        className="hamburger"
        onClick={() => {
          toggleSidebar();
        }}
      >
        {showSide ? <ExpandMoreRounded /> : <ExpandLessRounded />}
      </span>
    </>
  );
};

export default SideBar;

import React, { useEffect } from "react";
import {
  FaClosedCaptioning,
  FaCross,
  FaMap,
  FaSkullCrossbones,
} from "react-icons/fa";
import { IoClose, IoContrastSharp } from "react-icons/io5";
import { CSSTransition } from "react-transition-group";
import classes from "./Panel.module.css";
import "./panelAnimation.css";

const Panel = ({ children, showPanel, hidePanel }) => {
  const hide = () => {
    hidePanel();
  };

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={showPanel}
      timeout={{
        enter: 300,
        entering: 300,
        exit: 400,
        exiting: 400,
      }}
      classNames="panel-slide"
    >
      <div className={classes.panel}>
        <span className={classes.exit} onClick={hide}>
          <IoClose />
        </span>
        {children}
      </div>
    </CSSTransition>
  );
};

export default Panel;

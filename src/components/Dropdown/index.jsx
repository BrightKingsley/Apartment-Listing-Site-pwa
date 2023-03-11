import React from "react";
import classes from "./Dropdown.module.css";
import "./Dropdown.css";
import { CSSTransition } from "react-transition-group";
import Button from "../UI/Button/index";
// import { Button } from "@mui/material";

const Dropdown = ({
  show,
  text,
  actionCancel,
  actionConfirm,
  className,
  altConfirm,
}) => {
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={show}
      timeout={{
        enter: 200,
        entering: 200,
        exit: 200,
        exiting: 200,
      }}
      classNames="dropDown-slide"
    >
      <div className={`${classes.dropDown} ${className}`}>
        <p>{text}</p>
        <div>
          <Button onClick={actionCancel} type="error">
            cancel
          </Button>
          {!altConfirm ? (
            <Button onClick={actionConfirm}>confirm</Button>
          ) : (
            altConfirm
          )}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Dropdown;

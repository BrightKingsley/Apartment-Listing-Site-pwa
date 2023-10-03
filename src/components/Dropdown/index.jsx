import React from "react";
import classes from "./Dropdown.module.css";
import "./Dropdown.css";
import { CSSTransition } from "react-transition-group";
import Button from "../UI/Button/index";
import { motion, AnimatePresence } from "framer-motion";
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
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ translateY: "-20%" }}
          animate={{ translateY: 0 }}
          exit={{ translateY: "-20%" }}
          className={`${classes.dropDown} ${className}`}
        >
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dropdown;

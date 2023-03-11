import React, { useEffect, useState } from "react";
import classes from "./Overlay.module.css";

const Overlay = ({ children, show, handleshowOverlay, disableOnClick }) => {
  return (
    show &&
    (children ? (
      <div
        className={classes.overlay}
        onClick={disableOnClick ? () => handleshowOverlay() : null}
        title={disableOnClick ? "close" : ""}
      >
        {children}
      </div>
    ) : (
      <div
        className={classes.overlay}
        onClick={disableOnClick ? () => handleshowOverlay() : null}
        title={disableOnClick ? "close" : ""}
      />
    ))
  );
};

export default Overlay;

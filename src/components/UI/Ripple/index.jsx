import React, { useEffect } from "react";
import { useState } from "react";
import classes from "./RippleWrapper.module.css";

const Ripple = ({ children, onClick, onMouseEnter, type, className }) => {
  const [showRipple, setShowRipple] = useState(false);
  const [x, setx] = useState(null);
  const [y, sety] = useState(null);

  const triggerRipple = (message) => {
    setShowRipple(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRipple(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [showRipple, setShowRipple]);

  const handleClick = (e) => {
    setx(e.clientX - e.target.offsetLeft);
    sety(e.clientY - e.target.offsetTop);
    // sety(e.layerY);
    triggerRipple();
    onClick();
  };

  const handleMouseEnter = () => {
    onMouseEnter && onMouseEnter();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`${className ? className : null} ${classes.wrapper}`}
    >
      <span
        className={
          showRipple
            ? `${classes.ripple} ${
                type === "dark" ? classes.rippleDark : null
              } `
            : null
        }
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
      ></span>
      {children}
    </div>
  );
};

export default Ripple;

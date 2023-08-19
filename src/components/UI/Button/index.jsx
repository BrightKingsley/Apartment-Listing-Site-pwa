import { ThemeProvider } from "@emotion/react";
// import { Button } from "@mui/material";
import { createTheme } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import classes from "./Button.module.css";

const Button = ({ children, onClick, type }) => {
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
    sety(e.layerY);
    // sety(e.clientY - e.target.offsetTop);
    triggerRipple();
    typeof OnCLick === "function" && onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`${classes.button} ${
        type === "light"
          ? classes.buttonLight
          : type === "error"
          ? classes.buttonError
          : null
      }`}
    >
      <span
        className={
          showRipple
            ? `${classes.ripple} ${
                type === "light" ? classes.rippleLight : null
              } `
            : null
        }
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
      ></span>
      <p>{children}</p>
    </button>
  );
};

export default Button;

const MyButton = ({ children, onClick, color }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#07594b",
      },
      secondary: {
        main: "#0b947e",
      },
    },
  });

  return (
    // <ThemeProvider>
    <Button color="success" variant="contained" onClick={onClick}>
      {children}
    </Button>
    // </ThemeProvider>
  );
};

// export default MyButton;

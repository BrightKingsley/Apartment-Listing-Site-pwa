import React from "react";
import classes from "./Hamburger.module.css";

const Hamburger = () => {
  return (
    <svg
      className={classes.hamburger}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      //   fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 5H11M3 12H16M3 19H21"
        // stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Hamburger;

import React from "react";
import classes from "./Checkbox.module.css";

const Checkbox = ({ label }) => {
  return (
    <div className={classes.checkbox}>
      <input type="checkbox" onChange={() => {}} />
      <label htmlFor="con">
        <small> {label}</small>
      </label>
    </div>
  );
};

export default Checkbox;

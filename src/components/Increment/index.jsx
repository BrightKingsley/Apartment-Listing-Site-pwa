import React, { useState } from "react";
import classes from "./Increment.module.css";

const Increment = () => {
  const [value, setValue] = useState(1);

  const handleIncrement = () => {
    setValue((prevValue) => (prevValue += 1));
  };
  const handleDecrement = () => {
    setValue((prevValue) => (prevValue > 1? (prevValue -= 1) : prevValue));
  };

  return (
    <div className={classes.container}>
      <span onClick={handleDecrement}>-</span>
      <small>{value}</small>
      <span onClick={handleIncrement}>+</span>
    </div>
  );
};

export default Increment;

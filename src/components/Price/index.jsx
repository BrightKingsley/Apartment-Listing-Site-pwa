import React from "react";
import classes from "./Price.module.css";

const Price = ({ price, duration }) => {
  return (
    <p className={classes.price}>
      ${price}
      {/* <small>/{duration}</small> */}
      <small>/month</small>
    </p>
  );
};

export default Price;

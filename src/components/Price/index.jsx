import React from "react";
import classes from "./Price.module.css";

const Price = ({ price, duration }) => {
  return (
    <p className={classes.price}>
      ${price}
      <small>/{duration}</small>
    </p>
  );
};

export default Price;

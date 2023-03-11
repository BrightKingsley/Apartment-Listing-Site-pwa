import React from "react";
import classes from "./Payment.module.css";

const Payment = ({ payment }) => {
  return (
    <div className={classes.payment}>
      <div>
        <p>{payment.description}</p>
        <small>{payment.amount}</small>
      </div>
      <div>
        <p>{payment.date}</p>
        <small>{payment.status}</small>
      </div>
    </div>
  );
};

export default Payment;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Unauthorized.module.css";

let max = 0;
const Unauthorized = ({ message, page }) => {
  const [seconds, setSeconds] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    let i = 3;
    const interval =
      max < 1 &&
      setInterval(() => {
        i--;
        setSeconds((prev) => prev - 1);
        if (i < 1) {
          navigate(page);
          setSeconds(3);
          max = 1;
          return clearInterval(interval);
        }
      }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <main className={classes.unauthorized}>
      <div>
        <h2>{message}</h2>
        <h2>Redirecting in... {seconds}</h2>
      </div>
    </main>
  );
};

export default Unauthorized;

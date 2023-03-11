import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContext";

const myEmail = "briggskvngz@gmail.com";
const myPassword = "mypassword";

export default function Login() {
  const { logIn } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === myEmail && password === myPassword) {
      logIn(true);
    } else {
      logIn(false);
    }

    // try {
    //   //Login user
    //   await signInWithEmailAndPassword(auth, email, password);
    //   navigate("/");
    // } catch (err) {
    //   setErr(true);
    //   setLoading(false);
    // }
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.imgWrapper}>
        <img src={""} alt="" />
      </div>
      <div className={classes.formWrapper}>
        <span className={classes.logo}>Admin</span>
        <span className={classes.title}>Login</span>
        <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="email" />
          <input name="password" type="password" placeholder="password" />
          <button disabled={loading}>login</button>
          {err && <span className={classes.error}>Something went wrong</span>}
        </form>
      </div>
    </div>
  );
}

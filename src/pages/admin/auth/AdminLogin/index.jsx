import React, { useState, useContext, useEffect } from "react";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import classes from "../AdminAuthStyles.module.css";

import { Link, useNavigate } from "react-router-dom";
import { NotificationContext } from "../../../../context/NotificationContext";
import { AdminContext } from "../../../../context/AdminContext";

export default function Login() {
  const navigate = useNavigate();

  const { isAuth, admin, loading, error, setError, loginHandler } =
    useContext(AdminContext);

  const { triggerNotification } = useContext(NotificationContext);

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setError(null);
  }, []);

  useEffect(() => {
    if (isAuth) {
      setEmail("");
      setPassword("");

      navigate("../../dashboard");
    } else {
      // console.log(error);
      return;
    }
  }, [isAuth, error, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    loginHandler(e, { email, password });
  };

  return (
    <div className={`${classes.formContainer} ${classes.login}`}>
      <p>
        Don't have an account? <Link to="../signup">signup</Link>
      </p>
      <div className={classes.formWrapper}>
        <p className={classes.title}>Login</p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError((prev) => {
                  return { ...prev, email: "" };
                });
              }}
              name="email"
              type="email"
              placeholder="email"
            />
            {error?.email && <p>{error.email}</p>}
          </div>
          <div>
            <div className={classes.passwordWrapper}>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError((prev) => {
                    return { ...prev, password: "" };
                  });
                }}
                name="password"
                type={`${showPassword ? "text" : "password"}`}
                // type="password"
                placeholder="password"
              />
              <span
                className={classes.passwordToggle}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </span>
            </div>
            {error?.password && <p>{error.password}</p>}
          </div>

          <button disabled={loading}>login</button>
        </form>
      </div>
    </div>
  );
}

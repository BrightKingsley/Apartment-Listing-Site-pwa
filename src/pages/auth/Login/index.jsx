import React, { useState, useContext, useEffect } from "react";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import classes from "../authStyles.module.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";


export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const source = location.state?.source;

  const { isAuth, loading, error, setError, loginHandler } =
    useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Raale. || Login";
    setError(null);
  }, [setError]);

  useEffect(() => {
    if (isAuth) {
      setEmail("");
      setPassword("");

      navigate(source || "/listings", { state: location.state });
    } else {
      // console.log(error);
      return;
    }
  }, [isAuth, error, source, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    loginHandler(e, { email, password });
  };

  const handleLinkToSignup = () => {
    navigate("../signup", { state: location.state });
  };

  return (
    <div className={`${classes.formContainer} ${classes.login}`}>
      <p>
        Don't have an account?{" "}
        <span className={classes.link} onClick={handleLinkToSignup}>
          signup
        </span>
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

          <button disabled={loading}>
            {loading ? (
              <CircularProgress
                variant="soft"
                sx={{ width: "1rem", height: "1rem", color: "white" }}
              />
            ) : (
              "login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

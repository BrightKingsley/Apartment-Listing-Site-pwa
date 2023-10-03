import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import classes from "../authStyles.module.css";

import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { NotificationContext } from "../../../context/NotificationContext";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const source = location.state?.source;


  // const { setUser } = useContext(UserContext);
  const { user, loading, error, setError, signupHandler } =
    useContext(AuthContext);
  const { triggerNotification } = useContext(NotificationContext);

  const [showPassword, setShowPassword] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    document.title = "Raale. || SignUp";
    setError(null);
  }, [setError]);

  useEffect(() => {
    if (user?.id) {

      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate(source || "/listings");
      triggerNotification("signed up");
    } else {
      return;
    }
  }, [user?.id, error, source, navigate, triggerNotification]);

  // const [loading, setLoading] = useState(false);
  // const [err, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    console.log("SIGNUP!!");

    signupHandler(e, { firstname, lastname, email, password });
    // const { user } = response.data;
    //   // setLoading(false);
    // } catch (error) {
    //   setError(error);
    //   // setLoading(false);
    // }
  };

  return (
    <div className={classes.formContainer}>
      <p>
        Already have an account?{" "}
        <Link className={classes.link} to="../login">
          login
        </Link>
      </p>
      <div className={classes.formWrapper}>
        <p className={classes.title}>Signup</p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
                setError((prev) => {
                  return { ...prev, firstname: "" };
                });
              }}
              name="firstname"
              type="text"
              placeholder="firstname"
            />
            {error?.firstname && <p>{error.firstname}</p>}
          </div>
          <div>
            <input
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
                setError((prev) => {
                  return { ...prev, lastname: "" };
                });
              }}
              name="lastname"
              type="text"
              placeholder="lastname"
            />
            {error?.lastname && <p>{error.lastname}</p>}
          </div>
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
                minLength={6}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError((prev) => {
                    return { ...prev, password: "" };
                  });
                }}
                name="password"
                // type={`${showPassword ? "text" : "password"}`}
                type="password"
                placeholder="password"
              />
              {/* <span
              className={classes.passwordToggle}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </span> */}
            </div>
            {error?.password && <p>{error.password}</p>}
          </div>

          <div
            className={`${classes.passwordWrapper} ${
              confirmPassword === password
                ? classes.correctPassword
                : classes.incorrectPassword
            }`}
          >
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirm password"
              type={`${showPassword ? "text" : "password"}`}
              placeholder="confirm password"
            />
            <span
              className={classes.passwordToggle}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </span>
          </div>
          <button disabled={loading || !confirmPassword}>signup</button>
        </form>
      </div>
    </div>
  );
}

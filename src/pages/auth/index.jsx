import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import classes from "./authStyles.module.css";

const Auth = () => {
  return (
    <div className={classes.auth}>
      <Outlet />
    </div>
  );
};

export default Auth;

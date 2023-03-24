import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import classes from "./AdminAuthStyles.module.css";

const Auth = () => {
  return (
    <div className={classes.adminAuth}>
      <Outlet />
    </div>
  );
};

export default Auth;

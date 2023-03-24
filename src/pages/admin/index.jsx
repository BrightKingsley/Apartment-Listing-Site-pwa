import React from "react";
import { Outlet, Routes, useNavigate } from "react-router-dom";
import classes from "./index.module.css";
import SideNavbar from "../../components/SideNavbar";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import Unauthorized from "../Unauthorized";

const Index = () => {
  const { isAuth } = useContext(AdminContext);

  return (
    <div className={classes.admin}>
      {isAuth ? (
        <>
          <SideNavbar />
          <Outlet />
        </>
      ) : (
        <Unauthorized page="/admin/auth/login" />
      )}
    </div>
  );
};

export default Index;

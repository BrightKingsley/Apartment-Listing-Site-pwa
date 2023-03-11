import React from "react";
import { Outlet, Routes, useNavigate } from "react-router-dom";
import classes from "./index.module.css";
import SideNavbar from "../../components/SideNavbar";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const Index = () => {
  // const { loggedIn } = useContext(AdminContext);
  // const [loggedIn, setLoggedIn] = useState(false);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   loggedIn ? navigate("dashboard") : navigate("login");
  // }, [loggedIn, navigate]);

  return (
    <div className={classes.admin}>
      {/* {loggedIn && <SideNavbar />} */}
      <SideNavbar />
      <Outlet />
    </div>
  );
};

export default Index;

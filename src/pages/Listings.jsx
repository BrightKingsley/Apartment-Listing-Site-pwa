import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import MessageLink from "../components/FloatingMessage";
import Notification from "../components/Notification";

const Listings = () => {
  return (
    <>
      <Notification message="this is a notification!" />
      <Outlet />
    </>
  );
};

export default Listings;

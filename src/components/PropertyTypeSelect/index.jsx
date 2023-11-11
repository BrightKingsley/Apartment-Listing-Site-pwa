import React, { useState } from "react";
// import Button from "../UI/Button";
import classes from "./PropertyTypseSelect.module.css";
import {
  ApartmentRounded,
  Business,
  HomeRounded,
  LandscapeRounded,
} from "@mui/icons-material";
import { Button } from "@mui/material";

const PropertyTypeSelect = ({ setType, type }) => {
  return (
    <div className={classes.propertyTypes}>
      <Button
        className={classes.propertyType}
        style={{
          backgroundColor: type === "house" ? "#07594b" : "#e1fdf8",
          color: type === "house" ? "#fff" : "#07594b",
        }}
        onClick={() => setType("house")}
      >
        <HomeRounded />
        <small>House</small>
      </Button>
      <Button
        className={classes.propertyType}
        style={{
          backgroundColor: type === "apartment" ? "#07594b" : "#e1fdf8",
          color: type === "apartment" ? "#fff" : "#07594b",
        }}
        onClick={() => setType("apartment")}
      >
        <ApartmentRounded />
        <small>Apartment</small>
      </Button>
      {/* <Button
        className={classes.propertyType}
        style={{
          backgroundColor: type === "commercial" ? "#07594b" : "#e1fdf8",
          color: type === "commercial" ? "#fff" : "#07594b",
        }}
        onClick={() => setType("commercial")}
      >
        <Business />
        <small>Commercial</small>
      </Button>
      <Button
        className={classes.propertyType}
        style={{
          backgroundColor: type === "land" ? "#07594b" : "#e1fdf8",
          color: type === "land" ? "#fff" : "#07594b",
        }}
        onClick={() => setType("land")}
      >
        <LandscapeRounded />
        <small>Land Plot</small>
      </Button> */}
    </div>
  );
};

export default PropertyTypeSelect;

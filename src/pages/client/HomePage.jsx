import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import classes from "./HomePage.module.css";
import "./home.css";

const HomePage = () => {
  return (
    <div className={classes.homepage}>
      <h1>This Is the homepage</h1>
      {/* <Link to="listings"> */}
      <Button>View Listing</Button>
      {/* </Link> */}
    </div>
  );
};

export default HomePage;

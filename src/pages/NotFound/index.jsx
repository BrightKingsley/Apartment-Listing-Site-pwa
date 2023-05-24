import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import classes from "./NotFound.module.css";

const NotFound = () => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("works");
        console.log(position);
        const { latitude: lat, longitude: lng } = position.coords;
        const LatLng = [lat, lng];
        console.log(LatLng);
      },
      () => {
        alert("Could not get your position");
      }
    );
  }, []);

  return (
    <main className={classes.notFound}>
      <div className={classes.message}>
        <h2>You seem to be lost... Need some help?</h2>
        <Link to="listings">
          <Button>Back to Listing</Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;

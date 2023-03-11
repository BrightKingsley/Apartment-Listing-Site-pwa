import React from "react";
import Map2 from "../map/Map-1";

import classes from "./Map.module.css";
import Price from "./Price";

const Map = ({ mapImg }) => {
  return (
    <div className={classes.mapContainer}>
      <div className={classes.pinPulse}>
        <div className={classes.listing}>
          <div className={classes.left}>
            <img src={mapImg} alt="" />
          </div>
          <div className={classes.right}>
            <Price />
            <p className={classes.location}>Location</p>
          </div>
        </div>

        <div className={classes.pin}></div>
      </div>
      <Map2 />
    </div>
  );
};

export default Map;

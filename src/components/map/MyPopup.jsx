import React, { useEffect, useRef } from "react";
import { Popup, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import classes from "./MyPopup.module.css";

const MyPopup = ({ children, autoShowPopup, listing }) => {
  // const markerRef = useRef();
  // useEffect(() => {
  //   autoShowPopup && markerRef.current?.openPopup(listing?.coords);
  // }, [listing, listing?._id, listing?.coords, autoShowPopup]);

  return (
    <Popup
      // ref={markerRef}
      closeOnEscapeKey={true}
      className={classes.popup}
      autoClose={false}
      closeOnClick={false}
      autoPan={true}
    >
      {children}
    </Popup>
  );
};
export default MyPopup;

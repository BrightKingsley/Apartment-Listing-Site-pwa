import React, { useEffect, useState } from "react";
import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import classes from "./Map.module.css";
import LocationMarker from "./LocationMarker";
import { CircularProgress } from "@mui/material";

const Map = ({ autoShowPopup, section, listing, listings, zoom }) => {
  const coords = listing?.coords;

  let mapStyles;
  if (section === "listing") {
    mapStyles = classes.mapListing;
  }
  if (section === "details") {
    mapStyles = classes.mapDetails;
  }
  if (section === "dashboard") {
    mapStyles = classes.mapDashboard;
  }

  let center;

  if (listing && listing?.coords && listing.coords?.length > 1) {
    center = listing.coords;
  }

  if (listings && listings[0]?.coords && listings[0].coords?.length > 1) {
    center = listings[0].coords;
  }

  return (
    <MapContainer
      className={mapStyles}
      // center={coords.length > 1 ? coords : [10, 10]}
      center={center}
      zoom={zoom ? zoom : 20}
      closePopupOnCLick={false}
      placeholder={
        <div className={classes.mapAlt}>
          <h1>
            <CircularProgress color="success" />
          </h1>
          <p>Couldn't get map</p>
        </div>
      }
    >
      <>
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <LocationMarker
          listing={listing && listing}
          autoShowPopup={autoShowPopup}
          coords={coords && coords.length > 1 && coords}
          listings={listings && listings.length > 1 && listings}
        />
      </>
    </MapContainer>
  );
  // ) : (
  //   <div className={classes.mapAlt}>
  //     <div style={{ position: "absolute", top: "50%", textAlign: "center" }}>
  //       <h1>
  // <CircularProgress color="success" />;

  //       </h1>
  //       <p>Couldn't get map</p>
  //     </div>
  //     {/* <img className={classes.mapImg} src="./assets/map.png" alt="" /> */}
  //   </div>
  // );
};

export default Map;

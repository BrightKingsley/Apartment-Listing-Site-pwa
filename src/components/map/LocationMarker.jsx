import React, { useEffect, useRef } from "react";
import { useMap, Marker } from "react-leaflet";
import MyPopup from "./MyPopup";
import MyMarker from "./MyMarker";
import classes from "./LocationMarker.module.css";
import Price from "../Price";

function LocationMarker({
  children,
  autoShowPopup,
  coords,
  listing,
  listings,
}) {
  // const { imgs, location, price } = listing;
  const imgs = listing?.images;
  const location = listing?.location;
  const price = listing?.price;

  const map = useMap();
  useEffect(() => {
    map.locate();
    // coords && map.flyTo(coords, map.getZoom(), { animate: true });
    listing && map.flyTo(listing.coords, map.getZoom(), { animate: true });
    listings && map.flyTo(listings[0].coords, map.getZoom(), { animate: true });
  }, [map, coords, listings, listing]);

  return listings && listings.length > 1
    ? listings.map((listing, index) => (
        <MyMarker
          // markerRef={markerRef}
          key={Math.random()}
          listing={listing}
          index={index}
          autoShowPopup={autoShowPopup}
        >
          {children ? (
            <MyPopup autoShowPopup={autoShowPopup} listing={listing}>
              {children}
            </MyPopup>
          ) : (
            listing && (
              <MyPopup autoShowPopup={autoShowPopup} listing={listing}>
                <div className={classes.left}>
                  <img src={listing?.images[0]} alt="" />
                </div>
                <div className={classes.right}>
                  <Price price={listing?.price} duration="month" />
                  <p className={classes.location}>{listing?.location}</p>
                </div>
              </MyPopup>
            )
          )}
        </MyMarker>
      ))
    : listing && listing?.coords && (
        <MyMarker listing={listing} autoShowPopup={autoShowPopup}>
          {children ? (
            <MyPopup>{children}</MyPopup>
          ) : (
            listing && (
              <MyPopup>
                <div className={classes.left}>
                  <img src={imgs[0]} alt="" />
                </div>
                <div className={classes.right}>
                  <Price price={price} duration="month" />
                  <p className={classes.location}>{location}</p>
                </div>
              </MyPopup>
            )
          )}
        </MyMarker>
      );
}

export default LocationMarker;

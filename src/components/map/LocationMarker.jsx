import React, { useEffect, useRef, useState } from "react";
import { useMap, Marker } from "react-leaflet";
import MyPopup from "./MyPopup";
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

  const [refReady, setRefReady] = useState(false);

  let markerRef = useRef();

  useEffect(() => {
   const marker = markerRef.current;
    if(marker && autoShowPopup){
        marker.openPopup()
    }
    // && refReady && markerRef.current?.openOn(listing?.coords);
    
    // markerRef.current = markerRef.current.slice(0, listings?.length);
  }, [listing, listing?._id, listing?.coords, autoShowPopup, refReady]);

  return listings && listings.length > 1
    ? listings.map((listing, index) => (
        <Marker
          // ref={(el) => (markerRef.current[index] = el)}
          key={Math.random()}
          listing={listing}
          index={index}
          autoShowPopup={autoShowPopup}
          position={
            listing?.coords && listing?.coords.length > 0
              ? listing?.coords
              : [10, 10]
          }
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
        </Marker>
      ))
    : listing && listing?.coords && (
        <Marker
          listing={listing}
          autoShowPopup={autoShowPopup}
          ref={(r) => {
            markerRef = r;
            setRefReady(true);
          }}
          position={
            listing?.coords && listing?.coords.length > 0
              ? listing?.coords
              : [10, 10]
          }
        >
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
        </Marker>
      );
}

export default LocationMarker;

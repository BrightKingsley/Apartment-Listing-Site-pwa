import React, { useEffect, useRef } from "react";
import { Marker } from "react-leaflet";

const MyMarker = ({ children, autoShowPopup, listing, index }) => {
  const markerRef = useRef([]);

  // useEffect(() => {
  //   autoShowPopup && markerRef.current?.openPopup(listing.coords);
  // }, [listing, listing._id, listing.coords, autoShowPopup]);

  return (
    <Marker
      ref={markerRef}
      riseOnHover={false}
      key={Math.random()}
      // autoPan={true}
      // autoPanOnFocus={true}
      position={
        listing?.coords && listing?.coords.length > 0
          ? listing?.coords
          : [10, 10]
      }
    >
      {children}
    </Marker>
  );
};

export default MyMarker;

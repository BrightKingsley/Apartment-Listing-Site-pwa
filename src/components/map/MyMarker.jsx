// import { SportsBasketballRounded } from "@mui/icons-material";
// import { divIcon } from "leaflet";
// import React, { useEffect, useRef } from "react";
// import { Marker } from "react-leaflet";
// import { renderToStaticMarkup } from "react-dom/server";

// import "./MyMarker.css";

// const MyMarker = ({ children, autoShowPopup, listing, index, markerRef }) => {
//   // const markerRef = useRef([]);
//   const iconMarker = renderToStaticMarkup(
//     <span className="customMarker">{/* <SportsBasketballRounded /> */}</span>
//   );
//   const customMarkerIcon = divIcon({ html: iconMarker });

//   // useEffect(() => {
//   //   autoShowPopup && markerRef.current?.openPopup(listing.coords);
//   // }, [listing, listing._id, listing.coords, autoShowPopup]);

//   return (
//     <Marker
//       icon={customMarkerIcon}
//       // ref={markerRef}
//       ref={(el) => (markerRef?.current[index] = el)}
//       riseOnHover={false}
//       key={Math.random()}
//       // autoPan={true}
//       // autoPanOnFocus={true}
//       position={
//         listing?.coords && listing?.coords.length > 0
//           ? listing?.coords
//           : [10, 10]
//       }
//     >
//       {children}
//     </Marker>
//   );
// };

// export default MyMarker;

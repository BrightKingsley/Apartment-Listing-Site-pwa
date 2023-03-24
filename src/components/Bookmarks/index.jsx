import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import listingContext from "../../context/ListingContext";

import Bookmark from "../Bookmark";

// Style Classes
import classes from "./Bookmarks.module.css";

const Bookmarks = () => {
  const [markedListings, setMarkedListings] = useState([]);

  const { listings, loadListings } = useContext(listingContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadListings();
    const marked = listings?.filter((listing) =>
      user.bookmarks.includes(listing._id)
    );
    setMarkedListings(marked);
  }, [user?.bookmarks]);

  return (
    <div className={classes.bookmarks}>
      {markedListings?.length > 0 ? (
        markedListings?.map((marked) => (
          <div className={classes.marked} key={Math.random()}>
            <span className={classes.markedImg}>
              <img src={marked.images[0]} alt="bookmarked" />
            </span>
            <p>{marked.title}</p>
            <Bookmark listingId={marked._id} />
          </div>
        ))
      ) : (
        <h2
          style={{
            marginTop: "2rem",
            textAlign: "center",
            color: "gray",
          }}
        >
          No bookmarks
        </h2>
      )}
    </div>
  );
};

export default Bookmarks;

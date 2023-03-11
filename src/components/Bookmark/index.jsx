import { BookmarkBorderRounded, BookmarkRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { addToBookmarks, removeFromBookmarks } from "../../api/bookmarks";
import { AuthContext } from "../../context/AuthContext";
import classes from "./Bookmark.module.css";

const Bookmark = ({ listingId }) => {
  const { token, isAuth, user, userId, setUserById } = useContext(AuthContext);

  const [bookmarked, setBookmarked] = useState(
    isAuth ? user?.bookmarks?.includes(listingId) : null
  );

  useEffect(() => {
    const hasBookmark = user?.bookmarks?.includes(listingId);
    hasBookmark ? setBookmarked(true) : setBookmarked(false);
  }, [user?.bookmarks, listingId]);

  const toggleBookmark = async () => {
    if (!bookmarked) {
      console.log("11111reached------------------");
      const response = await addToBookmarks(listingId, token);
      console.log(response.data);
      response.data.message === "worked" && setBookmarked(true);
      setUserById(userId, token);
    }

    if (bookmarked) {
      console.log("22222reached------------------");
      const response = await removeFromBookmarks(listingId, token);
      console.log("222RESPONSE", response.data);
      response.data.message === "worked" && setBookmarked(false);
      setUserById(userId, token);
    }
  };

  // const handleBookmark = () => {
  // };

  return (
    <span
      onClick={toggleBookmark}
      className={classes.bookmark}
      title="bookmark listing"
    >
      <IconButton>
        {bookmarked ? <BookmarkRounded /> : <BookmarkBorderRounded />}
      </IconButton>
    </span>
  );
};

export default Bookmark;

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Bookmark from "../Bookmark";
import classes from "./Listing.module.css";
import Perks from "../Perks";
import Price from "../Price";
import { DeleteOutlineOutlined, HouseRounded } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import listingContext from "../../context/ListingContext";
import { ModalContext } from "../../context/ModalContext";
import { AuthContext } from "../../context/AuthContext";

const Listing = ({ listing, setCurrentListing, isAdmin }) => {
  const { triggerModal } = useContext(ModalContext);

  const { removeListing } = useContext(listingContext);
  const { user, adminWriteAccess } = useContext(AuthContext);

  const handleMouseEnter = () => {
    listing && setCurrentListing(listing);
  };

  const handleDelete = () => {
    removeListing(listing._id);
  };

  return (
    <div
      className={classes.listingWrapper}
      onMouseEnter={handleMouseEnter}
      // onClick={handleClick}
    >
      {/* {!user.isAdmin && ( */}
      <span className={classes.bookmarkWrapper}>
        <Bookmark listingId={listing._id} />
      </span>
      {/* // )} */}
      {adminWriteAccess && (
        <span
          className={classes.delete}
          onClick={() => {
            triggerModal(
              "Are you sure you want to delete this listing?",
              () => handleDelete,
              () => triggerModal
            );
          }}
        >
          <IconButton
            size="small"
            color="default"
            title="delete listing"
            variant="contained"
            disableElevation
          >
            <DeleteOutlineOutlined />
          </IconButton>
        </span>
      )}

      <Link className={classes.listing} to={listing._id}>
        <div className={classes.left}>
          {listing.images[0] ? (
            <img src={listing.images[0]} alt="" />
          ) : (
            <span>
              <HouseRounded />
            </span>
          )}
        </div>
        <div className={classes.right}>
          {
            <>
              <p className={classes.title}>{listing.title}</p>
              <p className={classes.location}>{listing.location}</p>
              <Perks listing={listing} />
              <Price price={listing.price} duration={listing.duration} />
            </>
          }
        </div>
      </Link>
    </div>
  );
};

export default Listing;

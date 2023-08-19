import React, { useContext, useState } from "react";
import { getListings } from "../api/listings";

import { createContext } from "react";
import { AuthContext } from "./AuthContext";
import { deleteListing, editListing, getListing } from "../api/listing";
import { NotificationContext } from "./NotificationContext";

const listingContext = createContext({
  listings: {},
  setLoading: () => {},
  currentListing: null,
  loadListing: () => {},
  loadListings: () => {},
  removeListing: () => {},
  showListingEdit: false,
  triggerListingEdit: () => {},
  editListingProperties: () => {},
  listingEditType: null,
  params: "",
  setParams: () => {},
});

export const ListingContextProvider = (props) => {
  const [currentListing, setCurrentListing] = useState(null);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showListingEdit, setShowListingEdit] = useState(false);
  const [listingEditType, setListingEditType] = useState(false);
  const [params, setParams] = useState("");

  // const token = localStorage.getItem("token");
  const { token } = useContext(AuthContext);
  const { triggerNotification } = useContext(NotificationContext);

  const loadListings = async (sort) => {
    const response = await getListings(token, sort, params);
    setListings(response.data?.listings);
  };

  const loadListing = async (listingId) => {
    try {
      const response = await getListing(listingId);
      const listing = response.data?.listing;
      if (listing) {
        setCurrentListing(listing);
      } else {
      }
    } catch (error) {
    }
  };

  const removeListing = async (listingId) => {
    try {
      const response = await deleteListing(listingId, token);
      if (response.data.message === "success") {
        triggerNotification("listing deleted successfully");
        loadListings();
      } else {
        return;
      }
    } catch (error) {
    }
  };

  const editListingProperties = async (property) => {
    try {
      const response = await editListing(property, currentListing._id, token);
      const listing = response.data?.listing;
      if (listing) {
        setCurrentListing(listing);
        triggerNotification("listing updated successfully");
        return "success";
      } else {
        return "failed";
      }
    } catch (error) {
      return "failed";
    }
  };

  const triggerListingEdit = (type) => {
    !showListingEdit ? setShowListingEdit(true) : setShowListingEdit(false);
    type ? setListingEditType("images") : setListingEditType(null);
  };

  return (
    <listingContext.Provider
      value={{
        listings,
        loading,
        setLoading,
        currentListing,
        loadListing,
        loadListings,
        removeListing,
        showListingEdit,
        triggerListingEdit,
        editListingProperties,
        listingEditType,
        params,
        setParams,
      }}
    >
      {props.children}
    </listingContext.Provider>
  );
};

export default listingContext;

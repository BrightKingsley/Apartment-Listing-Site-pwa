import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Bookmark from "../../../components/Bookmark";
import DetailsGallery from "../../../components/DetailsGallery";
import Header from "../../../components/Header";
import Perks from "../../../components/Perks";
import Price from "../../../components/Price";
import Map from "../../../components/map/Map";
import Button from "../../../components/UI/Button";

import classes from "./DetailsPage.module.css";
import { getListing } from "../../../api/listing";
import listingContext from "../../../context/ListingContext";
import ActivityIndicator from "../../../components/ActivityIndicator";
import {
  CarRepair,
  EditRounded,
  FamilyRestroom,
  FamilyRestroomOutlined,
  FoodBankRounded,
  Garage,
  GarageRounded,
  Home,
  HomeMax,
  ParkOutlined,
  ShareLocation,
  ShareOutlined,
  ShareRounded,
  Stairs,
  WashRounded,
} from "@mui/icons-material";
import {
  FaMoneyBill,
  FaParking,
  FaPaw,
  FaShare,
  FaShareAlt,
} from "react-icons/fa";
import { IoPaw } from "react-icons/io5";
import { IconButton } from "@mui/material";
import Edit from "../../../components/Edit";
import MessageLink from "../../../components/FloatingMessage/index";
import ListingEdit from "../../../components/ListingEdit";

const DetailsPage = () => {
  const { currentListing, loadListing, triggerListingEdit, showListingEdit } =
    useContext(listingContext);
  const { id } = useParams();

  useEffect(() => {
    document.title = "Apartment Listing || Details";
    loadListing(id);
  }, []);

  const navigate = useNavigate();

  const handleClickRent = () => {
    navigate("../message");
  };
  const handleClickContact = () => {
    navigate("../message");
  };
  const handleShare = () => {};

  return currentListing ? (
    <>
      <Header />
      {showListingEdit && <ListingEdit field="title" />}
      <main className={classes.detailsPage}>
        <DetailsGallery listing={currentListing} />
        <div className={classes.map}>
          <nav>
            <ul>
              <li>Neighborhood</li>
              <li>Schools</li>
              <li>Markets</li>
              <li>Gyms</li>
              <li>Parks&walkingarea</li>
            </ul>
          </nav>
          {currentListing && Object.values(currentListing).length > 0 && (
            <Map section="details" listing={currentListing} zoom={16}></Map>
          )}
        </div>
        <div className={classes.right}>
          <div className={classes.dragLine}></div>
          <section className={classes.section1}>
            <div className={classes.actions}>
              <Edit
                text="edit this listing?"
                actionConfirm={triggerListingEdit}
              />
              <span className={classes.bookmarkWrapper}>
                <Bookmark listingId={currentListing._id} />
              </span>
              <span onClick={handleShare} className={classes.share}>
                <IconButton>
                  <ShareOutlined />
                </IconButton>
              </span>
            </div>

            <h2>{currentListing.title}</h2>
            <small>{currentListing.location}</small>
            <Perks listing={currentListing} />
            <div className={classes.section1Bottom}>
              <Price
                price={currentListing.price}
                duration={currentListing.duration}
              />
              <div className={classes.section1Links}>
                <Link className={classes.rentNow} to="/message">
                  Rent Now
                </Link>
                <Link className={classes.contactAgent} to="/message">
                  Contact Agent
                </Link>
              </div>
            </div>
          </section>
          <section className={classes.section2}>
            <h2>Overview</h2>
            <p>{currentListing.description}</p>
          </section>
          <section className={classes.section3}>
            <h2>Property Information & Features</h2>
            <div className={classes.features}>
              <div>
                <span>
                  <FamilyRestroomOutlined />
                </span>
                <div>
                  <small>Type</small>
                  <small>{currentListing.type}</small>
                </div>
              </div>
              <div>
                <span>
                  <GarageRounded />
                </span>
                <div>
                  <small>Parking</small>
                  <small>{currentListing.parking}</small>
                </div>
              </div>
              <div>
                <span>
                  <Stairs />
                </span>
                <div>
                  <small>Flooring</small>
                  <small>{currentListing.flooring}</small>
                </div>
              </div>
              <div>
                <span>
                  <WashRounded />
                </span>
                <div>
                  <small>Amenities</small>
                  <small>{currentListing.amenities}</small>
                </div>
              </div>
              <div>
                <span>
                  <FaPaw />
                </span>
                <div>
                  <small>Pets</small>
                  <small>{currentListing.pets}</small>
                </div>
              </div>
              <div>
                <span>
                  <FaMoneyBill />
                </span>
                <div>
                  <small>Deposits & Fees</small>
                  <small>{currentListing.deposit}</small>
                </div>
              </div>
            </div>
          </section>
          <section className={classes.ADsection}>
            <div>
              <p>This is an AD</p>
            </div>
          </section>
        </div>
      </main>
      <MessageLink />
    </>
  ) : (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "gray",
      }}
    >
      <ActivityIndicator />
    </div>
  );
};

export default DetailsPage;

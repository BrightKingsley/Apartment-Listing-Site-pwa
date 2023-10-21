import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import Bookmark from "../../components/Bookmark";
import DetailsGallery from "../../components/DetailsGallery";
import Header from "../../components/Header";
import Perks from "../../components/Perks";
import Price from "../../components/Price";
import Map from "../../components/map/Map";

import classes from "./DetailsPage.module.css";
import listingContext from "../../context/ListingContext";
import ActivityIndicator from "../../components/ActivityIndicator";
import {
  FamilyRestroomOutlined,
  GarageRounded,
  Stairs,
  WashRounded,
} from "@mui/icons-material";
import { FaMoneyBill, FaPaw } from "react-icons/fa";
import Edit from "../../components/Edit";
import MessageLink from "../../components/FloatingMessage/index";
import ListingEdit from "../../components/ListingEdit";
// import { CheckoutContext } from "../../context/CheckoutContext";
import Checkout from "../../components/Checkout";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";
import { RentlyContext } from "../../context/RentlyContext";
// import Button from "../../components/UI/Button";
import { NotificationContext } from "../../context/NotificationContext";
import { usePaystackPayment } from "react-paystack";
import { Button } from "@mui/material";

let actionExecuted = false;
const DetailsPage = () => {
  const { currentListing, loadListing, triggerListingEdit, showListingEdit } =
    useContext(listingContext);

  const { isAuth, user } = useContext(AuthContext);
  const { triggerModal } = useContext(ModalContext);
  const { triggerNotification } = useContext(NotificationContext);
  const { triggerRently } = useContext(RentlyContext);

  const { id } = useParams();
  const location = useLocation();

  const source = location.state?.source;
  const action = location.state?.action;

  const navigate = useNavigate();

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    if (reference.status === "success") {
      triggerNotification("payment successful");
    } else {
      triggerNotification("payment failed");
    }
  };

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    triggerNotification("checkout closed");
  };

  const [config, setConfig] = useState({
    reference: new Date().getTime().toString(),
    email: user ? user.email : "",
    amount:
      currentListing && currentListing.price ? currentListing.price * 100 : 0, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_bd2ebc6e0df8b4fd0bab4bce8c082598afa44ed9",
  });

  const initializePayment = usePaystackPayment(config);

  const navigateLogin = (action) => {
    actionExecuted = action;
    navigate("/auth/login", { state: { source: `/listings/${id}`, action } });
  };

  useEffect(() => {
    document.title = "Raale. || Details";
    loadListing(id);
  }, [id, loadListing]);

  useEffect(() => {
    if (!currentListing || !user) return;
    setConfig((prev) => ({
      ...prev,
      amount: currentListing.price * 1000,
      email: user.email,
    }));
  }, [currentListing, user]);

  useEffect(() => {
    if (actionExecuted && currentListing && source) {
      if (action === "tour") {
        actionExecuted = false;
        triggerRently(true, currentListing);
      } else if (action === "rent") {
        initializePayment(onSuccess, onClose);
        actionExecuted = false;
      }
    }
    //}, [currentListing, source, triggerRently]);
    // }, [actionExecuted]);
  }, []);

  // const handleClickRent = () => {
  //   navigate("../message");
  // };
  // const handleClickContact = () => {
  //   navigate("../message");
  // };

  const handleClickTour = () => {
    isAuth
      ? triggerRently(true, currentListing)
      : triggerModal(
          "You must be logged in to register for self tour. Login now?",
          () => () => navigateLogin("tour"),
          () => triggerModal
        );
  };

  return currentListing ? (
    <>
      <Checkout />
      <Header />
      {showListingEdit && <ListingEdit field="title" />}
      <main className={classes.detailsPage}>
        <DetailsGallery listing={currentListing} />
        <div className={classes.map}>
          {/* <nav>
            <ul>
              <li>Neighborhood</li>
              <li>Schools</li>
              <li>Markets</li>
              <li>Gyms</li>
              <li>Parks&walkingarea</li>
            </ul>
          </nav> */}
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
              {/* <span onClick={handleShare} className={classes.share}>
                <IconButton>
                  <ShareOutlined />
                </IconButton>
              </span> */}
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
                {/* NOTE */}
                <Button
                  style={{
                    backgroundColor: "#0b947e",
                    color: "white",
                  }}
                  className={classes.rentNow}
                  onClick={() => {
                    isAuth
                      ? initializePayment(onSuccess, onClose)
                      : triggerModal(
                          "You must be logged in to initialize payment",
                          () => () => navigateLogin("rent"),
                          () => triggerModal
                        );
                  }}
                >
                  Rent Now
                </Button>
                <Link className={classes.contactAgent} to="/message">
                  Contact Agent
                </Link>
                <Button
                  className={classes.selfTour}
                  onClick={() => {
                    handleClickTour();
                  }}
                >
                  Self-Tour
                </Button>
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
                login
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
                  <small>{currentListing.deposits}</small>
                </div>
              </div>
            </div>
          </section>
          {/* NOTE */}
          {/* <section className={classes.ADsection}>
            <div>
              <p>This is an AD</p>
            </div>
          </section> */}
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

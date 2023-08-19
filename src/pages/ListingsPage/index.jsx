import React from "react";
import { useEffect, useState } from "react";

import FilterMenu from "../../components/FilterMenu";
import Listing from "../../components/Listing";
import Map from "../../components/map/Map";
import Select from "../../components/Select";
import Header from "../../components/Header";

import Hamburger from "../../svg/Hamburger";

// import classes from "./ListingsPage.module.css";
import classes from "./ListingsPage.module.css";
import { useContext } from "react";
import listingContext from "../../context/ListingContext";
import ActivityIndicator from "../../components/ActivityIndicator";
import MessageLink from "../../components/FloatingMessage/index";

const isAdmin = true;

const ListingsPage = () => {
  const [currentListing, setCurrentListing] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const [sort, setSort] = useState("date");

  const { listings, params, loading, setLoading, loadListings } =
    useContext(listingContext);

  useEffect(() => {
    listings && setCurrentListing(listings[0]);
  }, [setCurrentListing, listings]);

  useEffect(() => {
    loadListings(sort);
    const viewed = localStorage.getItem("viewedListings");
    document.title = "Raale. || Listing";
    setLoading(true);

    if (viewed === "true") {
      setLoading(false);
    }
    // setLoading(false);
    const timer =
      viewed !== "true" &&
      setTimeout(() => {
        localStorage.setItem("viewedListings", true);
        setLoading(false);
      }, 3000);
    if (timer) {
      return () => clearTimeout(timer);
    }
  }, [sort, params]);

  const handleShowNav = (status) => {
    status ? setShowNav(status) : setShowNav((prevShowNav) => !prevShowNav);
  };

  return (
    <>
      {(!listings || loading) && <ActivityIndicator />}
      {/* <div style={{ display: loading ? "none" : "block" }}> */}
      <div>
        <Header searchbar={false} />
        <main className={classes.main}>
          <FilterMenu handleShowNav={handleShowNav} showNav={showNav} />
          <div className={classes.listingsSection}>
            <div className={classes.sortListings}>
              {!showNav && (
                <div className={classes.showHamburger} onClick={handleShowNav}>
                  <Hamburger />
                </div>
              )}
              <p>Search results 530</p>
              <span className={classes.select}>
                <Select
                  placeholder="select field"
                  selected={sort}
                  getSelected={setSort}
                  options={[
                    { value: "date", label: "date" },
                    { value: "type", label: "type" },
                    { value: "price", label: "price" },
                  ]}
                />
              </span>
            </div>

            <div className={classes.listings}>
              {listings &&
                listings?.map((item) => (
                  <Listing
                    listing={item}
                    key={Math.random()}
                    setCurrentListing={setCurrentListing}
                    isAdmin={isAdmin}
                  />
                ))}
            </div>
          </div>
          {showNav && (
            <div
              className={classes.listingsOverlay}
              onClick={() => {
                setShowNav((prevShowNav) => !prevShowNav);
              }}
            />
          )}
          <div className={classes.mapWrapper}>
            {currentListing && (
              <Map
                section="listing"
                autoShowPopup={true}
                listing={currentListing}
                zoom={8}
              />
            )}
          </div>
        </main>
      </div>
      <MessageLink />
    </>
  );
};

export default ListingsPage;

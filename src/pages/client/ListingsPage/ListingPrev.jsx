import React from "react";
import { useEffect, useState } from "react";

import FilterMenu from "../../../components/FilterMenu";
import Listing from "../../../components/Listing";
import Map from "../../../components/map/Map";
import SortBtn from "../../../components/SortBtn";
import Header from "../../../components/Header";

import DATA from "../../../data/Rest";
import Hamburger from "../../../svg/Hamburger";

// import classes from "./ListingsPage.module.css";
import classes from "./ListingGrid.module.css";

const initImg = DATA[0].imgs[0];

const ListingsPage = () => {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    document.title = "Appartment Listing || Listing";
  });

  const [mapImg, setMapImg] = useState(initImg);
  const [coords, setCoords] = useState(DATA[0].coords);
  // const [price, setPrice] = useState(DATA[0].price);

  const insertMapImg = (img) => {
    setMapImg(img);
  };
  const insertCoords = (coords) => {
    setCoords(coords);
  };

  // const insertMapPrice = () => {
  //   setPrice();
  // };

  return (
    <>
      <Header searchbar={true} />

      <main className={classes.main}>
        <div className={classes.wrapperMain}>
          <FilterMenu showNav={showNav} />
          <div className={classes.listingsSection}>
            <div className={classes.sortListings}>
              {!showNav && (
                <div
                  className={classes.showHamburger}
                  onClick={() => {
                    setShowNav((prevShowNav) => !prevShowNav);
                  }}
                >
                  <Hamburger />
                </div>
              )}
              <p>Search results 530</p>
              <SortBtn options={["date", "type", "price"]} />
            </div>
            {showNav && (
              <div
                className={classes.listingsOverlay}
                onClick={() => {
                  setShowNav((prevShowNav) => !prevShowNav);
                }}
              />
            )}
            <div className={classes.listings}>
              {DATA.map((item) => (
                <Listing
                  listing={item}
                  key={item.id}
                  setImg={insertMapImg}
                  setCoords={insertCoords}
                  id={item.id}
                  // setPrice={insertMapPrice}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={classes.mapWrapper}>
          <Map mapImg={mapImg} coords={coords} />
        </div>
      </main>
    </>
  );
};

export default ListingsPage;

import React, { useContext, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

//Style classes import
import classes from "./DetailsGallery.module.css";
import Edit from "../Edit";
import listingContext from "../../context/ListingContext";

const DetailsGallery = ({ listing }) => {
  const { triggerListingEdit } = useContext(listingContext);

  return (
    <>
      <div className={classes.gridGallery}>
        <div className={classes.detailsEdit}>
          {/* <Edit text="edit images?" images={true} setImages={setImages} /> */}
          <Edit
            text="edit images?"
            images={false}
            actionConfirm={() => triggerListingEdit("images")}
          />
        </div>
        <div className={classes.preview}>
          {listing?.images && <img src={listing.images[0]} alt="" />}
        </div>
        <div className={classes.more}>
          {listing.images &&
            listing.images.slice(1).map((img) => (
              <div className={classes.subView} key={Math.random()}>
                <img src={img} alt="" />
              </div>
            ))}
          {/* <div className={classes.subView}>5+</div>
          <div className={classes.subView}>5+</div>
          <div className={classes.subView}>5+</div>
          <div className={classes.subView}>5+</div> */}
        </div>
      </div>
      <div className={classes.carouselWrapper}>
        <div className={classes.carousel}>
          <div className={classes.detailsEdit}>
            <Edit
              text="edit images?"
              images={false}
              actionConfirm={() => triggerListingEdit("images")}
            />
          </div>
          <Carousel
            infiniteLoop={true}
            autoPlay={true}
            dynamicHeight={false}
            showThumbs={false}
            showIndicators={false}
          >
            {listing.images &&
              listing.images.map((img, i) => (
                <div key={Math.random()} className={classes.slide}>
                  <img src={img} alt="" />
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default DetailsGallery;

import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-router-dom";

import Input from "../../../components/Input";
import classes from "./AddListing.module.css";
import ImgIcon from "../../../svg/ImgIcon";
import { NotificationContext } from "../../../context/NotificationContext";
import { addListing } from "../../../api/listing";
import { AuthContext } from "../../../context/AuthContext";
import { AdminContext } from "../../../context/AdminContext";

const AddListing = () => {
  const [title, setTitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [price, setPrice] = useState(null);
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [coords, setCoords] = useState(null);
  const [type, setType] = useState(null);
  const [description, setDescription] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [size, setSize] = useState(null);
  const [perks, setPerks] = useState(null);
  const [images, setImages] = useState([]);

  const { triggerNotification } = useContext(NotificationContext);
  const { token } = useContext(AdminContext);

  useEffect(() => {
    document.title = "Appartment Listing || Add Listing";
  });

  //////////////////////////////
  const setCoordsValue = () => {
    console.log("reached");
    setCoords([+lat, +lng]);
  };

  useEffect(() => {
    console.log(lat, lng);
    // if (typeof lat === "number" && typeof lng === "number") {
    if (lat && lng) {
      setCoordsValue();
    }
  }, [lat, lng]);
  ////////////////////////////

  const getImages = (imgs) => {
    setImages(imgs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      location,
      price,
      description,
      lat,
      lng,
      type,
      size,
      rooms,
      perks,
      images,
    };

    const response = await addListing(data, token);
    const listing = response.data?.listing;
    console.log(response.data);
    if (listing) {
      triggerNotification("Listing added successfully");
    } else {
      triggerNotification("couldn't add listing");
    }
  };

  return (
    <>
      <main className={classes.addListing}>
        <h1>Add Listing</h1>
        <div className={classes.addListingWrapper}>
          <div>
            <Form
              method="post"
              onSubmit={handleSubmit}
              // action="/admin/add-listing"
              // onSubmit={handleSubmit}
            >
              <Input
                setValue={setTitle}
                className={classes.name}
                type="text"
                name="title"
              >
                title:
              </Input>
              <Input
                setValue={setLocation}
                className={classes.location}
                type="text"
                name="location"
              >
                location:
              </Input>
              <Input
                setValue={setType}
                className={classes.type}
                type="text"
                name="type"
              >
                type:
              </Input>
              <Input
                setValue={setPrice}
                className={classes.price}
                type="number"
                name="price"
              >
                price:
              </Input>
              <Input
                setValue={setDescription}
                className={classes.description}
                type="textarea"
                name="description"
              >
                description:
              </Input>
              <Input
                setValue={setLat}
                className={classes.lat}
                type="number"
                name="lat"
              >
                latitude:
              </Input>
              <Input
                setValue={setLng}
                className={classes.lng}
                type="number"
                name="lng"
              >
                longitude:
              </Input>
              <Input
                setValue={setRooms}
                className={classes.rooms}
                type="number"
                name="rooms"
              >
                rooms:
              </Input>
              <Input
                setValue={setSize}
                className={classes.size}
                type="number"
                name="size"
              >
                size:
              </Input>
              <Input
                setValue={setPerks}
                className={classes.perks}
                type="select"
                name="perks"
              >
                perks:
              </Input>
              <Input
                getImages={getImages}
                className={classes.img}
                type="file"
                name="img"
                hide={true}
              >
                <p>
                  {images.length === 0
                    ? "Select Images:"
                    : `${images.length} ${
                        images.length > 1 ? "images" : "image"
                      } selected`}
                </p>
                <div>
                  <ImgIcon />
                </div>
              </Input>

              <button className={classes.addBtn}>Add Listing</button>
            </Form>
          </div>
        </div>
      </main>
    </>
  );
};
export default AddListing;

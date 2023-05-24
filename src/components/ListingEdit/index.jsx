import React, { useContext, useEffect, useState } from "react";
import classes from "./ListingEdit.module.css";
import Input from "../Input";
import Overlay from "../Overlay";
import { Button } from "@mui/material";
import Select from "../Select";
import listingContext from "../../context/ListingContext";
import { CameraAltRounded } from "@mui/icons-material";
// import Input from "../Input";
import { NotificationContext } from "../../context/NotificationContext";

const ListingEdit = () => {
  const [field, setField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  console.log("VALUE", fieldValue);

  useEffect(() => {
    window.addEventListener("keydown", (e) => handleKey(e));
  });

  const { triggerListingEdit, editListingProperties, listingEditType } =
    useContext(listingContext);

  const { triggerNotification } = useContext(NotificationContext);

  const readURI = (imgs) => {
    imgs.forEach((img) => {
      if (img) {
        let reader = new FileReader();
        reader.onload = function (e) {
          setSelectedImages((prevImgs) => [...prevImgs, e.target.result]);
        };
        reader.readAsDataURL(img);
      }
    });
  };

  const handleSubmit = async () => {
    if (fieldValue.length > 1 || selectedImages.length > 1) {
      console.log("SUBMITTING", images);
      const data =
        images.length > 0
          ? {
              images: images,
            }
          : {
              [field]: fieldValue,
            };
      // setShowModal(false);
      // triggerListingEdit();
      const done = await editListingProperties(data);
      console.log("DONE:", done);
      if (done === "success") {
        setShowModal(false);
        setField(null);
        setFieldValue("");
        setSelectedImages([]);
        triggerListingEdit();
      } else {
        triggerNotification("Upload failed");
      }
    } else {
      triggerNotification("add two or more images or one field");
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    triggerListingEdit();
    setSelectedImages([]);
    setField(null);
    setFieldValue("");
  };

  const handleKey = (e) => {
    e.code === "Escape" && handleCancel();
    e.code === "Enter" && handleSubmit();
  };

  return (
    <Overlay show={showModal} disableOnClick={false}>
      <div className={classes.listingEdit}>
        {listingEditType === "images" ? (
          <div className={classes.imageSelect}>
            <p>
              {selectedImages.length === 0
                ? "Select Images:"
                : `${selectedImages.length} ${
                    selectedImages.length > 1 ? "images" : "image"
                  } selected`}
            </p>
            <Input
              getImages={(imgs) => {
                console.log("IMGS", imgs);
                setImages((prev) => [...prev, ...imgs]);
                readURI(imgs);
              }}
              className={classes.img}
              type="file"
              name="img"
              hide={true}
            >
              <span>
                <CameraAltRounded />
              </span>
            </Input>
            <div className={classes.selectedImages}>
              {selectedImages.length > 0 &&
                selectedImages.map((selectedImage) => (
                  <div key={Math.random()} className={classes.selectedImage}>
                    <img src={selectedImage} alt="" />
                  </div>
                ))}
            </div>
          </div>
        ) : field ? (
          <form action="submit" onSubmit={handleSubmit}>
            <p>Edit {field}:</p>
            <Input
              value={fieldValue}
              setValue={setFieldValue}
              type={field === "description" ? "textarea" : ""}
            />
          </form>
        ) : (
          <Select
            placeholder="select field you wish to edit"
            selected={field}
            getSelected={setField}
            options={[
              { value: "title", label: "title" },
              { value: "price", label: "price" },
              { value: "type", label: "type" },
              { value: "location", label: "location" },
              { value: "description", label: "description" },
              { value: "perks", label: "perks" },
              { value: "duration", label: "duration" },
              { value: "rooms", label: "rooms" },
              { value: "size", label: "size" },
            ]}
          />
        )}

        <div className={classes.buttons}>
          <Button
            disableElevation={true}
            style={{
              backgroundColor: "#d34949",
              color: "#fff",
              fontWeight: "bold",
            }}
            onClick={() => {
              handleCancel();
            }}
          >
            cancel
          </Button>
          <Button
            disableElevation={true}
            style={{
              backgroundColor: "#07594b",
              color: "#fff",
              fontWeight: "bold",
            }}
            onClick={() => {
              handleSubmit();
            }}
          >
            confirm
          </Button>
        </div>
      </div>
    </Overlay>
  );
};

export default ListingEdit;

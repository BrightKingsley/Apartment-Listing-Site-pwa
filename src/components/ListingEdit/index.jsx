import React, { useContext, useState } from "react";
import classes from "./ListingEdit.module.css";
import Input from "../Input";
import Overlay from "../Overlay";
import { Button } from "@mui/material";
import Select from "../Select";
import listingContext from "../../context/ListingContext";

const ListingEdit = () => {
  const [field, setField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");
  const [showModal, setShowModal] = useState(true);

  const { triggerListingEdit, editListingProperties } =
    useContext(listingContext);

  const handleSubmit = () => {
    const data = {
      [field]: fieldValue,
    };
    console.log(data);
    setShowModal(false);
    editListingProperties(data);
    triggerListingEdit();
  };

  return (
    <Overlay show={showModal} disableOnClick={false}>
      <div className={classes.listingEdit}>
        {field ? (
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
              setShowModal(false);
              triggerListingEdit();
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

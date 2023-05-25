import {
  BathtubTwoTone,
  BedRounded,
  SquareFootRounded,
} from "@mui/icons-material";
import React from "react";
import { useContext } from "react";
import { FaGasPump } from "react-icons/fa";
import classes from "./Perks.module.css";
import { OpenWithRounded } from "@mui/icons-material/OpenWithRounded";

const Perks = ({ listing }) => {
  return (
    <div className={classes.perks}>
      <small>
        <BedRounded />
        {listing.bedrooms}
      </small>
      <small>
        <BathtubTwoTone />
        {listing.bathrooms}
      </small>
      <small>
        <SquareFootRounded />
        {listing && listing.size}sqft
      </small>
    </div>
  );
};

export default Perks;

import {
  BathtubTwoTone,
  GasMeterRounded,
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
        <GasMeterRounded />{listing.rooms}
      </small>
      <small>
        <BathtubTwoTone />{listing.bathrooms}
      </small>
      <small>
        <SquareFootRounded />
        {listing && listing.size}sqft
      </small>
    </div>
  );
};

export default Perks;

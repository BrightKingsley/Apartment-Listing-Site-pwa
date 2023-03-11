import React, { useState } from "react";
// import Button from "../UI/Button";
import Checkbox from "../Checkbox";
import Increment from "../Increment";
import PropertyTypeSelect from "../PropertyTypeSelect";
import RangeInput from "../RangeInput";

import classes from "./FilterMenu.module.css";
import Hamburger from "../../svg/Hamburger";
import { Button } from "@mui/material";

const priceMax = 10000;
const priceMin = 0;
const areaMax = 1000;
const areaMin = 10;

const FilterMenu = ({ handleShowNav, showNav }) => {
  const [priceRange, setPriceRange] = useState([200, 5000]);
  const [areaRange, setAreaRange] = useState([200, 5000]);
  const getPriceRange = (value) => {
    setPriceRange(value);
  };

  const getAreaRange = (value) => {
    setAreaRange(value);
  };

  return (
    <div className={`${classes.filterMenu}  ${showNav && classes.showNav}`}>
      <span className={classes.hamburger} onClick={() => handleShowNav(false)}>
        <Hamburger />
      </span>

      <h2>Filters</h2>
      <div className={classes.filterWrapper}>
        <div className={classes.filterSection}>
          <p>Property Type</p>
          <PropertyTypeSelect />
        </div>
        <div className={classes.filterSection}>
          <p>Rental Period</p>
          <label htmlFor=""></label>
          <Checkbox label="All" />
          <Checkbox label="Letly" />
          <Checkbox label="Innly" />
        </div>
        <div className={classes.filterSection} action="submit">
          <p>Price Range</p>
          <RangeInput
            getRangeValue={getPriceRange}
            setRangeValue={priceRange}
            min={priceMin}
            max={priceMax}
            step={10}
          />
          <div className={classes.tags}>
            <input
              className={classes.tag}
              type="number"
              name=""
              id=""
              value={priceRange[0]}
              min={1}
              onChange={(e) =>
                setPriceRange((prevPrice) => {
                  const min = e.target.valueAsNumber;
                  if (min && min >= priceMin && typeof min === "number")
                    return [min, prevPrice[1]];
                  else return [priceMin, prevPrice[1]];
                })
              }
            />
            <input
              className={classes.tag}
              type="number"
              name=""
              id=""
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange((prevPrice) => {
                  const max = e.target.valueAsNumber;
                  if (max && max <= priceMax && typeof max === "number")
                    return [prevPrice[0], max];
                  else return [prevPrice[0], priceMax];
                })
              }
            />
            <Button
              style={{
                color: "#fff",
                backgroundColor: "#07594b",
                width: "2rem",
              }}
              size="small"
              className={classes.OK}
            >
              OK
            </Button>
          </div>
        </div>
        <div className={classes.filterRooms}>
          <div className={classes.rooms}>
            <p>Bedroom</p>
            <Increment />
          </div>
          <div className={classes.rooms}>
            <p>bathroom</p>
            <Increment />
          </div>
        </div>
        <div className={classes.filterSection} action="submit">
          <p>Property area Range</p>
          <RangeInput
            getRangeValue={getAreaRange}
            setRangeValue={areaRange}
            min={areaMin}
            max={areaMax}
            step={10}
          />
          <div className={classes.tags}>
            <input
              className={classes.tag}
              type="number"
              name=""
              id=""
              value={areaRange[0]}
              onChange={(e) =>
                setAreaRange((prevRange) => {
                  const min = e.target.valueAsNumber;
                  if (min && min >= areaMin && typeof min === "number")
                    return [min, prevRange[1]];
                  else return [areaMin, prevRange[1]];
                })
              }
            />
            <input
              className={classes.tag}
              type="number"
              name=""
              id=""
              value={areaRange[1]}
              onChange={(e) =>
                setAreaRange((prevRange) => {
                  const max = e.target.valueAsNumber;
                  if (max && max <= areaMax && typeof max === "number")
                    return [prevRange[0], max];
                  else return [prevRange[0], areaMax];
                })
              }
            />
            <Button
              style={{
                color: "#fff",
                backgroundColor: "#07594b",
                width: "2rem",
              }}
              size="small"
              className={classes.OK}
            >
              OK
            </Button>
          </div>
        </div>
        <div className={classes.filterSection}>
          <p>Additional Conveniences</p>
          <Checkbox label="Pets allowed" />
          <Checkbox label="Parking slot" />
          <Checkbox label="Furnished" />
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;

/*

  flex: 0.8;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding-right: 2rem;
  height: 100%;
  z-index: 2;*/
/* width: 75%; */
// transition: all 0.3s;
/* position: absolute; */
// border-right: 2px solid var(--gray-2);
// overflow-y: scroll;
// padding-left: 2rem;
// transform: translateX(-100%);
//  */

import React, { useState } from "react";
import RangeSlider from "react-range-slider-input/dist/components/RangeSlider";
// import classes from "./RangeInput.module.css";
// import "react-range-slider-input/dist/style.css";
import "./RangeInput.css";

const RangeInput = ({ getRangeValue, setRangeValue, min, max, step }) => {
  return (
    <RangeSlider
      min={min}
      max={max}
      step={step}
      value={setRangeValue}
      onInput={(e) => getRangeValue(e)}
    />
  );
};

export default RangeInput;

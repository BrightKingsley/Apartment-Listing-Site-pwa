import React, { useState } from "react";
import classes from "./Select.module.css";
import Select from "react-select";

const MySelect = ({ options, getSelected, selected, placeholder }) => {
  const setSelected = (e) => {
    console.log(e.value);
    getSelected(e.value);
  };

  return (
    <Select
      styles={{
        control: (baseStyles, state) => {
          return {
            ...baseStyles,
            "&:hover": { borderColor: "#0b947e" },
            borderColor: state.mouseOver ? "#0b947e" : "transparent",
            outline: "none",
            width: "100%",
            padding: 0,
            cursor: "pointer",
          };
        },
      }}
      theme={(theme) => {
        return {
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "#e1fdf8",
            primary: "#0b947e",
          },
          spacing: {
            controlHeight: 30,
            menuGutter: 8,
            baseUnit: 2,
          },
        };
      }}
      defaultValue={options[0]}
      options={options}
      placeholder={placeholder}
      onChange={setSelected}
      value={selected}
    />
  );
};

export default MySelect;

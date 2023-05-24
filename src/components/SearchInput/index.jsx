import { Search, SearchRounded } from "@mui/icons-material";
import React from "react";
import classes from "./SearchInput.module.css";

const SearchInput = () => {
  return (
    <div className={classes.searchInput}>
      <span className={classes.searchIcon}>
        <SearchRounded />
      </span>
      <input type="text" placeholder="Search" />
    </div>
  );
};

export default SearchInput;

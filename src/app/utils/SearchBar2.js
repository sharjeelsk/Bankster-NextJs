import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../style/SearchBar.scss";
function SearchBar2(props) {
  const [text, setText] = useState("");
  return (
    <div className="shadow-sm search-bar-2 row m-auto align-items-center">
      <div className="col-7 col-sm-7 col-md-10 col-lg-10 col-xl-10 input-div">
        <input
          placeholder={props.searchText}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 button-div">
        <Button
          onClick={() => {
            if (text.length > 0) {
              props.handleSearchSubmit(text);
            } else {
              props.getAllData();
            }
          }}
          startIcon={<SearchIcon />}
          variant="contained"
          fullWidth
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchBar2;

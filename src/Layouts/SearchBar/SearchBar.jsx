import React from "react";
import "./SearchBar.css";

const SearchBar = ({
  setSearchInput,
  searchInput,
  onSearch,
  setToggledResult,
}) => {
  let timer;
  const debounce = (arg) => {
    clearTimeout(timer);
    setSearchInput(arg);
    timer = setTimeout(() => {
      onSearch(searchInput);
      setToggledResult(true);
    }, 2000);
  };

  return (
    <div className="search-bar-container ">
      <form role="form ">
        <div className="form-group">
          <input
            onKeyUp={(e) => {
              debounce(e.target.value);
            }}
            type="text"
            className="form-control empty "
            id="iconified"
          ></input>

          <i
            className="fal fa-search  fa-2x search-icon"
            onClick={() => {
              onSearch(searchInput);
            }}
          ></i>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

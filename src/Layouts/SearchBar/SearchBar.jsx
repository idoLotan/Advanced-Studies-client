import React, { useRef } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const searchRef = useRef();

  function handler() {
    console.log(searchRef.current.value);
    onSearch(searchRef.current.value);
  }

  function debounce(f, ms) {
    let timeout;

    return function () {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        f();
      }, ms);
    };
  }

  return (
    <div className="search-bar-container ">
      <form role="form ">
        <div className="form-group">
          <input
            onKeyUp={debounce(handler, 500)}
            ref={searchRef}
            type="text"
            className="form-control "
            id="iconified"
            placeholder="search courses..."
          ></input>

          <i
            className="fal fa-search  fa-2x search-icon"
            onClick={debounce(handler, 500)}
          ></i>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

import React from "react";

function SearchPopUp() {
  return (
    <>
      <div className="search-popup">
        <button className="close-search">
          <span className="far fa-times"></span>
        </button>
          <div className="form-group">
            <input
              type="search"
              name="search-field"
              placeholder="Search Here..."
              required
            />
            <button type="submit">
              <i className="far fa-search"></i>
            </button>
          </div>
      </div>
    </>
  );
}

export default SearchPopUp;

import React from 'react'
import "./searchBar.css"

function SearchBar() {
    return (
      <div className="search-container">
        <div className="search-box">
          <input className='textbox' type="text" placeholder="PLACEHOLDER FOR SEARCH BAR" />
        </div>
      </div>
    );
}

export default SearchBar;
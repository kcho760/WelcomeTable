import React from 'react'
import "./searchBar.css"

function SearchBar() {
    return (
      <div className="search-container">
          <p className='splash-title'>When you're too cheap for real restaurants</p>
          <div className='search-box-container'>
            <div className="search-box">
              <input className='textbox' type="text" placeholder="Location, Restaurant, or Cuisine" />
            </div>
              <button className='search-button' type="submit">Let's Go</button>
          </div>

      </div>
    );
}

export default SearchBar;
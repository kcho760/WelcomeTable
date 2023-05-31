import React from 'react'
import "./searchBar.css"

function SearchBar() {
    return (
      <div className="search-container">
          <p className='splash-title'>For when you forgot your anniversary</p>
        <div className="search-box">
          <input className='textbox' type="text" placeholder="PLACEHOLDER FOR SEARCH BAR" />
        </div>
        <div>
          <button className='search-button' type="submit">Let's Go</button>
        </div>
      </div>
    );
}

export default SearchBar;
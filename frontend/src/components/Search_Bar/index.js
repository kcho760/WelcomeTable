import React from 'react'
import "./searchBar.css"

function SearchBar() {
    return (
      <div className="search-container">
          <p className='splash-title'>For When You Forgot Your Anniversary</p>
        <div className="search-box">
          <input className='textbox' type="text" placeholder="PLACEHOLDER FOR SEARCH BAR" />
        </div>
      </div>
    );
}

export default SearchBar;
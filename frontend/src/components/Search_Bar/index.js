import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './searchBar.css';

function SearchBar() {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${searchTerm}`);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-container">
        <p className='splash-title'>When you're too cheap for real restaurants</p>
      <form onSubmit={handleSubmit}>
        <div className='search-box-container'>
          <div className="search-box">
            <input
              className='textbox'
              type="text"
              placeholder="Location, Restaurant, or Cuisine"
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
          <button className='search-button' type="submit">Let's Go</button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;

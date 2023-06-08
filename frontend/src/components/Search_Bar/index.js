import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './searchBar.css';
import { getAllCuisines } from '../../store/search';


function SearchBar() {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const cuisines = useSelector((state) => state.search.cuisines);
  const dispatch = useDispatch();

  
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${searchTerm}`);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(true);
  };
  
  const handleInputClick = () => {
    console.log(cuisines)
    setShowSuggestions(true);
  };
  
  useEffect(() => {
    dispatch(getAllCuisines());
  }, [dispatch]);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };


  return (
    <div className="search-container">
      <p className="splash-title">When you're too cheap for real restaurants</p>
      <form onSubmit={handleSubmit}>
        <div className="search-box-container">
          <div className="search-box">
            <input
              className="textbox"
              type="text"
              placeholder="Location, Restaurant, or Cuisine"
              value={searchTerm}
              onChange={handleInputChange}
              onClick={handleInputClick}
            />
            {showSuggestions && cuisines.length > 0 && (
              <ul className="suggestions-list">
                {cuisines.map((cuisine) => (
                  <li
                    key={cuisine}
                    className="suggestion"
                    onClick={() => handleSuggestionClick(cuisine)}
                  >
                    {cuisine}
                  </li>
                ))}
              </ul>
            )}
          </div>
  
          <button className="search-button" type="submit">
            Let's Go
          </button>
        </div>
      </form>
    </div>
  );
}
  

export default SearchBar;

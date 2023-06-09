import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './searchBar.css';
import { getAllCuisines } from '../../store/search';

function SearchBar({ text }) {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const cuisines = useSelector((state) => state.search.cuisines.cuisines);
  const dispatch = useDispatch();

  const searchBoxRef = useRef(null);
  const suggestionListRef = useRef(null);

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
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const handleClickOutside = (e) => {
    if (
      searchBoxRef.current &&
      !searchBoxRef.current.contains(e.target) &&
      suggestionListRef.current &&
      !suggestionListRef.current.contains(e.target)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    dispatch(getAllCuisines());
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div className="search-container">
      <p className="splash-title">{text}</p>
      <form onSubmit={handleSubmit}>
        <div className="search-box-container">
          <div className="search-box" ref={searchBoxRef}>
            <input
              className="textbox"
              type="text"
              placeholder="Search by Cuisine"
              value={searchTerm}
              onChange={handleInputChange}
              onClick={handleInputClick}
            />
            {showSuggestions && (
              <ul className="suggestions-list" ref={suggestionListRef}>
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

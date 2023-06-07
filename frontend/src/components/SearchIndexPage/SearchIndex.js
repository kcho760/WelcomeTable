import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './searchIndex.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults } from '../../store/search';

function SearchIndex() {
  const { searchTerm } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchResults(searchTerm));
  }, [dispatch, searchTerm]);

  const searchResults = useSelector((state) => state.search.results);
  return (
    <div>
      <h1>Search Results for: {searchTerm}</h1>

      {Array.isArray(searchResults) ? (
        <ul>
          {searchResults.map((restaurant) => (
            <li key={restaurant.id}>{restaurant.name}</li>
            // fill in restaurant details here
          ))}
        </ul>
      ) : (
        <p>No search results found.</p>
      )}
    </div>
  );
}

export default SearchIndex;

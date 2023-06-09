import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './searchIndex.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults } from '../../store/search';
import StarRating from "../RestaurantCarousel/subcomponents/star_rating";
import SearchBar from '../Search_Bar';

function SearchIndex() {
  const { searchTerm } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchResults(searchTerm));
  }, [dispatch, searchTerm]);

  const searchResults = useSelector((state) => state.search.search.results);

  return (
    <div>
      <div className="search-index-search-container">
        <SearchBar className="search-index-search-bar" />
      <h1>Search Results for: {searchTerm}</h1>
      </div>
      {Array.isArray(searchResults) ? (
        <ul>
          <div>
          {searchResults.map((restaurant) => (
            <div className='search-index-restaurant'>
              <Link to={`/restaurants/${restaurant.id}`}>
              <img className='search-image' key={restaurant.id} src={restaurant.photoUrls[0]} alt="restaurant" />

            <div>
              <li key={restaurant.id}>{restaurant.name}</li>

              <div className="StarRating-container">
                <StarRating
                  className="star-rating"
                  foodRating={restaurant.food_rating}
                  serviceRating={restaurant.service_rating}
                  ambienceRating={restaurant.ambience_rating}
                  valueRating={restaurant.value_rating}
                />
              </div>
            </div>
              </Link>
            </div>
            
          ))}
          </div>
        </ul>
      ) : (
        <p>No search results found.</p>
      )}
    </div>
  );
}

export default SearchIndex;

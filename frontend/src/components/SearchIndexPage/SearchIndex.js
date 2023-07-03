import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './searchIndex.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults } from '../../store/search';
import RestaurantStarRating from "../RestaurantCarousel/subcomponents/restaurant_star_rating";
import SearchBar from '../Search_Bar';
import CostRating from "../RestaurantCarousel/subcomponents/cost_rating";

function SearchIndex() {
  const { searchTerm = '' } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getSearchResults(searchTerm));
  }, [dispatch, searchTerm]);

  const searchResults = useSelector((state) => state.search.search.results) || [];

  return (
    <div>
      <div className="search-index-search-container">
        <SearchBar className="search-index-search-bar" />
      </div>
      <div className="search-result-container">
        <h1 className="search-result-text">
          Search Results for: {searchTerm ? searchTerm : 'All'}
        </h1>
      </div>
      {Array.isArray(searchResults) ? (
        <ul>
          <div>
          {searchResults.map((restaurant) => (
            <div className="search-index-restaurant" key={restaurant.id}>
              <div>
                <Link to={`/restaurants/${restaurant.id}`}>
                  <img className="search-image" src={restaurant.photoUrls[0]} alt="restaurant" />
                </Link>
                  <div className="restaurant-info">
                <Link to={`/restaurants/${restaurant.id}`}>
                    <h3>{restaurant.name}</h3>
                  </Link>
                    <div className="star-rating">
                      <RestaurantStarRating restaurantId={restaurant.id}/>
                    </div>
                    <div className="restaurant-info-line-2">
                      <div>
                        <CostRating className="restaurant-price" price={restaurant.price} />
                      </div>
                      <div className="search-dot">&#x2022;</div>
                      <p className="restaurant-city">{restaurant.city}</p>
                    </div>
                    <div className="reservation-container">
                      <button className="restaurant-reservation-button">10:00 AM</button>
                      <button className="restaurant-reservation-button">10:15 AM</button>
                      <button className="restaurant-reservation-button">10:30 AM</button>
                    </div>
                  </div>
              </div>
            </div>
          ))}
          </div>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SearchIndex;

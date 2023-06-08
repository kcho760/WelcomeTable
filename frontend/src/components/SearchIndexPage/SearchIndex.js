import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './searchIndex.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults } from '../../store/search';
import StarRating from "../RestaurantCarousel/subcomponents/star_rating";

function SearchIndex() {
  const { searchTerm } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchResults(searchTerm));
  }, [dispatch, searchTerm]);

  const searchResults = useSelector((state) => state.search.search.results);

  return (
    <div>
      <h1>Search Results for: {searchTerm}</h1>

      {Array.isArray(searchResults) ? (
        <ul>
          {searchResults.map((restaurant) => (
            <div>
              <img key={restaurant.id} src={restaurant.photoUrls[0]} alt="restaurant" />

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

            <div className="reservation-container">
            <button className="restaurant-reservation-button">10:00 AM</button>
            <button className="restaurant-reservation-button">10:15 AM</button>
            <button className="restaurant-reservation-button">10:30 AM</button>
          </div>

            </div>
          ))}
        </ul>
      ) : (
        <p>No search results found.</p>
      )}
    </div>
  );
}

export default SearchIndex;

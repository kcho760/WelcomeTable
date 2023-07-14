import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import './searchIndex.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults, getAllResults } from '../../store/search';
import { fetchAvailableReservations, createReservation } from "../../store/reservation";
import RestaurantStarRating from "../RestaurantCarousel/subcomponents/restaurant_star_rating";
import SearchBar from '../Search_Bar';
import CostRating from "../RestaurantCarousel/subcomponents/cost_rating";
import LoginFormModal from '../LoginFormModal/index';

function SearchIndex() {
  const { searchTerm = '' } = useParams();
  const dispatch = useDispatch();
  const [availableReservations, setAvailableReservations] = useState([]);
  const currentUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [showLoginFormModal, setShowLoginFormModal] = useState(false);
  const searchResults = useSelector((state) => state.search.search.results) || [];

  // Fetch all results when the component first loads
  useEffect(() => {
    if (searchTerm) {
      dispatch(getSearchResults(searchTerm));
    } else {
      dispatch(getAllResults());
    }
  }, [dispatch, searchTerm]);

  useEffect(() => {
    const fetchReservations = async (restaurant) => {
      const currentTime = new Date();
      const startDateTime = new Date(Math.ceil(currentTime.getTime() / (15 * 60000)) * (15 * 60000));
      const endDateTime = new Date(startDateTime.getTime() + 31 * 60000);
      const reservationsParams = {
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
        restaurantId: restaurant.id,
        partySize: 2,
      };
    
      const reservations = await dispatch(fetchAvailableReservations(reservationsParams));
      setAvailableReservations(reservations?.availableReservations || []);
    };

    if (searchResults.length > 0) {
      fetchReservations(searchResults[0]); // Fetch reservations for the first restaurant in the search results
    }
  }, [searchResults, dispatch]);

  const handleReservationClick = async (reservation, restaurant) => {
    try {
      const modifiedReservationTime = new Date(reservation.reservationTime);
      modifiedReservationTime.setHours(modifiedReservationTime.getHours() + 1);
      const currentUserId = currentUser?.id; 
      const partySize = 2;
  
      if (!currentUserId) {
        setShowLoginFormModal(true);
      }

      const reservationData = {
        reservation: {
          reservation_time: modifiedReservationTime.toISOString(),
          reservation_date: modifiedReservationTime.toISOString(),
          restaurant_id: restaurant.id,
          user_id: currentUserId,
          party_size: partySize,
        },
      };

      const createdReservation = await dispatch(createReservation(reservationData));
      const reservationId = createdReservation.reservation.id;
      history.push(`/reservation/${reservationId}`);
    } catch (error) {
      console.error('Reservation Error:', error);
      // Display an error message to the user or handle the error as needed
    }
  };

  return (
    <div>
      <div className="search-index-search-container">
        <SearchBar className="search-index-search-bar" />
      </div>
      {showLoginFormModal && <LoginFormModal />}
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
                      <RestaurantStarRating restaurantId={restaurant.id} />
                    </div>
                    <div className="restaurant-info-line-2">
                      <div>
                        {restaurant.cuisine}
                      </div>
                      <div className="search-dot">&#x2022;</div>

                      <div>
                        <CostRating className="restaurant-price" price={restaurant.price} />
                      </div>
                      <div className="search-dot">&#x2022;</div>
                      <p className="restaurant-city">{restaurant.city}</p>
                    </div>
                    <div className="reservation-container">
                      {availableReservations.map((reservation, index) => (
                        <button
                          key={index}
                          className="restaurant-reservation-button"
                          onClick={() => handleReservationClick(reservation, restaurant)}
                        >
                          {new Date(reservation.reservationTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </button>
                      ))}
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

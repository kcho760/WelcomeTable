import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableReservations, createReservation } from "../../store/reservation";
import RestaurantStarRating from "./subcomponents/restaurant_star_rating";
import CostRating from "./subcomponents/cost_rating";
import graph from "./assets/graph.png";
import { Link, useHistory } from "react-router-dom";

function RestaurantIndexItem({ restaurant }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [availableReservations, setAvailableReservations] = useState([]);
  const currentUser = useSelector((state) => state.session.user); // Access the current user from Redux state

  useEffect(() => {
    const fetchReservations = async () => {
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
      setAvailableReservations(reservations.availableReservations || []);
    };

    fetchReservations();
  }, [dispatch, restaurant.id]);

  const handleReservationClick = async (reservation) => {
    try {
      const modifiedReservationTime = new Date(reservation.reservationTime);
      modifiedReservationTime.setHours(modifiedReservationTime.getHours() + 1);
      const currentUserId = currentUser.id; // Access the current user's ID from Redux state
      const partySize = 2; // Modify this as needed
  
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
      console.error("Reservation Error:", error);
      // Display an error message to the user or handle the error as needed
    }
  };
  
  
  return (
    <div className="restaurant-item">
      <div className="restaurant-image-container">
        <Link to={`/restaurants/${restaurant.id}`}>
          <img className="restaurant-image" src={restaurant.photoUrls[0]} alt={restaurant.name} />
        </Link>
      </div>
      <div className="restaurant-info">
        <Link to={`/restaurants/${restaurant.id}`}>
          <p className="restaurant-name">{restaurant.name}</p>
        </Link>
        <div className="StarRating-container">
          <RestaurantStarRating restaurantId={restaurant.id} />
          <p className="restaurant-review-count">{restaurant.reviewCount}0 reviews</p>
        </div>
        <div className="cuisine-container">
          <p className="restaurant-cuisine">{restaurant.cuisine}</p>
          <div className="dot-1">&#x2022;</div>
          <CostRating className="restaurant-price" price={restaurant.price} />
          <div className="dot-2">&#x2022;</div>
          <p className="restaurant-city">{restaurant.city}</p>
        </div>
        <div className="booking-container">
          <img className="graph" src={graph} alt="graph"></img>
          <p className="restaurant-daily-booking">Booked X times today</p>
        </div>
        <div className="reservation-container">
          {availableReservations.map((reservation, index) => (
            <button
              key={index}
              className="restaurant-reservation-button"
              onClick={() => handleReservationClick(reservation)}
            >
              {new Date(reservation.reservationTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
            }  
export default RestaurantIndexItem;

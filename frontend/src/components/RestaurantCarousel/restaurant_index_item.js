import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableReservations, createReservation } from "../../store/reservation";
import RestaurantStarRating from "./subcomponents/restaurant_star_rating";
import CostRating from "./subcomponents/cost_rating";
import graph from "./assets/graph.png";
import { Link, useHistory } from "react-router-dom";
import LoginFormModal from '../LoginFormModal/index';
import { retrieveReviewsByRestaurantId } from "../../store/review";
import LoadingAnimation from "./subcomponents/Loading_Animation";

const RestaurantIndexItem = React.memo(({ restaurant }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [availableReservations, setAvailableReservations] = useState([]);
  const currentUser = useSelector((state) => state.session.user); // Access the current user from Redux state
  const [showLoginFormModal, setShowLoginFormModal] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [isLoadingReservations, setIsLoadingReservations] = useState(true);
  const [isLoadingRating, setIsLoadingRating] = useState(true);

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

      setIsLoadingReservations(true);

      const reservations = await dispatch(fetchAvailableReservations(reservationsParams));
      setAvailableReservations(reservations.availableReservations || []);
      setIsLoadingReservations(false);
    };

    const fetchReviewData = async () => {
      try {
        setIsLoadingRating(true);
        // Retrieve reviews for the restaurant
        const fetchedReviews = await dispatch(retrieveReviewsByRestaurantId(restaurant.id));
        setReviews(fetchedReviews);
        setReviewCount(fetchedReviews.length);
        setIsLoadingRating(false);
      } catch (error) {
        console.error("Failed to retrieve reviews:", error);
      }
    };

    fetchReservations();
    fetchReviewData();
  }, [dispatch, restaurant.id]);

const handleReservationClick = async (reservation) => {
  try {
    const reservationTime = new Date(reservation.reservationTime);
    reservationTime.setHours(reservationTime.getHours() + 1);

    const reservationDate = new Date(reservation.reservationTime);
    reservationDate.setDate(reservationDate.getDate() - 1); // Subtract one day from the reservation date

    if (!currentUser || !currentUser.id) {
      setShowLoginFormModal(true);
      return;
    }

    const reservationData = {
      reservation: {
        reservation_time: reservationTime.toISOString(),
        reservation_date: reservationDate.toISOString().split('T')[0], // Only get the date part
        restaurant_id: restaurant.id,
        user_id: currentUser.id,
        party_size: 2,
      },
    };

    const createdReservation = await dispatch(createReservation(reservationData));
    const reservationId = createdReservation.reservation.id;
    history.push(`/reservation/${reservationId}`);
  } catch (error) {
    console.error("Reservation Error:", error);
  }
};
    
  return (
    <div className="restaurant-item">
      {showLoginFormModal && <LoginFormModal />}
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
          {isLoadingRating ? (
            <LoadingAnimation /> // Render the loading animation while rating is being fetched
          ) : (
            <RestaurantStarRating restaurantId={restaurant.id} />
          )}
          <p className="restaurant-review-count">{reviewCount} reviews</p>
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
          {isLoadingReservations ? (
            <LoadingAnimation /> // Render the loading animation when reservations are being fetched
          ) : (
            availableReservations.map((reservation, index) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
});

export default RestaurantIndexItem;

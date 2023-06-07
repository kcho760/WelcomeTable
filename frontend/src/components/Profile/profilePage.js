import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserReservations } from '../../store/reservation';
import { retrieveRestaurant } from '../../store/restaurant';
import './profilePage.css';
import UpcomingReservations from "./subcomponents/UpcomingReservations";
import PastReservations from "./subcomponents/PastReservations";

const UserProfile = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const userReservations = useSelector(state => state.reservation.userReservations);
  const restaurants = useSelector(state => state.restaurant);
  const [showUpcomingReservations, setShowUpcomingReservations] = useState(true);
  const [showPastReservations, setShowPastReservations] = useState(false);

  useEffect(() => {
    dispatch(fetchUserReservations(user.id));
  }, [dispatch, user.id]);

  useEffect(() => {
    if (userReservations && userReservations.reservations) {
      userReservations.reservations.forEach(reservation => {
        dispatch(retrieveRestaurant(reservation.restaurant_id));
      });
    }
  }, [dispatch, userReservations]);

  const getRestaurantName = (restaurantId) => {
    const restaurant = restaurants[restaurantId];
    return restaurant ? restaurant.name : 'Unknown';
  };

  const handleShowUpcomingReservations = () => {
    setShowUpcomingReservations(true);
    setShowPastReservations(false);
  };

  const handleShowPastReservations = () => {
    setShowUpcomingReservations(false);
    setShowPastReservations(true);
  };

  return (
    <div>
      <div>
        <h1>{user.username}</h1>
      </div>
      <div className="profile-nav-bar">
        <button onClick={handleShowUpcomingReservations}>Upcoming Reservations</button>
        <button onClick={handleShowPastReservations}>Past Reservations</button>
        {/* Add other navigation links as needed */}
      </div>

      {showUpcomingReservations && (
        <UpcomingReservations
          userReservations={userReservations}
          getRestaurantName={getRestaurantName}
        />
      )}

      {showPastReservations && (
        <PastReservations
          userReservations={userReservations}
          getRestaurantName={getRestaurantName}
        />
      )}
    </div>
  );
};

export default UserProfile;

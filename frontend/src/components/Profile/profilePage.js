import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      // User not found, redirect to home page
      history.push("/");
    } else {
      dispatch(fetchUserReservations(user.id));
    }
  }, [dispatch, history, user]);

  useEffect(() => {
    if (userReservations && userReservations.reservations) {
      userReservations.reservations.forEach(reservation => {
        dispatch(retrieveRestaurant(reservation.restaurant_id));
      });
    }
  }, [dispatch, userReservations]);

  const getRestaurant = (restaurantId) => {
    return restaurants[restaurantId] || null;
  };
  

  const handleShowUpcomingReservations = () => {
    setShowUpcomingReservations(true);
    setShowPastReservations(false);
  };

  const handleShowPastReservations = () => {
    setShowUpcomingReservations(false);
    setShowPastReservations(true);
  };

  if (!user) {
    // User not found, already redirected to home page
    return null;
  }

  return (
    <div className="profile-page">

      <div className="profile-header">
        <h1>{user.username}</h1>
      </div>

      <div className="profile-content">

        <div className="profile-nav-bar-wrapper">
          <div className="profile-nav-bar">
            <button
              className={showUpcomingReservations ? "active" : ""}
              onClick={handleShowUpcomingReservations}
            >
              Upcoming Reservations
            </button>
            <button
              className={showPastReservations ? "active" : ""}
              onClick={handleShowPastReservations}
            >
              Past Reservations
            </button>
            {/* Add other navigation links as needed */}
          </div>
        </div>

        <div className="profile-reservations-container">
          {/* Move the reservations containers inside the profile content */}
          {showUpcomingReservations && (
            <div className="upcoming-reservations-container">
              <UpcomingReservations
                userReservations={userReservations}
                getRestaurant={getRestaurant}
              />
            </div>
          )}
          {showPastReservations && (
            <div className="past-reservations-container">
              <PastReservations
                userReservations={userReservations}
                getRestaurant={getRestaurant}
              />
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default UserProfile;

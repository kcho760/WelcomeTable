import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReservation, fetchUserReservations } from '../../../store/reservation';
import UpdateReservation from "./updateReservation";
import guestCount from '../../../assets/guest-count.png';
import calendar from '../../../assets/calendar.png';

const UpcomingReservations = ({ getRestaurant }) => {
  const dispatch = useDispatch();
  const userReservations = useSelector((state) => state.reservation.userReservations);
  const user = useSelector((state) => state.session.user);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [updatedReservation, setUpdatedReservation] = useState(null);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const amPm = hours >= 12 ? 'pm' : 'am';

    hours %= 12;
    hours = hours || 12; // Convert 0 to 12

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');

    return `${hours}:${minutes} ${amPm}`;
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const currentDate = new Date();

  useEffect(() => {
    if (user) {
      dispatch(fetchUserReservations(user.id));
    }
  }, [dispatch, user]);

  const handleDeleteReservation = async (reservationId) => {
    await dispatch(deleteReservation(reservationId));
    dispatch(fetchUserReservations(user.id)); // Fetch updated reservations after deletion
  };

  const openUpdateMenu = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleCancelUpdate = () => {
    setSelectedReservation(null);
  };

  return (
    <>
      {userReservations && userReservations.reservations && userReservations.reservations.length > 0 ? (
        userReservations.reservations.map((reservation) => {
          const restaurant = getRestaurant(reservation.restaurant_id);
          console.log(restaurant)
          return (
            <div className="user-reservation" key={reservation.id}>
            <div className="profile-reservation-wrapper">
                <img className='profile-reservation-image' src={restaurant.photoUrls[0]} alt='restaurant' />
              <div className="profile-reservation-info">
                <p>{restaurant ? restaurant.name : 'Unknown'}</p>
                <div className='guest-count'>
                  <img className='num-of-guests-icon' src={guestCount} alt='num-of-guests-icon' />
                  <p>{reservation.party_size}</p>
                </div>

                <div className='profile-date'>
                  <img className='calendar-icon' src={calendar} alt='calendar-icon' />
                  <p>{formatDateString(reservation.reservation_date)}</p>
                </div>
                <p>{formatTime(reservation.reservation_time)}</p>
              </div>
            </div>
            <button className='profile-reservation-buttons' onClick={() => openUpdateMenu(reservation)}>Update Reservation</button>
            <button className='profile-reservation-buttons' onClick={() => handleDeleteReservation(reservation.id)}>Delete Reservation</button>
          </div>
          );
        })
      ) : (
        <p>No upcoming reservations found.</p>
      )}

      {selectedReservation && (
        <UpdateReservation reservation={selectedReservation} onCancel={handleCancelUpdate} setUpdatedReservation={setUpdatedReservation} />
      )}
    </>
  );
};

export default UpcomingReservations;

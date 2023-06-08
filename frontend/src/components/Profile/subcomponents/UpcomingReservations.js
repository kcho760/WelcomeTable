import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReservation, fetchUserReservations } from '../../../store/reservation';

const UpcomingReservations = ({ getRestaurantName }) => {
  const dispatch = useDispatch();
  const userReservations = useSelector((state) => state.reservation.userReservations);
  const user = useSelector((state) => state.session.user);

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

  const upcomingReservations =
    userReservations &&
    userReservations.reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.reservation_date);
      return reservationDate >= currentDate;
    });

  const handleDeleteReservation = async (reservationId) => {
    await dispatch(deleteReservation(reservationId));
    dispatch(fetchUserReservations(user.id)); // Fetch updated reservations after deletion
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchUserReservations(user.id));
    }
  }, [dispatch, user]);

  return (
    <>
      <h3 id="upcoming-reservations">Upcoming Reservations:</h3>
      {upcomingReservations &&
        upcomingReservations.map((reservation) => (
          <div className="user-reservation" key={reservation.id}>
            <p>Restaurant Name: {getRestaurantName(reservation.restaurant_id)}</p>
            <p>Number of Guests: {reservation.party_size}</p>
            <p>{formatDateString(reservation.reservation_date)}</p>
            <p>{formatTime(reservation.reservation_time)}</p>
            {/* Placeholder buttons for updating and deleting reservations */}
            <button onClick={() => handleDeleteReservation(reservation.id)}>Delete Reservation</button>
          </div>
        ))}
    </>
  );
};

export default UpcomingReservations;

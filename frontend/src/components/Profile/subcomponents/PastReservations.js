import React from 'react';

const PastReservations = ({ userReservations, getRestaurantName, handleLeaveReview }) => {
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;
    minutes = minutes.toString().padStart(2, '0');
    return `${hours}:${minutes} ${amPm}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const currentTime = new Date(); // Get the current time

  return (
    <>
      <h3 id="past-reservations">Past Reservations:</h3>
      {userReservations &&
        userReservations.reservations
          .filter((reservation) => {
            const reservationTime = new Date(reservation.reservation_date + ' ' + reservation.reservation_time);
            return reservationTime < currentTime; // Filter out reservations with time before the current time
          })
          .map((reservation) => (
            <div className="user-reservation" key={reservation.id}>
              <div>
                <p>Restaurant Name: {getRestaurantName(reservation.restaurant_id)}</p>
                <p>Number of Guests: {reservation.party_size}</p>
                <p>Date: {formatDate(reservation.reservation_date)}</p>
                <p>Time: {formatTime(reservation.reservation_time)}</p>
              </div>
              <div>
                <button className='profile-reservation-buttons' onClick={() => handleLeaveReview(reservation.id)}>Leave a Review</button>
              </div>
            </div>
          ))}
    </>
  );
};

export default PastReservations;

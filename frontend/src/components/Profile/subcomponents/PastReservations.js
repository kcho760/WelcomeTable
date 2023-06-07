import React from "react";

const PastReservations = ({ userReservations, getRestaurantName }) => {
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12;
    minutes = minutes.toString().padStart(2, "0");
    return `${hours}:${minutes} ${amPm}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <h3 id="past-reservations">Past Reservations:</h3>
      {userReservations &&
        userReservations.reservations
          .filter((reservation) => new Date(reservation.reservation_date) < new Date())
          .map((reservation) => (
            <div className="user-reservation" key={reservation.id}>
              <p>Restaurant Name: {getRestaurantName(reservation.restaurant_id)}</p>
              <p>Number of Guests: {reservation.party_size}</p>
              <p>Date: {formatDate(reservation.reservation_date)}</p>
              <p>Time: {formatTime(reservation.reservation_time)}</p>
            </div>
          ))}
    </>
  );
};

export default PastReservations;

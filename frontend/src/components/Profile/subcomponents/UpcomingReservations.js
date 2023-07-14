import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReservation, fetchUserReservations } from '../../../store/reservation';
import UpdateReservation from './updateReservation';
import guestCount from '../../../assets/guest-count.png';
import calendar from '../../../assets/calendar.png';

const UpcomingReservations = ({ getRestaurant, reservations }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [updatedReservation, setUpdatedReservation] = useState(null);
  console.log("All reservations:", reservations);

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    let hours = time.getHours(); // Use getHours instead of getUTCHours
    const minutes = time.getMinutes(); // Use getMinutes instead of getUTCMinutes
    const amPm = hours >= 12 ? 'pm' : 'am';
  
    if (amPm === 'pm' && hours > 12) hours -= 12;
    else if (amPm === 'am' && hours === 0) hours = 12;
  
    const formattedHours = (hours || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  };
  

const formatDateString = (dateString) => {
  // Split date string into parts
  const [year, month, day] = dateString.split("-");

  // Create new date object using parts, treating them as local time
  const date = new Date(year, month - 1, day);

  // Format date string
  const options = { month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};


  const currentTime = new Date();

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

  const isReservationUpcoming = (reservation) => {
    const [timeString] = reservation.reservation_time.split('T')[1].split('-');
    const reservationDateTime = new Date(`${reservation.reservation_date}T${timeString}`);    
    return reservationDateTime >= currentTime;
  };

  return (
    <>
      {reservations && reservations.length > 0 ? (
        reservations
          .filter(isReservationUpcoming)
          .map((reservation) => {
            const restaurant = getRestaurant(reservation.restaurant_id);
            if (restaurant) {
              return (
                <div className="user-reservation" key={reservation.id}>
                  <div className="profile-reservation-wrapper">
                    <img
                      className="profile-reservation-image"
                      src={restaurant.photoUrls ? restaurant.photoUrls[0] : ''}
                      alt="restaurant"
                    />
                    <div className="profile-reservation-info">
                      <p>{restaurant.name || 'Unknown'}</p>
                      <div className="guest-count">
                        <img className="num-of-guests-icon" src={guestCount} alt="num-of-guests-icon" />
                        <p>{reservation.party_size}</p>
                      </div>
                      <div className="profile-date">
                        <img className="calendar-icon" src={calendar} alt="calendar-icon" />
                        <p>{formatDateString(reservation.reservation_date)}</p>
                      </div>
                      <p>{formatTime(reservation.reservation_time)}</p>
                    </div>
                  </div>
                  <button className="profile-reservation-buttons" onClick={() => openUpdateMenu(reservation)}>
                    Update Reservation
                  </button>
                  <button
                    className="profile-reservation-buttons"
                    onClick={() => handleDeleteReservation(reservation.id)}
                  >
                    Delete Reservation
                  </button>
                </div>
              );
            }
            return null; // Skip rendering if restaurant is null
          })
      ) : (
        <p>No upcoming reservations found.</p>
      )}

      {selectedReservation && (
        <UpdateReservation
          reservation={selectedReservation}
          onCancel={handleCancelUpdate}
          setUpdatedReservation={setUpdatedReservation}
        />
      )}
    </>
  );
};

export default UpcomingReservations;

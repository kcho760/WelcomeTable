import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserReservations } from '../../../store/reservation';
import UpdateReservation from './updateReservation';
import guestCount from '../../../assets/guest-count.png';
import calendar from '../../../assets/calendar.png';

const PastReservations = ({ getRestaurant }) => {
  const dispatch = useDispatch();
  const userReservations = useSelector((state) => state.reservation.userReservations);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserReservations(user.id));
    }
  }, [dispatch, user]);

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    let hours = time.getHours(); 
    const minutes = time.getMinutes();
    const amPm = hours >= 12 ? 'pm' : 'am';
  
    if (amPm === 'pm' && hours > 12) hours -= 12;
    else if (amPm === 'am' && hours === 0) hours = 12;
  
    const formattedHours = (hours || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
};

const formatDateString = (dateString) => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);  // JS Date months are 0-indexed

  const options = { month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

  const currentTime = new Date();

  const handleLeaveReview = (reservationId) => {
    // Handle leaving a review for the past reservation
    // ...
  };

  return (
    <>
      {userReservations && userReservations.reservations && userReservations.reservations.length > 0 ? (
        userReservations.reservations
          .filter((reservation) => {
            const reservationDate = reservation.reservation_date;
            const reservationTime = reservation.reservation_time.split('T')[1].slice(0, 8);
            const reservationDateTime = new Date(`${reservationDate}T${reservationTime}`);
            return reservationDateTime <= currentTime; // Filter out reservations with date and time before the current time
          })
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
                      <p>{formatTime(reservation.reservation_time)}</p> {/* Use the updated reservationTime here */}
                    </div>
                  </div>
                  <button className="profile-reservation-buttons" onClick={() => handleLeaveReview(reservation.id)}>
                    Leave a Review
                  </button>
                </div>
              );
            }
            return null; // Skip rendering if restaurant is null
          })
      ) : (
        <p>No past reservations found.</p>
      )}
    </>
  );
};

export default PastReservations;

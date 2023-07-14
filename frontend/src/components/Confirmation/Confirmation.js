import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservation } from '../../store/reservation';
import { retrieveRestaurant } from '../../store/restaurant';
import React, { useEffect } from 'react';
import './confirmation.css';
import Footer from '../Footer/footer';
import guestCount from '../../assets/guest-count.png';
import calendar from '../../assets/calendar.png';

const Confirmation = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const reservation = useSelector(state => state.reservation.reservation?.reservation);
  const restaurantId = reservation?.restaurant_id;
  const restaurant = useSelector(state => state.restaurant[restaurantId]);
  const isLoadingReservation = useSelector(state => state.reservation.loading);
  const user = useSelector(state => state.session.user); // Assuming the user data is stored in the Redux state

  // Fetch reservation details on component mount
  useEffect(() => {
    dispatch(fetchReservation(id));
  }, [dispatch, id]);

  // Fetch restaurant details if reservation and restaurant ID are available
  useEffect(() => {
    if (reservation && restaurantId) {
      dispatch(retrieveRestaurant(restaurantId));
    }
  }, [dispatch, reservation, restaurantId]);

  // Handle case where reservation data is missing or still loading
  if (isLoadingReservation) {
    return <p>Loading...</p>;
  }

  const reservationDate = new Date(reservation.reservation_date);
  const formattedDate = reservationDate.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = new Date(reservation.reservation_time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  const firstPhotoUrl = restaurant.photoUrls[0];

  const handleUpdateReservation = () => {
    // Placeholder function for updating the reservation
  };

  const handleManageReservations = () => {
    // Redirect to the user profile page
    const userId = reservation.user_id;
    history.push(`/user/${userId}`);
  };

  const createdAt = new Date(user.createdAt);
  const formattedCreatedAt = createdAt.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric'
  });

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);  // Add one day to the date
  
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  return (
    <>
      <div className='outer'>
        <div className='inner'>
          <div className='row-1'>
            <img className='confirmation-image' src={firstPhotoUrl} alt="Restaurant Photo" />
            <div className='info'>
              <h2>{restaurant.name}</h2>
              <div className='guest-count'>
                  <img className='num-of-guests-icon' src={guestCount} alt='num-of-guests-icon' />
                  <p>{reservation.party_size}</p>
              </div>
              <div className='profile-date'>
                  <img className='calendar-icon' src={calendar} alt='calendar-icon' />
                  <p>{formatDateString(reservation.reservation_date)}</p>
              </div>
              <p>Reservation Time: {formattedTime}</p>
              {/* Additional confirmation details can be rendered here */}
            </div>
          </div>

          <div className='confirmation-buttons-container'>
            <button className='confirmation-buttons' onClick={handleManageReservations}>Manage Reservations</button>
          </div>

          <div className='important-info'>
            <h1>What to know before you go</h1>
            <h3>Important Dining Information</h3>
            <p>We have a 15 minute grace period. Please call us if you are running later than 15 minutes after your reservation time.</p>
            <p>We may contact you about this reservation, so please ensure your email and phone number are up to date.</p>
          </div>

          <div className='address-container'>
            <div className='address'>
              {restaurant.name}
              <br />
              {restaurant.address}
              <br />
              {restaurant.city} {restaurant.state}
              <br />
              {restaurant.phone}
            </div>
          </div>
        </div> {/* inner end div */}

          <div className='user-info-container'>
            <div className='user-info'>
              <p>{user.username}<br />Joined in {formattedCreatedAt}</p>
            </div>
          </div>
          
        </div>
      <Footer className="confirmation-footer" />
    </>
  );
};

export default Confirmation;

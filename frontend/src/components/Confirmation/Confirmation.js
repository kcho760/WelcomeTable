import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservation } from '../../store/reservation';
import { retrieveRestaurant } from '../../store/restaurant';
import React, { useEffect } from 'react';

const Confirmation = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const reservation = useSelector(state => state.reservation.reservation?.reservation);
  const restaurantId = reservation?.restaurant_id;
  const restaurant = useSelector(state => state.restaurant[restaurantId]);
  const isLoadingReservation = useSelector(state => state.reservation.loading);
  const isLoadingRestaurant = useSelector(state => state.restaurant.loading);

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
    console.log('Update reservation');
  };

  const handleManageReservations = () => {
    // Redirect to the user profile page
    const userId = reservation.user_id;
    history.push(`/user/${userId}`);
  };

  return (
    <div>
      <h2>Confirmation Page</h2>
      <img src={firstPhotoUrl} alt="Restaurant Photo" />
      <p>Reservation ID: {reservation.id}</p>
      <p>Party Size: {reservation.party_size}</p>
      <p>Reservation Date: {formattedDate}</p>
      <p>Reservation Time: {formattedTime}</p>
      <p>Restaurant Name: {restaurant.name}</p>
      {/* Additional confirmation details can be rendered here */}
      <button onClick={handleUpdateReservation}>Update Reservation</button>
      <button onClick={handleManageReservations}>Manage Reservations</button>
    </div>
  );
};

export default Confirmation;

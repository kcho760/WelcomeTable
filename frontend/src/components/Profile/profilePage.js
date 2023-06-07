import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserReservations } from '../../store/reservation';
import './profilePage.css';

const UserProfile = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const userReservations = useSelector(state => state.reservation.userReservations);

  useEffect(() => {
    dispatch(fetchUserReservations(user.id));
  }, [dispatch, user.id]);

  console.log(userReservations)
  return (
    <div>
      <h2>User Profile</h2>
      <p>ID: {user.id}</p>
      <p>Name: {user.username}</p>
      <p>Email: {user.email}</p>

      <h3>Reservations:</h3>
      {userReservations && userReservations.reservations.map(reservation => (
        <div className="user-reservation" key={reservation.id}>
            <p>Reservation ID: {reservation.id}</p>
            <p>Restaurant ID: {reservation.restaurant_id}</p>
            <p>Number of Guests: {reservation.party_size}</p>
            <p>Date: {reservation.reservation_date}</p>
        </div>
        ))}
    </div>
  );
};

export default UserProfile;

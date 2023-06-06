import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableReservations } from '../../store/reservation'; // Assuming you have a fetchAvailableReservations action creator
import format from 'date-fns/format';
import LoginFormModal from '../LoginFormModal/index';
import MyComponent from '../RestaurantCarousel/subcomponents/calender';
import graph from '../RestaurantCarousel/assets/graph.png';

const ReservationForm = ({ restaurant }) => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.session.user?.id);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showLoginFormModal, setShowLoginFormModal] = useState(false);
  const [availableReservations, setAvailableReservations] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const openCalendar = () => {
    setShowCalendar(!showCalendar);
  };


function generateTimeOptions() {
  const startTime = new Date('01/01/2023 10:30 AM');
  const endTime = new Date('01/01/2023 11:00 PM');
  const timeOptions = [];
  let currentTime = new Date(startTime);

  while (currentTime <= endTime) {
    const timeString = currentTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    timeOptions.push(
      <option key={timeString} value={timeString}>
        {timeString}
      </option>
    );
    currentTime.setMinutes(currentTime.getMinutes() + 15);
  }

  return timeOptions;
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const partySize = document.getElementById('party-size').value;
  const time = document.getElementById('time').value;

  if (!selectedDate) {
    // Handle the case where no date is selected
    return;
  }

  const selectedDateTime = new Date(selectedDate);
  selectedDateTime.setHours(Number(time.slice(0, 2)));
  selectedDateTime.setMinutes(Number(time.slice(3, 5)));
  
  const startDateTime = new Date(selectedDateTime);
  startDateTime.setMinutes(startDateTime.getMinutes() - 30); // 30 minutes before selectedDateTime
  const endDateTime = new Date(selectedDateTime);
  endDateTime.setMinutes(endDateTime.getMinutes() + 30); // 30 minutes after selectedDateTime

  const reservationsParams = {
    startDateTime: startDateTime.toISOString(),
    endDateTime: endDateTime.toISOString(),
    restaurantId: restaurant.id,
    partySize,
  };

  if (currentUserId) {
    const availableReservations = await dispatch(fetchAvailableReservations(reservationsParams));
    setAvailableReservations(availableReservations);
  } else {
    setShowLoginFormModal(true);
  }
};

const isReservationAvailable = (reservationTime) => {
  return availableReservations.some((reservation) => {
    const reservationTimeValue = new Date(reservation.reservation_time).getTime();
    const requestedTimeValue = new Date(reservationTime).getTime();
    return reservationTimeValue === requestedTimeValue;
  });
};

  return (
    <div className="reservations-container">
      <h2>Reservations</h2>
      <form>
        <div className="party-size">
          <label>Party Size:</label>
          <select id="party-size" name="party-size">
            <option value="">Select party size</option>
            <option value="1">1 person</option>
            <option value="2">2 people</option>
            <option value="3">3 people</option>
            <option value="4">4 people</option>
            <option value="5">5 people</option>
            <option value="6">6 people</option>
            <option value="7">7 people</option>
            <option value="8">8 people</option>
            <option value="9">9 people</option>
            <option value="10">10 people</option>
            <option value="11">11 people</option>
          </select>
        </div>

        <div className="datetime-container">
          <div className="date">
            <label>Date:</label>
            <input
              value={format(selectedDate, 'MM/dd/yyyy')}
              onClick={openCalendar}
              readOnly
            />
            {showCalendar && (
              <MyComponent
                setShowCalendar={setShowCalendar}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                className="calendar"
              />
            )}
          </div>

          <div className="time">
            <label>Time:</label>
            <select id="time" name="time">
              <option value="">Select a time</option>
              {generateTimeOptions()}
            </select>
          </div>
        </div>
        <button className="find-reservation-button" onClick={handleSubmit}>
          Find Reservation
        </button>

        {availableReservations.length > 0 && (
          <div className="available-reservations">
            <h3>Available Reservations:</h3>
            {[1, 2, 3, 4, 5].map((index) => {
              const reservationTime = new Date(selectedDateTime);
              reservationTime.setMinutes(reservationTime.getMinutes() + (index - 3) * 15); // Adjust minutes based on index

              return (
                <button
                  key={index}
                  className={`reservation-button ${isReservationAvailable(reservationTime) ? '' : 'blocked'}`}
                  disabled={!isReservationAvailable(reservationTime)}
                >
                  {format(reservationTime, 'hh:mm a')}
                </button>
              );
            })}
          </div>
        )}
      </form>
      <img className="graph" src={graph} alt="graph"></img>
      <p className="restaurant-daily-booking">Booked X times today</p>
      {showLoginFormModal && <LoginFormModal />}
    </div>
  );
};

export default ReservationForm;
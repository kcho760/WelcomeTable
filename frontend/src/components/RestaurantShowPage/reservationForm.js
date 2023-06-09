import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableReservations, createReservation } from '../../store/reservation';
import format from 'date-fns/format';
import LoginFormModal from '../LoginFormModal/index';
import MyComponent from '../RestaurantCarousel/subcomponents/calender';
import graph from '../RestaurantCarousel/assets/graph.png';
import './reservationForm.css';
import { useHistory } from 'react-router-dom';

const ReservationForm = ({ restaurant }) => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.session.user?.id);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showLoginFormModal, setShowLoginFormModal] = useState(false);
  const [availableReservations, setAvailableReservations] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const history = useHistory();
  const [partySizeError, setPartySizeError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    setPartySizeError('');
    setTimeError('');

    if (!partySize && !time) {
      setPartySizeError('Please select a party size.');
      setTimeError('Please select a time.');
      return;
    }

    // Validate party size
    if (partySize === '') {
      setPartySizeError('Please select a party size.');
      return;
    }

    // Validate time
    if (time === '') {
      setTimeError('Please select a time.');
      return;
    }

    // Clear any previous errors

    const timeParts = time.split(/:| /); // Splitting by colon or space
    let hour = Number(timeParts[0]);
    const minute = Number(timeParts[1]);

    // Handle AM/PM selection
    if (timeParts[2] === 'PM' && hour !== 12) {
      hour += 12;
    } else if (timeParts[2] === 'AM' && hour === 12) {
      hour = 0;
    }

    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(hour);
    selectedDateTime.setMinutes(minute);

    const startDateTime = new Date(selectedDateTime);
    startDateTime.setMinutes(startDateTime.getMinutes() - 30);
    const endDateTime = new Date(selectedDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + 31);

    const reservationsParams = {
      startDateTime: startDateTime.toISOString(),
      endDateTime: endDateTime.toISOString(),
      restaurantId: restaurant.id,
      partySize,
    };

    if (currentUserId) {
      try {
        const fetchedReservations = await dispatch(fetchAvailableReservations(reservationsParams));
        setAvailableReservations(fetchedReservations.availableReservations);
      } catch (error) {
        setErrorMessage('Error fetching available reservations. Please try again.'); // Set the error message
        setAvailableReservations([]); // Clear the available reservations
      }
    } else {
      setShowLoginFormModal(true);
    }
    
  };

  const handleReservationClick = (reservationTime, reservationDate) => {
    const partySize = document.getElementById('party-size').value;
  
    // Add one day and one hour to the reservation time
    const modifiedReservationTime = new Date(reservationTime);
    modifiedReservationTime.setDate(reservationTime.getDate() + 1);
    modifiedReservationTime.setHours(reservationTime.getHours() + 1);
  
    const reservationData = {
      reservation: {
        reservation_time: modifiedReservationTime.toISOString(),
        reservation_date: modifiedReservationTime.toISOString(),
        restaurant_id: restaurant.id,
        user_id: currentUserId,
        party_size: partySize,
      },
    };
  
dispatch(createReservation(reservationData))
  .then((data) => {
    const reservationId = data.reservation.id;
    history.push(`/reservation/${reservationId}`);
  })
  .catch((error) => {
    console.error('Reservation Error:', error);
    // Display an error message to the user or handle the error as needed
  });

  };

  return (
    <div className="reservations-container">
      <h2>Reservations</h2>
      {partySizeError && <p className="error-message">{partySizeError}</p>}
      {timeError && <p className="error-message">{timeError}</p>}
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
      </form>

      <img className="graph" src={graph} alt="graph" />
      <p className="restaurant-daily-booking">Booked X times today</p>

      {showLoginFormModal && <LoginFormModal />}

      {availableReservations.length > 0 && (
        <div className="available-reservations">
          <h3>Available Reservations:</h3>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {availableReservations
          .filter((reservation) => {
            const reservationTime = new Date(reservation.reservationTime);
            const reservationHour = reservationTime.getHours();
            const reservationMinute = reservationTime.getMinutes();
            const isAfter1030AM = reservationHour > 10 || (reservationHour === 10 && reservationMinute >= 30);
            const isBefore11PM = reservationHour <= 23 || (reservationHour === 23 && reservationMinute === 0);
            return isAfter1030AM && isBefore11PM;
          })
          .map((reservation, index) => (
            <button
              key={index}
              className="reservation-button"
              onClick={() =>
                handleReservationClick(
                  new Date(reservation.reservationTime),
                  selectedDate
                )
              }
            >
              {format(new Date(reservation.reservationTime), 'hh:mm a')}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationForm;

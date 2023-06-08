import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateReservation, fetchReservation } from '../../../store/reservation';
import format from 'date-fns/format';
import MyComponent from '../../RestaurantCarousel/subcomponents/calender';

const UpdateReservation = ({ reservation, onCancel, setUpdatedReservation }) => {
  const dispatch = useDispatch();

  const [updatedPartySize, setUpdatedPartySize] = useState(reservation.party_size);
  const [updatedDate, setUpdatedDate] = useState(reservation.reservation_date);
  const [updatedTime, setUpdatedTime] = useState(reservation.reservation_time);
  const [showCalendar, setShowCalendar] = useState(false);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedReservationData = {
      party_size: updatedPartySize,
      reservation_date: updatedDate,
      reservation_time: updatedTime,
    };
  
    const updatedReservation = await dispatch(updateReservation(reservation.id, updatedReservationData));
    setUpdatedReservation(updatedReservation);
    onCancel();
  };
  

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="party-size">
        <label>Party Size:</label>
        <select
          id="party-size"
          name="party-size"
          value={updatedPartySize}
          onChange={(e) => setUpdatedPartySize(e.target.value)}
        >
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
            value={updatedDate}
            onClick={openCalendar}
            readOnly
          />
          {showCalendar && (
            <MyComponent
              setShowCalendar={setShowCalendar}
              setSelectedDate={setUpdatedDate}
              className="calendar"
            />
          )}
        </div>
      </div>

      <div className="time">
        <label>Time:</label>
        <select
          id="time"
          name="time"
          value={updatedTime}
          onChange={(e) => setUpdatedTime(e.target.value)}
        >
          <option value="">Select a time</option>
          {generateTimeOptions()}
        </select>
      </div>

      <button type="submit">Update Reservation</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default UpdateReservation;

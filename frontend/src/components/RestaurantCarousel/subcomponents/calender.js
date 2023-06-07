import React, { useState, useEffect, useRef } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './calender.css';
import { Calendar } from 'react-date-range';

const MyComponent = ({ selectedDate, setSelectedDate, setShowCalendar }) => {
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  return (
    <div ref={calendarRef} className="calendar-container">
      <Calendar
        className="calendar"
        date={selectedDate}
        onChange={handleSelect}
        highlight={{
          startDate: selectedDate,
          endDate: selectedDate,
          color: '#00B8D9',
        }}
      />
    </div>
  );
};

export default MyComponent;

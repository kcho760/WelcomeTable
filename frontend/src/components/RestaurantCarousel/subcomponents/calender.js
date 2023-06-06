import React, { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './calender.css';
import { Calendar } from 'react-date-range';

const MyComponent = ({ onDateChange, selectedDate, setSelectedDate, setShowCalendar }) => {

  const handleSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false)
  };

  return (
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
  );
};

export default MyComponent;

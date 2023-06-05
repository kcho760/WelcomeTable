import React, { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './calender.css';
import { Calendar } from 'react-date-range';

const MyComponent = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSelect = (date) => {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  const highlightDates = [selectedDate]; // Array containing the selected date for highlighting

  return (
    <Calendar
      className="calendar"
      date={selectedDate}
      onChange={handleSelect}
      highlightDates={highlightDates}
    />
  );
}

export default MyComponent;

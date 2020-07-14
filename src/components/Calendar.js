import React from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calendar = ({ onChangeCallback, dateValue }) => {
  console.log(dateValue);
  return <ReactCalendar onChange={onChangeCallback} value={dateValue} />;
};

export default Calendar;

import React from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calendar = ({ onChangeCallback, dateValue }) => {
  //   console.log(props.dateValue);
  return <ReactCalendar onChange={(d) => console.log(d)} value={dateValue} />;
};

export default Calendar;

import React from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { formatDate } from "../util";

const Calendar = ({ onChangeCallback, dateValue, sessions }) => {
  //i need to change the css on a specific date of the calendar,
  //className="played-piano"
  const tileClassName = ({ activeStartDate, date, view }) => {
    const dateViewing = formatDate(date);
    // console.log(sessions);
    const isSession = sessions[dateViewing] ? true : false;

    const classname = isSession ? "played-piano" : "didnot";
    return classname;
  };
  return (
    <ReactCalendar
      onChange={onChangeCallback}
      value={dateValue}
      tileClassName={tileClassName}
    />
  );
};

export default Calendar;

import React, { useState, useEffect } from "react";
import ElapsedTime from "./elapsed-time";
import Buttons from "./buttons";
import "./styles.css";

const Timer = () => {
  const [timingEvents, setTimingEvents] = useState([]);

  const addTimerEvent = () => {
    let newTimingEvents = [...timingEvents, new Date()];
    setTimingEvents(newTimingEvents);
  };

  return (
    <div className="container-timer">
      <ElapsedTime />
      <Buttons handleClick={addTimerEvent} />
    </div>
  );
};

export default Timer;

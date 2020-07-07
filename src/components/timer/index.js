import React, { useState, useEffect } from "react";
import ElapsedTime from "./elapsed-time";
import Buttons from "./buttons";
import "./styles.css";

const Timer = () => {
  const [timingEvents, setTimingEvents] = useState([]);
  const [nonce, setNonce] = useState(0);

  const tick = () => {
    setNonce(nonce + 1);
  };
  setInterval(tick, 1000);

  const addTimerEvent = () => {
    let newTimingEvents = [...timingEvents, new Date()];
    setTimingEvents(newTimingEvents);
  };

  return (
    <div className="container-timer">
      <ElapsedTime timingEvents={timingEvents} />
      <Buttons handleClick={addTimerEvent} timingEvents={timingEvents} />
    </div>
  );
};

export default Timer;

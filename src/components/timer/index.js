import React, { useState, useEffect } from "react";
import Buttons from "./buttons";
import formatDuration from "format-duration";
import Piano from "../Piano";
import "./styles.css";

const DEFAULT_TIME = 15; // in minutes

const Timer = () => {
  const [isActive, setIsActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  //every second when active elapsed goes up
  //if user do not play a note for a minute pause the session
  //last note played
  //what if they start session and dont play any note
  //if array empty for 60 sec -- pause session
  //if array.length % 2 !== 0 in 60 seconds -- pause session
  //[C4, C6]

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setElapsedTime((elapsedTime) => elapsedTime + 1);
      }, 1000);
    } else if (!isActive && elapsedTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, elapsedTime]);

  const onToggle = () => {
    setIsActive(!isActive);
  };
  const onEnd = () => {
    const response = window.confirm(
      "Are you sure you want to end your session?"
    );
    if (response) {
      const totalPlayed = DEFAULT_TIME - elapsedTime;
      setIsActive(false);
      setElapsedTime(0);
    }
  };

  const pauseAuto = () => {
    setIsActive(false);
  };

  return (
    <div className="container-timer">
      <div className="elapsed-time">
        {formatDuration(DEFAULT_TIME * 60 * 1000 - elapsedTime * 1000)}
      </div>
      <Buttons handleClick={onToggle} isActive={isActive} handleEnd={onEnd} />
      <Piano pauseAuto={pauseAuto} />
    </div>
  );
};

export default Timer;

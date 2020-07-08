import React, { useState, useEffect, useCallback } from "react";
import Buttons from "./buttons";
import formatDuration from "format-duration";
import "./styles.css";

const DEFAULT_TIME = 15; // in minutes

const Timer = () => {
  const [isActive, setIsActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

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

  return (
    <div className="container-timer">
      <div className="elapsed-time">
        {formatDuration(DEFAULT_TIME * 60 * 1000 - elapsedTime * 1000)}
      </div>
      <Buttons handleClick={onToggle} isActive={isActive} />
    </div>
  );
};

export default Timer;

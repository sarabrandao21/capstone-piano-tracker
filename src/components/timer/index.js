import React, { useState, useEffect } from "react";
import Buttons from "./buttons";
import TimeField from "react-simple-timefield";
import Piano from "../Piano";
import firebase from "firebase";
import { formatDurationWithSec, stringToSeconds } from "../../util";
import "./styles.css";
import timerImg from "../../images/timer.svg";

const TIME_OUT = 30; //60 seconds without a pressed key auto pause session
const Timer = ({
  setTimeSincePlayed,
  getSessionRef,
  pressedNotes,
  timeSincePlayed,
}) => {
  const [time, setTime] = useState("00:15:00");
  const [isActive, setIsActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const onTimeChange = (event, time) => {
    setElapsedTime(0);
    setTime(time);
  };
  const finishedSession = () => {
    saveToDatabase();
    setTime("00:15:00");
    setIsActive(false);
    setElapsedTime(0);
  };
  console.log(time);
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeSincePlayed((timeSincePlayed) => timeSincePlayed + 1);

        if (timeSincePlayed === TIME_OUT) {
          setIsActive(false);
        } else if (timeToRender === "00:00:00") {
          finishedSession();
        } else {
          setElapsedTime((elapsedTime) => elapsedTime + 1);
        }
      }, 1000);
    } else if (!isActive && elapsedTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, elapsedTime]);

  const onToggle = () => {
    setIsActive(!isActive);
    if (isActive === false) {
      setTimeSincePlayed(0);
    }
  };

  const saveToDatabase = () => {
    const newDate = new Date();
    const sessionRef = getSessionRef();
    const totalPlayed = elapsedTime;
    const session = {
      timePlayedInSeconds: totalPlayed,
      date: newDate.toString(),
    };
    sessionRef.push(session);
    setIsActive(false);
    setElapsedTime(0);
  };
  const onEnd = () => {
    const response = window.confirm(
      "Are you sure you want to end your session?"
    );
    if (response) {
      saveToDatabase();
    }
  };

  const reset = () => {
    setIsActive(false);
    setElapsedTime(0);
  };

  const timeToRender = formatDurationWithSec(
    stringToSeconds(time) - elapsedTime
  );

  return (
    <div className="container-timer">
      <div className="time-input">
        <img src={timerImg} />
        <TimeField
          value={timeToRender}
          onChange={onTimeChange}
          showSeconds={true}
          disabled={isActive}
        />
      </div>
      <div>
        <Buttons
          handleClick={onToggle}
          isActive={isActive}
          handleEnd={onEnd}
          reset={reset}
        />
      </div>
      <div>
        <Piano
          setTimeSincePlayed={setTimeSincePlayed}
          pressedNotes={pressedNotes}
        />
      </div>
    </div>
  );
};

export default Timer;

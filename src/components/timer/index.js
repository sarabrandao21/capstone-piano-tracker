import React, { useState, useEffect } from "react";
import Buttons from "./buttons";
import TimeField from "react-simple-timefield";
import Piano from "../Piano";
import firebase from "firebase";
import { formatDurationWithSec, stringToSeconds } from "../../util";
import "./styles.css";
import timerImg from "../../images/timer.svg";

const TIME_OUT = 60; //60 seconds without a pressed key auto pause session
const Timer = () => {
  const [time, setTime] = useState("00:15:00");
  const [isActive, setIsActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeSincePlayed, setTimeSincePlayed] = useState(0);

  const onTimeChange = (event, time) => {
    setElapsedTime(0);
    setTime(time);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeSincePlayed((timeSincePlayed) => timeSincePlayed + 1);

        if (timeSincePlayed === TIME_OUT) {
          setIsActive(false);
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
  const onEnd = () => {
    const response = window.confirm(
      "Are you sure you want to end your session?"
    );
    if (response) {
      const newDate = new Date();
      const totalPlayed = elapsedTime;
      const uid = firebase.auth().currentUser.uid;
      const sessionsRef = firebase
        .database()
        .ref(
          `sessions/${uid}/${newDate.getDate()}${newDate.getMonth()}${newDate.getFullYear()}`
        );
      const session = {
        timePlayedInSeconds: totalPlayed,
        date: newDate.toString(),
      };
      sessionsRef.push(session);
      setIsActive(false);
      setElapsedTime(0);
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
        <Piano setTimeSincePlayed={setTimeSincePlayed} />
      </div>
    </div>
  );
};

export default Timer;

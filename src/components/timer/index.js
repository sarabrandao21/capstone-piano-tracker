import React, { useState, useEffect } from "react";
import Buttons from "./buttons";
import formatDuration from "format-duration";
import Piano from "../Piano";
import firebase from "firebase";
import "./styles.css";

const DEFAULT_TIME = 15; //session can be changed by user
const TIME_OUT = 60; //60 seconds without a pressed key auto pause session

const Timer = () => {
  const [isActive, setIsActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeSincePlayed, setTimeSincePlayed] = useState(0);

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
      const totalPlayed = elapsedTime;
      const uid = firebase.auth().currentUser.uid;
      const sessionsRef = firebase.database().ref(`sessions/${uid}`);
      const session = {
        timePlayed: totalPlayed,
        date: new Date(),
      };
      sessionsRef.push(session);
      // Alert.alert("Action!", "A new session was created");
      setIsActive(false);
      setElapsedTime(0);
    }
  };

  return (
    <div className="container-timer">
      <div className="elapsed-time">
        {formatDuration(DEFAULT_TIME * 60 * 1000 - elapsedTime * 1000)}
      </div>
      <Buttons handleClick={onToggle} isActive={isActive} handleEnd={onEnd} />
      <div>
        <Piano setTimeSincePlayed={setTimeSincePlayed} />
      </div>
    </div>
  );
};

export default Timer;

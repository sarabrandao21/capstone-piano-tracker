import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Calendar from "./Calendar";
import "./Profile.css";
import DailyLog from "./DailyLog";
import { formatDurationWithSec } from "../util";
//TODO could the user delete session?
const Profile = () => {
  const [date, setDate] = useState(new Date());
  const [dailyLogData, setDailyLogData] = useState();
  const [totalTimePlayed, setTotalTimePlayed] = useState(0);
  const userUID = firebase.auth().currentUser.uid;

  const onChange = (date) => {
    setDate(date);
  };

  useEffect(() => {
    let totalTimePlayedInSeconds = 0;
    const sessionsRef = firebase.database().ref(`sessions/${userUID}`);
    sessionsRef.once("value").then((snapshot) => {
      const userData = snapshot.val();
      Object.keys(userData).forEach((dateKey) => {
        const dateData = userData[dateKey];
        Object.keys(dateData).forEach((sessionKey) => {
          const sessionData = dateData[sessionKey];
          totalTimePlayedInSeconds += sessionData.timePlayedInSeconds;
        });
      });
      setTotalTimePlayed(totalTimePlayedInSeconds);
    });
  });

  useEffect(() => {
    const sessionsRef = firebase
      .database()
      .ref(
        `sessions/${userUID}/${date.getDate()}${date.getMonth()}${date.getFullYear()}`
      );
    sessionsRef.once("value").then((snapshot) => {
      setDailyLogData(snapshot.val());
    });
  }, [date]);

  return (
    <div>
      <h2>{firebase.auth().currentUser.displayName} this is your progress:</h2>
      <p>
        You have played {formatDurationWithSec(totalTimePlayed)} keep up with
        the work!
      </p>
      <Calendar onChangeCallback={onChange} dateValue={date} />
      <DailyLog data={dailyLogData} />
    </div>
  );
};

export default Profile;

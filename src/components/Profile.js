import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Calendar from "./Calendar";
import "./Profile.css";
import DailyLog from "./DailyLog";
import { formatDurationWithSec, formatDate, formatTimeAsWords } from "../util";
//TODO could the user delete session?
const Profile = () => {
  const [date, setDate] = useState(new Date());
  const [dailyLogData, setDailyLogData] = useState({});
  const [totalTimePlayed, setTotalTimePlayed] = useState(0);
  const [sessions, setSessions] = useState({});
  const userUID = firebase.auth().currentUser.uid;

  const onChange = (date) => {
    setDate(date);
  };

  useEffect(() => {
    let totalTimePlayedInSeconds = 0;
    //TODO data from app sessions
    const sessionsRef = firebase.database().ref(`sessions/${userUID}`);
    sessionsRef.once("value").then((snapshot) => {
      const userData = snapshot.val();
      setSessions(userData);
      Object.keys(userData).forEach((dateKey) => {
        const dateData = userData[dateKey];
        Object.keys(dateData).forEach((sessionKey) => {
          const sessionData = dateData[sessionKey];
          totalTimePlayedInSeconds += sessionData.timePlayedInSeconds;
        });
      });
      setTotalTimePlayed(totalTimePlayedInSeconds);
    });
  }, []);

  useEffect(() => {
    const sessionsRef = firebase
      .database()
      .ref(`sessions/${userUID}/${formatDate(date)}`);
    sessionsRef.once("value").then((snapshot) => {
      setDailyLogData(snapshot.val());
    });
  }, [date]);

  return (
    <div className="container-card">
      <h2>{firebase.auth().currentUser.displayName}'s Sessions</h2>
      <h2 className="total-played">
        You have played{" "}
        <strong>
          {formatTimeAsWords(formatDurationWithSec(totalTimePlayed))}
        </strong>
        . Keep up the good work!
      </h2>

      <div className="calendar-dailylog">
        <Calendar
          onChangeCallback={onChange}
          dateValue={date}
          sessions={sessions}
        />
        <DailyLog data={dailyLogData} />
      </div>
    </div>
  );
};

export default Profile;

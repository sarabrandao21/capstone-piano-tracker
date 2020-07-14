import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Calendar from "./Calendar";
import "./Profile.css";
import DailyLog from "./DailyLog";

const Profile = () => {
  const [date, setDate] = useState(new Date());
  const [dailyLogData, setDailyLogData] = useState();
  const userUID = firebase.auth().currentUser.uid;

  const onChange = (date) => {
    setDate(date);
  };

  useEffect(() => {
    const sessionsRef = firebase
      .database()
      .ref(
        `sessions/${userUID}/${date.getDate()}${date.getMonth()}${date.getFullYear()}`
      );
    sessionsRef.once("value").then((snapshot) => {
      console.log(snapshot.val());
      setDailyLogData(snapshot.val());
    });
  }, [date]);
  return (
    <div>
      <img
        className="profile-pic"
        alt="profile"
        src={firebase.auth().currentUser.photoURL}
      />
      <h2>{firebase.auth().currentUser.displayName} this is your progress:</h2>
      <p>TOTAL TIME PLAYED</p>
      <Calendar onChangeCallback={onChange} dateValue={date} />
      <DailyLog data={dailyLogData} />
    </div>
  );
};

export default Profile;

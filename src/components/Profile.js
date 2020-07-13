import React, { useState } from "react";
import firebase from "firebase";
import Calendar from "./Calendar";
import "./Profile.css";

const Profile = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div>
      <img
        className="profile-pic"
        alt="profile"
        src={firebase.auth().currentUser.photoURL}
      />
      <h2>{firebase.auth().currentUser.displayName} this is your progress:</h2>
      <Calendar onChangeCallback={onChange} dateValue={date} />
    </div>
  );
};

export default Profile;

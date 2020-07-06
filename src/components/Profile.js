import React from "react";
import firebase from "firebase";

const Profile = () => {
  return (
    <div>
      <img alt="profile picture" src={firebase.auth().currentUser.photoURL} />
      <h2>{firebase.auth().currentUser.displayName} this is your progress:</h2>
    </div>
  );
};

export default Profile;

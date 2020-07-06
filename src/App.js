import React, { useState, useEffect } from "react";
import Homepage from "./components/Homepage";
import firebase from "firebase";
import Fire from "./config/Fire";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import "./App.css";
const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSucess: () => false,
  },
};

function App() {
  const [isSignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      setSignedIn(!!user);
    });
  }, []);

  return (
    <div className="App">
      {isSignedIn ? (
        <Homepage />
      ) : (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import firebase from "firebase";
import initializeFirebase from "./config/Fire";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from "./components/Profile";
import Homepage from "./components/Homepage";
import keyImg from "./images/key.svg";
import { formatDate } from "./util";

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
initializeFirebase();
// const today = new Date();
// const testDate = `${today.getDate()}${today.getMonth()}${today.getFullYear()}`
function App() {
  const [isSignedIn, setSignedIn] = useState(false);
  //const [sessions, setSessions] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      setSignedIn(!!user);
      // if (user && user.uid) {
      //   const sessionsRef = firebase.database().ref(`sessions/${user.uid}`);
      //   sessionsRef.once("value").then((snapshot) => {
      //     console.log(snapshot.val());
      //     //setSessions(snapshot.val());
      //   });
      // }
    });
  }, []);

  const getSessionRef = () => {
    const newDate = new Date();
    const uid = firebase.auth().currentUser.uid;
    const sessionRef = firebase
      .database()
      .ref(`sessions/${uid}/${formatDate(newDate)}`);
    return sessionRef;
  };

  return (
    <div className="App">
      <div className="main-login-page">
        {isSignedIn ? (
          <div>
            <img
              className="profile-pic"
              alt="profile"
              src={firebase.auth().currentUser.photoURL}
            />
            <h1 className="app-header">
              {" "}
              KeyLogger <img className="key-icon" src={keyImg} />
            </h1>
            <Router>
              <div>
                <nav className="navbar">
                  <ul className="header-ul">
                    <li>
                      <Link to="/"> Home </Link>
                    </li>
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <a href="/" onClick={() => firebase.auth().signOut()}>
                        Sign Out
                      </a>
                    </li>
                  </ul>
                </nav>

                <Switch>
                  <Route path="/profile">
                    <Profile />
                  </Route>
                  <Route path="/">
                    <Homepage getSessionRef={getSessionRef} />
                  </Route>
                </Switch>
              </div>
            </Router>
          </div>
        ) : (
          <div className="login-container">
            <h1 className="app-name">
              KeyLogger
              <img className="key-icon" src={keyImg} />
            </h1>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

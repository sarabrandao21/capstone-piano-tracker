import React, { useState, useEffect } from "react";
import firebase from "firebase";
import initializeFirebase from "./config/Fire";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Homepage from "./components/Homepage";
import keyImg from "./images/key.svg";

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
      <div className="main-login-page">
        {isSignedIn ? (
          <div>
            <h1 className="app-header">
              {" "}
              KeyLogger <img src={keyImg} />
            </h1>

            <Router>
              <div>
                <nav className="navbar">
                  <ul className="header-ul">
                    <li>
                      <Link to="/"> Home </Link>
                    </li>
                    <li>
                      <Link to="/profile">
                        {" "}
                        <img
                          className="profile-pic"
                          alt="profile"
                          src={firebase.auth().currentUser.photoURL}
                        />{" "}
                      </Link>
                    </li>
                    <li>
                      <button onClick={() => firebase.auth().signOut()}>
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </nav>

                <Switch>
                  <Route path="/profile">
                    <Profile />
                  </Route>
                  <Route path="/">
                    <Homepage />
                  </Route>
                </Switch>
              </div>
            </Router>
          </div>
        ) : (
          <div className="login-container">
            <h1 className="app-name">KeyLogger</h1>
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

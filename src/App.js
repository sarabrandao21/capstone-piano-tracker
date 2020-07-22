import React, { useState, useEffect } from "react";
import firebase from "firebase";
import initializeFirebase from "./config/Fire";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from "./components/Profile";
import Homepage from "./components/Homepage";
import keyImg from "./images/key.svg";
import { formatDate } from "./util";
import { Synth, PolySynth } from "tone";
import "./App.css";
import WebMidi from "webmidi";
const synth = new PolySynth(Synth);
synth.toMaster();

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
  const [pressedNotes, setPressedNotes] = useState([]);
  const [timeSincePlayed, setTimeSincePlayed] = useState(0);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      setSignedIn(!!user);
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

  useEffect(() => {
    console.log("STARTING WEB MIDI");
    WebMidi.enable((err) => {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
      }
      console.log(WebMidi.inputs);

      const input = WebMidi.inputs[0];
      //   console.log("INPUT", input);
      if (input) {
        input.addListener("noteon", "all", (e) => {
          const note = `${e.note.name}${e.note.octave.toString()}`;
          setPressedNotes((pressedNotes) => {
            const newPressedNotes = [...pressedNotes, e.note];
            return newPressedNotes;
          });
          synth.triggerAttackRelease(note, "8n");
          if (setTimeSincePlayed) {
            setTimeSincePlayed(0);
          }
        });

        input.addListener("noteoff", "all", (e) => {
          setPressedNotes((pressedNotes) => {
            const index = pressedNotes.findIndex(
              (note) => note.number === e.note.number
            );
            const newPressedNotes = [...pressedNotes];
            newPressedNotes.splice(index, 1);

            return newPressedNotes;
          });
        });
      }
    });
  }, [setTimeSincePlayed]);
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
                    <Homepage
                      getSessionRef={getSessionRef}
                      pressedNotes={pressedNotes}
                      setTimeSincePlayed={setTimeSincePlayed}
                      timeSincePlayed={timeSincePlayed}
                    />
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

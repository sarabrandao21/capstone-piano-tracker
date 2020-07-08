import React, { useState } from "react";
import WebMidi from "webmidi";
import "./Piano.css";

const Piano = (props) => {
  //if user do not play a note for a minute pause the session
  //last note played
  //what if they start session and dont play any note
  //if array empty for 60 sec -- pause session
  //if array.length % 2 !== 0 in 60 seconds -- pause session
  //[C4, C6]
  const [notesPlayed, setNotesPlayed] = useState([]);

  WebMidi.enable(function (err) {
    if (err) {
      console.warn(err);
    } else {
      console.log("Sysex is enabled!");
    }
  }, true);

  WebMidi.enable(function (err) {
    if (err) {
      console.log("WebMidi could not be enabled.", err);
    }

    // Viewing available inputs and outputs
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);

    // Display the current time
    console.log(WebMidi.time);

    const input = WebMidi.getInputByName("Xkey37");
    console.log("INPUT", input);
    input.addListener("noteon", "all", function (e) {
      if (e.note.name === "C" && e.note.octave === 4) {
      }

      console.log(
        "Received 'noteon' message (" + e.note.name + e.note.octave + ")."
      );
    });
  });

  const pauseSession = () => {
    props.pauseAuto();
  };

  const pianoKeys = () => {};
  return (
    <div>
      <ul className="set">
        <li className="key white f 2"></li>
        <li className="key black fs"></li>
        <li className="key white g"></li>
        <li className="key black gs"></li>
        <li className="key white a"></li>
        <li className="key black as"></li>
        <li className="key white b"></li>
        <li className="key white c"></li>
        <li className="key black cs"></li>
        <li className="key white d"></li>
        <li className="key black ds"></li>
        <li className="key white e"></li>
        <li className="key white f 3"></li>
        <li className="key black fs"></li>
        <li className="key white g"></li>
        <li className="key black gs"></li>
        <li className="key white a"></li>
        <li className="key black as"></li>
        <li className="key white b"></li>
        <li className="key white c"></li>
        <li className="key black cs"></li>
        <li className="key white d"></li>
        <li className="key black ds"></li>
        <li className="key white e"></li>
        <li className="key white f 4"></li>
        <li className="key black fs"></li>
        <li className="key white g"></li>
        <li className="key black gs"></li>
        <li className="key white a"></li>
        <li className="key black as"></li>
        <li className="key white b"></li>
        <li className="key white c"></li>
        <li className="key black cs"></li>
        <li className="key white d"></li>
        <li className="key black ds"></li>
        <li className="key white e"></li>
      </ul>
    </div>
  );
};

export default Piano;

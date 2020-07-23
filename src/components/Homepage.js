import React from "react";
import Timer from "./timer";
import "./Homepage.css";

const Homepage = ({
  getSessionRef,
  setTimeSincePlayed,
  pressedNotes,
  TimeSincePlayed,
  noteOn,
  noteOff,
}) => {
  //how to calculate percentage of the session to change the animation

  return (
    <div>
      <Timer
        getSessionRef={getSessionRef}
        pressedNotes={pressedNotes}
        setTimeSincePlayed={setTimeSincePlayed}
        TimeSincePlayed={TimeSincePlayed}
        noteOff={noteOff}
        noteOn={noteOn}
      />
    </div>
  );
};

export default Homepage;

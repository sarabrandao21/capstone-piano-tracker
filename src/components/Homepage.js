import React from "react";
import Timer from "./timer";
import "./Homepage.css";

const Homepage = ({
  getSessionRef,
  setTimeSincePlayed,
  pressedNotes,
  TimeSincePlayed,
}) => {
  //how to calculate percentage of the session to change the animation

  return (
    <div>
      <Timer
        getSessionRef={getSessionRef}
        pressedNotes={pressedNotes}
        setTimeSincePlayed={setTimeSincePlayed}
        TimeSincePlayed={TimeSincePlayed}
      />
    </div>
  );
};

export default Homepage;

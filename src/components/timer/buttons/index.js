import React from "react";

const Buttons = (props) => {
  const label = props.timingEvents.length % 2 === 0 ? "Start" : "Stop";
  return (
    <div className="buttons">
      <button onClick={props.handleClick}>{label}</button>
      <button>End</button>
    </div>
  );
};

export default Buttons;

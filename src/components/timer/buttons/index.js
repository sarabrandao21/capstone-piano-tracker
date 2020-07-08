import React from "react";

const Buttons = (props) => {
  //TODO how to double check user wants to end session
  const label = props.isActive ? "Stop" : "Start";
  return (
    <div className="buttons">
      <button onClick={props.handleClick}>{label}</button>
      <button onClick={props.handleEnd}>End</button>
    </div>
  );
};

export default Buttons;

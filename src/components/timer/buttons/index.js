import React from "react";

const Buttons = (props) => {
  const label = props.isActive ? "Stop" : "Start";
  return (
    <div className="buttons">
      <button onClick={props.handleClick}>{label}</button>
      <button onClick={props.handleEnd}>End</button>
    </div>
  );
};

export default Buttons;

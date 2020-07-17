import React from "react";

const Buttons = ({ handleClick, handleEnd, isActive, reset }) => {
  const label = isActive ? "Pause" : "Start";
  return (
    <div className="buttons">
      <button onClick={handleClick}>{label}</button>
      <button onClick={handleEnd}>End</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Buttons;

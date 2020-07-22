import React from "react";
import "./Buttons.css";

const Buttons = ({ handleClick, handleEnd, isActive, reset }) => {
  const label = isActive ? "Pause" : "Start";
  return (
    <div className="buttons">
      <button className="button-session" onClick={handleClick}>
        {label}
      </button>
      <button className="button-session" onClick={reset}>
        Reset
      </button>
      <button className="button-session" onClick={handleEnd}>
        End
      </button>
    </div>
  );
};

export default Buttons;

import React from "react";

const ElapsedTime = (props) => {
  const elapsedTime = () => {
    return "00:00";
  };
  return <div className="elapsed-time">{elapsedTime()}</div>;
};

export default ElapsedTime;

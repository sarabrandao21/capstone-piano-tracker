import React from "react";

const ElapsedTime = (props) => {
  let elapsed = 0;
  const elapsedTime = (events) => {
    for (let i = 0; i < events.length; i += 2) {
      const start = events[i];
      const stop = events[i + 1] || new Date();
      elapsed += stop - start;
    }
    return (elapsed / 1000).toFixed(0);
  };
  return <div className="elapsed-time">{elapsedTime(props.timingEvents)}</div>;
};

export default ElapsedTime;

import React from "react";
import { formatDurationWithSec } from "../util";
import "./DailyLog.css";
const DailyLog = ({ data }) => {
  return (
    <div className="sessions-container">
      <h3>Your Session(s)</h3>
      <p>
        {data ? (
          Object.keys(data).map((key) => {
            const value = data[key];
            return <li>{formatDurationWithSec(value.timePlayedInSeconds)}</li>;
          })
        ) : (
          <div>No sessions</div>
        )}
      </p>
    </div>
  );
};

export default DailyLog;

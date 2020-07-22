import React from "react";
import { formatDurationWithSec } from "../util";
import "./DailyLog.css";
const DailyLog = ({ data }) => {
  let totalPlayedForThatDay = 0;
  return (
    <div className="sessions-container">
      <h3>Your Session(s)</h3>
      <p>
        {data ? (
          Object.keys(data).map((key) => {
            const value = data[key];
            totalPlayedForThatDay += value.timePlayedInSeconds;
            return <li>{formatDurationWithSec(value.timePlayedInSeconds)}</li>;
          })
        ) : (
          <div>No sessions</div>
        )}
      </p>
      <p>
        {totalPlayedForThatDay > 0 ? (
          <p>
            Total:{" "}
            <strong>{formatDurationWithSec(totalPlayedForThatDay)}</strong>
          </p>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

export default DailyLog;

import React from "react";
import { formatDurationWithSec } from "../util";
const DailyLog = ({ data }) => {
  return (
    <div>
      <h3>Your Session(s)</h3>
      <p>
        {data ? (
          Object.keys(data).map((key) => {
            const value = data[key];
            return <li>{formatDurationWithSec(value.timePlayedInSeconds)}</li>;
          })
        ) : (
          <div>No data</div>
        )}
      </p>
    </div>
  );
};

export default DailyLog;

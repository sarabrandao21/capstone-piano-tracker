import React from "react";

const DailyLog = ({ data }) => {
  return (
    <div>
      <p>This is the daily log </p>
      <p>
        {data ? (
          Object.keys(data).map((key) => {
            const value = data[key];
            return <li> Session Total: {value.timePlayed} </li>;
          })
        ) : (
          <div>No data</div>
        )}
      </p>
    </div>
  );
};

export default DailyLog;

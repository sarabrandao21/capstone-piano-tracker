import React from "react";
import Timer from "./timer";
import "./Homepage.css";

const Homepage = ({ getSessionRef }) => {
  //how to calculate percentage of the session to change the animation

  return (
    <div>
      <Timer getSessionRef={getSessionRef} />
    </div>
  );
};

export default Homepage;

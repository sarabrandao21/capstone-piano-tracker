import React from "react";
import Timer from "./timer";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./Homepage.css";

const Homepage = () => {
  //how to calculate percentage of the session to change the animation
  return (
    <div>
      <div className="progress-bar">
        <ProgressBar animated now={30} />
      </div>

      <Timer />
    </div>
  );
};

export default Homepage;

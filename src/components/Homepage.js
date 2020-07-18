import React from "react";
import Timer from "./timer";

import "./Homepage.css";

const Homepage = () => {
  //how to calculate percentage of the session to change the animation
  return (
    <div>
      <div className="progress-bar"></div>

      <Timer />
    </div>
  );
};

export default Homepage;

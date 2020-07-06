import React from "react";
import "./Piano.css";

const Piano = () => {
  const octaves = 6;
  const pianoKeys = () => {}; //
  return (
    <div>
      <ul class="set">
        <li class="key white b"></li>
        <li class="key black as"></li>
        <li class="key white a"></li>
        <li class="key black gs"></li>
        <li class="key white g"></li>
        <li class="key black fs"></li>
        <li class="key white f"></li>
        <li class="key white e"></li>
        <li class="key black ds"></li>
        <li class="key white d"></li>
        <li class="key black cs"></li>
        <li class="key white c"></li>
      </ul>
    </div>
  );
};

export default Piano;

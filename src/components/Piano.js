import React from "react";
import WebMidi from "webmidi";
import "./Piano.css";

const Piano = () => {
  WebMidi.enable(function () {
    // Viewing available inputs and outputs
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);
  });
  const octaves = 6;
  const pianoKeys = () => {}; //
  return (
    <div>
      <ul className="set">
        <li className="key white b"></li>
        <li className="key black as"></li>
        <li className="key white a"></li>
        <li className="key black gs"></li>
        <li className="key white g"></li>
        <li className="key black fs"></li>
        <li className="key white f"></li>
        <li className="key white e"></li>
        <li className="key black ds"></li>
        <li className="key white d"></li>
        <li className="key black cs"></li>
        <li className="key white c"></li>
      </ul>
    </div>
  );
};

export default Piano;

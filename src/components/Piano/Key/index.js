import React from "react";

export default function Key({ note, octave, isNotePressed, noteOn, noteOff }) {
  const noteLetter = note.toLowerCase().replace("#", "");
  const noteColor = note.includes("#") ? "black" : "white";
  return (
    <li
      className={`key ${noteLetter} ${noteColor} ${
        isNotePressed > -1 ? "active" : ""
      }`}
      onMouseDown={() => {
        const noteEvent = { note: { name: noteLetter, octave: octave } };
        noteOn(noteEvent);
      }}
      onMouseUp={() => {
        const noteEvent = { note: { name: noteLetter, octave: octave } };
        noteOff(noteEvent);
      }}
    ></li>
  );
}

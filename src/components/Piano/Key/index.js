import React from "react";

export default function Key({ note, isNotePressed }) {
  const noteLetter = note.toLowerCase().replace("#", "");
  const noteColor = note.includes("#") ? "black" : "white";
  return (
    <li
      className={`key ${noteLetter} ${noteColor} ${
        isNotePressed > -1 ? "active" : ""
      }`}
    >
      {/* {note} */}
    </li>
  );
}

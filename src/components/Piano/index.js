import React from "react";
import Key from "./Key";
import "./Piano.css";
import { detect } from "@tonaljs/chord-detect";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const Piano = ({ pressedNotes }) => {
  const octaves = 3;
  const keys = [];
  for (let i = 0; i < octaves; i++) {
    const octaveNotes = notes.map((note) => {
      const isNotePressed = pressedNotes.findIndex(
        (curr) => curr.name === note && curr.octave === i + 3 //my octave starts on 2
      );
      return <Key key={note} note={note} isNotePressed={isNotePressed} />;
    });
    keys.push(octaveNotes);
  }

  const detectedChords = detect(
    pressedNotes.map((note) => {
      return note.name;
    })
  );

  return (
    <div>
      <div className="chord-suggestions">
        {detectedChords.map((chord) => {
          return <div className="chord-suggestion">{chord}</div>;
        })}
        <br />
      </div>

      <ul className="set">{keys}</ul>
    </div>
  );
};

export default Piano;

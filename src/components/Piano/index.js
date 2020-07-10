import React, { useEffect, useState } from "react";
import WebMidi from "webmidi";
import Key from "./Key";
import "./Piano.css";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
//

const Piano = ({ setTimeSincePlayed }) => {
  const [pressedNotes, setPressedNotes] = useState([]);
  useEffect(() => {
    WebMidi.enable((err) => {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
      }
      console.log(WebMidi.inputs);

      const input = WebMidi.getInputByName("Xkey37");
      //   console.log("INPUT", input);
      if (input) {
        input.addListener("noteon", "all", (e) => {
          setPressedNotes((pressedNotes) => {
            const newPressedNotes = [...pressedNotes, e.note];
            return newPressedNotes;
          });
          console.log(e);
          if (setTimeSincePlayed) {
            setTimeSincePlayed(0);
          }
          // console.log(
          //   "Received 'noteon' message (" + e.note.name + e.note.octave + ")."
          // );
        });

        input.addListener("noteoff", "all", (e) => {
          setPressedNotes((pressedNotes) => {
            const index = pressedNotes.findIndex(
              (note) => note.number === e.note.number
            );
            const newPressedNotes = [...pressedNotes];
            newPressedNotes.splice(index, 1);

            return newPressedNotes;
          });
        });
      }
    });
  }, [setTimeSincePlayed, pressedNotes]);

  //   const pianoKeys = () => {};

  const octaves = 4;
  const keys = [];
  for (let i = 0; i < octaves; i++) {
    const octaveNotes = notes.map((note) => {
      const isNotePressed = pressedNotes.findIndex(
        (curr) => curr.name === note && curr.octave === i + 2 //my octave starts on 2
      );
      return <Key note={note} isNotePressed={isNotePressed} />;
    });
    keys.push(octaveNotes);
  }
  return (
    <div>
      {JSON.stringify(pressedNotes)}

      <ul className="set">{keys}</ul>
    </div>
  );
};

export default Piano;

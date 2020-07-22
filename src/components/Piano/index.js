import React, { useEffect, useState } from "react";
import WebMidi from "webmidi";
import Key from "./Key";
import "./Piano.css";
import { Synth, PolySynth } from "tone";
import { detect } from "@tonaljs/chord-detect";
const synth = new PolySynth(Synth);
synth.toMaster();

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const Piano = ({ setTimeSincePlayed }) => {
  const [pressedNotes, setPressedNotes] = useState([]);

  useEffect(() => {
    console.log("STARTING WEB MIDI");
    WebMidi.enable((err) => {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
      }
      console.log(WebMidi.inputs);

      const input = WebMidi.inputs[0];
      //   console.log("INPUT", input);
      if (input) {
        input.addListener("noteon", "all", (e) => {
          const note = `${e.note.name}${e.note.octave.toString()}`;
          setPressedNotes((pressedNotes) => {
            const newPressedNotes = [...pressedNotes, e.note];
            return newPressedNotes;
          });
          synth.triggerAttackRelease(note, "8n");
          if (setTimeSincePlayed) {
            setTimeSincePlayed(0);
          }
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
  // const detectedChords = ["A", "C#", "F"];
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

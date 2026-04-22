export const TWELVE_NOTES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const ENHARMONIC_FLATS = {
  "C#": "Db",
  "D#": "Eb",
  "F#": "Gb",
  "G#": "Ab",
  "A#": "Bb",
};

// Cents per semitone, semitones per octave
export const CENTS_PER_SEMITONE = 100;
export const SEMITONES_PER_OCTAVE = 12;

// MIDI: A4 = 69 = 440 Hz; f(n) = 440 * 2^((n-69)/12)
export function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export const HARMONIC_SERIES_FROM_C2 = [
  "C2",
  "C3",
  "G3",
  "C4",
  "E4",
  "G4",
  "Bb4",
  "C5",
  "D5",
  "E5",
  "F#5",
  "G5",
];

export const TIMBRES = ["sine", "triangle", "square", "sawtooth"];

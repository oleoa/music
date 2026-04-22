// 12 major keys arranged clockwise by ascending fifths.
// `accidentals` is positive for sharps, negative for flats.
export const CIRCLE_KEYS = [
  { major: "C", minor: "Am", accidentals: 0, sharps: [], flats: [], tonic: "C4" },
  { major: "G", minor: "Em", accidentals: 1, sharps: ["F♯"], flats: [], tonic: "G3" },
  { major: "D", minor: "Bm", accidentals: 2, sharps: ["F♯", "C♯"], flats: [], tonic: "D4" },
  { major: "A", minor: "F♯m", accidentals: 3, sharps: ["F♯", "C♯", "G♯"], flats: [], tonic: "A3" },
  { major: "E", minor: "C♯m", accidentals: 4, sharps: ["F♯", "C♯", "G♯", "D♯"], flats: [], tonic: "E4" },
  {
    major: "B",
    minor: "G♯m",
    accidentals: 5,
    sharps: ["F♯", "C♯", "G♯", "D♯", "A♯"],
    flats: [],
    tonic: "B3",
  },
  {
    major: "F♯ / G♭",
    minor: "D♯m / E♭m",
    accidentals: 6,
    sharps: ["F♯", "C♯", "G♯", "D♯", "A♯", "E♯"],
    flats: ["B♭", "E♭", "A♭", "D♭", "G♭", "C♭"],
    tonic: "F#4",
  },
  {
    major: "D♭",
    minor: "B♭m",
    accidentals: -5,
    sharps: [],
    flats: ["B♭", "E♭", "A♭", "D♭", "G♭"],
    tonic: "Db4",
  },
  {
    major: "A♭",
    minor: "Fm",
    accidentals: -4,
    sharps: [],
    flats: ["B♭", "E♭", "A♭", "D♭"],
    tonic: "Ab3",
  },
  {
    major: "E♭",
    minor: "Cm",
    accidentals: -3,
    sharps: [],
    flats: ["B♭", "E♭", "A♭"],
    tonic: "Eb4",
  },
  {
    major: "B♭",
    minor: "Gm",
    accidentals: -2,
    sharps: [],
    flats: ["B♭", "E♭"],
    tonic: "Bb3",
  },
  { major: "F", minor: "Dm", accidentals: -1, sharps: [], flats: ["B♭"], tonic: "F3" },
];

export const SHARP_ORDER = ["F", "C", "G", "D", "A", "E", "B"];
export const FLAT_ORDER = ["B", "E", "A", "D", "G", "C", "F"];

export const SHARP_MNEMONIC =
  "Father Charles Goes Down And Ends Battle (sharps order)";
export const FLAT_MNEMONIC =
  "Battle Ends And Down Goes Charles' Father (flats — same words, reversed)";

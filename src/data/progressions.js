// `id` values match i18n keys under data.progressions.<bucket>.

export const DIATONIC_DEGREES = [
  { id: "I", grau: "I", acorde: "C" },
  { id: "ii", grau: "ii", acorde: "Dm" },
  { id: "iii", grau: "iii", acorde: "Em" },
  { id: "IV", grau: "IV", acorde: "F" },
  { id: "V", grau: "V", acorde: "G" },
  { id: "vi", grau: "vi", acorde: "Am" },
  { id: "vii°", grau: "vii°", acorde: "B°" },
];

export const PROGRESSIONS = [
  {
    id: "I-V-vi-IV",
    roman: "I – V – vi – IV",
    chords: [
      ["C4", "E4", "G4"],
      ["G3", "B3", "D4"],
      ["A3", "C4", "E4"],
      ["F3", "A3", "C4"],
    ],
  },
  {
    id: "ii-V-I",
    roman: "ii – V – I",
    chords: [
      ["D4", "F4", "A4", "C5"],
      ["G3", "B3", "D4", "F4"],
      ["C4", "E4", "G4", "B4"],
    ],
  },
  {
    id: "I-vi-IV-V",
    roman: "I – vi – IV – V",
    chords: [
      ["C4", "E4", "G4"],
      ["A3", "C4", "E4"],
      ["F3", "A3", "C4"],
      ["G3", "B3", "D4"],
    ],
  },
  {
    id: "vi-IV-I-V",
    roman: "vi – IV – I – V",
    chords: [
      ["A3", "C4", "E4"],
      ["F3", "A3", "C4"],
      ["C4", "E4", "G4"],
      ["G3", "B3", "D4"],
    ],
  },
  {
    id: "i-VII-VI-VII",
    roman: "i – VII – VI – VII",
    chords: [
      ["A3", "C4", "E4"],
      ["G3", "B3", "D4"],
      ["F3", "A3", "C4"],
      ["G3", "B3", "D4"],
    ],
  },
  {
    id: "12-bar-blues",
    roman: "I7 – IV7 – I7 – V7 – IV7 – I7",
    chords: [
      ["C4", "E4", "G4", "Bb4"],
      ["F3", "A3", "C4", "Eb4"],
      ["C4", "E4", "G4", "Bb4"],
      ["G3", "B3", "D4", "F4"],
      ["F3", "A3", "C4", "Eb4"],
      ["C4", "E4", "G4", "Bb4"],
    ],
  },
  {
    id: "rhythm-changes",
    roman: "I – vi – ii – V (\"I Got Rhythm\")",
    chords: [
      ["C4", "E4", "G4", "B4"],
      ["A3", "C4", "E4", "G4"],
      ["D4", "F4", "A4", "C5"],
      ["G3", "B3", "D4", "F4"],
    ],
  },
  {
    id: "backdoor",
    roman: "iv – ♭VII7 – I",
    chords: [
      ["F3", "Ab3", "C4"],
      ["Bb3", "D4", "F4", "Ab4"],
      ["C4", "E4", "G4", "B4"],
    ],
  },
  {
    id: "royal-road",
    roman: "IV – V – iii – vi",
    chords: [
      ["F3", "A3", "C4"],
      ["G3", "B3", "D4"],
      ["E3", "G3", "B3"],
      ["A3", "C4", "E4"],
    ],
  },
  {
    id: "pachelbel",
    roman: "I – V – vi – iii – IV – I – IV – V",
    chords: [
      ["C4", "E4", "G4"],
      ["G3", "B3", "D4"],
      ["A3", "C4", "E4"],
      ["E3", "G3", "B3"],
      ["F3", "A3", "C4"],
      ["C4", "E4", "G4"],
      ["F3", "A3", "C4"],
      ["G3", "B3", "D4"],
    ],
  },
  {
    id: "coltrane",
    roman: "I – ♭III7 – ♭VI – VII7 – III  (Giant Steps)",
    chords: [
      ["C4", "E4", "G4", "B4"],
      ["Eb4", "G4", "Bb4", "Db5"],
      ["Ab3", "C4", "Eb4", "G4"],
      ["B3", "D#4", "F#4", "A4"],
      ["E4", "G#4", "B4", "D#5"],
    ],
  },
];

export const CADENCES = [
  {
    id: "authentic",
    code: "V → I",
    chords: [
      ["G3", "B3", "D4"],
      ["C4", "E4", "G4"],
    ],
  },
  {
    id: "plagal",
    code: "IV → I",
    chords: [
      ["F3", "A3", "C4"],
      ["C4", "E4", "G4"],
    ],
  },
  {
    id: "deceptive",
    code: "V → vi",
    chords: [
      ["G3", "B3", "D4"],
      ["A3", "C4", "E4"],
    ],
  },
  {
    id: "half",
    code: "X → V",
    chords: [
      ["C4", "E4", "G4"],
      ["G3", "B3", "D4"],
    ],
  },
  {
    id: "picardy",
    code: "i → I",
    chords: [
      ["C4", "Eb4", "G4"],
      ["C4", "E4", "G4"],
    ],
  },
];

export const FUNCTIONAL_GROUPS = [
  { id: "tonic", chords: ["I", "iii", "vi"] },
  { id: "subdominant", chords: ["ii", "IV"] },
  { id: "dominant", chords: ["V", "vii°"] },
];

// All scales rooted on C (or A for natural-minor pair) — pure note arrays for direct playback.
// Formulas use W (whole tone, 2 semis) / H (half step, 1 semi) for diatonic
// or scale-degree shorthand 1-2-b3-4-5-b6-b7 etc. for less regular scales.
// `id` values match i18n keys under data.scales.<bucket>; familyId matches data.scales.familyLabels.

export const MAJOR_SCALE_C = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
export const MINOR_SCALE_A = ["A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4"];

export const SCALE_DEGREES = [
  { id: "tonic", degree: 1 },
  { id: "supertonic", degree: 2 },
  { id: "mediant", degree: 3 },
  { id: "subdominant", degree: 4 },
  { id: "dominant", degree: 5 },
  { id: "submediant", degree: 6 },
  { id: "leadingTone", degree: 7 },
  { id: "subtonic", degree: 7 },
];

export const TETRACHORDS = [
  { id: "major", formula: "W–W–H", example: ["C4", "D4", "E4", "F4"] },
  { id: "minor", formula: "W–H–W", example: ["C4", "D4", "Eb4", "F4"] },
  { id: "phrygian", formula: "H–W–W", example: ["C4", "Db4", "Eb4", "F4"] },
  { id: "lydian", formula: "W–W–W", example: ["C4", "D4", "E4", "F#4"] },
  { id: "harmonic", formula: "H–½+½–H", example: ["C4", "Db4", "E4", "F4"] },
];

// Three forms of minor — all rooted on A so the comparison is direct.
export const MINOR_FORMS = [
  { id: "natural", formula: "1 2 b3 4 5 b6 b7", notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4"] },
  { id: "harmonic", formula: "1 2 b3 4 5 b6 7", notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G#4", "A4"] },
  { id: "melodic", formula: "1 2 b3 4 5 6 7", notes: ["A3", "B3", "C4", "D4", "E4", "F#4", "G#4", "A4"] },
];

// Family ordering for catalog grouping; matches familyLabels keys in i18n.
export const SCALE_FAMILIES = [
  "diatonic",
  "diatonicAltered",
  "pentatonic",
  "hexatonic",
  "octatonic",
  "bebop",
  "world",
  "chromatic",
];

// COMPREHENSIVE CATALOG
// each: { id, familyId, formula, notes (in C or A as labeled) }
export const SCALE_CATALOG = [
  { id: "major", familyId: "diatonic", formula: "W W H W W W H", notes: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"] },
  { id: "natural-minor", familyId: "diatonic", formula: "W H W W H W W", notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4"] },
  { id: "harmonic-minor", familyId: "diatonicAltered", formula: "W H W W H A2 H", notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G#4", "A4"] },
  { id: "melodic-minor", familyId: "diatonicAltered", formula: "W H W W W W H", notes: ["A3", "B3", "C4", "D4", "E4", "F#4", "G#4", "A4"] },

  { id: "major-pent", familyId: "pentatonic", formula: "1 2 3 5 6", notes: ["C4", "D4", "E4", "G4", "A4", "C5"] },
  { id: "minor-pent", familyId: "pentatonic", formula: "1 b3 4 5 b7", notes: ["A3", "C4", "D4", "E4", "G4", "A4"] },
  { id: "blues", familyId: "pentatonic", formula: "1 b3 4 b5 5 b7", notes: ["A3", "C4", "D4", "Eb4", "E4", "G4", "A4"] },
  { id: "egyptian", familyId: "pentatonic", formula: "1 2 4 5 b7", notes: ["C4", "D4", "F4", "G4", "Bb4", "C5"] },
  { id: "hirajoshi", familyId: "pentatonic", formula: "1 2 b3 5 b6", notes: ["C4", "D4", "Eb4", "G4", "Ab4", "C5"] },
  { id: "in", familyId: "pentatonic", formula: "1 b2 4 5 b6", notes: ["C4", "Db4", "F4", "G4", "Ab4", "C5"] },

  { id: "whole-tone", familyId: "hexatonic", formula: "W W W W W W", notes: ["C4", "D4", "E4", "F#4", "G#4", "A#4", "C5"] },
  { id: "augmented", familyId: "hexatonic", formula: "1 m3 H m3 H m3 H", notes: ["C4", "D#4", "E4", "G4", "G#4", "B4", "C5"] },

  { id: "diminished-wh", familyId: "octatonic", formula: "W H W H W H W H", notes: ["C4", "D4", "Eb4", "F4", "F#4", "G#4", "A4", "B4", "C5"] },
  { id: "diminished-hw", familyId: "octatonic", formula: "H W H W H W H W", notes: ["C4", "Db4", "Eb4", "E4", "F#4", "G4", "A4", "Bb4", "C5"] },

  { id: "bebop-major", familyId: "bebop", formula: "1 2 3 4 5 b6 6 7", notes: ["C4", "D4", "E4", "F4", "G4", "Ab4", "A4", "B4", "C5"] },
  { id: "bebop-dominant", familyId: "bebop", formula: "1 2 3 4 5 6 b7 7", notes: ["C4", "D4", "E4", "F4", "G4", "A4", "Bb4", "B4", "C5"] },
  { id: "bebop-dorian", familyId: "bebop", formula: "1 2 b3 3 4 5 6 b7", notes: ["C4", "D4", "Eb4", "E4", "F4", "G4", "A4", "Bb4", "C5"] },

  { id: "phrygian-dominant", familyId: "world", formula: "1 b2 3 4 5 b6 b7", notes: ["C4", "Db4", "E4", "F4", "G4", "Ab4", "Bb4", "C5"] },
  { id: "hungarian-minor", familyId: "world", formula: "1 2 b3 #4 5 b6 7", notes: ["C4", "D4", "Eb4", "F#4", "G4", "Ab4", "B4", "C5"] },
  { id: "double-harmonic", familyId: "world", formula: "1 b2 3 4 5 b6 7", notes: ["C4", "Db4", "E4", "F4", "G4", "Ab4", "B4", "C5"] },
  { id: "neapolitan-minor", familyId: "world", formula: "1 b2 b3 4 5 b6 7", notes: ["C4", "Db4", "Eb4", "F4", "G4", "Ab4", "B4", "C5"] },
  { id: "neapolitan-major", familyId: "world", formula: "1 b2 b3 4 5 6 7", notes: ["C4", "Db4", "Eb4", "F4", "G4", "A4", "B4", "C5"] },

  {
    id: "chromatic",
    familyId: "chromatic",
    formula: "all 12 semitones",
    notes: ["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5"],
  },
];

// MODES OF MELODIC MINOR (rooted on C-melodic-minor: C D Eb F G A B)
export const MM_MODES = [
  { id: "mm-1", formula: "1 2 b3 4 5 6 7", notes: ["C4", "D4", "Eb4", "F4", "G4", "A4", "B4", "C5"] },
  { id: "mm-2", formula: "1 b2 b3 4 5 6 b7", notes: ["D4", "Eb4", "F4", "G4", "A4", "B4", "C5", "D5"] },
  { id: "mm-3", formula: "1 2 3 #4 #5 6 7", notes: ["Eb4", "F4", "G4", "A4", "B4", "C5", "D5", "Eb5"] },
  { id: "mm-4", formula: "1 2 3 #4 5 6 b7", notes: ["F4", "G4", "A4", "B4", "C5", "D5", "Eb5", "F5"] },
  { id: "mm-5", formula: "1 2 3 4 5 b6 b7", notes: ["G4", "A4", "B4", "C5", "D5", "Eb5", "F5", "G5"] },
  { id: "mm-6", formula: "1 2 b3 4 b5 b6 b7", notes: ["A4", "B4", "C5", "D5", "Eb5", "F5", "G5", "A5"] },
  { id: "mm-7", formula: "1 b2 b3 b4 b5 b6 b7", notes: ["B4", "C5", "D5", "Eb5", "F5", "G5", "A5", "B5"] },
];

// MODES OF HARMONIC MINOR (rooted on C-harmonic-minor: C D Eb F G Ab B)
export const HM_MODES = [
  { id: "hm-1", formula: "1 2 b3 4 5 b6 7", notes: ["C4", "D4", "Eb4", "F4", "G4", "Ab4", "B4", "C5"] },
  { id: "hm-2", formula: "1 b2 b3 4 b5 6 b7", notes: ["D4", "Eb4", "F4", "G4", "Ab4", "B4", "C5", "D5"] },
  { id: "hm-3", formula: "1 2 3 4 #5 6 7", notes: ["Eb4", "F4", "G4", "Ab4", "B4", "C5", "D5", "Eb5"] },
  { id: "hm-4", formula: "1 2 b3 #4 5 6 b7", notes: ["F4", "G4", "Ab4", "B4", "C5", "D5", "Eb5", "F5"] },
  { id: "hm-5", formula: "1 b2 3 4 5 b6 b7", notes: ["G4", "Ab4", "B4", "C5", "D5", "Eb5", "F5", "G5"] },
  { id: "hm-6", formula: "1 #2 3 #4 5 6 7", notes: ["Ab4", "B4", "C5", "D5", "Eb5", "F5", "G5", "Ab5"] },
  { id: "hm-7", formula: "1 b2 b3 b4 b5 b6 bb7", notes: ["B4", "C5", "D5", "Eb5", "F5", "G5", "Ab5", "B5"] },
];

// Relative vs parallel: same notes vs same root
export const RELATIVE_PARALLEL = {
  relative: {
    a: { id: "majorC", notes: MAJOR_SCALE_C },
    b: { id: "minorA", notes: MINOR_SCALE_A },
  },
  parallel: {
    a: { id: "majorC", notes: MAJOR_SCALE_C },
    b: { id: "minorC", notes: ["C4", "D4", "Eb4", "F4", "G4", "Ab4", "Bb4", "C5"] },
  },
};

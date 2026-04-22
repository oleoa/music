// Each row in C: [root, target, semitones]
// quality: P (perfect), M (major), m (minor), A (augmented), d (diminished)
// consonance: perfect | imperfect | mild | sharp | variable
// ratio: just-intonation frequency ratio
// id matches i18n key under data.intervals.simple
export const SIMPLE_INTERVALS = [
  { id: "P1", semis: 0, short: "P1", quality: "P", target: "C4", ratio: "1:1", consonance: "perfect", inversionSemis: 12, inversionShort: "P8" },
  { id: "m2", semis: 1, short: "m2", quality: "m", target: "C#4", ratio: "16:15", consonance: "sharp", inversionSemis: 11, inversionShort: "M7" },
  { id: "M2", semis: 2, short: "M2", quality: "M", target: "D4", ratio: "9:8", consonance: "mild", inversionSemis: 10, inversionShort: "m7" },
  { id: "m3", semis: 3, short: "m3", quality: "m", target: "D#4", ratio: "6:5", consonance: "imperfect", inversionSemis: 9, inversionShort: "M6" },
  { id: "M3", semis: 4, short: "M3", quality: "M", target: "E4", ratio: "5:4", consonance: "imperfect", inversionSemis: 8, inversionShort: "m6" },
  { id: "P4", semis: 5, short: "P4", quality: "P", target: "F4", ratio: "4:3", consonance: "variable", inversionSemis: 7, inversionShort: "P5" },
  { id: "TT", semis: 6, short: "TT", quality: "A/d", target: "F#4", ratio: "45:32", consonance: "sharp", inversionSemis: 6, inversionShort: "TT" },
  { id: "P5", semis: 7, short: "P5", quality: "P", target: "G4", ratio: "3:2", consonance: "perfect", inversionSemis: 5, inversionShort: "P4" },
  { id: "m6", semis: 8, short: "m6", quality: "m", target: "G#4", ratio: "8:5", consonance: "imperfect", inversionSemis: 4, inversionShort: "M3" },
  { id: "M6", semis: 9, short: "M6", quality: "M", target: "A4", ratio: "5:3", consonance: "imperfect", inversionSemis: 3, inversionShort: "m3" },
  { id: "m7", semis: 10, short: "m7", quality: "m", target: "A#4", ratio: "16:9", consonance: "mild", inversionSemis: 2, inversionShort: "M2" },
  { id: "M7", semis: 11, short: "M7", quality: "M", target: "B4", ratio: "15:8", consonance: "sharp", inversionSemis: 1, inversionShort: "m2" },
  { id: "P8", semis: 12, short: "P8", quality: "P", target: "C5", ratio: "2:1", consonance: "perfect", inversionSemis: 0, inversionShort: "P1" },
];

// id matches i18n key under data.intervals.compound
export const COMPOUND_INTERVALS = [
  { id: "m9", semis: 13, short: "m9", target: "C#5", simple: "m2 + 8ve" },
  { id: "M9", semis: 14, short: "M9", target: "D5", simple: "M2 + 8ve" },
  { id: "m10", semis: 15, short: "m10", target: "D#5", simple: "m3 + 8ve" },
  { id: "M10", semis: 16, short: "M10", target: "E5", simple: "M3 + 8ve" },
  { id: "P11", semis: 17, short: "P11", target: "F5", simple: "P4 + 8ve" },
  { id: "A11", semis: 18, short: "#11", target: "F#5", simple: "TT + 8ve" },
  { id: "P12", semis: 19, short: "P12", target: "G5", simple: "P5 + 8ve" },
  { id: "m13", semis: 20, short: "b13", target: "G#5", simple: "m6 + 8ve" },
  { id: "M13", semis: 21, short: "M13", target: "A5", simple: "M6 + 8ve" },
  { id: "m14", semis: 22, short: "m14", target: "A#5", simple: "m7 + 8ve" },
  { id: "M14", semis: 23, short: "M14", target: "B5", simple: "M7 + 8ve" },
  { id: "P15", semis: 24, short: "P15", target: "C6", simple: "8ve + 8ve" },
];

// Each consonance tier with one canonical example
// id matches i18n key under data.intervals.consonanceTiers
export const CONSONANCE_TIERS = [
  { id: "perfect", example: ["C4", "G4"], semis: 7 },
  { id: "imperfect", example: ["C4", "E4"], semis: 4 },
  { id: "mild", example: ["C4", "D4"], semis: 2 },
  { id: "sharp", example: ["C4", "C#4"], semis: 1 },
  { id: "variable", example: ["C4", "F#4"], semis: 6 },
];

// Enharmonic interval pairs (same pitch, different name & function)
// id matches i18n key under data.intervals.enharmonicPairs
// notes is a language-neutral display string (scientific pitch notation)
export const ENHARMONIC_PAIRS = [
  { id: "tritone", notes: "C–F#" },
  { id: "aug2min3", notes: "C–D#" },
  { id: "min7aug6", notes: "C–Bb" },
];

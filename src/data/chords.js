// All chords rooted on C for direct comparison.
// Each row's `id` matches the i18n key under data.chords.<bucket>.

export const TRIADS = [
  { id: "maj", symbol: "C", formula: "1 – 3 – 5", intervals: "M3 + m3", notes: ["C4", "E4", "G4"] },
  { id: "min", symbol: "Cm", formula: "1 – ♭3 – 5", intervals: "m3 + M3", notes: ["C4", "Eb4", "G4"] },
  { id: "dim", symbol: "C° / Cdim", formula: "1 – ♭3 – ♭5", intervals: "m3 + m3", notes: ["C4", "Eb4", "Gb4"] },
  { id: "aug", symbol: "C+ / Caug", formula: "1 – 3 – ♯5", intervals: "M3 + M3", notes: ["C4", "E4", "G#4"] },
  { id: "sus2", symbol: "Csus2", formula: "1 – 2 – 5", intervals: "M2 + P4", notes: ["C4", "D4", "G4"] },
  { id: "sus4", symbol: "Csus4", formula: "1 – 4 – 5", intervals: "P4 + M2", notes: ["C4", "F4", "G4"] },
  { id: "power", symbol: "C5", formula: "1 – 5", intervals: "P5", notes: ["C3", "G3", "C4"] },
];

export const SIXTH_CHORDS = [
  { id: "maj6", symbol: "C6", formula: "1 – 3 – 5 – 6", notes: ["C4", "E4", "G4", "A4"] },
  { id: "min6", symbol: "Cm6", formula: "1 – ♭3 – 5 – 6", notes: ["C4", "Eb4", "G4", "A4"] },
  { id: "6/9", symbol: "C6/9", formula: "1 – 3 – 5 – 6 – 9", notes: ["C4", "E4", "G4", "A4", "D5"] },
  { id: "min6/9", symbol: "Cm6/9", formula: "1 – ♭3 – 5 – 6 – 9", notes: ["C4", "Eb4", "G4", "A4", "D5"] },
];

export const SEVENTH_CHORDS = [
  { id: "maj7", symbol: "Cmaj7", formula: "1 – 3 – 5 – 7", notes: ["C4", "E4", "G4", "B4"] },
  { id: "dom7", symbol: "C7", formula: "1 – 3 – 5 – ♭7", notes: ["C4", "E4", "G4", "Bb4"] },
  { id: "min7", symbol: "Cm7", formula: "1 – ♭3 – 5 – ♭7", notes: ["C4", "Eb4", "G4", "Bb4"] },
  { id: "mMaj7", symbol: "CmMaj7", formula: "1 – ♭3 – 5 – 7", notes: ["C4", "Eb4", "G4", "B4"] },
  { id: "m7b5", symbol: "Cm7♭5 / Cø7", formula: "1 – ♭3 – ♭5 – ♭7", notes: ["C4", "Eb4", "Gb4", "Bb4"] },
  { id: "dim7", symbol: "C°7 / Cdim7", formula: "1 – ♭3 – ♭5 – 𝄫7", notes: ["C4", "Eb4", "Gb4", "A4"] },
  { id: "augMaj7", symbol: "Cmaj7♯5", formula: "1 – 3 – ♯5 – 7", notes: ["C4", "E4", "G#4", "B4"] },
  { id: "aug7", symbol: "C7♯5", formula: "1 – 3 – ♯5 – ♭7", notes: ["C4", "E4", "G#4", "Bb4"] },
];

export const ADD_CHORDS = [
  { id: "add9", symbol: "Cadd9", formula: "1 – 3 – 5 – 9", notes: ["C4", "E4", "G4", "D5"] },
  { id: "min-add9", symbol: "Cmadd9", formula: "1 – ♭3 – 5 – 9", notes: ["C4", "Eb4", "G4", "D5"] },
  { id: "add11", symbol: "Cadd11", formula: "1 – 3 – 5 – 11", notes: ["C4", "E4", "G4", "F5"] },
  { id: "add#11", symbol: "Cadd♯11", formula: "1 – 3 – 5 – ♯11", notes: ["C4", "E4", "G4", "F#5"] },
];

export const EXTENDED_CHORDS = [
  { id: "9", symbol: "C9", formula: "1 – 3 – 5 – ♭7 – 9", notes: ["C4", "E4", "G4", "Bb4", "D5"] },
  { id: "maj9", symbol: "Cmaj9", formula: "1 – 3 – 5 – 7 – 9", notes: ["C4", "E4", "G4", "B4", "D5"] },
  { id: "m9", symbol: "Cm9", formula: "1 – ♭3 – 5 – ♭7 – 9", notes: ["C4", "Eb4", "G4", "Bb4", "D5"] },
  { id: "11", symbol: "C11", formula: "1 – (3) – 5 – ♭7 – 9 – 11", notes: ["C4", "G4", "Bb4", "D5", "F5"] },
  { id: "m11", symbol: "Cm11", formula: "1 – ♭3 – 5 – ♭7 – 9 – 11", notes: ["C4", "Eb4", "G4", "Bb4", "D5", "F5"] },
  { id: "13", symbol: "C13", formula: "1 – 3 – 5 – ♭7 – 9 – 13", notes: ["C4", "E4", "G4", "Bb4", "D5", "A5"] },
  { id: "maj13", symbol: "Cmaj13", formula: "1 – 3 – 5 – 7 – 9 – 13", notes: ["C4", "E4", "G4", "B4", "D5", "A5"] },
];

export const ALTERED_DOMINANTS = [
  { id: "7b5", symbol: "C7♭5", formula: "1 – 3 – ♭5 – ♭7", notes: ["C4", "E4", "Gb4", "Bb4"] },
  { id: "7#5", symbol: "C7♯5", formula: "1 – 3 – ♯5 – ♭7", notes: ["C4", "E4", "G#4", "Bb4"] },
  { id: "7b9", symbol: "C7♭9", formula: "1 – 3 – 5 – ♭7 – ♭9", notes: ["C4", "E4", "G4", "Bb4", "Db5"] },
  { id: "7#9", symbol: "C7♯9", formula: "1 – 3 – 5 – ♭7 – ♯9", notes: ["C4", "E4", "G4", "Bb4", "D#5"] },
  { id: "7#11", symbol: "C7♯11", formula: "1 – 3 – 5 – ♭7 – ♯11", notes: ["C4", "E4", "G4", "Bb4", "F#5"] },
  { id: "7b13", symbol: "C7♭13", formula: "1 – 3 – 5 – ♭7 – ♭13", notes: ["C4", "E4", "G4", "Bb4", "Ab5"] },
  { id: "7alt", symbol: "C7alt", formula: "1 – 3 – ♭7 – ♭9 – ♯9 – ♯11 – ♭13", notes: ["C4", "E4", "Bb4", "Db5", "D#5", "F#5", "Ab5"] },
];

export const SLASH_CHORDS = [
  { id: "C/E", symbol: "C/E", notes: ["E3", "G3", "C4", "E4"] },
  { id: "C/G", symbol: "C/G", notes: ["G2", "C4", "E4", "G4"] },
  { id: "F/G", symbol: "F/G", notes: ["G2", "F3", "A3", "C4"] },
  { id: "Dm/G", symbol: "Dm/G", notes: ["G2", "D4", "F4", "A4"] },
  { id: "Bb/C", symbol: "Bb/C", notes: ["C3", "Bb3", "D4", "F4"] },
];

export const POLYCHORDS = [
  { id: "D/C", notes: ["C3", "G3", "C4", "F#4", "A4", "D5"] },
  { id: "Eb/C", notes: ["C3", "G3", "C4", "Eb4", "G4", "Bb4"] },
  { id: "Fs/C", notes: ["C3", "C4", "F#4", "A#4", "C#5"] },
];

// VOICINGS of a single Cmaj7 — drop / spread / shell etc.
export const VOICINGS_CMAJ7 = [
  { id: "close", notes: ["C4", "E4", "G4", "B4"] },
  { id: "drop2", notes: ["E3", "G3", "B3", "C4"] },
  { id: "drop3", notes: ["G3", "C4", "E4", "B4"] },
  { id: "drop24", notes: ["C3", "E3", "G3", "B3"] },
  { id: "spread", notes: ["C2", "G3", "B3", "E4"] },
  { id: "quartal", notes: ["D3", "G3", "C4", "F4", "B4"] },
  { id: "rootless", notes: ["E3", "G3", "B3", "D4"] },
  { id: "shell", notes: ["C3", "E3", "B3"] },
];

// INVERSIONS for a triad and a tetrad
export const TRIAD_INVERSIONS = [
  { id: "root", notes: ["C4", "E4", "G4"], short: "C / E / G" },
  { id: "first", notes: ["E4", "G4", "C5"], short: "E / G / C" },
  { id: "second", notes: ["G3", "C4", "E4"], short: "G / C / E" },
];

export const TETRAD_INVERSIONS = [
  { id: "root", notes: ["C4", "E4", "G4", "B4"], figured: "7", short: "C E G B" },
  { id: "first", notes: ["E4", "G4", "B4", "C5"], figured: "6/5", short: "E G B C" },
  { id: "second", notes: ["G4", "B4", "C5", "E5"], figured: "4/3", short: "G B C E" },
  { id: "third", notes: ["B3", "C4", "E4", "G4"], figured: "4/2", short: "B C E G" },
];

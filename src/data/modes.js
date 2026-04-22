// Each mode of the C-major scale, played from its own root so the flavor is audible.
// `id` matches i18n key under data.modes.churchModes.
export const CHURCH_MODES = [
  { id: "ionian", formula: "1 2 3 4 5 6 7", notes: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"] },
  { id: "dorian", formula: "1 2 ♭3 4 5 6 ♭7", notes: ["D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5"] },
  { id: "phrygian", formula: "1 ♭2 ♭3 4 5 ♭6 ♭7", notes: ["E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"] },
  { id: "lydian", formula: "1 2 3 ♯4 5 6 7", notes: ["F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5"] },
  { id: "mixolydian", formula: "1 2 3 4 5 6 ♭7", notes: ["G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5"] },
  { id: "aeolian", formula: "1 2 ♭3 4 5 ♭6 ♭7", notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4"] },
  { id: "locrian", formula: "1 ♭2 ♭3 4 ♭5 ♭6 ♭7", notes: ["B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4"] },
];

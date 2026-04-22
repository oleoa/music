import { useState } from "react";
import { useT } from "../../i18n/I18nContext.jsx";
import { useAudio } from "../../audio/AudioContext.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import SubHeader from "../ui/SubHeader.jsx";
import PracticalApp from "../ui/PracticalApp.jsx";
import {
  CIRCLE_KEYS,
  SHARP_ORDER,
  FLAT_ORDER,
  SHARP_MNEMONIC,
  FLAT_MNEMONIC,
} from "../../data/circleOfFifths.js";

// Diatonic chord skeletons in C — for any other key, transpose by the offset.
const C_DIATONIC = [
  { degree: "I", quality: "maj" },
  { degree: "ii", quality: "min" },
  { degree: "iii", quality: "min" },
  { degree: "IV", quality: "maj" },
  { degree: "V", quality: "maj" },
  { degree: "vi", quality: "min" },
  { degree: "vii°", quality: "dim" },
];

export default function CircleOfFifths() {
  const { t } = useT();
  const { playChord } = useAudio();
  const [selected, setSelected] = useState(CIRCLE_KEYS[0]);
  const uses = t("circleOfFifths.uses");

  const playKeyTonic = (key) => {
    setSelected(key);
    // Build a I major triad rooted on the key's tonic
    const root = key.tonic;
    const rootNote = root.replace(/\d+$/, "");
    const oct = parseInt(root.match(/\d+$/)?.[0] ?? "4", 10);
    // simple-triad approximation — root, M3 (4 semis), P5 (7 semis)
    const semitones = (n) => {
      const map = {
        C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3, E: 4, F: 5,
        "F#": 6, Gb: 6, G: 7, "G#": 8, Ab: 8, A: 9, "A#": 10, Bb: 10, B: 11,
      };
      return map[n];
    };
    const noteAt = (semis) => {
      const order = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      const baseSemi = semitones(rootNote.replace("♯", "#").replace("♭", "b").split(" ")[0]);
      const total = baseSemi + semis;
      const newSemi = ((total % 12) + 12) % 12;
      const newOct = oct + Math.floor(total / 12);
      return `${order[newSemi]}${newOct}`;
    };
    playChord([noteAt(0), noteAt(4), noteAt(7)], "2n");
  };

  return (
    <section>
      <SectionHeader paragraph={t("circleOfFifths.paragraph")}>
        {t("circleOfFifths.heading")}
      </SectionHeader>
      <p className="text-lg leading-relaxed mb-6">{t("circleOfFifths.p1")}</p>

      <SubHeader>{t("circleOfFifths.whyTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">{t("circleOfFifths.whyP")}</p>

      <SubHeader>{t("circleOfFifths.sharpsOrderTitle")}</SubHeader>
      <p className="text-base leading-relaxed mb-3">
        {t("circleOfFifths.sharpsOrderP")}
      </p>
      <div className="mono text-sm bg-stone-900 text-stone-50 px-3 py-2 mb-3 inline-block">
        {SHARP_ORDER.map((n) => `${n}♯`).join("  →  ")}
      </div>
      <p className="text-sm italic text-stone-600 mb-6">{SHARP_MNEMONIC}</p>

      <p className="text-base leading-relaxed mb-3">
        {t("circleOfFifths.flatsOrderP")}
      </p>
      <div className="mono text-sm bg-stone-900 text-stone-50 px-3 py-2 mb-3 inline-block">
        {FLAT_ORDER.map((n) => `${n}♭`).join("  →  ")}
      </div>
      <p className="text-sm italic text-stone-600 mb-8">{FLAT_MNEMONIC}</p>

      <SubHeader>{t("circleOfFifths.relativeTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">{t("circleOfFifths.relativeP")}</p>

      <SubHeader>{t("circleOfFifths.usesTitle")}</SubHeader>
      <ul className="space-y-2 mb-8 text-base leading-relaxed list-disc pl-6">
        {uses.map((u, i) => (
          <li key={i}>{u}</li>
        ))}
      </ul>

      <SubHeader>{t("circleOfFifths.interactiveTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">
        {t("circleOfFifths.interactiveP")}
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-6">
        {CIRCLE_KEYS.map((k) => {
          const active = selected.major === k.major;
          return (
            <button
              key={k.major}
              onClick={() => playKeyTonic(k)}
              className={`mono text-xs border-2 p-2 text-left transition-colors ${
                active
                  ? "bg-stone-900 text-stone-50 border-stone-900"
                  : "border-stone-300 hover:border-stone-900"
              }`}
            >
              <span className="block font-bold display text-base">{k.major}</span>
              <span
                className={`block text-[10px] ${active ? "text-stone-400" : "text-stone-500"}`}
              >
                rel. {k.minor}
              </span>
              <span
                className={`block text-[10px] ${active ? "text-stone-400" : "text-stone-500"}`}
              >
                {k.accidentals === 0
                  ? "no ♯/♭"
                  : k.accidentals > 0
                    ? `${k.accidentals}♯`
                    : `${Math.abs(k.accidentals)}♭`}
              </span>
            </button>
          );
        })}
      </div>

      <div className="border border-stone-300 p-4 bg-white mb-8">
        <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
          {selected.major} major · {t("circleOfFifths.keyDiatonic")}
        </p>
        <div className="flex flex-wrap gap-2 mono text-sm">
          {C_DIATONIC.map((d, i) => (
            <span
              key={i}
              className="border border-stone-300 px-2 py-1 bg-stone-100"
            >
              {d.degree}
            </span>
          ))}
        </div>
        {(selected.sharps.length > 0 || selected.flats.length > 0) && (
          <p className="mono text-xs text-stone-600 mt-3">
            {selected.sharps.length > 0 && `Sharps: ${selected.sharps.join(", ")}`}
            {selected.flats.length > 0 && `Flats: ${selected.flats.join(", ")}`}
          </p>
        )}
      </div>

      <PracticalApp>{t("circleOfFifths.practicalApp")}</PracticalApp>
    </section>
  );
}

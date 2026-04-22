import { useT } from "../../i18n/I18nContext.jsx";
import { useAudio } from "../../audio/AudioContext.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import SubHeader from "../ui/SubHeader.jsx";
import InfoBox from "../ui/InfoBox.jsx";
import Quiz from "../ui/Quiz.jsx";
import { CHURCH_MODES } from "../../data/modes.js";

// Parallel modes (all rooted on C) for the quiz so the only variable is the mode.
const C_PARALLEL_MODES = [
  { id: "ionian", notes: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"] },
  { id: "dorian", notes: ["C4", "D4", "Eb4", "F4", "G4", "A4", "Bb4", "C5"] },
  { id: "phrygian", notes: ["C4", "Db4", "Eb4", "F4", "G4", "Ab4", "Bb4", "C5"] },
  { id: "lydian", notes: ["C4", "D4", "E4", "F#4", "G4", "A4", "B4", "C5"] },
  { id: "mixolydian", notes: ["C4", "D4", "E4", "F4", "G4", "A4", "Bb4", "C5"] },
  { id: "aeolian", notes: ["C4", "D4", "Eb4", "F4", "G4", "Ab4", "Bb4", "C5"] },
  { id: "locrian", notes: ["C4", "Db4", "Eb4", "F4", "Gb4", "Ab4", "Bb4", "C5"] },
];

export default function Modes() {
  const { t } = useT();
  const { playSequence } = useAudio();
  const composingItems = t("modos.composingItems");
  const characteristicLabel = t("data.modes.characteristicLabel");

  const quizPool = C_PARALLEL_MODES.map((m) => ({
    label: t(`data.modes.churchModes.${m.id}.name`),
    play: () => playSequence(m.notes, 0.3),
  }));

  return (
    <section>
      <SectionHeader paragraph={t("modos.paragraph")}>
        {t("modos.heading")}
      </SectionHeader>
      <p className="text-lg leading-relaxed mb-4">{t("modos.p1")}</p>
      <p className="text-lg leading-relaxed mb-8">{t("modos.intro2")}</p>

      <div className="space-y-3 mb-8">
        {CHURCH_MODES.map((m) => (
          <div key={m.id} className="border border-stone-300 p-4 bg-white">
            <div className="flex items-start gap-3">
              <button
                onClick={() => playSequence(m.notes, 0.3)}
                className="note-btn mono text-xs border-2 border-stone-900 px-3 py-2 shrink-0"
              >
                ▸
              </button>
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                  <span className="display text-lg font-bold">
                    {t(`data.modes.churchModes.${m.id}.name`)}
                  </span>
                  <span className="mono text-xs bg-stone-200 px-1.5">
                    {m.formula}
                  </span>
                  <span className="mono text-xs text-stone-500">
                    {t(`data.modes.churchModes.${m.id}.vibe`)}
                  </span>
                </div>
                <p className="text-sm text-stone-700 mb-1">
                  {t(`data.modes.churchModes.${m.id}.desc`)}
                </p>
                <p className="mono text-xs text-stone-500">
                  {characteristicLabel}: {t(`data.modes.churchModes.${m.id}.characteristic`)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SubHeader>{t("modos.characteristicTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">
        {t("modos.characteristicP")}
      </p>

      <SubHeader>{t("modos.parallelRelativeTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">
        {t("modos.parallelRelativeP")}
      </p>

      <SubHeader>{t("modos.composingTitle")}</SubHeader>
      <ul className="space-y-2 mb-8 text-base leading-relaxed list-disc pl-6">
        {composingItems.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>

      <Quiz
        title={t("modos.quizTitle")}
        prompt={t("modos.quizPrompt")}
        pool={quizPool}
      />

      <InfoBox label={t("modos.useLabel")}>{t("modos.useBody")}</InfoBox>
    </section>
  );
}

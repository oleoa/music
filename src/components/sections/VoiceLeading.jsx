import { useT } from "../../i18n/I18nContext.jsx";
import { useAudio } from "../../audio/AudioContext.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import SubHeader from "../ui/SubHeader.jsx";
import PracticalApp from "../ui/PracticalApp.jsx";

// Same I-V-vi-IV progression voiced two ways: block (every chord at root) vs. led
const BLOCK_VOICING = [
  ["C4", "E4", "G4"],
  ["G4", "B4", "D5"],
  ["A4", "C5", "E5"],
  ["F4", "A4", "C5"],
];

const LED_VOICING = [
  ["C4", "E4", "G4"],
  ["B3", "D4", "G4"],
  ["A3", "C4", "E4"],
  ["A3", "C4", "F4"],
];

export default function VoiceLeading() {
  const { t } = useT();
  const { playProgression } = useAudio();
  const rules = t("voiceLeading.rules");
  const abLabels = t("voiceLeading.abLabels");

  return (
    <section>
      <SectionHeader paragraph={t("voiceLeading.paragraph")}>
        {t("voiceLeading.heading")}
      </SectionHeader>
      <p className="text-lg leading-relaxed mb-8">{t("voiceLeading.p1")}</p>

      <SubHeader>{t("voiceLeading.rulesTitle")}</SubHeader>
      <ol className="space-y-3 mb-8 text-base leading-relaxed list-decimal pl-5">
        {rules.map((r, i) => (
          <li key={i}>
            <strong>{r.strong}</strong>
            {r.text}
          </li>
        ))}
      </ol>

      <SubHeader>{t("voiceLeading.abTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("voiceLeading.abP")}</p>
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => playProgression(BLOCK_VOICING, 1.0)}
            className="note-btn mono text-xs border-2 border-stone-900 px-3 py-2 shrink-0"
          >
            ▸
          </button>
          <span className="mono text-sm">{abLabels[0]}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => playProgression(LED_VOICING, 1.0)}
            className="note-btn mono text-xs border-2 border-stone-900 px-3 py-2 shrink-0"
          >
            ▸
          </button>
          <span className="mono text-sm">{abLabels[1]}</span>
        </div>
      </div>

      <SubHeader>{t("voiceLeading.independenceTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">
        {t("voiceLeading.independenceP")}
      </p>

      <PracticalApp>{t("voiceLeading.practicalApp")}</PracticalApp>
    </section>
  );
}

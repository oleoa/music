import { useT } from "../../i18n/I18nContext.jsx";
import { useAudio } from "../../audio/AudioContext.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import SubHeader from "../ui/SubHeader.jsx";
import PracticalApp from "../ui/PracticalApp.jsx";

export default function Reharmonization() {
  const { t } = useT();
  const { playProgression } = useAudio();
  const techniques = t("reharmonization.techniques");
  const workedItems = t("reharmonization.workedItems");

  return (
    <section>
      <SectionHeader paragraph={t("reharmonization.paragraph")}>
        {t("reharmonization.heading")}
      </SectionHeader>
      <p className="text-lg leading-relaxed mb-8">{t("reharmonization.p1")}</p>

      <SubHeader>{t("reharmonization.techniquesTitle")}</SubHeader>
      <ul className="space-y-3 mb-8 text-base leading-relaxed list-disc pl-6">
        {techniques.map((tt, i) => (
          <li key={i}>
            <strong>{tt.strong}</strong>
            {tt.text}
          </li>
        ))}
      </ul>

      <SubHeader>{t("reharmonization.workedTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">
        {t("reharmonization.workedP")}
      </p>
      <div className="space-y-3 mb-8">
        {workedItems.map((it, i) => (
          <div
            key={i}
            className="border border-stone-300 p-4 bg-white flex items-start gap-3"
          >
            <button
              onClick={() => playProgression(it.chords, 1.0)}
              className="note-btn mono text-xs border-2 border-stone-900 px-3 py-2 shrink-0"
            >
              ▸
            </button>
            <span className="mono text-sm leading-relaxed">{it.label}</span>
          </div>
        ))}
      </div>

      <PracticalApp>{t("reharmonization.practicalApp")}</PracticalApp>
    </section>
  );
}

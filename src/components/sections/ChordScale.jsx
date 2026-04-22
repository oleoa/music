import { useT } from "../../i18n/I18nContext.jsx";
import { useAudio } from "../../audio/AudioContext.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import SubHeader from "../ui/SubHeader.jsx";
import PracticalApp from "../ui/PracticalApp.jsx";

export default function ChordScale() {
  const { t } = useT();
  const { playSequence } = useAudio();
  const catalog = t("chordScale.catalog");

  return (
    <section>
      <SectionHeader paragraph={t("chordScale.paragraph")}>
        {t("chordScale.heading")}
      </SectionHeader>
      <p className="text-lg leading-relaxed mb-8">{t("chordScale.p1")}</p>

      <SubHeader>{t("chordScale.avoidTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">{t("chordScale.avoidP")}</p>

      <SubHeader>{t("chordScale.catalogTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-6">{t("chordScale.catalogP")}</p>

      <div className="space-y-6 mb-8">
        {catalog.map((entry, i) => (
          <div
            key={i}
            className="border border-stone-300 p-4 bg-white"
          >
            <p className="display text-lg font-bold mb-3">{entry.chord}</p>
            <div className="space-y-2">
              {entry.scales.map((s, j) => (
                <div
                  key={j}
                  className="flex items-start gap-3 border-b border-stone-200 pb-2 flex-wrap"
                >
                  <button
                    onClick={() => playSequence(s.notes, 0.25)}
                    className="note-btn mono text-xs border border-stone-900 px-2 py-1 shrink-0"
                  >
                    ▸
                  </button>
                  <span className="serif font-semibold w-44 shrink-0">
                    {s.name}
                  </span>
                  <span className="text-sm text-stone-600 italic flex-1 min-w-[160px]">
                    {s.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <PracticalApp>{t("chordScale.practicalApp")}</PracticalApp>
    </section>
  );
}

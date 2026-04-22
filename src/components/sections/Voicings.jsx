import { useT } from "../../i18n/I18nContext.jsx";
import { useAudio } from "../../audio/AudioContext.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import SubHeader from "../ui/SubHeader.jsx";
import PracticalApp from "../ui/PracticalApp.jsx";
import { VOICINGS_CMAJ7 } from "../../data/chords.js";

const GROUPS = [
  { ids: ["close"], titleKey: "closeOpenTitle", bodyKey: "closeOpenP" },
  { ids: ["drop2", "drop3", "drop24", "spread"], titleKey: "dropTitle", bodyKey: "dropP" },
  { ids: ["quartal"], titleKey: "quartalTitle", bodyKey: "quartalP" },
  { ids: ["rootless"], titleKey: "rootlessTitle", bodyKey: "rootlessP" },
  { ids: ["shell"], titleKey: "shellTitle", bodyKey: "shellP" },
];

export default function Voicings() {
  const { t } = useT();
  const { playChord } = useAudio();
  const lookup = (id) => VOICINGS_CMAJ7.find((v) => v.id === id);

  return (
    <section>
      <SectionHeader paragraph={t("voicings.paragraph")}>
        {t("voicings.heading")}
      </SectionHeader>
      <p className="text-lg leading-relaxed mb-8">{t("voicings.p1")}</p>

      {GROUPS.map((g) => (
        <div key={g.titleKey}>
          <SubHeader>{t(`voicings.${g.titleKey}`)}</SubHeader>
          <p className="text-lg leading-relaxed mb-4">
            {t(`voicings.${g.bodyKey}`)}
          </p>
          <div className="space-y-3 mb-8">
            {g.ids.map((id) => {
              const v = lookup(id);
              if (!v) return null;
              return (
                <div
                  key={id}
                  className="border border-stone-300 p-4 flex items-center gap-4 bg-white"
                >
                  <button
                    onClick={() => playChord(v.notes, "2n")}
                    className="note-btn mono text-sm border-2 border-stone-900 px-3 py-2 shrink-0"
                  >
                    ▸
                  </button>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="display text-lg font-bold">
                        {t(`data.chords.voicings.${v.id}.label`)}
                      </span>
                      <span className="mono text-xs text-stone-500">
                        {v.notes.join(" · ")}
                      </span>
                    </div>
                    <p className="text-sm text-stone-600 italic mt-1">
                      {t(`data.chords.voicings.${v.id}.note`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <SubHeader>{t("voicings.upperStructureTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">
        {t("voicings.upperStructureP")}
      </p>
      <div className="border border-stone-300 p-4 bg-white mb-8">
        <button
          onClick={() => playChord(["C3", "Bb3", "E4", "F#5", "A5", "D5"], "2n")}
          className="note-btn mono text-sm border-2 border-stone-900 px-3 py-2 mr-3"
        >
          ▸
        </button>
        <span className="mono text-sm">D / C7  =  C13♯11</span>
      </div>

      <PracticalApp>{t("voicings.practicalApp")}</PracticalApp>
    </section>
  );
}

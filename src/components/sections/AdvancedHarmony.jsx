import { useT } from "../../i18n/I18nContext.jsx";
import { useAudio } from "../../audio/AudioContext.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import SubHeader from "../ui/SubHeader.jsx";
import { EXTENDED_CHORDS } from "../../data/chords.js";

const MODAL_INTERCHANGE_PROGS = [
  [
    ["C4", "E4", "G4"],
    ["F3", "A3", "C4"],
    ["C4", "E4", "G4"],
  ],
  [
    ["C4", "E4", "G4"],
    ["F3", "Ab3", "C4"],
    ["C4", "E4", "G4"],
  ],
];

const SECONDARY_DOMINANT_PROG = [
  ["C4", "E4", "G4"],
  ["D4", "F#4", "A4", "C5"],
  ["G3", "B3", "D4"],
  ["C4", "E4", "G4"],
];

export default function AdvancedHarmony() {
  const { t } = useT();
  const { playChord, playProgression } = useAudio();
  const harmExt = t("harmonia.extP");
  const interchangeList = t("harmonia.interchangeList");
  const dominantesAll = t("harmonia.dominantesAll");
  const diminishedFunctions = t("harmonia.diminishedFunctions");
  const aug6 = t("harmonia.aug6");
  const emprestimoLabels = t("harmonia.emprestimoLabels");
  const extItems = t("harmonia.extItems");
  const extLookup = (id) => EXTENDED_CHORDS.find((c) => c.id === id);
  const extIds = ["9", "maj9", "m9", "13"];
  const extEntries = extIds.map((id, i) => ({ id, label: extItems[i].label }));

  return (
    <section>
      <SectionHeader paragraph={t("harmonia.paragraph")}>
        {t("harmonia.heading")}
      </SectionHeader>
      <p className="text-lg leading-relaxed mb-6">{t("harmonia.p1")}</p>

      <SubHeader>{t("harmonia.extTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">
        {harmExt.before}
        <em>{harmExt.em}</em>
        {harmExt.after}
      </p>
      <div className="space-y-2 mb-8">
        {extEntries.map((e) => {
          const c = extLookup(e.id);
          if (!c) return null;
          return (
            <div
              key={e.id}
              className="flex items-center gap-3 border-b border-stone-200 pb-2"
            >
              <button
                onClick={() => playChord(c.notes, "2n")}
                className="note-btn mono text-xs border border-stone-900 px-2 py-1"
              >
                ▸
              </button>
              <span className="mono text-sm">{e.label}</span>
            </div>
          );
        })}
      </div>

      <SubHeader>{t("harmonia.interchangeTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("harmonia.interchangeP")}</p>
      <div className="space-y-2 mb-6">
        {interchangeList.map((row, i) => (
          <div
            key={i}
            className="flex items-center gap-3 border-b border-stone-200 pb-2 flex-wrap"
          >
            <span className="mono text-sm bg-stone-900 text-stone-50 px-2 py-0.5 w-14 text-center shrink-0">
              {row.rn}
            </span>
            <span className="mono text-sm w-12 shrink-0">{row.chord}</span>
            <span className="text-sm text-stone-600 italic">{row.note}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2 mb-3">
        {MODAL_INTERCHANGE_PROGS.map((prog, i) => (
          <div key={i} className="flex items-center gap-3">
            <button
              onClick={() => playProgression(prog, 1.0)}
              className="note-btn mono text-xs border border-stone-900 px-2 py-1"
            >
              ▸
            </button>
            <span className="mono text-sm">{emprestimoLabels[i]}</span>
          </div>
        ))}
      </div>
      <p className="text-base leading-relaxed italic text-stone-600 mb-8">
        {t("harmonia.emprestimoFooter")}
      </p>

      <SubHeader>{t("harmonia.dominantesTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("harmonia.dominantesP")}</p>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => playProgression(SECONDARY_DOMINANT_PROG, 1.0)}
          className="note-btn mono text-xs border border-stone-900 px-2 py-1"
        >
          ▸
        </button>
        <span className="mono text-sm">{t("harmonia.dominantesExample")}</span>
      </div>
      <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
        {t("harmonia.dominantesAllTitle")}
      </p>
      <div className="space-y-2 mb-8">
        {dominantesAll.map((d, i) => (
          <div
            key={i}
            className="flex items-center gap-3 border-b border-stone-200 pb-2 flex-wrap"
          >
            <span className="mono text-sm bg-stone-900 text-stone-50 px-2 py-0.5 w-16 text-center shrink-0">
              {d.rn}
            </span>
            <span className="mono text-sm w-16 shrink-0">{d.chord}</span>
            <span className="mono text-xs text-stone-500">{d.target}</span>
          </div>
        ))}
      </div>

      <SubHeader>{t("harmonia.diminishedFunctionsTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">
        {t("harmonia.diminishedFunctionsP")}
      </p>
      <ul className="space-y-3 mb-8 text-base leading-relaxed list-disc pl-6">
        {diminishedFunctions.map((d, i) => (
          <li key={i}>
            <strong>{d.strong}</strong>
            {d.text}
          </li>
        ))}
      </ul>

      <SubHeader>{t("harmonia.aug6Title")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("harmonia.aug6P")}</p>
      <div className="space-y-2 mb-8">
        {aug6.map((c, i) => (
          <div
            key={i}
            className="flex items-center gap-3 border-b border-stone-200 pb-2 flex-wrap"
          >
            <span className="serif font-semibold w-32 shrink-0">{c.name}</span>
            <span className="mono text-xs bg-stone-200 px-1.5">{c.notes}</span>
            <span className="text-sm text-stone-600 italic">{c.note}</span>
          </div>
        ))}
      </div>

      <SubHeader>{t("harmonia.neapolitanTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">
        {t("harmonia.neapolitanP")}
      </p>

      <SubHeader>{t("harmonia.modulacaoTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">{t("harmonia.modulacaoP")}</p>

      <SubHeader>{t("harmonia.tritonoTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">{t("harmonia.tritonoP")}</p>

      <SubHeader>{t("harmonia.negativeHarmonyTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">
        {t("harmonia.negativeHarmonyP")}
      </p>

      <SubHeader>{t("harmonia.coltraneTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">{t("harmonia.coltraneP")}</p>

      <SubHeader>{t("harmonia.quartalTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("harmonia.quartalP")}</p>
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() =>
            playChord(["D3", "G3", "C4", "F4", "B4"], "2n")
          }
          className="note-btn mono text-xs border border-stone-900 px-2 py-1"
        >
          ▸
        </button>
        <span className="mono text-sm">{t("harmonia.quartalExample")}</span>
      </div>
    </section>
  );
}

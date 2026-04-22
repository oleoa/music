import { useT } from "../../i18n/I18nContext.jsx";
import { useAudio } from "../../audio/AudioContext.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import SubHeader from "../ui/SubHeader.jsx";
import PracticalApp from "../ui/PracticalApp.jsx";
import Piano from "../ui/Piano.jsx";
import { TWELVE_NOTES, HARMONIC_SERIES_FROM_C2, TIMBRES } from "../../data/notes.js";

export default function SoundAndNotes() {
  const { t } = useT();
  const { playSequence, playNote, setOscillator } = useAudio();
  const somP1 = t("som.p1");
  const somTwelve = t("som.twelveNotesP");
  const somEnh = t("som.enharmoniaP");
  const timbreLabels = t("som.timbreLabels");

  const playTimbre = async (timbre) => {
    setOscillator(timbre);
    // small delay so the synth re-init fires before we trigger
    setTimeout(() => playNote("A4", "2n"), 60);
  };

  return (
    <section>
      <SectionHeader paragraph={t("som.paragraph")}>{t("som.heading")}</SectionHeader>
      <p className="text-lg leading-relaxed mb-6">
        {somP1.before}
        <em>{somP1.em}</em>
        {somP1.after}
      </p>

      <SubHeader>{t("som.twelveNotesTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">
        {somTwelve.before}
        <em>{somTwelve.em}</em>
        {somTwelve.after}
      </p>
      <div className="mono text-sm mb-6 p-4 bg-stone-900 text-stone-50 overflow-x-auto">
        <div className="flex gap-1 whitespace-nowrap">
          {TWELVE_NOTES.map((n) => (
            <span key={n} className="px-2 py-1 border border-stone-600">
              {n}
            </span>
          ))}
        </div>
      </div>

      <SubHeader>{t("som.pianoTitle")}</SubHeader>
      <p className="text-base leading-relaxed mb-4">{t("som.pianoP")}</p>
      <Piano startOctave={4} octaves={1} />

      <SubHeader>{t("som.enharmoniaTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">
        {somEnh.part1}
        <span className="mono bg-stone-200 px-1.5">F♯</span>
        {somEnh.part2}
        <span className="mono bg-stone-200 px-1.5">G♭</span>
        {somEnh.part3}
      </p>

      <SubHeader>{t("som.timbreTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("som.timbreP")}</p>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {TIMBRES.map((tb) => (
          <button
            key={tb}
            onClick={() => playTimbre(tb)}
            className="note-btn mono text-sm border-2 border-stone-900 px-3 py-2 text-left"
          >
            ▸ {timbreLabels[tb]}
          </button>
        ))}
      </div>

      <SubHeader>{t("som.harmonicSeriesTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("som.harmonicSeriesP")}</p>
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => playSequence(HARMONIC_SERIES_FROM_C2, 0.4)}
          className="mono text-xs border-2 border-stone-900 px-3 py-1.5 hover:bg-stone-900 hover:text-stone-50"
        >
          ▸ play overtones
        </button>
        <span className="mono text-xs text-stone-600">
          {HARMONIC_SERIES_FROM_C2.join(" · ")}
        </span>
      </div>
      <p className="text-base text-stone-700 leading-relaxed mb-6">
        {t("som.harmonicSeriesNote")}
      </p>

      <SubHeader>{t("som.temperamentTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-6">{t("som.temperamentP")}</p>

      <SubHeader>{t("som.midiTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-3">{t("som.midiP")}</p>
      <p className="text-base leading-relaxed mb-2">{t("som.formulaP")}</p>
      <div className="mono text-sm bg-stone-100 border border-stone-300 px-3 py-2 inline-block mb-6">
        {t("som.formula")}
      </div>

      <PracticalApp>{t("som.practicalApp")}</PracticalApp>
    </section>
  );
}

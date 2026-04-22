import { useState } from "react";
import { useT } from "../i18n/I18nContext.jsx";
import { useAudio } from "../audio/AudioContext.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";

import Intro from "./sections/Intro.jsx";
import SoundAndNotes from "./sections/SoundAndNotes.jsx";
import Intervals from "./sections/Intervals.jsx";
import Scales from "./sections/Scales.jsx";
import CircleOfFifths from "./sections/CircleOfFifths.jsx";
import Chords from "./sections/Chords.jsx";
import Voicings from "./sections/Voicings.jsx";
import VoiceLeading from "./sections/VoiceLeading.jsx";
import Progressions from "./sections/Progressions.jsx";
import Rhythm from "./sections/Rhythm.jsx";
import Modes from "./sections/Modes.jsx";
import ChordScale from "./sections/ChordScale.jsx";
import AdvancedHarmony from "./sections/AdvancedHarmony.jsx";
import Reharmonization from "./sections/Reharmonization.jsx";
import Midi from "./sections/Midi.jsx";
import NextSteps from "./sections/NextSteps.jsx";

const SECTION_COMPONENTS = {
  intro: Intro,
  som: SoundAndNotes,
  intervalos: Intervals,
  escalas: Scales,
  circleOfFifths: CircleOfFifths,
  acordes: Chords,
  voicings: Voicings,
  voiceLeading: VoiceLeading,
  progressoes: Progressions,
  ritmo: Rhythm,
  modos: Modes,
  chordScale: ChordScale,
  harmonia: AdvancedHarmony,
  reharmonization: Reharmonization,
  midi: Midi,
  proximos: NextSteps,
};

export default function MusicTheoryGuide() {
  const { t } = useT();
  const { synthReady, initAudio } = useAudio();
  const [activeSection, setActiveSection] = useState("intro");

  const sections = t("sections");
  const ActiveComponent = SECTION_COMPONENTS[activeSection] ?? Intro;
  const activeIndex = sections.findIndex((s) => s.id === activeSection);

  return (
    <div
      className="min-h-screen bg-stone-50 text-stone-900"
      style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,700;1,400&family=JetBrains+Mono:wght@400;600&family=Bodoni+Moda:ital,wght@0,400;0,700;0,900;1,400&display=swap');
        .display { font-family: 'Bodoni Moda', serif; font-feature-settings: "ss01"; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .serif { font-family: 'EB Garamond', serif; }
        .drop-cap::first-letter {
          font-family: 'Bodoni Moda', serif;
          font-size: 5.5rem;
          float: left;
          line-height: 0.85;
          padding: 0.3rem 0.5rem 0 0;
          font-weight: 900;
        }
        .note-btn { transition: all 0.15s ease; }
        .note-btn:hover {
          background: #1c1917;
          color: #fafaf9;
          transform: translateY(-1px);
        }
        .note-btn:active { transform: translateY(0); }
        .side-link { transition: all 0.2s ease; position: relative; }
        .side-link.active { color: #1c1917; font-weight: 600; }
        .side-link.active::before {
          content: '';
          position: absolute;
          left: -16px;
          top: 50%;
          width: 8px;
          height: 1px;
          background: #1c1917;
        }
        .piano-key { transition: all 0.1s ease; cursor: pointer; }
        .piano-key.white { background: #fafaf9; border: 1px solid #292524; }
        .piano-key.white:hover { background: #fef3c7; }
        .piano-key.white:active { background: #fde68a; }
        .piano-key.black { background: #1c1917; }
        .piano-key.black:hover { background: #44403c; }
      `}</style>

      <header className="border-b-2 border-stone-900 bg-stone-50 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-baseline gap-4">
          <div className="flex items-baseline gap-4 min-w-0">
            <span className="mono text-xs uppercase tracking-widest text-stone-500">
              {t("header.volume")}
            </span>
            <h1 className="display text-2xl font-black tracking-tight truncate">
              {t("header.title")}
            </h1>
          </div>
          <div className="flex items-baseline gap-4 shrink-0">
            <span className="mono text-xs uppercase tracking-widest text-stone-500 hidden md:block">
              {t("header.tagline")}
            </span>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-12">
        <nav className="hidden lg:block w-56 shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto">
          <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-4 border-b border-stone-300 pb-2">
            {t("sidebar.toc")}
          </p>
          <ul className="space-y-2.5">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setActiveSection(s.id)}
                  className={`side-link mono text-xs text-left text-stone-500 hover:text-stone-900 ${activeSection === s.id ? "active" : ""}`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
          {!synthReady && (
            <div className="mt-8 p-3 border border-stone-900 bg-amber-50">
              <p className="mono text-[10px] uppercase tracking-wider mb-2">
                {t("audio.label")}
              </p>
              <button
                onClick={initAudio}
                className="mono text-xs underline decoration-dotted hover:no-underline"
              >
                {t("audio.enableShort")}
              </button>
            </div>
          )}
        </nav>

        <main className="flex-1 min-w-0 max-w-3xl">
          <ActiveComponent />

          <div className="lg:hidden mt-12 border-t-2 border-stone-900 pt-6">
            <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-3">
              {t("mobileNav.label")}
            </p>
            <div className="flex flex-wrap gap-2">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveSection(s.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`mono text-[10px] uppercase tracking-wider px-2 py-1 border ${activeSection === s.id ? "bg-stone-900 text-stone-50 border-stone-900" : "border-stone-400 text-stone-600"}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            {!synthReady && (
              <button
                onClick={initAudio}
                className="mt-4 mono text-xs underline"
              >
                {t("audio.enableLong")}
              </button>
            )}
          </div>
        </main>
      </div>

      <footer className="border-t-2 border-stone-900 mt-16 py-6 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-baseline">
          <span className="mono text-[10px] uppercase tracking-widest text-stone-500">
            {t("footer.brand")}
          </span>
          <span className="mono text-[10px] uppercase tracking-widest text-stone-500">
            {activeIndex + 1} / {sections.length}
          </span>
        </div>
      </footer>
    </div>
  );
}

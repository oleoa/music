import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";

export default function MusicTheoryGuide() {
  const [activeSection, setActiveSection] = useState("intro");
  const [synthReady, setSynthReady] = useState(false);
  const synthRef = useRef(null);
  const polySynthRef = useRef(null);

  useEffect(() => {
    synthRef.current = new Tone.Synth({
      oscillator: { type: "triangle" },
      envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.8 },
    }).toDestination();
    polySynthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 1.2 },
    }).toDestination();
    polySynthRef.current.volume.value = -8;
    synthRef.current.volume.value = -6;
    return () => {
      synthRef.current?.dispose();
      polySynthRef.current?.dispose();
    };
  }, []);

  const initAudio = async () => {
    if (!synthReady) {
      await Tone.start();
      setSynthReady(true);
    }
  };

  const playNote = async (note, duration = "8n") => {
    await initAudio();
    synthRef.current.triggerAttackRelease(note, duration);
  };

  const playSequence = async (notes, interval = 0.35) => {
    await initAudio();
    const now = Tone.now();
    notes.forEach((note, i) => {
      synthRef.current.triggerAttackRelease(note, "8n", now + i * interval);
    });
  };

  const playChord = async (notes, duration = "2n") => {
    await initAudio();
    polySynthRef.current.triggerAttackRelease(notes, duration);
  };

  const playProgression = async (chords, interval = 0.9) => {
    await initAudio();
    const now = Tone.now();
    chords.forEach((chord, i) => {
      polySynthRef.current.triggerAttackRelease(
        chord,
        "2n",
        now + i * interval,
      );
    });
  };

  const sections = [
    { id: "intro", label: "01 · Introdução" },
    { id: "som", label: "02 · Som & Notas" },
    { id: "intervalos", label: "03 · Intervalos" },
    { id: "escalas", label: "04 · Escalas" },
    { id: "acordes", label: "05 · Acordes" },
    { id: "progressoes", label: "06 · Progressões" },
    { id: "ritmo", label: "07 · Ritmo & Compasso" },
    { id: "modos", label: "08 · Modos Gregos" },
    { id: "harmonia", label: "09 · Harmonia Avançada" },
    { id: "midi", label: "10 · Aplicação em MIDI" },
    { id: "proximos", label: "11 · Próximos Passos" },
  ];

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
        .note-btn {
          transition: all 0.15s ease;
        }
        .note-btn:hover {
          background: #1c1917;
          color: #fafaf9;
          transform: translateY(-1px);
        }
        .note-btn:active {
          transform: translateY(0);
        }
        .side-link {
          transition: all 0.2s ease;
          position: relative;
        }
        .side-link.active {
          color: #1c1917;
          font-weight: 600;
        }
        .side-link.active::before {
          content: '';
          position: absolute;
          left: -16px;
          top: 50%;
          width: 8px;
          height: 1px;
          background: #1c1917;
        }
        .piano-key {
          transition: all 0.1s ease;
          cursor: pointer;
        }
        .piano-key.white {
          background: #fafaf9;
          border: 1px solid #292524;
        }
        .piano-key.white:hover {
          background: #fef3c7;
        }
        .piano-key.white:active {
          background: #fde68a;
        }
        .piano-key.black {
          background: #1c1917;
        }
        .piano-key.black:hover {
          background: #44403c;
        }
        .grid-pattern {
          background-image:
            linear-gradient(to right, rgba(28, 25, 23, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(28, 25, 23, 0.04) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>

      {/* HEADER */}
      <header className="border-b-2 border-stone-900 bg-stone-50 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-baseline">
          <div className="flex items-baseline gap-4">
            <span className="mono text-xs uppercase tracking-widest text-stone-500">
              Vol. I
            </span>
            <h1 className="display text-2xl font-black tracking-tight">
              Teoria Musical
            </h1>
          </div>
          <span className="mono text-xs uppercase tracking-widest text-stone-500 hidden md:block">
            Um guia interativo
          </span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-12">
        {/* SIDEBAR */}
        <nav className="hidden lg:block w-56 shrink-0 sticky top-24 self-start">
          <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-4 border-b border-stone-300 pb-2">
            Sumário
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
                Áudio
              </p>
              <button
                onClick={initAudio}
                className="mono text-xs underline decoration-dotted hover:no-underline"
              >
                Ativar som →
              </button>
            </div>
          )}
        </nav>

        {/* CONTENT */}
        <main className="flex-1 min-w-0 max-w-3xl">
          {/* 01 INTRO */}
          {activeSection === "intro" && (
            <section>
              <p className="mono text-xs uppercase tracking-widest text-stone-500 mb-2">
                § 01
              </p>
              <h2 className="display text-5xl md:text-6xl font-black leading-none mb-8 tracking-tight">
                A música, <br />
                <em className="font-normal">decomposta.</em>
              </h2>
              <p className="drop-cap text-lg leading-relaxed mb-6">
                Teoria musical é a linguagem com a qual descrevemos o que o
                ouvido já entende. Você não precisa dela para apreciar uma
                música — mas precisa dela para compor com intenção, para
                reproduzir uma ideia que ouviu na cabeça, e para conversar com
                outros músicos (ou com um piano-roll de DAW) sem traduzir tudo a
                cada passo.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Este guia está dividido em onze seções. Você pode clicar em
                qualquer botão pra ouvir o que está sendo descrito — é assim que
                a teoria gruda. Ler sobre uma quinta justa não serve pra nada;
                ouvir uma, sim.
              </p>
              <div className="border-l-4 border-stone-900 pl-5 py-2 my-8 bg-stone-100">
                <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                  Como usar
                </p>
                <p className="text-base leading-relaxed">
                  Ative o áudio no painel lateral, então navegue pelas seções.
                  Botões com{" "}
                  <span className="mono bg-stone-900 text-stone-50 px-1.5 py-0.5 text-xs">
                    ▸
                  </span>{" "}
                  tocam sons. Cada seção termina com uma aplicação prática pra
                  você testar no seu MIDI.
                </p>
              </div>
              <p className="text-lg leading-relaxed">
                Os três pilares que vamos atravessar: <em>melodia</em> (notas no
                tempo), <em>harmonia</em> (notas juntas) e <em>ritmo</em> (o
                espaçamento delas). Tudo o mais — escalas, modos, cadências,
                tensões — são ferramentas pra manipular esses três.
              </p>
            </section>
          )}

          {/* 02 SOM & NOTAS */}
          {activeSection === "som" && (
            <section>
              <p className="mono text-xs uppercase tracking-widest text-stone-500 mb-2">
                § 02
              </p>
              <h2 className="display text-5xl font-black leading-none mb-8 tracking-tight">
                Som & Notas
              </h2>

              <p className="text-lg leading-relaxed mb-6">
                Som é vibração. A velocidade da vibração — a <em>frequência</em>
                , medida em Hz — determina a altura percebida. 440 Hz é a nota
                Lá (A4), a referência de afinação padrão mundial. Dobre pra 880
                Hz e você tem o mesmo Lá uma oitava acima; metade (220 Hz), uma
                oitava abaixo.
              </p>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                As doze notas
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                A música ocidental divide a oitava em 12 partes iguais chamadas{" "}
                <em>semitons</em>. Esses 12 sons se repetem infinitamente. Sete
                deles têm nomes "naturais" (as teclas brancas do piano), os
                outros cinco são os sustenidos/bemóis (teclas pretas):
              </p>

              <div className="mono text-sm mb-6 p-4 bg-stone-900 text-stone-50 overflow-x-auto">
                <div className="flex gap-1 whitespace-nowrap">
                  {[
                    "C",
                    "C#",
                    "D",
                    "D#",
                    "E",
                    "F",
                    "F#",
                    "G",
                    "G#",
                    "A",
                    "A#",
                    "B",
                  ].map((n, i) => (
                    <span key={i} className="px-2 py-1 border border-stone-600">
                      {n}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-stone-400 mt-3">
                  Dó · Dó♯ · Ré · Ré♯ · Mi · Fá · Fá♯ · Sol · Sol♯ · Lá · Lá♯ ·
                  Si
                </p>
              </div>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                Um teclado pra brincar
              </h3>
              <p className="text-base leading-relaxed mb-4">
                Clica nas teclas. Notinha entre Dó (C4) e Dó (C5):
              </p>

              <div className="relative flex h-40 mb-8 border-2 border-stone-900 select-none">
                {[
                  { note: "C4", label: "C" },
                  { note: "D4", label: "D" },
                  { note: "E4", label: "E" },
                  { note: "F4", label: "F" },
                  { note: "G4", label: "G" },
                  { note: "A4", label: "A" },
                  { note: "B4", label: "B" },
                  { note: "C5", label: "C" },
                ].map((k, i) => (
                  <button
                    key={i}
                    onMouseDown={() => playNote(k.note, "4n")}
                    className="piano-key white flex-1 flex items-end justify-center pb-3 mono text-xs text-stone-600 font-semibold"
                  >
                    {k.label}
                  </button>
                ))}
                {/* black keys */}
                <div className="absolute inset-0 flex pointer-events-none">
                  {[
                    { note: "C#4", pos: 0.72 },
                    { note: "D#4", pos: 1.72 },
                    { note: "F#4", pos: 3.72 },
                    { note: "G#4", pos: 4.72 },
                    { note: "A#4", pos: 5.72 },
                  ].map((k, i) => (
                    <button
                      key={i}
                      onMouseDown={() => playNote(k.note, "4n")}
                      className="piano-key black absolute top-0 w-[8%] h-[60%] pointer-events-auto"
                      style={{ left: `${k.pos * 12.5}%` }}
                    />
                  ))}
                </div>
              </div>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                Enarmonia
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                A mesma nota pode ter dois nomes.{" "}
                <span className="mono bg-stone-200 px-1.5">F♯</span> e{" "}
                <span className="mono bg-stone-200 px-1.5">G♭</span> são a mesma
                tecla. A escolha do nome depende do contexto harmônico — regra
                prática: em tonalidades com sustenidos, use sustenidos; com
                bemóis, use bemóis.
              </p>

              <div className="border-t border-stone-300 pt-6 mt-10">
                <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                  Aplicação prática
                </p>
                <p className="text-base leading-relaxed">
                  Na sua DAW, cada tecla do MIDI corresponde a um número
                  (0–127). O Dó central é 60 (C4 em algumas DAWs, C3 em outras —
                  cuidado com essa convenção divergente). Sua controladora MIDI
                  envia esses números; a DAW traduz em nota.
                </p>
              </div>
            </section>
          )}

          {/* 03 INTERVALOS */}
          {activeSection === "intervalos" && (
            <section>
              <p className="mono text-xs uppercase tracking-widest text-stone-500 mb-2">
                § 03
              </p>
              <h2 className="display text-5xl font-black leading-none mb-8 tracking-tight">
                Intervalos
              </h2>

              <p className="text-lg leading-relaxed mb-6">
                Intervalo é a distância entre duas notas, medida em semitons. É
                o átomo da música. Toda escala, todo acorde, toda melodia é uma
                sequência de intervalos. Se você só aprender <em>uma</em> coisa
                de teoria, aprenda intervalos — o resto desdobra daqui.
              </p>

              <h3 className="display text-2xl font-bold mb-3 mt-8">
                Os doze intervalos dentro de uma oitava
              </h3>
              <p className="text-base leading-relaxed mb-4">
                Clica pra ouvir cada um partindo do Dó (C4). A segunda nota está
                sempre acima:
              </p>

              <div className="space-y-2 mb-8">
                {[
                  {
                    semis: 0,
                    name: "Uníssono",
                    target: "C4",
                    char: "idêntico",
                  },
                  {
                    semis: 1,
                    name: "2ª menor",
                    target: "C#4",
                    char: "tenso, dissonante (Tubarão)",
                  },
                  {
                    semis: 2,
                    name: "2ª maior",
                    target: "D4",
                    char: "passos melódicos",
                  },
                  {
                    semis: 3,
                    name: "3ª menor",
                    target: "D#4",
                    char: "triste, menor",
                  },
                  {
                    semis: 4,
                    name: "3ª maior",
                    target: "E4",
                    char: "alegre, maior",
                  },
                  {
                    semis: 5,
                    name: "4ª justa",
                    target: "F4",
                    char: "aberto, heroico (Bodas de Fígaro)",
                  },
                  {
                    semis: 6,
                    name: "Trítono",
                    target: "F#4",
                    char: 'instável, "diabolus in musica"',
                  },
                  {
                    semis: 7,
                    name: "5ª justa",
                    target: "G4",
                    char: "consonante, estável (Star Wars)",
                  },
                  {
                    semis: 8,
                    name: "6ª menor",
                    target: "G#4",
                    char: "melancólico",
                  },
                  {
                    semis: 9,
                    name: "6ª maior",
                    target: "A4",
                    char: "doce, nostálgico (NBC chime)",
                  },
                  {
                    semis: 10,
                    name: "7ª menor",
                    target: "A#4",
                    char: "bluesy, tensão suave",
                  },
                  {
                    semis: 11,
                    name: "7ª maior",
                    target: "B4",
                    char: "brilhante, jazz",
                  },
                  {
                    semis: 12,
                    name: "8ª justa",
                    target: "C5",
                    char: "mesma nota, oitava acima",
                  },
                ].map((iv, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 border-b border-stone-200 pb-2"
                  >
                    <span className="mono text-[10px] text-stone-400 w-6">
                      {String(iv.semis).padStart(2, "0")}
                    </span>
                    <button
                      onClick={() => playSequence(["C4", iv.target], 0.4)}
                      className="note-btn mono text-xs border border-stone-900 px-2 py-1"
                    >
                      ▸
                    </button>
                    <span className="serif font-semibold w-24">{iv.name}</span>
                    <span className="text-sm text-stone-600 italic">
                      {iv.char}
                    </span>
                  </div>
                ))}
              </div>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                Consonância vs. dissonância
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                Consonâncias <em>resolvem</em>; dissonâncias{" "}
                <em>pedem pra resolver</em>. Terças e sextas soam doces;
                segundas e sétimas soam tensas. A 4ª justa é curiosa — soa
                estável sozinha, mas dissonante em certos contextos harmônicos.
                O trítono (6 semitons) foi literalmente proibido na música
                medieval por soar "demoníaco".
              </p>

              <div className="border-l-4 border-stone-900 pl-5 py-2 my-6 bg-stone-100">
                <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                  Truque de ouvido
                </p>
                <p className="text-base leading-relaxed">
                  Associa cada intervalo a uma música que você conhece. 4ª justa
                  ascendente = "Parabéns pra você" (pa-ra-<em>béns</em>). 5ª
                  justa = abertura de Star Wars. 6ª maior = primeira frase de
                  "My Way". Uma vez fixados, você reconhece intervalos de ouvido
                  em qualquer música.
                </p>
              </div>

              <div className="border-t border-stone-300 pt-6 mt-10">
                <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                  Aplicação prática
                </p>
                <p className="text-base leading-relaxed">
                  Quando você move uma nota no MIDI, está editando um intervalo.
                  Transpor uma melodia inteira +5 semitons (4ª justa) ou +7
                  semitons (5ª justa) costuma manter ela "cantável".
                  Transposições por trítono (+6) causam estranhamento — útil
                  deliberadamente, ruim por acidente.
                </p>
              </div>
            </section>
          )}

          {/* 04 ESCALAS */}
          {activeSection === "escalas" && (
            <section>
              <p className="mono text-xs uppercase tracking-widest text-stone-500 mb-2">
                § 04
              </p>
              <h2 className="display text-5xl font-black leading-none mb-8 tracking-tight">
                Escalas
              </h2>

              <p className="text-lg leading-relaxed mb-6">
                Uma escala é um subconjunto ordenado dessas 12 notas. A maioria
                das escalas tem 7 notas (diatônicas), mas existem as de 5
                (pentatônicas), 6 (hexafônicas), 8 (octatônicas) e 12 (cromática
                — todas as notas).
              </p>

              <h3 className="display text-2xl font-bold mb-3 mt-8">
                A escala maior (Dó maior)
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                A fórmula em semitons:{" "}
                <span className="mono bg-stone-900 text-stone-50 px-2 py-0.5">
                  T–T–S–T–T–T–S
                </span>{" "}
                (T = tom = 2 semitons; S = semitom). Só teclas brancas partindo
                de Dó:
              </p>

              <div className="flex gap-2 items-center mb-3 flex-wrap">
                <button
                  onClick={() =>
                    playSequence(
                      ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
                      0.3,
                    )
                  }
                  className="mono text-xs border-2 border-stone-900 px-3 py-1.5 hover:bg-stone-900 hover:text-stone-50"
                >
                  ▸ tocar escala
                </button>
                <span className="mono text-sm">
                  C · D · E · F · G · A · B · C
                </span>
              </div>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                A escala menor natural (Lá menor)
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                Mesma fórmula deslocada:{" "}
                <span className="mono bg-stone-900 text-stone-50 px-2 py-0.5">
                  T–S–T–T–S–T–T
                </span>
                . Também só teclas brancas, mas começa em Lá. Note como a{" "}
                <em>mesma coleção de notas</em> muda de caráter dependendo de
                qual nota é o "centro":
              </p>

              <div className="flex gap-2 items-center mb-6 flex-wrap">
                <button
                  onClick={() =>
                    playSequence(
                      ["A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4"],
                      0.3,
                    )
                  }
                  className="mono text-xs border-2 border-stone-900 px-3 py-1.5 hover:bg-stone-900 hover:text-stone-50"
                >
                  ▸ tocar escala
                </button>
                <span className="mono text-sm">
                  A · B · C · D · E · F · G · A
                </span>
              </div>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                Outras escalas essenciais
              </h3>
              <div className="space-y-4 mb-8">
                {[
                  {
                    name: "Menor harmônica",
                    notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G#4", "A4"],
                    desc: "Menor natural com a 7ª aumentada. Som árabe/flamenco/clássico.",
                  },
                  {
                    name: "Menor melódica",
                    notes: ["A3", "B3", "C4", "D4", "E4", "F#4", "G#4", "A4"],
                    desc: "Jazz moderno. Ascendente com 6ª e 7ª maiores.",
                  },
                  {
                    name: "Pentatônica maior",
                    notes: ["C4", "D4", "E4", "G4", "A4", "C5"],
                    desc: "5 notas. Impossível errar, base de quase todo solo de rock/pop.",
                  },
                  {
                    name: "Pentatônica menor",
                    notes: ["A3", "C4", "D4", "E4", "G4", "A4"],
                    desc: "Blues, rock, bossa. A escala mais útil do planeta.",
                  },
                  {
                    name: "Blues",
                    notes: ["A3", "C4", "D4", "D#4", "E4", "G4", "A4"],
                    desc: 'Pentatônica menor + "blue note" (trítono).',
                  },
                  {
                    name: "Cromática",
                    notes: [
                      "C4",
                      "C#4",
                      "D4",
                      "D#4",
                      "E4",
                      "F4",
                      "F#4",
                      "G4",
                      "G#4",
                      "A4",
                      "A#4",
                      "B4",
                      "C5",
                    ],
                    desc: "Todas as 12. Tensão máxima quando usada melodicamente.",
                  },
                ].map((s, i) => (
                  <div key={i} className="border-b border-stone-200 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <button
                        onClick={() => playSequence(s.notes, 0.25)}
                        className="note-btn mono text-xs border border-stone-900 px-2 py-1"
                      >
                        ▸
                      </button>
                      <span className="display text-lg font-bold">
                        {s.name}
                      </span>
                    </div>
                    <p className="text-sm text-stone-600 italic ml-10">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-l-4 border-stone-900 pl-5 py-2 my-6 bg-stone-100">
                <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                  Descoberta essencial
                </p>
                <p className="text-base leading-relaxed">
                  Toda escala maior tem uma <em>menor relativa</em> — a mesma
                  coleção de notas, mas centrada na sexta nota. C maior e A
                  menor são relativas; compartilham todas as notas. É por isso
                  que tantas músicas pop alternam entre seções "alegres" e
                  "tristes" sem mudar a tonalidade de verdade.
                </p>
              </div>

              <div className="border-t border-stone-300 pt-6 mt-10">
                <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                  Aplicação prática
                </p>
                <p className="text-base leading-relaxed">
                  Em praticamente toda DAW você pode ativar <em>Scale Mode</em>{" "}
                  ou <em>Key</em>. Defina a tonalidade antes de compor e as
                  teclas que tocam fora da escala ficam bloqueadas ou são
                  automaticamente corrigidas. Dica: comece em C maior ou A menor
                  — tudo branco, sem acidentes, leitura visual clara no
                  piano-roll.
                </p>
              </div>
            </section>
          )}

          {/* 05 ACORDES */}
          {activeSection === "acordes" && (
            <section>
              <p className="mono text-xs uppercase tracking-widest text-stone-500 mb-2">
                § 05
              </p>
              <h2 className="display text-5xl font-black leading-none mb-8 tracking-tight">
                Acordes
              </h2>

              <p className="text-lg leading-relaxed mb-6">
                Acorde é um grupo de notas tocadas simultaneamente, geralmente
                três ou mais. Quase todos se formam empilhando terças a partir
                de uma nota-base (chamada <em>tônica</em> ou{" "}
                <em>fundamental</em>).
              </p>

              <h3 className="display text-2xl font-bold mb-3 mt-8">
                As quatro tríades fundamentais
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                Tríade = acorde de três notas. A partir de Dó:
              </p>

              <div className="space-y-3 mb-8">
                {[
                  {
                    name: "Maior",
                    symbol: "C",
                    notes: ["C4", "E4", "G4"],
                    formula: "1 – 3 – 5",
                    mood: "alegre, estável",
                  },
                  {
                    name: "Menor",
                    symbol: "Cm",
                    notes: ["C4", "Eb4", "G4"],
                    formula: "1 – ♭3 – 5",
                    mood: "triste, introspectivo",
                  },
                  {
                    name: "Diminuto",
                    symbol: "Cdim / C°",
                    notes: ["C4", "Eb4", "Gb4"],
                    formula: "1 – ♭3 – ♭5",
                    mood: "tenso, filme de terror",
                  },
                  {
                    name: "Aumentado",
                    symbol: "Caug / C+",
                    notes: ["C4", "E4", "G#4"],
                    formula: "1 – 3 – ♯5",
                    mood: "flutuante, onírico",
                  },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="border border-stone-300 p-4 flex items-center gap-4 bg-white"
                  >
                    <button
                      onClick={() => playChord(c.notes, "2n")}
                      className="note-btn mono text-sm border-2 border-stone-900 px-3 py-2 shrink-0"
                    >
                      ▸
                    </button>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="display text-xl font-bold">
                          {c.name}
                        </span>
                        <span className="mono text-sm bg-stone-900 text-stone-50 px-2 py-0.5">
                          {c.symbol}
                        </span>
                        <span className="mono text-xs text-stone-500">
                          {c.formula}
                        </span>
                      </div>
                      <p className="text-sm text-stone-600 italic mt-1">
                        {c.mood}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                Tétrades — acordes de sétima
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                Adicione uma 4ª nota (uma 7ª a partir da fundamental) e o acorde
                ganha personalidade. Essa é a diferença sonora entre uma música
                pop crua e uma música jazz ou bossa — a bossa-nova do Tom Jobim
                é praticamente construída sobre tétrades.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  {
                    name: "Maior com 7ª maior",
                    symbol: "Cmaj7",
                    notes: ["C4", "E4", "G4", "B4"],
                    mood: "sofisticado, bossa",
                  },
                  {
                    name: "Dominante com 7ª",
                    symbol: "C7",
                    notes: ["C4", "E4", "G4", "Bb4"],
                    mood: 'bluesy, "quer resolver"',
                  },
                  {
                    name: "Menor com 7ª",
                    symbol: "Cm7",
                    notes: ["C4", "Eb4", "G4", "Bb4"],
                    mood: "jazz, melancólico suave",
                  },
                  {
                    name: "Meio-diminuto",
                    symbol: "Cm7♭5",
                    notes: ["C4", "Eb4", "Gb4", "Bb4"],
                    mood: "acorde II de menor, tensão refinada",
                  },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="border border-stone-300 p-4 flex items-center gap-4 bg-white"
                  >
                    <button
                      onClick={() => playChord(c.notes, "2n")}
                      className="note-btn mono text-sm border-2 border-stone-900 px-3 py-2 shrink-0"
                    >
                      ▸
                    </button>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="display text-lg font-bold">
                          {c.name}
                        </span>
                        <span className="mono text-sm bg-stone-900 text-stone-50 px-2 py-0.5">
                          {c.symbol}
                        </span>
                      </div>
                      <p className="text-sm text-stone-600 italic mt-1">
                        {c.mood}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                Inversões
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                O mesmo acorde pode ter notas reorganizadas. Tocar C-E-G, E-G-C
                ou G-C-E — todos soam como Dó maior, mas cada um tem sabor
                diferente por causa do baixo. Inversões são <em>essenciais</em>{" "}
                pra condução de vozes suave (veremos isso no capítulo de
                progressões).
              </p>

              <div className="grid grid-cols-3 gap-3 mb-8">
                <button
                  onClick={() => playChord(["C4", "E4", "G4"], "2n")}
                  className="note-btn border-2 border-stone-900 p-3 text-center"
                >
                  <p className="display font-bold">Fundamental</p>
                  <p className="mono text-xs">C – E – G</p>
                </button>
                <button
                  onClick={() => playChord(["E4", "G4", "C5"], "2n")}
                  className="note-btn border-2 border-stone-900 p-3 text-center"
                >
                  <p className="display font-bold">1ª inversão</p>
                  <p className="mono text-xs">E – G – C</p>
                </button>
                <button
                  onClick={() => playChord(["G3", "C4", "E4"], "2n")}
                  className="note-btn border-2 border-stone-900 p-3 text-center"
                >
                  <p className="display font-bold">2ª inversão</p>
                  <p className="mono text-xs">G – C – E</p>
                </button>
              </div>

              <div className="border-t border-stone-300 pt-6 mt-10">
                <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                  Aplicação prática
                </p>
                <p className="text-base leading-relaxed">
                  No MIDI, pinte a fundamental em uma cor e as outras notas em
                  outra — ajuda a enxergar estrutura. Ferramentas como{" "}
                  <span className="mono">Scaler</span>,{" "}
                  <span className="mono">Chord Track</span> (Logic) ou{" "}
                  <span className="mono">Ableton Chord MIDI effect</span>{" "}
                  permitem gerar acordes automaticamente a partir de uma única
                  nota. Útil pra prototipar rápido; prejudicial se você não
                  entender o que está acontecendo.
                </p>
              </div>
            </section>
          )}

          {/* 06 PROGRESSÕES */}
          {activeSection === "progressoes" && (
            <section>
              <p className="mono text-xs uppercase tracking-widest text-stone-500 mb-2">
                § 06
              </p>
              <h2 className="display text-5xl font-black leading-none mb-8 tracking-tight">
                Progressões
              </h2>

              <p className="text-lg leading-relaxed mb-6">
                Progressão é uma sequência de acordes. Esse é o capítulo que
                transforma teoria em compositor. Toda música que você conhece é
                feita de algumas progressões se repetindo.
              </p>

              <h3 className="display text-2xl font-bold mb-3 mt-8">
                Graus harmônicos
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                Numere os sete acordes que nascem dentro de uma escala maior com
                algarismos romanos. Em Dó maior:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="mono text-sm w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-stone-900">
                      <th className="text-left p-2">Grau</th>
                      <th className="text-left p-2">Acorde</th>
                      <th className="text-left p-2">Tipo</th>
                      <th className="text-left p-2">Função</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["I", "C", "Maior", "tônica (casa)"],
                      ["ii", "Dm", "Menor", "subdominante"],
                      ["iii", "Em", "Menor", "tônica suave"],
                      ["IV", "F", "Maior", "subdominante"],
                      ["V", "G", "Maior", "dominante (tensão)"],
                      ["vi", "Am", "Menor", "tônica relativa"],
                      ["vii°", "Bdim", "Diminuto", "dominante tensa"],
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-stone-200">
                        {row.map((cell, j) => (
                          <td key={j} className="p-2">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-base leading-relaxed mb-6 italic text-stone-600">
                Maiúscula = acorde maior; minúscula = menor; ° = diminuto. Essa
                convenção vale em qualquer tonalidade.
              </p>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                As progressões que movimentam o mundo
              </h3>
              <p className="text-base leading-relaxed mb-4">Clica pra ouvir:</p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    name: "I – V – vi – IV",
                    label: "A progressão pop universal",
                    chords: [
                      ["C4", "E4", "G4"],
                      ["G3", "B3", "D4"],
                      ["A3", "C4", "E4"],
                      ["F3", "A3", "C4"],
                    ],
                    desc: '"Let It Be", "Don\'t Stop Believin\'", "Someone Like You". Quase toda música pop dos últimos 30 anos.',
                  },
                  {
                    name: "ii – V – I",
                    label: "A cadência jazzística",
                    chords: [
                      ["D4", "F4", "A4", "C5"],
                      ["G3", "B3", "D4", "F4"],
                      ["C4", "E4", "G4", "B4"],
                    ],
                    desc: "O DNA do jazz e da bossa. Tensão construída e resolvida com elegância.",
                  },
                  {
                    name: "I – vi – IV – V",
                    label: '"Doo-wop" dos anos 50',
                    chords: [
                      ["C4", "E4", "G4"],
                      ["A3", "C4", "E4"],
                      ["F3", "A3", "C4"],
                      ["G3", "B3", "D4"],
                    ],
                    desc: '"Stand By Me", quase todo baladão dos anos 50/60.',
                  },
                  {
                    name: "vi – IV – I – V",
                    label: 'O "sad pop" moderno',
                    chords: [
                      ["A3", "C4", "E4"],
                      ["F3", "A3", "C4"],
                      ["C4", "E4", "G4"],
                      ["G3", "B3", "D4"],
                    ],
                    desc: 'Mesma progressão da pop universal, começando de outro lugar. "Numb", "Save Tonight".',
                  },
                  {
                    name: "i – VII – VI – VII",
                    label: 'Menor "andaluz"',
                    chords: [
                      ["A3", "C4", "E4"],
                      ["G3", "B3", "D4"],
                      ["F3", "A3", "C4"],
                      ["G3", "B3", "D4"],
                    ],
                    desc: '"Stairway to Heaven", rock progressivo, épico cinematográfico.',
                  },
                ].map((p, i) => (
                  <div key={i} className="border border-stone-300 p-4 bg-white">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => playProgression(p.chords, 1.0)}
                        className="note-btn mono text-xs border-2 border-stone-900 px-3 py-2 shrink-0"
                      >
                        ▸
                      </button>
                      <div>
                        <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                          <span className="mono text-sm bg-stone-900 text-stone-50 px-2 py-0.5">
                            {p.name}
                          </span>
                          <span className="display font-bold">{p.label}</span>
                        </div>
                        <p className="text-sm text-stone-600 italic">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                Cadências
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                Cadência é como uma frase harmônica termina. Três tipos
                principais:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-3">
                  <span className="mono text-xs bg-stone-900 text-stone-50 px-2 py-1 shrink-0 h-fit">
                    V → I
                  </span>
                  <span className="text-base leading-relaxed">
                    <em>Autêntica perfeita.</em> Resolução definitiva, "ponto
                    final". A cadência mais forte da música tonal.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mono text-xs bg-stone-900 text-stone-50 px-2 py-1 shrink-0 h-fit">
                    IV → I
                  </span>
                  <span className="text-base leading-relaxed">
                    <em>Plagal.</em> Mais suave, "amém" — literalmente o fim de
                    hinos religiosos.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mono text-xs bg-stone-900 text-stone-50 px-2 py-1 shrink-0 h-fit">
                    V → vi
                  </span>
                  <span className="text-base leading-relaxed">
                    <em>Decetiva.</em> O ouvido espera I, recebe vi. Usada pra
                    adiar a resolução final.
                  </span>
                </li>
              </ul>

              <div className="border-t border-stone-300 pt-6 mt-10">
                <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                  Aplicação prática
                </p>
                <p className="text-base leading-relaxed">
                  Pegue uma progressão pronta (I–V–vi–IV), transponha pra três
                  tonalidades diferentes, grave o MIDI. Cada versão vai ter
                  sensação ligeiramente diferente por causa do registro das
                  notas. Essa é a base pra escolher a tonalidade certa pra uma
                  vocal ou pra um sample.
                </p>
              </div>
            </section>
          )}

          {/* 07 RITMO */}
          {activeSection === "ritmo" && (
            <section>
              <p className="mono text-xs uppercase tracking-widest text-stone-500 mb-2">
                § 07
              </p>
              <h2 className="display text-5xl font-black leading-none mb-8 tracking-tight">
                Ritmo & Compasso
              </h2>

              <p className="text-lg leading-relaxed mb-6">
                Altura (pitch) e tempo são dimensões independentes. Uma melodia
                linda fica esquecível em ritmo errado, e um ritmo bom sustenta
                melodia medíocre. Ritmo é provavelmente mais importante que
                harmonia pra maior parte da música popular.
              </p>

              <h3 className="display text-2xl font-bold mb-3 mt-8">
                Pulso, BPM e figuras
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                <em>Pulso</em> é a batida regular subjacente. <em>BPM</em>{" "}
                (batidas por minuto) mede sua velocidade. 60 BPM = um pulso por
                segundo; 120 BPM = dois por segundo (tempo pop padrão).
              </p>

              <p className="text-lg leading-relaxed mb-4">
                Dentro de um pulso, as figuras se subdividem em durações
                relativas:
              </p>

              <div className="mono text-sm mb-6 border-2 border-stone-900 overflow-hidden">
                <div className="grid grid-cols-6 text-center">
                  <div className="p-3 bg-stone-900 text-stone-50 col-span-6">
                    Semibreve — 1 nota por compasso
                  </div>
                  <div className="p-3 bg-stone-700 text-stone-50 col-span-3">
                    Mínima
                  </div>
                  <div className="p-3 bg-stone-700 text-stone-50 col-span-3">
                    Mínima
                  </div>
                  <div className="p-3 bg-stone-500 text-stone-50 col-span-3 border-r border-stone-50">
                    <div className="grid grid-cols-2 gap-px">
                      <div>Semínima</div>
                      <div>Semínima</div>
                    </div>
                  </div>
                  <div className="p-3 bg-stone-500 text-stone-50 col-span-3">
                    <div className="grid grid-cols-2 gap-px">
                      <div>Semínima</div>
                      <div>Semínima</div>
                    </div>
                  </div>
                  <div className="p-2 bg-stone-400 text-stone-50 col-span-6">
                    <div className="grid grid-cols-8 gap-px text-xs">
                      {Array(8)
                        .fill("Colcheia")
                        .map((s, i) => (
                          <div key={i}>{s}</div>
                        ))}
                    </div>
                  </div>
                  <div className="p-2 bg-stone-300 text-stone-700 col-span-6">
                    <div className="grid grid-cols-16 gap-px text-[10px]">
                      {Array(16)
                        .fill("♪")
                        .map((s, i) => (
                          <div key={i}>{s}</div>
                        ))}
                    </div>
                    <div className="text-center mt-1">16 semicolcheias</div>
                  </div>
                </div>
              </div>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                Compasso e fórmula
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                A <em>fórmula de compasso</em> (tempo signature) diz quantos
                pulsos cabem em cada compasso e qual figura representa o pulso:
              </p>
              <ul className="space-y-2 mb-6 text-base leading-relaxed">
                <li>
                  <span className="mono bg-stone-200 px-2 py-0.5">4/4</span> — 4
                  semínimas por compasso. 95% da música pop/rock/eletrônica.
                </li>
                <li>
                  <span className="mono bg-stone-200 px-2 py-0.5">3/4</span> —
                  valsa, baladão country.
                </li>
                <li>
                  <span className="mono bg-stone-200 px-2 py-0.5">6/8</span> —
                  subdivisão ternária, balada blues, muita música brasileira.
                </li>
                <li>
                  <span className="mono bg-stone-200 px-2 py-0.5">
                    5/4, 7/8
                  </span>{" "}
                  — compassos ímpares. Jazz experimental, rock progressivo,
                  música dos Bálcãs.
                </li>
              </ul>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                Síncope e groove
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                <em>Síncope</em> é acentuar um tempo fraco ou entre os pulsos. É
                o que separa "marchinha" de "samba". O groove brasileiro —
                samba, bossa, funk carioca — vive de síncope. Na DAW, você
                síncopa deslocando notas para fora da grade, ou escrevendo em
                subdivisões de 16 com acentos deslocados.
              </p>

              <div className="border-l-4 border-stone-900 pl-5 py-2 my-6 bg-stone-100">
                <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                  Groove humanizado
                </p>
                <p className="text-base leading-relaxed">
                  Quantização 100% rígida soa robótica. Use "swing" (desloca as
                  semicolcheias pares) entre 54% e 62% pra sensação
                  jazz/hip-hop. Ou adicione "humanize" com ±5ms de variação de
                  timing. Isso é a diferença entre MIDI parecer trilha pronta ou
                  demo barata.
                </p>
              </div>

              <div className="border-t border-stone-300 pt-6 mt-10">
                <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                  Aplicação prática
                </p>
                <p className="text-base leading-relaxed">
                  Pegue um padrão de bateria simples (kick na 1 e 3, snare na 2
                  e 4) e desloque 1 kick em uma semicolcheia. Ouça como o groove
                  inteiro muda. Essa é a base da produção rítmica: pequenas
                  decisões com efeito enorme.
                </p>
              </div>
            </section>
          )}

          {/* 08 MODOS */}
          {activeSection === "modos" && (
            <section>
              <p className="mono text-xs uppercase tracking-widest text-stone-500 mb-2">
                § 08
              </p>
              <h2 className="display text-5xl font-black leading-none mb-8 tracking-tight">
                Modos Gregos
              </h2>

              <p className="text-lg leading-relaxed mb-6">
                Lembra que a escala menor natural é a escala maior começando da
                6ª nota? Esse truque se generaliza. Se você tocar as notas de Dó
                maior começando em cada uma das 7 notas, terá 7 "modos" — cada
                um com sabor melódico distinto.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  {
                    name: "Jônio (I)",
                    notes: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
                    desc: "O modo maior. Alegre, resolvido.",
                    vibe: "Pop feliz",
                  },
                  {
                    name: "Dórico (II)",
                    notes: ["D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5"],
                    desc: "Menor com 6ª maior. Groove, soul, jazz modal.",
                    vibe: '"So What", Miles Davis',
                  },
                  {
                    name: "Frígio (III)",
                    notes: ["E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"],
                    desc: "Menor com 2ª menor. Espanhol, flamenco, metal.",
                    vibe: "Phrygian metal",
                  },
                  {
                    name: "Lídio (IV)",
                    notes: ["F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5"],
                    desc: 'Maior com 4ª aumentada. Flutuante, "cinematográfico".',
                    vibe: "Trilhas de Spielberg",
                  },
                  {
                    name: "Mixolídio (V)",
                    notes: ["G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5"],
                    desc: "Maior com 7ª menor. Blues, rock, celta.",
                    vibe: '"Sweet Child O\' Mine"',
                  },
                  {
                    name: "Eólio (VI)",
                    notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4"],
                    desc: "O modo menor natural.",
                    vibe: "Balada triste",
                  },
                  {
                    name: "Lócrio (VII)",
                    notes: ["B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4"],
                    desc: "Diminuto. Instável, raramente usado como tônica.",
                    vibe: "Jazz experimental",
                  },
                ].map((m, i) => (
                  <div key={i} className="border border-stone-300 p-4 bg-white">
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
                            {m.name}
                          </span>
                          <span className="mono text-xs text-stone-500">
                            {m.vibe}
                          </span>
                        </div>
                        <p className="text-sm text-stone-700">{m.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-l-4 border-stone-900 pl-5 py-2 my-6 bg-stone-100">
                <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                  Uso prático
                </p>
                <p className="text-base leading-relaxed">
                  Modos são poderosos pra compor sem ficar preso ao sabor "pop
                  maior/menor". Tente compor uma progressão que enfatize o IV
                  grau maior permanentemente — você está fazendo música lídia.
                  Ou um vamp em Dm com F maior recorrente — dórico. É atalho pra
                  soar diferente sem precisar de harmonia complexa.
                </p>
              </div>
            </section>
          )}

          {/* 09 HARMONIA AVANÇADA */}
          {activeSection === "harmonia" && (
            <section>
              <p className="mono text-xs uppercase tracking-widest text-stone-500 mb-2">
                § 09
              </p>
              <h2 className="display text-5xl font-black leading-none mb-8 tracking-tight">
                Harmonia Avançada
              </h2>

              <p className="text-lg leading-relaxed mb-6">
                Aqui entra o repertório que separa produção competente de
                produção expressiva. Não precisa memorizar tudo — só saber que
                existe pra que, quando ouvir, você reconheça.
              </p>

              <h3 className="display text-2xl font-bold mb-3 mt-8">
                Extensões: 9, 11, 13
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                Empilhando terças além da 7ª, você chega em 9ª, 11ª e 13ª. Essas
                notas adicionais são as <em>tensões</em> que dão sofisticação ao
                jazz e à bossa.
              </p>
              <div className="space-y-2 mb-6">
                {[
                  {
                    label: "C9 (dominante com 9)",
                    notes: ["C4", "E4", "G4", "Bb4", "D5"],
                  },
                  { label: "Cmaj9", notes: ["C4", "E4", "G4", "B4", "D5"] },
                  { label: "Cm9", notes: ["C4", "Eb4", "G4", "Bb4", "D5"] },
                  {
                    label: "C13",
                    notes: ["C4", "E4", "G4", "Bb4", "D5", "A5"],
                  },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 border-b border-stone-200 pb-2"
                  >
                    <button
                      onClick={() => playChord(c.notes, "2n")}
                      className="note-btn mono text-xs border border-stone-900 px-2 py-1"
                    >
                      ▸
                    </button>
                    <span className="mono text-sm">{c.label}</span>
                  </div>
                ))}
              </div>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                Empréstimo modal
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                "Roubar" um acorde de uma tonalidade paralela. Em C maior, o iv
                menor (Fm) não pertence à tonalidade — ele vem de C menor. Mas
                soa lindo. Ouve a diferença:
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      playProgression(
                        [
                          ["C4", "E4", "G4"],
                          ["F3", "A3", "C4"],
                          ["C4", "E4", "G4"],
                        ],
                        1.0,
                      )
                    }
                    className="note-btn mono text-xs border border-stone-900 px-2 py-1"
                  >
                    ▸
                  </button>
                  <span className="mono text-sm">I – IV – I (diatônico)</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      playProgression(
                        [
                          ["C4", "E4", "G4"],
                          ["F3", "Ab3", "C4"],
                          ["C4", "E4", "G4"],
                        ],
                        1.0,
                      )
                    }
                    className="note-btn mono text-xs border border-stone-900 px-2 py-1"
                  >
                    ▸
                  </button>
                  <span className="mono text-sm">I – iv – I (emprestado)</span>
                </div>
              </div>
              <p className="text-base leading-relaxed italic text-stone-600 mb-6">
                Radiohead, Beatles tardios, Coldplay — todos abusam desse
                truque.
              </p>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                Dominantes secundárias
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                O V de um acorde que não é o I. Tratar cada acorde como "tônica
                temporária" e preparar sua chegada com a dominante. Em C maior,
                D7 é o V de G — soa "estranho mas certo":
              </p>
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() =>
                    playProgression(
                      [
                        ["C4", "E4", "G4"],
                        ["D4", "F#4", "A4", "C5"],
                        ["G3", "B3", "D4"],
                        ["C4", "E4", "G4"],
                      ],
                      1.0,
                    )
                  }
                  className="note-btn mono text-xs border border-stone-900 px-2 py-1"
                >
                  ▸
                </button>
                <span className="mono text-sm">
                  C – D7 – G – C (I – V/V – V – I)
                </span>
              </div>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                Modulação
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                Mudar de tonalidade no meio da música. Formas comuns: subir meio
                tom no refrão final (cliché do pop 80/90), pivotar em um acorde
                comum a duas tonalidades, ou usar uma dominante secundária pra
                cruzar.
              </p>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                Tritono substituto
              </h3>
              <p className="text-lg leading-relaxed">
                Trocar um V7 pelo acorde cuja fundamental está a um trítono de
                distância. Em vez de G7 → C, use Db7 → C. Mesma resolução, som
                totalmente diferente — sabor clássico de jazz.
              </p>
            </section>
          )}

          {/* 10 MIDI */}
          {activeSection === "midi" && (
            <section>
              <p className="mono text-xs uppercase tracking-widest text-stone-500 mb-2">
                § 10
              </p>
              <h2 className="display text-5xl font-black leading-none mb-8 tracking-tight">
                Aplicação em MIDI
              </h2>

              <p className="text-lg leading-relaxed mb-6">
                Tudo que discutimos até aqui é abstrato. Aqui é onde conecta com
                sua controladora, sua DAW e o piano-roll.
              </p>

              <h3 className="display text-2xl font-bold mb-3 mt-8">
                O que é MIDI
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                MIDI não é som — é instrução. Uma nota MIDI transmite: qual
                tecla (número 0–127), com que força (velocity 0–127), quando
                começou, quando acabou. Seu sintetizador recebe isso e gera o
                áudio. Isso significa que você pode editar o MIDI infinitamente
                sem perda de qualidade, trocar de instrumento pós-gravação,
                quantizar timing, transpor, tudo sem re-executar.
              </p>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                Workflow compositivo
              </h3>
              <ol className="space-y-3 mb-6 text-base leading-relaxed list-decimal pl-5">
                <li>
                  <strong>
                    Escolha uma tonalidade e ative Scale Mode na DAW.
                  </strong>{" "}
                  Começa sempre simples — C maior ou A menor até estar
                  confortável.
                </li>
                <li>
                  <strong>Grave 4 acordes primeiro (progressão).</strong> Não
                  precisa ter melodia ainda. A progressão vai sugerir a melodia
                  depois.
                </li>
                <li>
                  <strong>Defina o ritmo dos acordes.</strong> Todos eles na
                  batida 1? Sincopados? Arpejados? A sensação da música nasce
                  aqui.
                </li>
                <li>
                  <strong>
                    Construa a melodia usando as notas dos acordes.
                  </strong>{" "}
                  70% das notas da melodia devem ser notas do acorde atual — o
                  resto são notas de passagem/aproximação.
                </li>
                <li>
                  <strong>Adicione baixo.</strong> Normalmente na fundamental do
                  acorde, oitava abaixo. Depois varie (tocar a 5ª ou a 3ª no
                  baixo = inversão).
                </li>
                <li>
                  <strong>Depois:</strong> humanização, velocity variada (não
                  tudo em 100), swing.
                </li>
              </ol>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                Leitura do piano-roll
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                Olhe um piano-roll e identifique visualmente:
              </p>
              <ul className="space-y-2 mb-6 text-base leading-relaxed">
                <li>
                  • <strong>Saltos grandes</strong> na melodia soam dramáticos.
                  Muitos deles = cansativo.
                </li>
                <li>
                  • <strong>Movimento por grau conjunto</strong> (notas
                  vizinhas) soa natural e cantável.
                </li>
                <li>
                  • <strong>Acordes com notas espaçadas</strong> (voicing
                  aberto) soam maiores; notas coladas soam densas.
                </li>
                <li>
                  • <strong>Nota mais aguda do acorde</strong> é a que o ouvido
                  percebe como melodia. Planeje essa linha com cuidado.
                </li>
              </ul>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                Truques de produção
              </h3>
              <ul className="space-y-3 mb-8 text-base leading-relaxed">
                <li>
                  • <strong>Dobrar uma melodia em oitava acima</strong> engrossa
                  instantaneamente.
                </li>
                <li>
                  •{" "}
                  <strong>
                    Passar uma linha de baixo no intervalo de 5ª justa
                  </strong>{" "}
                  soa épico (power chord).
                </li>
                <li>
                  • <strong>Remover a 3ª do acorde</strong> (deixar só
                  fundamental e 5ª) torna o acorde "neutro" — nem maior nem
                  menor. Útil em contextos ambíguos.
                </li>
                <li>
                  • <strong>Arpejador MIDI</strong> transforma acordes estáticos
                  em linhas rítmicas automaticamente. Base de quase toda música
                  eletrônica/house.
                </li>
                <li>
                  • <strong>Velocity alta em notas fortes do compasso</strong>{" "}
                  (1 e 3 em 4/4) e baixa nas fracas simula expressividade
                  natural.
                </li>
              </ul>

              <div className="border-l-4 border-stone-900 pl-5 py-2 my-6 bg-stone-100">
                <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                  Exercício semanal
                </p>
                <p className="text-base leading-relaxed">
                  Pegue uma música que você gosta. Descubra a tonalidade
                  (aplicativos como Moises, Mixed In Key ou simplesmente tocando
                  no piano até achar). Transcreva a progressão de acordes no seu
                  MIDI. Depois toque por cima com uma melodia própria. Em 3
                  meses fazendo isso você desenvolve ouvido harmônico de verdade
                  — mais do que 1 ano lendo teoria.
                </p>
              </div>
            </section>
          )}

          {/* 11 PRÓXIMOS PASSOS */}
          {activeSection === "proximos" && (
            <section>
              <p className="mono text-xs uppercase tracking-widest text-stone-500 mb-2">
                § 11
              </p>
              <h2 className="display text-5xl font-black leading-none mb-8 tracking-tight">
                Próximos Passos
              </h2>

              <p className="text-lg leading-relaxed mb-6">
                Você cobriu o esqueleto da música ocidental. O que falta não é
                mais teoria pura — é <em>prática aplicada</em>. Uma roadmap
                enxuta:
              </p>

              <div className="space-y-5 mb-8">
                <div>
                  <h3 className="display text-xl font-bold mb-2">
                    Mês 1 · Fluência básica
                  </h3>
                  <p className="text-base leading-relaxed">
                    Aprenda todas as 12 escalas maiores no MIDI — decore
                    visualmente no piano-roll. Toque cada uma ascendente e
                    descendente. Mesmo exercício pra menor natural.
                  </p>
                </div>

                <div>
                  <h3 className="display text-xl font-bold mb-2">
                    Mês 2 · Harmonia funcional
                  </h3>
                  <p className="text-base leading-relaxed">
                    Componha 10 progressões de 4 acordes em tonalidades
                    diferentes. Uma por dia, 10 minutos. Foque em sentir o
                    contraste entre I, IV, V, vi.
                  </p>
                </div>

                <div>
                  <h3 className="display text-xl font-bold mb-2">
                    Mês 3 · Transcrição
                  </h3>
                  <p className="text-base leading-relaxed">
                    Transcreva 5 músicas que você adora. Só os acordes e a
                    melodia principal. Isso treina o ouvido harmônico mais do
                    que qualquer livro.
                  </p>
                </div>

                <div>
                  <h3 className="display text-xl font-bold mb-2">
                    Mês 4+ · Vocabulário
                  </h3>
                  <p className="text-base leading-relaxed">
                    Modos, extensões, substituições. Aí sim vale estudar
                    jazz/bossa, porque os conceitos vão te dar ferramentas pra
                    desviar do "pop padrão".
                  </p>
                </div>
              </div>

              <h3 className="display text-2xl font-bold mb-3 mt-10">
                Recursos recomendados
              </h3>
              <ul className="space-y-3 mb-8 text-base leading-relaxed">
                <li>
                  • <strong>Hooktheory.com</strong> — banco de progressões de
                  músicas reais, ótimo pra ver padrões.
                </li>
                <li>
                  • <strong>Canal Adam Neely (YouTube)</strong> — teoria
                  avançada com análise prática.
                </li>
                <li>
                  •{" "}
                  <strong>
                    Livro "Música Popular Brasileira" (Almir Chediak)
                  </strong>{" "}
                  — songbooks com cifragem precisa.
                </li>
                <li>
                  • <strong>Ableton Learning Music</strong> — curso interativo
                  gratuito (learningmusic.ableton.com).
                </li>
                <li>
                  • <strong>EarMaster</strong> ou <strong>Teoria.com</strong> —
                  treinamento auditivo estruturado.
                </li>
              </ul>

              <div className="border-2 border-stone-900 p-6 bg-stone-900 text-stone-50 mt-10">
                <p className="mono text-[10px] uppercase tracking-widest text-stone-400 mb-3">
                  Fechamento
                </p>
                <p className="text-lg leading-relaxed serif italic">
                  Teoria musical é um mapa, não o território. Ela descreve
                  padrões que compositores descobriram por experimentação ao
                  longo de séculos. A ferramenta mais importante continua sendo
                  o ouvido — teoria ajuda você a entender <em>por que</em> algo
                  funcionou, depois que já funcionou. Componha muito, erre
                  bastante, ouça com atenção. O resto encaixa.
                </p>
              </div>
            </section>
          )}

          {/* Mobile Section Nav */}
          <div className="lg:hidden mt-12 border-t-2 border-stone-900 pt-6">
            <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-3">
              Navegação
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
                Ativar áudio →
              </button>
            )}
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="border-t-2 border-stone-900 mt-16 py-6 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-baseline">
          <span className="mono text-[10px] uppercase tracking-widest text-stone-500">
            Strutura · Teoria Musical Vol. I
          </span>
          <span className="mono text-[10px] uppercase tracking-widest text-stone-500">
            {sections.findIndex((s) => s.id === activeSection) + 1} /{" "}
            {sections.length}
          </span>
        </div>
      </footer>
    </div>
  );
}

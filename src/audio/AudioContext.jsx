import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import * as Tone from "tone";

const AudioCtx = createContext(null);

export function AudioProvider({ children }) {
  const [synthReady, setSynthReady] = useState(false);
  const [oscillator, setOscillator] = useState("triangle");
  const synthRef = useRef(null);
  const polySynthRef = useRef(null);
  const activeIdsRef = useRef(0);

  useEffect(() => {
    synthRef.current = new Tone.Synth({
      oscillator: { type: oscillator },
      envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.8 },
    }).toDestination();
    polySynthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: oscillator },
      envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 1.2 },
    }).toDestination();
    polySynthRef.current.volume.value = -8;
    synthRef.current.volume.value = -6;
    return () => {
      synthRef.current?.dispose();
      polySynthRef.current?.dispose();
    };
  }, [oscillator]);

  const initAudio = useCallback(async () => {
    if (!synthReady) {
      await Tone.start();
      setSynthReady(true);
    }
  }, [synthReady]);

  const stopAll = useCallback(() => {
    try {
      polySynthRef.current?.releaseAll();
    } catch {
      // Tone occasionally throws if a release is mid-flight; ignore.
    }
  }, []);

  const playNote = useCallback(
    async (note, duration = "8n") => {
      await initAudio();
      synthRef.current?.triggerAttackRelease(note, duration);
    },
    [initAudio],
  );

  const playSequence = useCallback(
    async (notes, interval = 0.35, duration = "8n") => {
      await initAudio();
      stopAll();
      const id = ++activeIdsRef.current;
      const now = Tone.now();
      notes.forEach((note, i) => {
        if (id !== activeIdsRef.current) return;
        synthRef.current?.triggerAttackRelease(note, duration, now + i * interval);
      });
    },
    [initAudio, stopAll],
  );

  const playChord = useCallback(
    async (notes, duration = "2n") => {
      await initAudio();
      polySynthRef.current?.triggerAttackRelease(notes, duration);
    },
    [initAudio],
  );

  const playProgression = useCallback(
    async (chords, interval = 0.9, duration = "2n") => {
      await initAudio();
      stopAll();
      const id = ++activeIdsRef.current;
      const now = Tone.now();
      chords.forEach((chord, i) => {
        if (id !== activeIdsRef.current) return;
        polySynthRef.current?.triggerAttackRelease(
          chord,
          duration,
          now + i * interval,
        );
      });
    },
    [initAudio, stopAll],
  );

  const playInterval = useCallback(
    async (root, target, mode = "asc") => {
      await initAudio();
      stopAll();
      if (mode === "harmonic") {
        polySynthRef.current?.triggerAttackRelease([root, target], "2n");
        return;
      }
      const seq = mode === "desc" ? [target, root] : [root, target];
      const now = Tone.now();
      seq.forEach((n, i) => {
        synthRef.current?.triggerAttackRelease(n, "4n", now + i * 0.45);
      });
    },
    [initAudio, stopAll],
  );

  const value = {
    synthReady,
    oscillator,
    setOscillator,
    initAudio,
    stopAll,
    playNote,
    playSequence,
    playChord,
    playProgression,
    playInterval,
  };

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used inside <AudioProvider>");
  return ctx;
}

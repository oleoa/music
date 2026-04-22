import MusicTheoryGuide from "./components/MusicTheoryGuide";
import { I18nProvider } from "./i18n/I18nContext.jsx";
import { AudioProvider } from "./audio/AudioContext.jsx";

export default function App() {
  return (
    <I18nProvider>
      <AudioProvider>
        <MusicTheoryGuide />
      </AudioProvider>
    </I18nProvider>
  );
}

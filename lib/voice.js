// Browser voice for Devi — text-to-speech (she speaks) and speech-to-text
// (you talk to her). Uses the Web Speech API: no dependencies, no keys.

const LANG_BCP = {
  en: "en-IN", hi: "hi-IN", bn: "bn-IN", ta: "ta-IN", te: "te-IN",
  mr: "mr-IN", gu: "gu-IN", kn: "kn-IN", ml: "ml-IN", pa: "pa-IN",
};

export function ttsSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
export function sttSupported() {
  return typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
}

// Strip markdown / emoji / URLs so the spoken version sounds natural.
function clean(text) {
  return String(text)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\/([a-z-]+)/gi, "$1")
    .replace(/[*_`#>]/g, "")
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{FE0F}\u{1F900}-\u{1F9FF}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Pick the BCP-47 tag — if Devanagari is present, prefer Hindi voice.
function bcpFor(text, lang) {
  if (/[ऀ-ॿ]/.test(text) && (!lang || lang === "en")) return "hi-IN";
  return LANG_BCP[lang] || "en-IN";
}

export function speak(text, lang = "en") {
  if (!ttsSupported()) return;
  const synth = window.speechSynthesis;
  const u = new SpeechSynthesisUtterance(clean(text));
  u.lang = bcpFor(text, lang);
  const voices = synth.getVoices() || [];
  const v = voices.find((x) => x.lang === u.lang) || voices.find((x) => x.lang?.startsWith(u.lang.split("-")[0]));
  if (v) u.voice = v;
  u.rate = 0.96;
  u.pitch = 1.05;
  synth.cancel();
  synth.speak(u);
}

export function stopSpeaking() {
  if (ttsSupported()) window.speechSynthesis.cancel();
}

export function createRecognizer(lang, onResult, onEnd) {
  const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  if (!SR) return null;
  const r = new SR();
  r.lang = LANG_BCP[lang] || "en-IN";
  r.interimResults = false;
  r.maxAlternatives = 1;
  r.onresult = (e) => onResult?.(e.results[0][0].transcript);
  r.onerror = () => onEnd?.();
  r.onend = () => onEnd?.();
  return r;
}

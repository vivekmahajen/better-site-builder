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

// Premium ElevenLabs female voice for English (via server proxy), with a
// graceful fallback to the browser's female voice.
let _eleven = null; // null=unknown, true=works, false=unavailable
let _audio = null;

function preferEleven(lang, text) {
  // English / Latin script only (per setup); avoid for Devanagari/other scripts.
  return lang !== "hi" && !/[ऀ-ॿ]/.test(text) && _eleven !== false;
}

async function speakEleven(text, lang, { onStart, onEnd } = {}) {
  const res = await fetch("/api/tts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text, lang }) });
  if (!res.ok) throw new Error("tts_" + res.status);
  const url = URL.createObjectURL(await res.blob());
  stopSpeaking();
  _audio = new Audio(url);
  _audio.onplay = () => onStart?.();
  _audio.onended = () => { onEnd?.(); URL.revokeObjectURL(url); _audio = null; };
  _audio.onerror = () => { onEnd?.(); URL.revokeObjectURL(url); _audio = null; };
  await _audio.play();
  _eleven = true;
}

export function speak(text, lang = "en", cb = {}) {
  const t = clean(text);
  if (!t) { cb.onEnd?.(); return; }
  if (preferEleven(lang, t)) {
    speakEleven(t, lang, cb).catch(() => { _eleven = false; webSpeak(t, lang, cb); });
    return;
  }
  webSpeak(t, lang, cb);
}

function webSpeak(text, lang, { onStart, onEnd } = {}) {
  if (!ttsSupported()) { onEnd?.(); return; }
  const synth = window.speechSynthesis;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = bcpFor(text, lang);
  const v = pickFemaleVoice(u.lang);
  if (v) u.voice = v;
  u.rate = 0.95;
  u.pitch = 1.15; // a touch higher for Devi's warm, feminine tone
  u.onstart = () => onStart?.();
  u.onend = () => onEnd?.();
  u.onerror = () => onEnd?.();
  synth.cancel();
  synth.speak(u);
}

// Web Speech doesn't expose gender, so pick a female voice by name heuristics.
const FEMALE_HINTS = ["female", "woman", "swara", "heera", "kalpana", "lekha", "veena", "neerja", "ananya", "kavya", "priya", "asha", "sangeeta", "samantha", "karen", "tessa", "zira", "aria", "jenny", "google"];
const MALE_HINTS = ["male", "hemant", "ravi", "rishi", "prabhat", "madhur", "gaurav", "daniel", "david", "mark", "george", "alex", "fred"];
let _voices = [];
function refreshVoices() { if (ttsSupported()) _voices = window.speechSynthesis.getVoices() || []; }
if (typeof window !== "undefined" && ttsSupported()) {
  refreshVoices();
  try { window.speechSynthesis.addEventListener("voiceschanged", refreshVoices); } catch { /* ignore */ }
}
function pickFemaleVoice(langTag) {
  if (!_voices.length) refreshVoices();
  if (!_voices.length) return null;
  const base = String(langTag).split("-")[0];
  const inLang = _voices.filter((v) => v.lang === langTag || v.lang?.startsWith(base));
  const pool = inLang.length ? inLang : _voices;
  const isFemale = (v) => FEMALE_HINTS.some((h) => v.name?.toLowerCase().includes(h));
  const isMale = (v) => MALE_HINTS.some((h) => v.name?.toLowerCase().includes(h));
  return pool.find(isFemale) || pool.find((v) => !isMale(v)) || pool[0] || null;
}

export function stopSpeaking() {
  try { if (ttsSupported()) window.speechSynthesis.cancel(); } catch { /* ignore */ }
  try { if (_audio) { _audio.pause(); _audio = null; } } catch { /* ignore */ }
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

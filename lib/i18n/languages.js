// Aastha language registry — all 22 Scheduled Languages of India + English.
// (App Router note: Next 15 App Router does not use next.config i18n routing;
//  language is applied via LanguageContext + cookie/localStorage.)

export const AASTHA_LANGUAGES = [
  // ── Tier 1 ──
  { code: "hi", name: "हिन्दी", english: "Hindi", script: "Devanagari", dir: "ltr", speakers: "528M", region: "Pan-India", font: "Noto Sans Devanagari", googleFont: "Noto+Sans+Devanagari:wght@400;500;600;700", tier: 1, default: true, hreflang: "hi-IN", nativeGreeting: "नमस्ते", pujaWord: "पूजा" },
  { code: "en", name: "English", english: "English", script: "Latin", dir: "ltr", speakers: "125M", region: "Pan-India", font: "Inter", googleFont: "", tier: 1, hreflang: "en-IN", nativeGreeting: "Namaste", pujaWord: "Puja" },
  { code: "bn", name: "বাংলা", english: "Bengali", script: "Bengali", dir: "ltr", speakers: "97M", region: "West Bengal, Assam, Tripura", font: "Noto Sans Bengali", googleFont: "Noto+Sans+Bengali:wght@400;500;600;700", tier: 1, hreflang: "bn-IN", nativeGreeting: "নমস্কার", pujaWord: "পূজা" },
  { code: "te", name: "తెలుగు", english: "Telugu", script: "Telugu", dir: "ltr", speakers: "83M", region: "Andhra Pradesh, Telangana", font: "Noto Sans Telugu", googleFont: "Noto+Sans+Telugu:wght@400;500;600;700", tier: 1, hreflang: "te-IN", nativeGreeting: "నమస్తే", pujaWord: "పూజ" },
  { code: "mr", name: "मराठी", english: "Marathi", script: "Devanagari", dir: "ltr", speakers: "83M", region: "Maharashtra, Goa", font: "Noto Sans Devanagari", googleFont: "Noto+Sans+Devanagari:wght@400;500;600;700", tier: 1, hreflang: "mr-IN", nativeGreeting: "नमस्कार", pujaWord: "पूजा" },
  { code: "ta", name: "தமிழ்", english: "Tamil", script: "Tamil", dir: "ltr", speakers: "69M", region: "Tamil Nadu, Puducherry", font: "Noto Sans Tamil", googleFont: "Noto+Sans+Tamil:wght@400;500;600;700", tier: 1, hreflang: "ta-IN", nativeGreeting: "வணக்கம்", pujaWord: "பூஜை" },
  // ── Tier 2 ──
  { code: "gu", name: "ગુજરાતી", english: "Gujarati", script: "Gujarati", dir: "ltr", speakers: "56M", region: "Gujarat", font: "Noto Sans Gujarati", googleFont: "Noto+Sans+Gujarati:wght@400;500;600;700", tier: 2, hreflang: "gu-IN", nativeGreeting: "નમસ્તે", pujaWord: "પૂજા" },
  { code: "kn", name: "ಕನ್ನಡ", english: "Kannada", script: "Kannada", dir: "ltr", speakers: "44M", region: "Karnataka", font: "Noto Sans Kannada", googleFont: "Noto+Sans+Kannada:wght@400;500;600;700", tier: 2, hreflang: "kn-IN", nativeGreeting: "ನಮಸ್ಕಾರ", pujaWord: "ಪೂಜೆ" },
  { code: "ml", name: "മലയാളം", english: "Malayalam", script: "Malayalam", dir: "ltr", speakers: "35M", region: "Kerala", font: "Noto Sans Malayalam", googleFont: "Noto+Sans+Malayalam:wght@400;500;600;700", tier: 2, hreflang: "ml-IN", nativeGreeting: "നമസ്കാരം", pujaWord: "പൂജ" },
  { code: "pa", name: "ਪੰਜਾਬੀ", english: "Punjabi", script: "Gurmukhi", dir: "ltr", speakers: "33M", region: "Punjab", font: "Noto Sans Gurmukhi", googleFont: "Noto+Sans+Gurmukhi:wght@400;500;600;700", tier: 2, hreflang: "pa-IN", nativeGreeting: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ", pujaWord: "ਪੂਜਾ" },
  { code: "or", name: "ଓଡ଼ିଆ", english: "Odia", script: "Odia", dir: "ltr", speakers: "37M", region: "Odisha", font: "Noto Sans Oriya", googleFont: "Noto+Sans+Oriya:wght@400;500;600;700", tier: 2, hreflang: "or-IN", nativeGreeting: "ନମସ୍କାର", pujaWord: "ପୂଜା" },
  // ── Tier 3 ──
  { code: "as", name: "অসমীয়া", english: "Assamese", script: "Assamese", dir: "ltr", speakers: "15M", region: "Assam", font: "Noto Sans Bengali", googleFont: "Noto+Sans+Bengali:wght@400;500;600;700", tier: 3, hreflang: "as-IN", nativeGreeting: "নমস্কাৰ", pujaWord: "পূজা" },
  { code: "mai", name: "मैथिली", english: "Maithili", script: "Devanagari", dir: "ltr", speakers: "14M", region: "Bihar, Jharkhand", font: "Noto Sans Devanagari", googleFont: "Noto+Sans+Devanagari:wght@400;500;600;700", tier: 3, hreflang: "mai-IN", nativeGreeting: "प्रणाम", pujaWord: "पूजा" },
  { code: "sat", name: "ᱥᱟᱱᱛᱟᱲᱤ", english: "Santali", script: "Ol Chiki", dir: "ltr", speakers: "7.6M", region: "Jharkhand, WB, Odisha", font: "Noto Sans Ol Chiki", googleFont: "Noto+Sans+Ol+Chiki:wght@400;500;600;700", tier: 3, hreflang: "sat-IN", nativeGreeting: "ᱡᱚᱦᱟᱨ", pujaWord: "ᱵᱳᱱᱜᱟ" },
  { code: "ks", name: "کٲشُر", english: "Kashmiri", script: "Nastaliq", dir: "rtl", speakers: "7M", region: "Jammu & Kashmir", font: "Noto Nastaliq Urdu", googleFont: "Noto+Nastaliq+Urdu:wght@400;500;600;700", tier: 3, hreflang: "ks-IN", nativeGreeting: "آداب", pujaWord: "پوجا", rtl: true },
  { code: "ne", name: "नेपाली", english: "Nepali", script: "Devanagari", dir: "ltr", speakers: "3M", region: "Sikkim, West Bengal", font: "Noto Sans Devanagari", googleFont: "Noto+Sans+Devanagari:wght@400;500;600;700", tier: 3, hreflang: "ne-IN", nativeGreeting: "नमस्कार", pujaWord: "पूजा" },
  { code: "kok", name: "कोंकणी", english: "Konkani", script: "Devanagari", dir: "ltr", speakers: "2.3M", region: "Goa, Karnataka", font: "Noto Sans Devanagari", googleFont: "Noto+Sans+Devanagari:wght@400;500;600;700", tier: 3, hreflang: "kok-IN", nativeGreeting: "देव बरें करूं", pujaWord: "पूजा" },
  { code: "doi", name: "डोगरी", english: "Dogri", script: "Devanagari", dir: "ltr", speakers: "2.6M", region: "Jammu region", font: "Noto Sans Devanagari", googleFont: "Noto+Sans+Devanagari:wght@400;500;600;700", tier: 3, hreflang: "doi-IN", nativeGreeting: "नमस्ते", pujaWord: "पूजा" },
  { code: "sd", name: "سنڌي", english: "Sindhi", script: "Perso-Arabic", dir: "rtl", speakers: "2.7M", region: "Rajasthan, Gujarat", font: "Noto Nastaliq Urdu", googleFont: "Noto+Nastaliq+Urdu:wght@400;500;600;700", tier: 3, hreflang: "sd-IN", nativeGreeting: "نمسڪار", pujaWord: "پوجا", rtl: true },
  { code: "mni", name: "মৈতৈলোন্", english: "Manipuri (Meitei)", script: "Meitei Mayek", dir: "ltr", speakers: "1.8M", region: "Manipur", font: "Noto Sans Meetei Mayek", googleFont: "Noto+Sans+Meetei+Mayek:wght@400;500;600;700", tier: 3, hreflang: "mni-IN", nativeGreeting: "খুরুমজরি", pujaWord: "পূজা" },
  { code: "brx", name: "बर'", english: "Bodo", script: "Devanagari", dir: "ltr", speakers: "1.5M", region: "Assam (Bodoland)", font: "Noto Sans Devanagari", googleFont: "Noto+Sans+Devanagari:wght@400;500;600;700", tier: 3, hreflang: "brx-IN", nativeGreeting: "नमस्कार", pujaWord: "पूजा" },
  { code: "sa", name: "संस्कृतम्", english: "Sanskrit", script: "Devanagari", dir: "ltr", speakers: "Classical", region: "Pan-India (sacred)", font: "Noto Sans Devanagari", googleFont: "Noto+Sans+Devanagari:wght@400;500;600;700", tier: 3, hreflang: "sa-IN", nativeGreeting: "नमस्कारः", pujaWord: "पूजा" },
];

export const LANG_MAP = Object.fromEntries(AASTHA_LANGUAGES.map((l) => [l.code, l]));
export const DEFAULT_LANG = "en"; // runtime default until full-page strings are wired (Hindi is complete & selectable)
export const FALLBACK_LANG = "en";
export const RTL_LANGUAGES = ["ks", "sd"];
// Languages with complete, vetted translation bundles shipped today.
export const AVAILABLE_LANGS = ["en", "hi"];
export const isAvailable = (code) => AVAILABLE_LANGS.includes(code);

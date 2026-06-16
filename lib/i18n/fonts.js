// Lazily inject the Google Noto font for a language's script (client-only).
const loaded = new Set();

export function loadFontForLanguage(langConfig) {
  if (typeof document === "undefined") return;
  if (!langConfig?.googleFont || loaded.has(langConfig.code)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${langConfig.googleFont}&display=swap`;
  document.head.appendChild(link);
  loaded.add(langConfig.code);
}

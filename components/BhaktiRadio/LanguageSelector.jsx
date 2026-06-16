export default function LanguageSelector({ languages, current, onChange }) {
  return (
    <>
      <div className="step-label">Step 1 · Choose a language</div>
      <div className="lang-grid">
        {languages.map((l) => (
          <button key={l.code} className={`lang-btn ${current === l.code ? "active" : ""}`} onClick={() => onChange(l.code)}>
            <span className="lang-name">{l.code}</span>
            <span className="lang-native">{l.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}

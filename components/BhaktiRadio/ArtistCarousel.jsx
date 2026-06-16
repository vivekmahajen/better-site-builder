export default function ArtistCarousel({ artists, currentIdx, onChange }) {
  return (
    <>
      <div className="step-label">Step 2 · Choose a singer</div>
      <div className="artist-scroll">
        {artists.map((a, i) => (
          <button key={a.id} className={`artist-card ${currentIdx === i ? "active" : ""}`} onClick={() => onChange(i)} title={a.specialty}>
            <span className="artist-avatar">{a.icon}</span>
            <span className="artist-name">{a.name}</span>
          </button>
        ))}
      </div>
    </>
  );
}

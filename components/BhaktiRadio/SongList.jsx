export default function SongList({ songs, currentIdx, isPlaying, onSelect }) {
  return (
    <>
      <div className="step-label">Step 3 · Pick a song</div>
      <div className="song-list">
        {songs.map((s, i) => {
          const active = i === currentIdx;
          return (
            <button key={s.id} className={`song-item ${active ? "active" : ""}`} onClick={() => onSelect(i)}>
              {active && isPlaying ? <span className="now-playing-dot" aria-label="Now playing" /> : <span className="song-num">{i + 1}</span>}
              <span className="song-title">{s.title}</span>
              <span className="song-duration">{s.dur}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

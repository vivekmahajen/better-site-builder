function fmt(sec) {
  if (!sec || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function PlayerControls({ song, artist, lang, isPlaying, progress, volume, isMuted, onTogglePlay, onNext, onPrev, onSeek, onVolumeChange, onToggleMute }) {
  const pct = progress.total ? (progress.current / progress.total) * 100 : 0;
  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onSeek(((e.clientX - rect.left) / rect.width) * 100);
  };

  return (
    <div className="player-card">
      <div className="now-label">Now playing · {lang}</div>
      <div className="playing-title" aria-live="polite">{song ? song.title : "Select a song"}</div>
      <div className="playing-meta">{artist ? `${artist.icon} ${artist.name}` : "—"}{song ? ` · ${song.deity} · ${song.mood}` : ""}</div>
      {song?.yt && (
        <a className="yt-link" href={`https://www.youtube.com/watch?v=${song.yt}`} target="_blank" rel="noopener noreferrer">▶ Real audio · Watch on YouTube ↗</a>
      )}

      <div className="progress-track" onClick={seek} role="slider" aria-label="Seek" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} tabIndex={0}>
        <div className="progress-bar" style={{ width: `${pct}%` }} />
      </div>
      <div className="time-row"><span>{fmt(progress.current)}</span><span>{song ? song.dur : fmt(progress.total)}</span></div>

      <div className="controls">
        <button className="ctrl-btn" onClick={onPrev} aria-label="Previous">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
        </button>
        <button className="play-pause-btn" onClick={onTogglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying
            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
            : <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
        </button>
        <button className="ctrl-btn" onClick={onNext} aria-label="Next">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6h2v12h-2zM6 6l8.5 6L6 18z" /></svg>
        </button>
      </div>

      <div className="vol-row">
        <button className="ctrl-btn" onClick={onToggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>{isMuted || volume === 0 ? "🔇" : "🔊"}</button>
        <input type="range" min="0" max="100" value={isMuted ? 0 : volume} onChange={(e) => onVolumeChange(Number(e.target.value))} aria-label="Volume" />
      </div>
    </div>
  );
}

"use client";
import { toast } from "@/lib/toast";

export default function DailyPlayer({ tracks }) {
  return (
    <div className="player reveal" style={{ maxWidth: 760, margin: "0 auto" }}>
      {tracks.map((t) => (
        <div className="track-row" key={t.t} onClick={() => toast(`▶ Now playing: ${t.t}`)}>
          <button className="play" aria-label="Play">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          </button>
          <div className="ti"><h4>{t.t}</h4><span>{t.sub}</span></div>
          <div className="dur">{t.dur}</div>
        </div>
      ))}
    </div>
  );
}

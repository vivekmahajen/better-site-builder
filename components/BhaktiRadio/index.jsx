"use client";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import SpiritualBackground from "./SpiritualBackground";
import LanguageSelector from "./LanguageSelector";
import ArtistCarousel from "./ArtistCarousel";
import SongList from "./SongList";
import PlayerControls from "./PlayerControls";
import AudioVisualizer from "./AudioVisualizer";
import YouTubeAudio from "./YouTubeAudio";
import { BHAKTI_CATALOG } from "@/lib/radio/catalog";

// Only show songs that have a real YouTube source, and drop any artist/language
// left empty — so every track listed actually plays a real recording.
function buildCatalog() {
  const out = {};
  for (const [lang, data] of Object.entries(BHAKTI_CATALOG)) {
    const artists = data.artists
      .map((a) => ({ ...a, songs: a.songs.filter((s) => s.yt) }))
      .filter((a) => a.songs.length > 0);
    if (artists.length) out[lang] = { ...data, artists };
  }
  return out;
}

export default function BhaktiRadio() {
  const CATALOG = useMemo(buildCatalog, []);
  const LANGS = useMemo(() => Object.entries(CATALOG).map(([code, data]) => ({ code, ...data })), [CATALOG]);

  const [lang, setLang] = useState(LANGS[0]?.code || "Hindi");
  const [artistIdx, setArtistIdx] = useState(0);
  const [mood, setMood] = useState("All");
  const [songIdx, setSongIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const artists = CATALOG[lang]?.artists || [];
  const artist = artists[artistIdx];
  const color = CATALOG[lang]?.color;

  const moods = useMemo(() => ["All", ...Array.from(new Set((artist?.songs || []).map((s) => s.mood)))], [artist]);
  const songs = useMemo(() => (mood === "All" ? artist?.songs || [] : (artist?.songs || []).filter((s) => s.mood === mood)), [artist, mood]);
  const song = songs[songIdx];
  const ytRef = useRef(null);
  const onYtProgress = useCallback((c, t) => setProgress({ current: c || 0, total: t || 0 }), []);

  const playSong = useCallback((i) => {
    if (!songs[i]) return;
    setSongIdx(i);
    setProgress({ current: 0, total: 0 });
    setIsPlaying(true);
  }, [songs]);

  const handleNext = useCallback(() => {
    if (songs.length) playSong((songIdx + 1) % songs.length);
  }, [songs, songIdx, playSong]);

  const handlePrev = () => songs.length && playSong((songIdx - 1 + songs.length) % songs.length);

  const togglePlay = () => {
    if (!song) return playSong(0);
    setIsPlaying((v) => !v);
  };

  const reset = (fn) => { setIsPlaying(false); setSongIdx(0); setProgress({ current: 0, total: 0 }); fn(); };

  // If a video can't be embedded (region/embedding disabled), skip to the next.
  const handleError = useCallback(() => { if (songs.length > 1) handleNext(); else setIsPlaying(false); }, [songs, handleNext]);

  return (
    <div className="bhakti-radio">
      <SpiritualBackground isPlaying={isPlaying} />
      <div className="radio-header">
        <div className="radio-om om">ॐ</div>
        <div className="radio-brand">Aastha Bhakti Radio</div>
        <div className="radio-tagline">Devotional music for the soul · {LANGS.length} languages</div>
      </div>

      <div className="radio-content">
        <LanguageSelector languages={LANGS} current={lang} onChange={(c) => reset(() => { setLang(c); setArtistIdx(0); setMood("All"); })} />
        <ArtistCarousel artists={artists} currentIdx={artistIdx} onChange={(i) => reset(() => { setArtistIdx(i); setMood("All"); })} />

        {moods.length > 2 && (
          <div className="mood-pills">
            {moods.map((m) => (
              <button key={m} className={`mood-pill ${mood === m ? "active" : ""}`} onClick={() => reset(() => setMood(m))}>{m}</button>
            ))}
          </div>
        )}

        <SongList songs={songs} currentIdx={songIdx} isPlaying={isPlaying} onSelect={playSong} />
        <PlayerControls
          song={song} artist={artist} lang={lang}
          isPlaying={isPlaying} progress={progress} volume={volume} isMuted={isMuted}
          onTogglePlay={togglePlay} onNext={handleNext} onPrev={handlePrev}
          onSeek={(pct) => ytRef.current?.seekTo((pct / 100) * (progress.total || 0))}
          onVolumeChange={(v) => { setVolume(v); setIsMuted(v === 0); }}
          onToggleMute={() => setIsMuted((v) => !v)}
        />
        <AudioVisualizer isPlaying={isPlaying} color={color} />
        {song?.yt && (
          <YouTubeAudio key={song.yt} ref={ytRef} videoId={song.yt} isPlaying={isPlaying} volume={volume} isMuted={isMuted} onProgress={onYtProgress} onEnded={handleNext} onError={handleError} />
        )}
        <p className="radio-note">Every track streams the real recording via YouTube. Tap a song to play.</p>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import SpiritualBackground from "./SpiritualBackground";
import LanguageSelector from "./LanguageSelector";
import ArtistCarousel from "./ArtistCarousel";
import SongList from "./SongList";
import PlayerControls from "./PlayerControls";
import AudioVisualizer from "./AudioVisualizer";
import { BHAKTI_CATALOG } from "@/lib/radio/catalog";
import { TonePlayer, freqForId } from "@/lib/radio/tonePlayer";

const LANGS = Object.entries(BHAKTI_CATALOG).map(([code, data]) => ({ code, ...data }));
const toSec = (dur) => {
  const [m, s] = String(dur).split(":").map(Number);
  return (m || 0) * 60 + (s || 0);
};

// Concept build: playback is simulated (a 1-second progress clock with
// auto-advance). Wire real audio via NEXT_PUBLIC_RADIO_CDN + lib/radio/audioManager.
export default function BhaktiRadio() {
  const [lang, setLang] = useState("Hindi");
  const [artistIdx, setArtistIdx] = useState(0);
  const [mood, setMood] = useState("All");
  const [songIdx, setSongIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const artists = BHAKTI_CATALOG[lang]?.artists || [];
  const artist = artists[artistIdx];
  const color = BHAKTI_CATALOG[lang]?.color;

  const moods = useMemo(() => ["All", ...Array.from(new Set((artist?.songs || []).map((s) => s.mood)))], [artist]);
  const songs = useMemo(() => (mood === "All" ? artist?.songs || [] : (artist?.songs || []).filter((s) => s.mood === mood)), [artist, mood]);
  const song = songs[songIdx];

  // Ambient Web-Audio drone so playback is genuinely audible (no licensed files).
  const toneRef = useRef(null);
  useEffect(() => {
    toneRef.current = new TonePlayer();
    return () => toneRef.current?.dispose();
  }, []);
  useEffect(() => {
    const tp = toneRef.current;
    if (!tp) return;
    if (isPlaying && song) tp.start(freqForId(song.id), isMuted ? 0 : volume);
    else tp.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, song?.id]);
  useEffect(() => {
    toneRef.current?.setVolume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  const playSong = useCallback((i) => {
    const s = songs[i];
    if (!s) return;
    setSongIdx(i);
    setProgress({ current: 0, total: toSec(s.dur) });
    setIsPlaying(true);
  }, [songs]);

  const handleNext = useCallback(() => {
    if (!songs.length) return;
    playSong((songIdx + 1) % songs.length);
  }, [songs, songIdx, playSong]);

  const handlePrev = () => songs.length && playSong((songIdx - 1 + songs.length) % songs.length);

  const togglePlay = () => {
    if (!song) return playSong(0);
    if (progress.total === 0) return playSong(songIdx);
    setIsPlaying((v) => !v);
  };

  // Simulated playback clock.
  useEffect(() => {
    if (!isPlaying || progress.total === 0) return undefined;
    const id = setInterval(() => setProgress((p) => ({ ...p, current: Math.min(p.current + 1, p.total) })), 1000);
    return () => clearInterval(id);
  }, [isPlaying, progress.total]);

  // Auto-advance when a track finishes.
  useEffect(() => {
    if (isPlaying && progress.total > 0 && progress.current >= progress.total) handleNext();
  }, [progress, isPlaying, handleNext]);

  const reset = (fn) => { setIsPlaying(false); setSongIdx(0); setProgress({ current: 0, total: 0 }); fn(); };

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
          onSeek={(pct) => setProgress((p) => ({ ...p, current: (pct / 100) * p.total }))}
          onVolumeChange={(v) => { setVolume(v); setIsMuted(v === 0); }}
          onToggleMute={() => setIsMuted((v) => !v)}
        />
        <AudioVisualizer isPlaying={isPlaying} color={color} />
        <p className="radio-note">Plays a live ambient drone (tanpura-style, synthesised). Connect a music CDN or licensed stream for the full bhajan recordings.</p>
      </div>
    </div>
  );
}

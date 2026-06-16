// Real-audio utility for Aastha Bhakti Radio. Active only when a CDN base is
// configured via NEXT_PUBLIC_RADIO_CDN; otherwise the player runs simulated.
// URL pattern: {cdn}/audio/bhajans/{lang}/{artistId}/{songId}.mp3
export class AudioManager {
  constructor(cdnBase = process.env.NEXT_PUBLIC_RADIO_CDN || "") {
    this.cdnBase = cdnBase;
    this.enabled = Boolean(cdnBase);
    this.audio = typeof Audio !== "undefined" ? new Audio() : null;
    if (this.audio) this.audio.preload = "metadata";
    this.onProgress = null;
    this.onEnded = null;
    this.onError = null;
    if (this.audio) {
      this.audio.addEventListener("timeupdate", () => this.onProgress?.(this.audio.currentTime, this.audio.duration));
      this.audio.addEventListener("ended", () => this.onEnded?.());
      this.audio.addEventListener("error", (e) => this.onError?.(e));
    }
  }

  buildUrl(langCode, artistId, songId) {
    return `${this.cdnBase}/audio/bhajans/${langCode}/${artistId}/${songId}.mp3`;
  }

  async play(song, langCode, artistId) {
    if (!this.audio || !this.enabled) throw new Error("audio_disabled");
    const url = song.src || this.buildUrl(langCode, artistId, song.id);
    if (this.audio.src !== url) { this.audio.src = url; this.audio.load(); }
    await this.audio.play();
  }

  pause() { this.audio?.pause(); }
  resume() { return this.audio?.play(); }
  seek(s) { if (this.audio) this.audio.currentTime = s; }
  setVolume(pct) { if (this.audio) this.audio.volume = Math.max(0, Math.min(1, pct / 100)); }
}

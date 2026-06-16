// Copyright-free ambient sound for Bhakti Radio — a soft tanpura/Om-style drone
// synthesised with the Web Audio API (no files, no licensing). Plays a sustained
// fundamental + harmonics with gentle vibrato; honest stand-in for the real
// recordings (wire a CDN via NEXT_PUBLIC_RADIO_CDN for full bhajans).
const NOTES = [130.81, 146.83, 164.81, 196.0, 220.0, 246.94]; // C3 D3 E3 G3 A3 B3
export function freqForId(id = "") {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return NOTES[h % NOTES.length];
}

export class TonePlayer {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.voices = [];
    this.lfo = null;
    this.peak = 0.16; // keep it gentle
  }

  ensure() {
    if (this.ctx) return;
    const AC = typeof window !== "undefined" && (window.AudioContext || window.webkitAudioContext);
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.ctx.destination);
  }

  start(baseFreq = 146.83, volPct = 80) {
    this.ensure();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume();
    this.stopVoices();

    const partials = [1, 1.5, 2, 3];
    const gains = [0.5, 0.22, 0.16, 0.07];
    this.voices = partials.map((p, i) => {
      const o = this.ctx.createOscillator();
      o.type = i === 0 ? "sine" : "triangle";
      o.frequency.value = baseFreq * p;
      const g = this.ctx.createGain();
      g.gain.value = gains[i];
      o.connect(g).connect(this.master);
      o.start();
      return { o, g };
    });

    // gentle vibrato
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.value = 5.5;
    const lg = this.ctx.createGain();
    lg.gain.value = 2.2;
    this.lfo.connect(lg);
    this.voices.forEach((v) => lg.connect(v.o.frequency));
    this.lfo.start();

    this.setVolume(volPct);
  }

  setVolume(volPct) {
    if (!this.ctx || !this.master) return;
    const target = Math.max(0, Math.min(1, volPct / 100)) * this.peak;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.linearRampToValueAtTime(target, now + 0.4);
  }

  stopVoices() {
    this.voices.forEach((v) => { try { v.o.stop(); } catch { /* already stopped */ } });
    this.voices = [];
    if (this.lfo) { try { this.lfo.stop(); } catch { /* already stopped */ } this.lfo = null; }
  }

  stop() {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.linearRampToValueAtTime(0, now + 0.3);
    setTimeout(() => this.stopVoices(), 350);
  }

  dispose() {
    this.stopVoices();
    try { this.ctx?.close(); } catch { /* ignore */ }
    this.ctx = null;
  }
}

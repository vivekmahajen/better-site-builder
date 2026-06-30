import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ElevenLabs voices for Devi. One multilingual voice serves EVERY language so
// English, Hindi and the rest all work; per-language env vars can override it.
// Keys/IDs stay server-side.
//   ELEVENLABS_API_KEY     — your ElevenLabs key (required)
//   ELEVENLABS_VOICE_ID    — optional English-specific voice id
//   ELEVENLABS_VOICE_ID_HI — optional Hindi-specific voice id
//   ELEVENLABS_MODEL       — optional model override (default: eleven_multilingual_v2)
const VOICE_EN = process.env.ELEVENLABS_VOICE_ID || "";
const VOICE_HI = process.env.ELEVENLABS_VOICE_ID_HI || "";
const RACHEL = "21m00Tcm4TlvDq8ikWAM"; // ElevenLabs default premade voice
// Multilingual model handles English, Hindi and many Indian languages — the same
// model the working Hindi voice already uses (turbo_v2_5 was the English failure).
const MODEL = process.env.ELEVENLABS_MODEL || "eleven_multilingual_v2";

// Ordered list of voice ids to try for a language. The language's own voice is
// tried first; if it fails (e.g. an English id that isn't on the account) we
// fall through to the known-good Hindi voice, then Rachel — so English speaks as
// long as ANY configured voice works. Empties/dupes removed.
function voiceCandidates(lang) {
  const preferred = lang === "hi" ? VOICE_HI : VOICE_EN;
  return [...new Set([preferred, VOICE_HI, VOICE_EN, RACHEL].filter(Boolean))];
}

async function synth(key, voiceId, text) {
  return fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({
      text,
      model_id: MODEL,
      voice_settings: { stability: 0.4, similarity_boost: 0.85, style: 0.15, use_speaker_boost: true },
    }),
  });
}

export async function POST(req) {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return NextResponse.json({ error: "tts_not_configured" }, { status: 503 });

  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "invalid_json" }, { status: 400 }); }
  const text = String(body?.text || "").slice(0, 1500).trim();
  if (!text) return NextResponse.json({ error: "no_text" }, { status: 400 });

  const candidates = voiceCandidates(body?.lang);
  if (!candidates.length) return NextResponse.json({ error: "voice_not_configured", lang: body?.lang || "en" }, { status: 503 });

  let lastStatus = 0;
  for (const voiceId of candidates) {
    try {
      const r = await synth(key, voiceId, text);
      if (r.ok) {
        return new NextResponse(await r.arrayBuffer(), {
          headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
        });
      }
      lastStatus = r.status;
      const detail = await r.text().catch(() => "");
      console.error(`ElevenLabs TTS failed for voice ${voiceId}:`, r.status, detail.slice(0, 200));
      // Always try the next candidate — a per-voice 401/404 (a voice the account
      // can't access) must NOT abort before we reach the known-good Hindi voice.
    } catch (err) {
      console.error(`ElevenLabs TTS error for voice ${voiceId}:`, err);
    }
  }
  return NextResponse.json({ error: "tts_failed", status: lastStatus || 502 }, { status: 502 });
}

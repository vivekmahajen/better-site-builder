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
// Shared fallback: whichever voice IS configured powers any language without a
// dedicated id (so if you only set the Hindi voice, English uses it too and
// still speaks). Rachel is the last-resort default.
const VOICE_DEFAULT = VOICE_EN || VOICE_HI || "21m00Tcm4TlvDq8ikWAM";
// Multilingual model handles English, Hindi and many Indian languages — the same
// model the working Hindi voice already uses (turbo_v2_5 was the English failure).
const MODEL = process.env.ELEVENLABS_MODEL || "eleven_multilingual_v2";
const PER_LANG = { en: VOICE_EN, hi: VOICE_HI };

function voiceFor(lang) {
  return { id: PER_LANG[lang] || VOICE_DEFAULT, model: MODEL };
}

export async function POST(req) {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return NextResponse.json({ error: "tts_not_configured" }, { status: 503 });

  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "invalid_json" }, { status: 400 }); }
  const text = String(body?.text || "").slice(0, 1500).trim();
  if (!text) return NextResponse.json({ error: "no_text" }, { status: 400 });

  const { id: voiceId, model } = voiceFor(body?.lang);
  if (!voiceId) return NextResponse.json({ error: "voice_not_configured", lang: body?.lang || "en" }, { status: 503 });

  try {
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({
        text,
        model_id: model,
        voice_settings: { stability: 0.4, similarity_boost: 0.85, style: 0.15, use_speaker_boost: true },
      }),
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      console.error("ElevenLabs TTS failed:", r.status, detail.slice(0, 300));
      return NextResponse.json({ error: "tts_failed", status: r.status }, { status: 502 });
    }
    return new NextResponse(await r.arrayBuffer(), {
      headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("ElevenLabs TTS error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

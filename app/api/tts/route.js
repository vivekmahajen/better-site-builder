import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ElevenLabs female voice for Devi. Key stays server-side (never shipped to the
// client). Default voice = "Rachel" (warm female); override with env vars.
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";
const MODEL = process.env.ELEVENLABS_MODEL || "eleven_turbo_v2_5";

export async function POST(req) {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return NextResponse.json({ error: "tts_not_configured" }, { status: 503 });

  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "invalid_json" }, { status: 400 }); }
  const text = String(body?.text || "").slice(0, 1500).trim();
  if (!text) return NextResponse.json({ error: "no_text" }, { status: 400 });

  try {
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({
        text,
        model_id: MODEL,
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

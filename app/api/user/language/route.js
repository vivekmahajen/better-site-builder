import { NextResponse } from "next/server";
import { AASTHA_LANGUAGES } from "@/lib/i18n/languages";

// Persists the chosen language to the signed-in user. Auth/users table is not
// yet implemented (deferred Critical gap), so this validates and acks; the
// client already persists via cookie + localStorage. When auth lands, store
// users.language_preference here.
export async function PATCH(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const { language } = body || {};
  const valid = AASTHA_LANGUAGES.map((l) => l.code);
  if (!valid.includes(language)) {
    return NextResponse.json({ error: "unsupported_language" }, { status: 400 });
  }
  return NextResponse.json({ language, persisted: false });
}

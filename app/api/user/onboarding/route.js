import { NextResponse } from "next/server";
import { updateUserOnboarding } from "@/lib/db";
import { userIdFromRequest } from "@/lib/auth";

export const runtime = "nodejs";

export async function PATCH(req) {
  const uid = userIdFromRequest(req);
  if (!uid) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "invalid_json" }, { status: 400 }); }
  try {
    const user = await updateUserOnboarding(uid, body || {});
    return NextResponse.json({ user });
  } catch (err) {
    console.error("onboarding update failed:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

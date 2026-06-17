import { NextResponse } from "next/server";
import { dbStatus } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const db = await dbStatus();
  return NextResponse.json({ ok: db.ok, db }, { status: db.ok ? 200 : 503 });
}

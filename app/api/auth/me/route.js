import { NextResponse } from "next/server";
import { getUserById } from "@/lib/db";
import { userIdFromRequest } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req) {
  const uid = userIdFromRequest(req);
  if (!uid) return NextResponse.json({ user: null });
  try {
    return NextResponse.json({ user: await getUserById(uid) });
  } catch {
    return NextResponse.json({ user: null });
  }
}

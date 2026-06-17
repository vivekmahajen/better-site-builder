import { NextResponse } from "next/server";
import { getUserByEmail, getUserById, touchLogin } from "@/lib/db";
import { verifyPassword, createSessionToken, SESSION_COOKIE, COOKIE_OPTS } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ message: "invalid_json" }, { status: 400 }); }
  const email = (body?.email || body?.identifier || "").trim().toLowerCase();
  const password = body?.password || "";
  if (!email || !password) return NextResponse.json({ message: "Enter your email and password." }, { status: 400 });

  try {
    const row = await getUserByEmail(email);
    if (!row || !verifyPassword(password, row.password_hash)) {
      return NextResponse.json({ message: "Incorrect email or password." }, { status: 401 });
    }
    await touchLogin(row.id);
    const user = await getUserById(row.id);
    const res = NextResponse.json({ user });
    res.cookies.set(SESSION_COOKIE, createSessionToken(row.id), COOKIE_OPTS);
    return res;
  } catch (err) {
    console.error("login failed:", err);
    return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 500 });
  }
}

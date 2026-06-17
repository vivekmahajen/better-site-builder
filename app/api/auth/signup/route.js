import { NextResponse } from "next/server";
import crypto from "crypto";
import { createUser, getUserByEmail } from "@/lib/db";
import { hashPassword, createSessionToken, SESSION_COOKIE, COOKIE_OPTS } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ message: "invalid_json" }, { status: 400 }); }
  const name = (body?.name || "").trim();
  const email = (body?.email || "").trim().toLowerCase();
  const password = body?.password || "";

  if (!name) return NextResponse.json({ message: "Please enter your name." }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ message: "Please enter a valid email." }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ message: "Password must be at least 8 characters." }, { status: 400 });

  try {
    if (await getUserByEmail(email)) return NextResponse.json({ message: "An account with this email already exists." }, { status: 409 });
    const user = await createUser({ id: crypto.randomUUID(), email, name, passwordHash: hashPassword(password) });
    const res = NextResponse.json({ user }, { status: 201 });
    res.cookies.set(SESSION_COOKIE, createSessionToken(user.id), COOKIE_OPTS);
    return res;
  } catch (err) {
    console.error("signup failed:", err);
    return NextResponse.json({ message: "Could not create your account. Please try again." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { createDonation } from "@/lib/db";

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { cause, donor, amount } = body || {};
  const amt = Number(amount);
  if (!cause || !String(cause).trim()) return NextResponse.json({ error: "cause_required" }, { status: 400 });
  if (!donor || !String(donor).trim()) return NextResponse.json({ error: "donor_required" }, { status: 400 });
  if (!Number.isFinite(amt) || amt < 1) return NextResponse.json({ error: "invalid_amount" }, { status: 400 });

  try {
    const donation = await createDonation({
      cause: String(cause).trim().slice(0, 120),
      donor: String(donor).trim().slice(0, 120),
      amount: amt,
    });
    return NextResponse.json({ id: donation.id, donation }, { status: 201 });
  } catch (err) {
    console.error("donation POST failed:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

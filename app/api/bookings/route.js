import { NextResponse } from "next/server";
import { createBooking, listOrders } from "@/lib/db";
import { getPuja } from "@/lib/catalog";

export async function GET() {
  try {
    return NextResponse.json(await listOrders());
  } catch (err) {
    console.error("bookings GET failed:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { slug, devotee, gotra } = body || {};
  const puja = slug ? getPuja(slug) : null;
  if (!puja) return NextResponse.json({ error: "unknown_puja" }, { status: 400 });
  if (!devotee || !String(devotee).trim()) {
    return NextResponse.json({ error: "devotee_required" }, { status: 400 });
  }

  try {
    const order = await createBooking({
      puja: puja.name,
      temple: puja.temple,
      devotee: String(devotee).trim(),
      gotra: gotra ? String(gotra).trim() : null,
      priest: `${puja.priest} (Verified ✓, ${puja.priestYears} yrs)`,
    });
    return NextResponse.json({ id: order.id, order }, { status: 201 });
  } catch (err) {
    console.error("bookings POST failed:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

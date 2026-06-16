import { NextResponse } from "next/server";
import { createBooking, listOrders } from "@/lib/db";
import { getPuja } from "@/lib/catalog";

export async function GET() {
  return NextResponse.json(listOrders());
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

  const order = createBooking({
    puja: puja.name,
    temple: puja.temple,
    devotee: String(devotee).trim(),
    gotra: gotra ? String(gotra).trim() : null,
    priest: `${puja.priest} (Verified ✓, ${puja.priestYears} yrs)`,
  });

  return NextResponse.json({ id: order.id, order }, { status: 201 });
}

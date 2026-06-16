import { NextResponse } from "next/server";
import { getOrder } from "@/lib/db";

export async function GET(_req, { params }) {
  const { id } = await params;
  const order = getOrder(id);
  if (!order) {
    return NextResponse.json({ error: "not_found", id }, { status: 404 });
  }
  return NextResponse.json(order);
}

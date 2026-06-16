import { NextResponse } from "next/server";
import { getOrder } from "@/lib/db";

export async function GET(_req, { params }) {
  const { id } = await params;
  try {
    const order = await getOrder(id);
    if (!order) {
      return NextResponse.json({ error: "not_found", id }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (err) {
    console.error("orders GET failed:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

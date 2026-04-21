import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/auth";
import { listBookings } from "@/lib/booking/store";

export async function GET() {
  const ok = await isAdmin();
  if (!ok) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const bookings = await listBookings();

  return NextResponse.json({
    ok: true,
    bookings,
  });
}


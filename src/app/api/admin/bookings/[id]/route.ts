import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/auth";
import { deleteBooking, updateBookingStatus } from "@/lib/booking/store";
import { type BookingStatus } from "@/lib/booking/types";

function isStatus(s: unknown): s is BookingStatus {
  return s === "pending" || s === "confirmed" || s === "cancelled";
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const ok = await isAdmin();
  if (!ok) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await req.json().catch(() => null)) as { status?: unknown } | null;
  const status = body?.status;
  if (!isStatus(status)) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const res = await updateBookingStatus(id, status);
  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const ok = await isAdmin();
  if (!ok) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const res = await deleteBooking(id);
  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}


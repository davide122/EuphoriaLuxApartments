import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/auth";
import { utcDateFromISO } from "@/lib/booking/date";
import { createBlockBooking } from "@/lib/booking/store";
import { type SuiteSlug } from "@/lib/booking/types";

function isSuiteSlug(s: unknown): s is SuiteSlug {
  return s === "passion" || s === "infinity";
}

export async function POST(req: Request) {
  const ok = await isAdmin();
  if (!ok) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as
    | { suite?: unknown; checkIn?: unknown; checkOut?: unknown; notes?: unknown }
    | null;
  if (!body || !isSuiteSlug(body.suite)) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const checkIn = typeof body.checkIn === "string" ? body.checkIn : "";
  const checkOut = typeof body.checkOut === "string" ? body.checkOut : "";
  const inD = utcDateFromISO(checkIn);
  const outD = utcDateFromISO(checkOut);
  if (!inD || !outD || outD.getTime() <= inD.getTime()) {
    return NextResponse.json({ ok: false, error: "bad_dates" }, { status: 400 });
  }

  const notes = typeof body.notes === "string" ? body.notes.trim().slice(0, 200) : "";

  const res = await createBlockBooking({
    suite: body.suite,
    checkIn,
    checkOut,
    notes: notes || undefined,
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: res.error }, { status: 409 });
  }

  return NextResponse.json({ ok: true, booking: res.booking });
}


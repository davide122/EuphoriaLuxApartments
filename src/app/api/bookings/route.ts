import { NextResponse } from "next/server";
import { utcDateFromISO } from "@/lib/booking/date";
import { createBooking } from "@/lib/booking/store";
import { type BookingRequestInput, type SuiteSlug } from "@/lib/booking/types";

function isSuiteSlug(s: unknown): s is SuiteSlug {
  return s === "passion" || s === "infinity";
}

function isEmail(s: unknown) {
  if (typeof s !== "string") return false;
  const v = s.trim();
  if (v.length < 5 || v.length > 140) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isPhone(s: unknown) {
  if (typeof s !== "string") return false;
  const v = s.trim();
  if (v.length < 6 || v.length > 40) return false;
  return /^[0-9+()\-.\s]+$/.test(v);
}

function normalizeText(s: unknown, max: number) {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Partial<BookingRequestInput> | null;
  if (!body) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  if (!isSuiteSlug(body.suite)) {
    return NextResponse.json({ ok: false, error: "bad_suite" }, { status: 400 });
  }

  const checkIn = typeof body.checkIn === "string" ? body.checkIn : "";
  const checkOut = typeof body.checkOut === "string" ? body.checkOut : "";
  const inD = utcDateFromISO(checkIn);
  const outD = utcDateFromISO(checkOut);
  if (!inD || !outD || outD.getTime() <= inD.getTime()) {
    return NextResponse.json({ ok: false, error: "bad_dates" }, { status: 400 });
  }

  const now = new Date();
  const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  if (inD.getTime() < todayUTC.getTime()) {
    return NextResponse.json({ ok: false, error: "bad_dates" }, { status: 400 });
  }

  const nights = Math.round((outD.getTime() - inD.getTime()) / 86400000);
  if (nights < 1 || nights > 21) {
    return NextResponse.json({ ok: false, error: "bad_dates" }, { status: 400 });
  }

  const guests = typeof body.guests === "number" ? body.guests : Number(body.guests);
  if (!Number.isFinite(guests) || guests < 1 || guests > 6) {
    return NextResponse.json({ ok: false, error: "bad_guests" }, { status: 400 });
  }

  const fullName = normalizeText(body.fullName, 80);
  if (fullName.length < 2) {
    return NextResponse.json({ ok: false, error: "bad_name" }, { status: 400 });
  }

  if (!isEmail(body.email)) {
    return NextResponse.json({ ok: false, error: "bad_email" }, { status: 400 });
  }

  if (!isPhone(body.phone)) {
    return NextResponse.json({ ok: false, error: "bad_phone" }, { status: 400 });
  }

  const email = (body.email as string).trim();
  const phone = (body.phone as string).trim();
  const notes = normalizeText(body.notes, 500);

  const result = await createBooking({
    suite: body.suite,
    checkIn,
    checkOut,
    guests,
    fullName,
    email,
    phone,
    notes: notes || undefined,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 409 }
    );
  }

  return NextResponse.json({
    ok: true,
    booking: {
      id: result.booking.id,
      suite: result.booking.suite,
      checkIn: result.booking.checkIn,
      checkOut: result.booking.checkOut,
      guests: result.booking.guests,
      status: result.booking.status,
      createdAt: result.booking.createdAt,
    },
  });
}

import { promises as fs } from "node:fs";
import path from "node:path";
import { addDaysUTC, isoFromUTCDate, utcDateFromISO } from "@/lib/booking/date";
import {
  type BookingRecord,
  type BookingRequestInput,
  type BookingStatus,
  type SuiteSlug,
} from "@/lib/booking/types";

const DATA_DIR = path.join(process.cwd(), ".data");
const BOOKING_FILE = path.join(DATA_DIR, "noir-bookings.json");

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(BOOKING_FILE);
  } catch {
    await fs.writeFile(BOOKING_FILE, JSON.stringify({ bookings: [] }, null, 2), "utf8");
  }
}

export async function listBookings() {
  await ensureStore();
  const raw = await fs.readFile(BOOKING_FILE, "utf8");
  const parsed = JSON.parse(raw) as { bookings?: BookingRecord[] };
  return Array.isArray(parsed.bookings) ? parsed.bookings : [];
}

async function saveBookings(bookings: BookingRecord[]) {
  await ensureStore();
  await fs.writeFile(BOOKING_FILE, JSON.stringify({ bookings }, null, 2), "utf8");
}

export function enumerateNights(checkInISO: string, checkOutISO: string) {
  const checkIn = utcDateFromISO(checkInISO);
  const checkOut = utcDateFromISO(checkOutISO);
  if (!checkIn || !checkOut) return [];
  const nights: string[] = [];
  for (let d = checkIn; d.getTime() < checkOut.getTime(); d = addDaysUTC(d, 1)) {
    nights.push(isoFromUTCDate(d));
  }
  nights.pop();
  return nights;
}

export function overlaps(aIn: string, aOut: string, bIn: string, bOut: string) {
  const ai = utcDateFromISO(aIn);
  const ao = utcDateFromISO(aOut);
  const bi = utcDateFromISO(bIn);
  const bo = utcDateFromISO(bOut);
  if (!ai || !ao || !bi || !bo) return false;
  return ai.getTime() < bo.getTime() && bi.getTime() < ao.getTime();
}

export async function createBooking(input: BookingRequestInput) {
  const bookings = await listBookings();

  const conflict = bookings.some(
    (b) =>
      b.suite === input.suite &&
      b.status !== "cancelled" &&
      overlaps(input.checkIn, input.checkOut, b.checkIn, b.checkOut)
  );
  if (conflict) {
    return { ok: false as const, error: "date_unavailable" as const };
  }

  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `b_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;

  const record: BookingRecord = {
    id,
    suite: input.suite,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    guests: input.guests,
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    notes: input.notes,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await saveBookings([record, ...bookings]);
  return { ok: true as const, booking: record };
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  const bookings = await listBookings();
  const next = bookings.map((b) => (b.id === id ? { ...b, status } : b));
  const changed = bookings.some((b) => b.id === id);
  if (!changed) return { ok: false as const, error: "not_found" as const };
  await saveBookings(next);
  return { ok: true as const };
}

export async function deleteBooking(id: string) {
  const bookings = await listBookings();
  const next = bookings.filter((b) => b.id !== id);
  if (next.length === bookings.length) {
    return { ok: false as const, error: "not_found" as const };
  }
  await saveBookings(next);
  return { ok: true as const };
}

export async function createBlockBooking(args: {
  suite: SuiteSlug;
  checkIn: string;
  checkOut: string;
  notes?: string;
}) {
  const bookings = await listBookings();

  const conflict = bookings.some(
    (b) =>
      b.suite === args.suite &&
      b.status !== "cancelled" &&
      overlaps(args.checkIn, args.checkOut, b.checkIn, b.checkOut)
  );
  if (conflict) {
    return { ok: false as const, error: "date_unavailable" as const };
  }

  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `blk_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;

  const record: BookingRecord = {
    id,
    suite: args.suite,
    checkIn: args.checkIn,
    checkOut: args.checkOut,
    guests: 0,
    fullName: "BLOCK",
    email: "block@noir.local",
    phone: "-",
    notes: args.notes,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  await saveBookings([record, ...bookings]);
  return { ok: true as const, booking: record };
}

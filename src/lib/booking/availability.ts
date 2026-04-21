import { addDaysUTC, daysInMonthUTC, isoFromUTCDate, startOfMonthUTC, utcDateFromISO } from "@/lib/booking/date";
import { listBookings } from "@/lib/booking/store";
import { type SuiteSlug } from "@/lib/booking/types";

export async function getBookedDatesForMonth(args: {
  suite: SuiteSlug;
  year: number;
  monthIndex: number;
}) {
  const { suite, year, monthIndex } = args;
  const monthStart = startOfMonthUTC(year, monthIndex);
  const monthEnd = addDaysUTC(monthStart, daysInMonthUTC(year, monthIndex));

  const bookings = await listBookings();
  const booked = new Set<string>();

  for (const b of bookings) {
    if (b.suite !== suite) continue;
    if (b.status === "cancelled") continue;

    const inD = utcDateFromISO(b.checkIn);
    const outD = utcDateFromISO(b.checkOut);
    if (!inD || !outD) continue;

    const start = inD.getTime() < monthStart.getTime() ? monthStart : inD;
    const end = outD.getTime() > monthEnd.getTime() ? monthEnd : outD;

    for (let d = start; d.getTime() < end.getTime(); d = addDaysUTC(d, 1)) {
      const iso = isoFromUTCDate(d);
      booked.add(iso);
    }

    booked.delete(b.checkOut);
  }

  return Array.from(booked).sort();
}


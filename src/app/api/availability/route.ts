import { NextResponse } from "next/server";
import { getBookedDatesForMonth } from "@/lib/booking/availability";
import { clamp } from "@/lib/booking/date";
import { type SuiteSlug } from "@/lib/booking/types";

function isSuiteSlug(s: string | null): s is SuiteSlug {
  return s === "passion" || s === "infinity";
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const suiteParam = url.searchParams.get("suite");
  const monthParam = url.searchParams.get("month");

  if (!isSuiteSlug(suiteParam) || !monthParam) {
    return NextResponse.json(
      { ok: false, error: "bad_request" },
      { status: 400 }
    );
  }

  const m = /^(\d{4})-(\d{2})$/.exec(monthParam);
  if (!m) {
    return NextResponse.json(
      { ok: false, error: "bad_request" },
      { status: 400 }
    );
  }

  const year = clamp(Number(m[1]), 2020, 2099);
  const monthIndex = clamp(Number(m[2]) - 1, 0, 11);

  const bookedDates = await getBookedDatesForMonth({
    suite: suiteParam,
    year,
    monthIndex,
  });

  return NextResponse.json({
    ok: true,
    suite: suiteParam,
    month: `${year}-${String(monthIndex + 1).padStart(2, "0")}`,
    bookedDates,
  });
}


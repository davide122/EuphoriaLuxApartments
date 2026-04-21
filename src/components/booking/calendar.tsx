"use client";

import { ChevronLeft, ChevronRight, MoonStar } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  addDaysUTC,
  daysInMonthUTC,
  isoFromUTCDate,
  pad2,
  startOfMonthUTC,
  utcDateFromISO,
} from "@/lib/booking/date";
import { type SuiteSlug } from "@/lib/booking/types";

type MonthKey = `${number}-${string}`;

function monthKeyFromUTC(year: number, monthIndex: number): MonthKey {
  return `${year}-${pad2(monthIndex + 1)}` as MonthKey;
}

function weekdayIndexUTC(d: Date) {
  const w = d.getUTCDay();
  return (w + 6) % 7;
}

function buildMonthCells(year: number, monthIndex: number) {
  const start = startOfMonthUTC(year, monthIndex);
  const days = daysInMonthUTC(year, monthIndex);
  const lead = weekdayIndexUTC(start);

  const cells: Array<{ date: Date | null; iso?: string }> = [];
  for (let i = 0; i < lead; i++) cells.push({ date: null });
  for (let day = 1; day <= days; day++) {
    const d = new Date(Date.UTC(year, monthIndex, day));
    cells.push({ date: d, iso: isoFromUTCDate(d) });
  }
  while (cells.length % 7 !== 0) cells.push({ date: null });
  while (cells.length < 42) cells.push({ date: null });
  return cells;
}

function inRange(iso: string, start: string, end: string) {
  return iso >= start && iso < end;
}

function rangeHasBooked(
  startISO: string,
  endISO: string,
  booked: Set<string>
) {
  const s = utcDateFromISO(startISO);
  const e = utcDateFromISO(endISO);
  if (!s || !e) return true;
  for (let d = s; d.getTime() < e.getTime(); d = addDaysUTC(d, 1)) {
    const iso = isoFromUTCDate(d);
    if (booked.has(iso)) return true;
  }
  return false;
}

export function BookingCalendar({
  suite,
  value,
  onChange,
}: {
  suite: SuiteSlug;
  value: { checkIn: string | null; checkOut: string | null };
  onChange: (v: { checkIn: string | null; checkOut: string | null }) => void;
}) {
  const [year, setYear] = useState(() => new Date().getUTCFullYear());
  const [monthIndex, setMonthIndex] = useState(() => new Date().getUTCMonth());
  const [bookedByMonth, setBookedByMonth] = useState<Record<string, string[]>>(
    {}
  );
  const [loading, setLoading] = useState(false);

  const month = useMemo(() => monthKeyFromUTC(year, monthIndex), [year, monthIndex]);
  const cells = useMemo(() => buildMonthCells(year, monthIndex), [year, monthIndex]);
  const bookedSet = useMemo(() => new Set(bookedByMonth[month] ?? []), [bookedByMonth, month]);

  const todayISO = useMemo(() => {
    const now = new Date();
    const t = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    return isoFromUTCDate(t);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      const res = await fetch(`/api/availability?suite=${suite}&month=${month}`, {
        cache: "no-store",
      }).catch(() => null);
      if (!res || !res.ok) {
        if (!cancelled) setLoading(false);
        return;
      }
      const json = (await res.json()) as { ok: boolean; bookedDates?: string[] };
      if (!cancelled && json.ok) {
        setBookedByMonth((prev) => ({ ...prev, [month]: json.bookedDates ?? [] }));
        setLoading(false);
      }
    };
    if (!bookedByMonth[month]) run();
    return () => {
      cancelled = true;
    };
  }, [suite, month, bookedByMonth]);

  const headerLabel = useMemo(() => {
    const d = startOfMonthUTC(year, monthIndex);
    return d.toLocaleString("it-IT", { month: "long", year: "numeric", timeZone: "UTC" });
  }, [year, monthIndex]);

  const clickDay = (iso: string) => {
    if (iso < todayISO) return;
    if (bookedSet.has(iso)) return;

    const { checkIn, checkOut } = value;
    if (!checkIn || (checkIn && checkOut)) {
      onChange({ checkIn: iso, checkOut: null });
      return;
    }

    if (iso <= checkIn) {
      onChange({ checkIn: iso, checkOut: null });
      return;
    }

    const hasBooked = rangeHasBooked(checkIn, iso, new Set(bookedSet));
    if (hasBooked) {
      onChange({ checkIn: iso, checkOut: null });
      return;
    }
    onChange({ checkIn, checkOut: iso });
  };

  const nextMonth = () => {
    const n = monthIndex + 1;
    if (n > 11) {
      setMonthIndex(0);
      setYear((y) => y + 1);
      return;
    }
    setMonthIndex(n);
  };

  const prevMonth = () => {
    const p = monthIndex - 1;
    if (p < 0) {
      setMonthIndex(11);
      setYear((y) => y - 1);
      return;
    }
    setMonthIndex(p);
  };

  return (
    <div className="noir-panel p-7 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <MoonStar className="h-5 w-5 text-noir-aqua" />
          </span>
          <div>
            <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
              Calendario
            </div>
            <div className="mt-1 text-base font-medium text-noir-mist">
              {headerLabel}
              {loading ? <span className="ml-3 text-noir-mist/40">…</span> : null}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevMonth}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.08]"
            aria-label="Mese precedente"
          >
            <ChevronLeft className="h-5 w-5 text-noir-mist/80" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.08]"
            aria-label="Mese successivo"
          >
            <ChevronRight className="h-5 w-5 text-noir-mist/80" />
          </button>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-7 gap-2 text-xs tracking-[0.22em] uppercase text-noir-mist/45">
        {["L", "M", "M", "G", "V", "S", "D"].map((d) => (
          <div key={d} className="px-2">
            {d}
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-7 gap-2">
        {cells.map((c, idx) => {
          if (!c.date || !c.iso) {
            return <div key={idx} className="h-10 sm:h-11" />;
          }

          const iso = c.iso;
          const isPast = iso < todayISO;
          const isBooked = bookedSet.has(iso);

          const isStart = value.checkIn === iso;
          const isEnd = value.checkOut === iso;
          const isIn =
            value.checkIn && value.checkOut
              ? inRange(iso, value.checkIn, value.checkOut)
              : false;

          const disabled = isPast || isBooked;

          return (
            <button
              key={iso}
              type="button"
              onClick={() => clickDay(iso)}
              disabled={disabled}
              className={[
                "h-10 sm:h-11 rounded-2xl border px-2 text-sm transition",
                disabled
                  ? "border-white/5 bg-white/[0.03] text-noir-mist/25"
                  : "border-white/10 bg-white/5 text-noir-mist/85 hover:border-white/22 hover:bg-white/[0.08]",
                isIn ? "bg-white/[0.07] border-white/16" : "",
                isStart || isEnd ? "border-white/28 bg-white/10" : "",
                isBooked ? "line-through" : "",
              ].join(" ")}
              aria-label={iso}
            >
              {Number(iso.slice(-2))}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="text-noir-muted">
          {value.checkIn ? (
            value.checkOut ? (
              <span>
                Check‑in <span className="text-noir-mist/85">{value.checkIn}</span>{" "}
                · Check‑out <span className="text-noir-mist/85">{value.checkOut}</span>
              </span>
            ) : (
              <span>
                Check‑in <span className="text-noir-mist/85">{value.checkIn}</span>{" "}
                · scegli il check‑out
              </span>
            )
          ) : (
            "Seleziona check‑in e check‑out"
          )}
        </div>
        <button
          type="button"
          onClick={() => onChange({ checkIn: null, checkOut: null })}
          className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs tracking-[0.22em] uppercase text-noir-mist/70 transition hover:border-white/22 hover:bg-white/[0.08]"
        >
          Pulisci
        </button>
      </div>
    </div>
  );
}

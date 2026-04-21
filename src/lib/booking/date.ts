export function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function isoFromUTCDate(d: Date) {
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
}

export function utcDateFromISO(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const day = Number(m[3]);
  const d = new Date(Date.UTC(y, mo, day));
  if (
    d.getUTCFullYear() !== y ||
    d.getUTCMonth() !== mo ||
    d.getUTCDate() !== day
  ) {
    return null;
  }
  return d;
}

export function addDaysUTC(d: Date, days: number) {
  return new Date(d.getTime() + days * 86400000);
}

export function startOfMonthUTC(year: number, monthIndex: number) {
  return new Date(Date.UTC(year, monthIndex, 1));
}

export function daysInMonthUTC(year: number, monthIndex: number) {
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}


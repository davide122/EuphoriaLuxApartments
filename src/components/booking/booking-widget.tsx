"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Mail, Phone, Sparkles, User } from "lucide-react";
import { useMemo, useState } from "react";
import { BookingCalendar } from "@/components/booking/calendar";
import { noir, suites } from "@/lib/noir";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { utcDateFromISO } from "@/lib/booking/date";
import { type SuiteSlug } from "@/lib/booking/types";
import { trackEvent } from "@/lib/analytics";

function nightsBetween(checkIn: string, checkOut: string) {
  const a = utcDateFromISO(checkIn);
  const b = utcDateFromISO(checkOut);
  if (!a || !b) return 0;
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function isSuiteSlug(s: unknown): s is SuiteSlug {
  return s === "passion" || s === "infinity";
}

export function BookingWidget({
  initialSuite,
}: {
  initialSuite?: string | null;
}) {
  const initial = isSuiteSlug(initialSuite) ? initialSuite : "passion";
  const [suite, setSuite] = useState<SuiteSlug>(initial);
  const [dates, setDates] = useState<{ checkIn: string | null; checkOut: string | null }>({
    checkIn: null,
    checkOut: null,
  });

  const [guests, setGuests] = useState(2);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: true; id: string } | { ok: false; error: string } | null>(null);

  const suiteObj = useMemo(() => suites.find((s) => s.slug === suite) ?? suites[0], [suite]);
  const nights = dates.checkIn && dates.checkOut ? nightsBetween(dates.checkIn, dates.checkOut) : 0;
  const whatsappHref = useMemo(() => {
    const base = noir.contacts.whatsapp;
    const ci = dates.checkIn ?? "__/__/__";
    const co = dates.checkOut ?? "__/__/__";
    const message = `Ciao, vorrei verificare disponibilità per ${suiteObj.name}. Date: ${ci} → ${co}. Siamo in ${guests}. Grazie.`;
    return base + `?text=${encodeURIComponent(message)}`;
  }, [dates.checkIn, dates.checkOut, guests, suiteObj.name]);
  const canSubmit =
    !!dates.checkIn &&
    !!dates.checkOut &&
    nights >= 1 &&
    fullName.trim().length >= 2 &&
    email.trim().length >= 5 &&
    phone.trim().length >= 6 &&
    !submitting;

  const submit = async () => {
    if (!dates.checkIn || !dates.checkOut) return;
    trackEvent({
      name: "booking_submit",
      params: {
        suite,
        checkIn: dates.checkIn,
        checkOut: dates.checkOut,
        guests,
      },
    });
    setSubmitting(true);
    setResult(null);

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        suite,
        checkIn: dates.checkIn,
        checkOut: dates.checkOut,
        guests,
        fullName,
        email,
        phone,
        notes,
      }),
    }).catch(() => null);

    if (!res) {
      setSubmitting(false);
      setResult({ ok: false, error: "network" });
      trackEvent({
        name: "booking_submit_error",
        params: { suite, reason: "network" },
      });
      return;
    }

    const json = (await res.json().catch(() => null)) as
      | { ok: true; booking: { id: string } }
      | { ok: false; error: string }
      | null;

    setSubmitting(false);
    if (json && json.ok) {
      setResult({ ok: true, id: json.booking.id });
      trackEvent({
        name: "booking_submit_success",
        params: { suite, id: json.booking.id },
      });
      return;
    }
    const error = (json && !json.ok && json.error) || "unknown";
    setResult({ ok: false, error });
    trackEvent({
      name: "booking_submit_error",
      params: { suite, reason: error },
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="noir-panel noir-glow p-7 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                <Sparkles className="h-4 w-4 text-noir-aqua" />
                Prenotazione
              </div>
              <div className="noir-h1 mt-4 text-4xl leading-[1.02] text-noir-mist sm:text-5xl">
                Scegli le date.
              </div>
              <div className="mt-4 text-base leading-7 text-noir-muted">
                Da €{noir.startingFrom}/notte · {noir.smartAccess}. Verifica disponibilità per{" "}
                <span className="text-noir-mist/85">{suiteObj.name}</span>, poi invia la richiesta.
              </div>
            </div>

            <div className="grid gap-2">
              <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                Suite
              </div>
              <div className="flex gap-2">
                {suites.map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => {
                      setSuite(s.slug);
                      setDates({ checkIn: null, checkOut: null });
                      setResult(null);
                    }}
                    className={[
                      "rounded-full border px-4 py-2 text-xs tracking-[0.22em] uppercase transition",
                      suite === s.slug
                        ? "border-white/22 bg-white/10 text-noir-mist"
                        : "border-white/10 bg-white/5 text-noir-mist/70 hover:border-white/18 hover:bg-white/[0.08]",
                    ].join(" ")}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <BookingCalendar suite={suite} value={dates} onChange={(v) => setDates(v)} />
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="noir-panel noir-glow p-7 sm:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                Dettagli
              </div>
              <div className="mt-3 text-base font-medium text-noir-mist">
                {suiteObj.name}
              </div>
              <div className="mt-2 text-sm leading-6 text-noir-muted">
                {suiteObj.tagline}
              </div>
            </div>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <CalendarCheck className="h-5 w-5 text-noir-aqua" />
            </span>
          </div>

          <div className="mt-7 grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
              <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                Soggiorno
              </div>
              <div className="mt-2 text-sm text-noir-mist/80">
                {dates.checkIn && dates.checkOut ? (
                  <span>
                    {dates.checkIn} → {dates.checkOut} · {nights} notti
                  </span>
                ) : (
                  <span>Seleziona le date nel calendario</span>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
              <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                Ospiti
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="text-sm text-noir-mist/80">Numero ospiti</div>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-noir-mist/80 outline-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-3">
            <label className="grid gap-2">
              <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                Nome e cognome
              </div>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-noir-mist/40" />
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-11 w-full rounded-full border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-noir-mist/85 outline-none transition focus:border-white/24"
                  placeholder="Es. Davide Rossi"
                  autoComplete="name"
                />
              </div>
            </label>

            <label className="grid gap-2">
              <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                Email
              </div>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-noir-mist/40" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-full border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-noir-mist/85 outline-none transition focus:border-white/24"
                  placeholder="Es. nome@email.it"
                  autoComplete="email"
                />
              </div>
            </label>

            <label className="grid gap-2">
              <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                Telefono / WhatsApp
              </div>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-noir-mist/40" />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-11 w-full rounded-full border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-noir-mist/85 outline-none transition focus:border-white/24"
                  placeholder="Es. +39 3xx xxx xxxx"
                  autoComplete="tel"
                />
              </div>
            </label>

            <label className="grid gap-2">
              <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                Note (opzionale)
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-24 w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-noir-mist/85 outline-none transition focus:border-white/24"
                placeholder="Es. orario di arrivo, richieste particolari…"
              />
            </label>
          </div>

          <div className="mt-7 grid gap-3">
            <NoirAnchor
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              variant="primary"
              className="w-full justify-center py-3.5"
            >
              Verifica disponibilità su WhatsApp
            </NoirAnchor>
            <button
              type="button"
              onClick={submit}
              disabled={!canSubmit}
              className={[
                "noir-button w-full justify-center py-3.5",
                !canSubmit ? "opacity-50" : "",
              ].join(" ")}
            >
              {submitting ? "Invio in corso…" : "Invia richiesta di prenotazione"}
            </button>

            {result ? (
              result.ok ? (
                <motion.div
                  initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-noir-mist/80"
                >
                  Richiesta inviata. Codice <span className="text-noir-mist">{result.id}</span>. Ti contattiamo a breve per conferma.
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-noir-mist/80"
                >
                  {result.error === "date_unavailable"
                    ? "Quelle date non sono più disponibili. Prova un’altra combinazione."
                    : "Non siamo riusciti a inviare la richiesta. Riprova tra poco."}
                </motion.div>
              )
            ) : null}

            <div className="text-xs leading-5 text-noir-mist/45">
              Questo è un sistema di richiesta prenotazione: la disponibilità viene confermata via WhatsApp/telefono. Per una risposta più veloce, usa WhatsApp.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

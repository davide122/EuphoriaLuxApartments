"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  Check,
  Mail,
  Phone,
  Sparkles,
  User,
  Users,
  Bath,
  Flame,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
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
  const formStarted = useRef(false);

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
      params: { suite, checkIn: dates.checkIn, checkOut: dates.checkOut, guests },
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
      trackEvent({ name: "booking_submit_error", params: { suite, reason: "network" } });
      return;
    }
    const json = (await res.json().catch(() => null)) as
      | { ok: true; booking: { id: string } }
      | { ok: false; error: string }
      | null;
    setSubmitting(false);
    if (json && json.ok) {
      setResult({ ok: true, id: json.booking.id });
      trackEvent({ name: "booking_submit_success", params: { suite, id: json.booking.id } });
      return;
    }
    const error = (json && !json.ok && json.error) || "unknown";
    setResult({ ok: false, error });
    trackEvent({ name: "booking_submit_error", params: { suite, reason: error } });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* COLONNA SINISTRA: Calendario + Scelta suite */}
      <div className="lg:col-span-7">
        <div className="noir-panel noir-glow p-5 sm:p-7">
          {/* HEADER — COMPATTO */}
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-noir-mist/55 sm:text-xs">
                <Sparkles className="h-3 w-3 text-noir-aqua" />
                Prenotazione
              </div>
              <h1 className="noir-display mt-3 text-2xl font-semibold leading-tight text-noir-mist sm:text-3xl md:text-4xl">
                Verifica disponibilità
              </h1>
              <div className="mt-2 text-xs text-noir-muted sm:text-sm">
                Da €{noir.startingFrom}/notte · Jacuzzi + sauna incluse
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <CalendarCheck className="h-4 w-4 text-noir-aqua" />
              </span>
            </div>
          </div>

          {/* SCELTA SUITE — 2 CARD GRANDI (mobile 100%, desktop affiancate) */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {suites.map((s) => {
              const selected = s.slug === suite;
              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => {
                    setSuite(s.slug);
                    setDates({ checkIn: null, checkOut: null });
                    setResult(null);
                    trackEvent({ name: "booking_suite_select", params: { suite: s.slug } });
                  }}
                  className={`group relative overflow-hidden rounded-2xl border text-left transition-all ${
                    selected
                      ? "border-purple-500/40 bg-white/[0.04] shadow-[0_20px_70px_-22px_rgba(168,85,247,0.55)]"
                      : "border-white/8 bg-white/[0.015] hover:border-white/14 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="grid grid-cols-[84px_1fr] items-center gap-3 p-3 sm:grid-cols-[110px_1fr] sm:gap-4 sm:p-4">
                    {/* Immagine suite */}
                    <div className="relative h-20 w-20 flex-none overflow-hidden rounded-xl sm:h-24 sm:w-28">
                      <Image
                        src={s.preview}
                        alt={`${s.name} preview`}
                        fill
                        sizes="140px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      {selected && (
                        <span className="absolute left-2 top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-[11px] text-white shadow">
                          <Check className="h-3 w-3" strokeWidth={2.8} />
                        </span>
                      )}
                    </div>
                    {/* Info suite (POCO TESTO) */}
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="noir-display truncate text-base font-semibold text-white sm:text-lg">
                          {s.name}
                        </div>
                        <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500 sm:text-xs">
                          {s.size}
                        </div>
                      </div>
                      <p className="mt-1 line-clamp-1 truncate text-[11px] text-zinc-400 sm:text-xs sm:leading-snug">
                        {s.mood}
                      </p>
                      <div className="mt-2.5 flex items-center gap-3 text-[10px] text-zinc-300 sm:text-xs">
                        <span className="inline-flex items-center gap-1.5">
                          <Bath className="h-3 w-3 text-noir-aqua" strokeWidth={1.9} />
                          Jacuzzi
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Flame className="h-3 w-3 text-amber-200" strokeWidth={1.9} />
                          Sauna
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* CALENDARIO */}
          <div className="mt-7">
            <BookingCalendar
              suite={suite}
              value={dates}
              onChange={(value) => {
                setDates(value);
                trackEvent({
                  name: value.checkOut ? "booking_dates_complete" : "booking_date_start",
                  params: { suite, step: value.checkOut ? "complete" : "check_in" },
                });
              }}
            />
          </div>
        </div>
      </div>

      {/* COLONNA DESTRA: Dati + Form */}
      <div className="lg:col-span-5">
        <div className="grid gap-5">
          {/* RIEPILOGO VELOCE — IN ALTO */}
          <div className="noir-panel noir-glow overflow-hidden p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="relative h-14 w-14 flex-none overflow-hidden rounded-2xl sm:h-16 sm:w-16">
                <Image
                  src={suiteObj.preview}
                  alt={suiteObj.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="noir-display truncate text-lg font-semibold text-white">
                    {suiteObj.name}
                  </div>
                  <span className="inline-flex h-6 items-center rounded-full border border-white/10 bg-white/[0.03] px-2 text-[10px] uppercase tracking-[0.14em] text-zinc-400 sm:text-xs">
                    {suiteObj.size}
                  </span>
                </div>
                <div className="mt-1.5 grid gap-2 text-[12px] sm:grid-cols-2 sm:text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <CalendarCheck className="h-3 w-3 text-noir-aqua" strokeWidth={1.8} />
                    <span className="truncate">
                      {dates.checkIn && dates.checkOut ? (
                        <>
                          {dates.checkIn} → {dates.checkOut}
                        </>
                      ) : (
                        "Scegli le date"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Users className="h-3 w-3 text-purple-200" strokeWidth={1.8} />
                    <span>{guests} ospiti · {nights || "—"} notti</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div
            className="noir-panel noir-glow p-5 sm:p-6"
            onFocusCapture={() => {
              if (formStarted.current) return;
              formStarted.current = true;
              trackEvent({ name: "booking_form_start", params: { suite } });
            }}
          >
            <div className="grid gap-3.5 sm:gap-4">
              <Input
                icon={<User className="h-4 w-4 text-noir-mist/40" />}
                label="Nome"
                value={fullName}
                onChange={setFullName}
                placeholder="Es. Davide Rossi"
                autoComplete="name"
              />
              <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
                <Input
                  icon={<Mail className="h-4 w-4 text-noir-mist/40" />}
                  label="Email"
                  value={email}
                  onChange={setEmail}
                  placeholder="nome@email.it"
                  autoComplete="email"
                />
                <Input
                  icon={<Phone className="h-4 w-4 text-noir-mist/40" />}
                  label="Telefono"
                  value={phone}
                  onChange={setPhone}
                  placeholder="+39 3xx xxx xxxx"
                  autoComplete="tel"
                />
              </div>

              <div>
                <div className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-noir-mist/50">
                  Ospiti
                </div>
                <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5">
                  <span className="text-xs text-zinc-400">Persone incluse</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setGuests((n) => Math.max(1, n - 1))}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/5 hover:text-white"
                      aria-label="Meno ospiti"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-white">
                      {guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests((n) => Math.min(6, n + 1))}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/5 hover:text-white"
                      aria-label="Più ospiti"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.16em] text-noir-mist/50">
                  Note <span className="text-zinc-600">(opzionale)</span>
                </span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="min-h-[72px] w-full resize-none rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-noir-mist/85 placeholder:text-zinc-600 outline-none transition focus:border-white/22"
                  placeholder="Es. orario di arrivo…"
                />
              </label>
            </div>

            {/* BOTTONI */}
            <div className="mt-6 grid gap-2.5">
              <NoirAnchor
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                variant="primary"
                className="w-full justify-center py-3.5"
                track={{
                  name: "whatsapp_click",
                  params: { source: "booking_widget", label: "Verifica disponibilità" },
                }}
              >
                Verifica su WhatsApp
              </NoirAnchor>
              <button
                type="button"
                onClick={submit}
                disabled={!canSubmit}
                className={`noir-button w-full justify-center py-3.5 text-sm ${!canSubmit ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                {submitting ? "Invio in corso…" : "Invia richiesta"}
              </button>

              {result ? (
                result.ok ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] px-5 py-4 text-xs sm:text-sm text-emerald-100/90"
                  >
                    Richiesta inviata · ID <span className="font-semibold">{result.id}</span>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] px-5 py-4 text-xs sm:text-sm text-rose-100/90"
                  >
                    {result.error === "date_unavailable"
                      ? "Date non disponibili, riprova."
                      : "Riprova tra un attimo."}
                  </motion.div>
                )
              ) : null}

              <p className="pt-1 text-[10.5px] leading-5 text-noir-mist/45 sm:text-[11px]">
                Conferma via WhatsApp entro 12h lavorative.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({
  icon,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.16em] text-noir-mist/50">
        {label}
      </span>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
          {icon}
        </span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full rounded-full border border-white/10 bg-white/[0.02] pl-11 pr-4 text-sm text-noir-mist/85 placeholder:text-zinc-600 outline-none transition focus:border-white/22"
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
      </div>
    </label>
  );
}

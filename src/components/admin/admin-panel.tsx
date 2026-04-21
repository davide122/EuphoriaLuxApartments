"use client";

import { motion } from "framer-motion";
import {
  Check,
  Lock,
  LogOut,
  Shield,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { type BookingRecord, type BookingStatus } from "@/lib/booking/types";
import { suites } from "@/lib/noir";

type View = "pending" | "confirmed" | "cancelled";

function fmtSuite(slug: string) {
  return suites.find((s) => s.slug === slug)?.name ?? slug;
}

function fmtStatus(s: BookingStatus) {
  if (s === "confirmed") return "Confermata";
  if (s === "cancelled") return "Cancellata";
  return "In attesa";
}

export function AdminPanel() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [view, setView] = useState<View>("pending");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setMsg(null);
    const res = await fetch("/api/admin/bookings", { cache: "no-store" }).catch(
      () => null
    );
    if (!res) {
      setLoading(false);
      setAuthed(false);
      setMsg("Errore di rete.");
      return;
    }
    if (res.status === 401) {
      setLoading(false);
      setAuthed(false);
      return;
    }
    const json = (await res.json().catch(() => null)) as
      | { ok: true; bookings: BookingRecord[] }
      | { ok: false; error: string }
      | null;
    setLoading(false);
    if (json && json.ok) {
      setAuthed(true);
      setBookings(json.bookings);
      return;
    }
    setAuthed(false);
    setMsg("Non configurato: imposta NOIR_ADMIN_PASSWORD e NOIR_ADMIN_TOKEN.");
  };

  useEffect(() => {
    const id = window.setTimeout(() => {
      void load();
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const login = async () => {
    setLoading(true);
    setMsg(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    }).catch(() => null);
    setLoading(false);
    if (!res) {
      setMsg("Errore di rete.");
      return;
    }
    if (!res.ok) {
      const j = (await res.json().catch(() => null)) as
        | { ok: false; error: string }
        | null;
      setMsg(
        j?.error === "not_configured"
          ? "Non configurato: imposta NOIR_ADMIN_PASSWORD e NOIR_ADMIN_TOKEN."
          : "Password errata."
      );
      return;
    }
    setPassword("");
    await load();
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    setAuthed(false);
    setBookings([]);
  };

  const setStatus = async (id: string, status: BookingStatus) => {
    setLoading(true);
    setMsg(null);
    const res = await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    }).catch(() => null);
    setLoading(false);
    if (!res || !res.ok) {
      setMsg("Operazione non riuscita.");
      return;
    }
    await load();
  };

  const remove = async (id: string) => {
    setLoading(true);
    setMsg(null);
    const res = await fetch(`/api/admin/bookings/${id}`, {
      method: "DELETE",
    }).catch(() => null);
    setLoading(false);
    if (!res || !res.ok) {
      setMsg("Operazione non riuscita.");
      return;
    }
    await load();
  };

  const blockDates = async (suite: string, checkIn: string, checkOut: string) => {
    setLoading(true);
    setMsg(null);
    const res = await fetch("/api/admin/blocks", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ suite, checkIn, checkOut, notes: "ADMIN BLOCK" }),
    }).catch(() => null);
    setLoading(false);
    if (!res) {
      setMsg("Errore di rete.");
      return;
    }
    if (!res.ok) {
      setMsg("Date non disponibili o richiesta non valida.");
      return;
    }
    await load();
  };

  const filtered = useMemo(() => {
    const list = bookings.filter((b) => b.status === view);
    return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [bookings, view]);

  const counts = useMemo(() => {
    const c = { pending: 0, confirmed: 0, cancelled: 0 };
    for (const b of bookings) c[b.status] += 1;
    return c;
  }, [bookings]);

  const [blkSuite, setBlkSuite] = useState("passion");
  const [blkIn, setBlkIn] = useState("");
  const [blkOut, setBlkOut] = useState("");

  return (
    <div className="grid gap-6">
      <div className="noir-panel noir-glow p-7 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.26em] uppercase text-noir-mist/55">
              <Shield className="h-4 w-4 text-noir-aqua" />
              Admin
            </div>
            <div className="noir-h1 mt-4 text-4xl leading-[1.02] text-noir-mist sm:text-5xl">
              Prenotazioni
            </div>
            <div className="mt-4 text-base leading-7 text-noir-muted">
              Conferma, cancella o sblocca date in modo rapido.
            </div>
          </div>
          {authed ? (
            <button
              type="button"
              onClick={logout}
              className="noir-button rounded-full px-6 py-3"
            >
              <LogOut className="h-4 w-4 text-noir-aqua" />
              Logout
            </button>
          ) : null}
        </div>

        {authed === false ? (
          <div className="mt-8 grid gap-3 sm:max-w-md">
            <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
              Accesso
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-noir-mist/40" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="h-11 w-full rounded-full border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-noir-mist/85 outline-none transition focus:border-white/24"
                placeholder="Password admin"
              />
            </div>
            <button
              type="button"
              onClick={login}
              disabled={loading || password.trim().length < 3}
              className={`noir-button noir-button-primary w-fit px-7 py-3 ${
                loading || password.trim().length < 3 ? "opacity-60" : ""
              }`}
            >
              Entra
            </button>
          </div>
        ) : null}

        {authed ? (
          <div className="mt-8 grid gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { k: "pending", label: `In attesa (${counts.pending})` },
                  { k: "confirmed", label: `Confermate (${counts.confirmed})` },
                  { k: "cancelled", label: `Cancellate (${counts.cancelled})` },
                ] as const
              ).map((t) => (
                <button
                  key={t.k}
                  type="button"
                  onClick={() => setView(t.k)}
                  className={[
                    "rounded-full border px-4 py-2 text-xs tracking-[0.22em] uppercase transition",
                    view === t.k
                      ? "border-white/22 bg-white/10 text-noir-mist"
                      : "border-white/10 bg-white/5 text-noir-mist/70 hover:border-white/18 hover:bg-white/[0.08]",
                  ].join(" ")}
                >
                  {t.label}
                </button>
              ))}
              <div className="ml-auto text-xs tracking-[0.22em] uppercase text-noir-mist/45">
                {loading ? "Aggiornamento…" : "Live"}
              </div>
            </div>

            <div className="noir-panel p-6">
              <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                Blocca date (manuale)
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-12 md:items-end">
                <label className="md:col-span-3">
                  <div className="text-xs tracking-[0.22em] uppercase text-noir-mist/45">
                    Suite
                  </div>
                  <select
                    value={blkSuite}
                    onChange={(e) => setBlkSuite(e.target.value)}
                    className="mt-2 h-11 w-full rounded-full border border-white/10 bg-white/5 px-4 text-sm text-noir-mist/85 outline-none"
                  >
                    <option value="passion">Passion</option>
                    <option value="infinity">Infinity</option>
                  </select>
                </label>
                <label className="md:col-span-3">
                  <div className="text-xs tracking-[0.22em] uppercase text-noir-mist/45">
                    Check-in
                  </div>
                  <input
                    value={blkIn}
                    onChange={(e) => setBlkIn(e.target.value)}
                    placeholder="YYYY-MM-DD"
                    className="mt-2 h-11 w-full rounded-full border border-white/10 bg-white/5 px-4 text-sm text-noir-mist/85 outline-none"
                  />
                </label>
                <label className="md:col-span-3">
                  <div className="text-xs tracking-[0.22em] uppercase text-noir-mist/45">
                    Check-out
                  </div>
                  <input
                    value={blkOut}
                    onChange={(e) => setBlkOut(e.target.value)}
                    placeholder="YYYY-MM-DD"
                    className="mt-2 h-11 w-full rounded-full border border-white/10 bg-white/5 px-4 text-sm text-noir-mist/85 outline-none"
                  />
                </label>
                <div className="md:col-span-3">
                  <button
                    type="button"
                    onClick={() => blockDates(blkSuite, blkIn, blkOut)}
                    disabled={loading || blkIn.length !== 10 || blkOut.length !== 10}
                    className={`noir-button noir-button-primary w-full justify-center py-3 ${
                      loading || blkIn.length !== 10 || blkOut.length !== 10
                        ? "opacity-60"
                        : ""
                    }`}
                  >
                    Blocca
                  </button>
                </div>
              </div>
              <div className="mt-3 text-xs text-noir-mist/45">
                Per sbloccare: imposta lo stato su “Cancellata” o elimina il record.
              </div>
            </div>

            <div className="grid gap-3">
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-6 text-sm text-noir-mist/70">
                  Nessuna prenotazione in questa vista.
                </div>
              ) : null}

              {filtered.map((b) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="noir-panel p-6"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                        {fmtSuite(b.suite)} · {fmtStatus(b.status)}
                      </div>
                      <div className="mt-3 text-base font-medium text-noir-mist">
                        {b.checkIn} → {b.checkOut}
                        {b.guests ? (
                          <span className="text-noir-mist/55"> · {b.guests} ospiti</span>
                        ) : null}
                      </div>
                      <div className="mt-2 text-sm text-noir-muted">
                        {b.fullName} · {b.phone} · {b.email}
                      </div>
                      {b.notes ? (
                        <div className="mt-3 text-sm text-noir-mist/70">
                          {b.notes}
                        </div>
                      ) : null}
                      <div className="mt-3 text-xs tracking-[0.18em] uppercase text-noir-mist/40">
                        ID {b.id} · {new Date(b.createdAt).toLocaleString("it-IT")}
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2">
                      {b.status !== "confirmed" ? (
                        <button
                          type="button"
                          onClick={() => setStatus(b.id, "confirmed")}
                          className="noir-button noir-button-primary px-5 py-2.5"
                          disabled={loading}
                        >
                          <Check className="h-4 w-4 text-white/90" />
                          Conferma
                        </button>
                      ) : null}
                      {b.status !== "cancelled" ? (
                        <button
                          type="button"
                          onClick={() => setStatus(b.id, "cancelled")}
                          className="noir-button px-5 py-2.5"
                          disabled={loading}
                        >
                          <X className="h-4 w-4 text-noir-aqua" />
                          Cancella
                        </button>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => remove(b.id)}
                        className="noir-button px-5 py-2.5"
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4 text-noir-aqua" />
                        Elimina
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : null}

        {msg ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-noir-mist/80">
            {msg}
          </div>
        ) : null}
      </div>
    </div>
  );
}

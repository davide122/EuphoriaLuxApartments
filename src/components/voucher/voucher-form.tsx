"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Check,
  CheckCircle2,
  Gift,
  Mail,
  MessageCircle,
  Sparkles,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { euphoriaAddons, noir, vouchers, type VoucherSlug } from "@/lib/noir";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { GiftPreview } from "@/components/voucher/gift-preview";
import { giftThemes, type GiftDetails } from "@/lib/voucher/render-gift";
import { trackEvent } from "@/lib/analytics";

const ADDON_3D = euphoriaAddons[0]!;

function isVoucherSlug(s: unknown): s is VoucherSlug {
  return vouchers.some((v) => v.slug === s);
}

function priceText(v: (typeof vouchers)[number]) {
  if (v.slug === "custom") return v.priceLabel ?? "su misura";
  return `€${v.price}`;
}

export function VoucherForm() {
  const [theme, setTheme] = useState<GiftDetails["theme"]>("romance");
  const [voucher, setVoucher] = useState<VoucherSlug>("medium");
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [dedica, setDedica] = useState(
    "A noi, al tempo che non basta mai e a quello che scegliamo di regalarci. Il mondo può aspettare. Tu ed io, no."
  );
  const [senderEmail] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [addon3d, setAddon3d] = useState(false);
  const [addon3dText, setAddon3dText] = useState("");
  const voucherObj = useMemo(
    () => vouchers.find((v) => v.slug === voucher) ?? vouchers[1],
    [voucher]
  );

  useEffect(() => {
    const select = (event: Event) => {
      const slug = (event as CustomEvent<unknown>).detail;
      if (isVoucherSlug(slug)) setVoucher(slug);
    };
    window.addEventListener("voucher-select", select);
    return () => window.removeEventListener("voucher-select", select);
  }, []);

  const giftDetails = useMemo<GiftDetails>(() => ({
    from: fromName, to: toName, message: dedica, theme,
    experience: voucherObj.name, duration: voucherObj.durationLabel,
  }), [fromName, toName, dedica, theme, voucherObj]);

  const canSend =
    fromName.trim().length >= 2 &&
    toName.trim().length >= 2 &&
    (toEmail.trim().length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(toEmail)) &&
    (senderEmail.trim().length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) &&
    (voucherObj.slug !== "custom" || notes.trim().length >= 5);

  const whatsappMsg = useMemo(() => {
    const price = priceText(voucherObj);
    const d = dedica.trim().length ? dedica.trim() : "— nessuna dedica —";
    const a3d = addon3d
      ? ` + Stampa3D (${addon3dText.trim() || "incisione da definire"})`
      : "";
    return `Ciao Euphoria, vorrei un voucher ${voucherObj.name} (${price})${a3d}.
— Da: ${fromName || "__"}
— A: ${toName || "__"}
— Email destinatario: ${toEmail || "__"}
— Mia email: ${senderEmail || "__"}
— Mio telefono: ${senderPhone || "__"}
— Dedica:
${d}
Note: ${notes || "—"}
Grazie!`;
  }, [voucherObj, fromName, toName, toEmail, dedica, senderEmail, senderPhone, notes, addon3d, addon3dText]);

  const onWhatsApp = () => {
    trackEvent({
      name: "voucher_whatsapp_click",
      params: { voucher: voucherObj.slug, from: fromName.length ? "filled" : "empty", addon3d },
    });
  };

  return (
    <div className="request-form mx-auto mt-10 grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!canSend) return;
            onWhatsApp();
            const url =
              noir.contacts.whatsapp + `?text=${encodeURIComponent(whatsappMsg)}`;
            window.open(url, "_blank", "noopener,noreferrer");
          }}
          className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-purple-200/70">
            <Sparkles className="h-3.5 w-3.5 text-purple-300" />
            Dettagli voucher
          </div>
          <fieldset>
            <legend className="mb-3 text-sm text-zinc-400">1 · Scegli la taglia</legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {vouchers.map((v) => {
                const selected = v.slug === voucher;
                const Icon = v.icon as LucideIcon;
                return (
                  <label
                    key={v.slug}
                    className={`group relative flex cursor-pointer flex-col rounded-2xl border p-4 transition-all ${
                      selected
                        ? "border-purple-500/50 bg-purple-500/10 shadow-[0_0_0_1px_rgba(168,85,247,0.25)]"
                        : "border-white/5 bg-white/[0.02] hover:border-white/10"
                    }`}
                  >
                    <input
                      type="radio"
                      name="voucher"
                      value={v.slug}
                      checked={selected}
                      onChange={() => {
                        if (isVoucherSlug(v.slug)) setVoucher(v.slug);
                      }}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] ${v.iconAccent}`}
                      >
                        <Icon className="h-4.5 w-4.5" strokeWidth={1.7} />
                      </span>
                      {selected ? (
                        <CheckCircle2 className="h-4 w-4 text-purple-300" />
                      ) : (
                        <span className="h-2 w-2 rounded-full border border-white/20" />
                      )}
                    </div>
                    <div className="mt-3">
                      <div className="text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                        {v.name.replace("Euphoria ", "")}
                      </div>
                      <div className="noir-display mt-0.5 text-lg font-semibold text-white">
                        {priceText(v)}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-zinc-500">
                <Gift className="h-3.5 w-3.5" /> Da chi è
              </span>
              <input
                type="text"
                required
                minLength={2}
                maxLength={60}
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                placeholder="Tuo nome"
                className="mt-1 w-full rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-zinc-500">
                <Users className="h-3.5 w-3.5" /> A chi è
              </span>
              <input
                type="text"
                required
                minLength={2}
                maxLength={60}
                value={toName}
                onChange={(e) => setToName(e.target.value)}
                placeholder="Nome persona che riceve"
                className="mt-1 w-full rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-zinc-500">
                <Mail className="h-3.5 w-3.5" /> Email destinatario (opzionale)
              </span>
              <input
                type="email"
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
                placeholder="maria@email.it"
                className="mt-1 w-full rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-zinc-500">
                <UserPlus className="h-3.5 w-3.5" /> Tuo telefono
              </span>
              <input
                type="tel"
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                placeholder="+39 3xx xxx xxxx"
                className="mt-1 w-full rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10"
              />
            </label>
          </div>

          <fieldset className="mt-8">
            <legend className="mb-3 text-sm text-zinc-400">2 · Scegli l’atmosfera del regalo</legend>
            <div className="flex flex-wrap gap-2">
              {Object.entries(giftThemes).map(([key, option]) => <button key={key} type="button" aria-pressed={theme === key} onClick={() => setTheme(key as GiftDetails["theme"])} className={`min-h-11 rounded-full border px-4 py-2 text-sm transition focus-visible:outline-2 focus-visible:outline-purple-300 ${theme === key ? "border-[#d6b8a7] bg-[#d6b8a7]/15 text-[#f1d6c8]" : "border-white/10 text-zinc-400 hover:border-white/30"}`}>{option.label}</button>)}
            </div>
          </fieldset>
          <label className="mt-5 block">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-zinc-500">
              Dedica (quella che leggerà nel PDF)
            </span>
            <textarea
              maxLength={400}
              value={dedica}
              onChange={(e) => setDedica(e.target.value)}
              rows={4}
              placeholder="Una frase dentro il biglietto..."
              className="mt-1 w-full rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-sm leading-relaxed text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10"
            />
          </label>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <button type="button" className="min-h-11 text-sm text-purple-200 underline decoration-purple-300/30 underline-offset-4" onClick={() => setDedica(theme === "romance" ? "A noi, al tempo che non basta mai e a quello che scegliamo di regalarci. Il mondo può aspettare. Tu ed io, no." : theme === "celebrate" ? "Per tutto quello che sei e per i sorrisi che regali. Oggi lascia che sia qualcuno a prendersi cura di te. Questo momento è tuo." : "Metti in pausa i pensieri, dimentica l’orologio e respira. Ti regalo un po’ di tempo per te: non devi fare altro che viverlo.")}>Ispirami con una dedica</button>
            <span className="text-xs text-zinc-500">{dedica.length}/400 caratteri</span>
          </div>

          <label className="mt-5 block">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-zinc-500">
              Note {voucher === "custom" ? "(obbligatorie, almeno 5 caratteri)" : "(opzionale)"} — importo custom, dati particolari, giorno preferibile
            </span>
            <textarea
              required={voucher === "custom"}
              minLength={voucher === "custom" ? 5 : undefined}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Per Custom: importo, durata, dettagli..."
              className="mt-1 w-full rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10"
            />
          </label>

          {/* ADD-ON STAMPA 3D */}
          <div className="mt-7">
            <button
              type="button"
              onClick={() => {
                setAddon3d((prev) => !prev);
                if (!addon3d) trackEvent({ name: "voucher_addon_3d_toggle_on", params: { voucher: voucherObj.slug } });
              }}
              className={`relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border p-3.5 text-left transition sm:p-4 ${
                addon3d
                  ? "border-sky-500/35 bg-sky-500/[0.07]"
                  : "border-white/10 bg-white/[0.02] hover:border-sky-500/25 hover:bg-sky-500/[0.03]"
              }`}
            >
              <span
                className={`inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-white/10 backdrop-blur sm:h-11 sm:w-11 ${ADDON_3D.iconAccent} bg-white/[0.04]`}
              >
                <Box className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="noir-display truncate text-sm font-semibold text-white sm:text-base">
                    + {ADDON_3D.name}
                  </span>
                  <span className="inline-flex h-5 items-center rounded-full bg-sky-500/15 px-2 text-[10px] font-semibold text-sky-100">
                    +€{ADDON_3D.price}
                  </span>
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-zinc-400 sm:text-xs">
                  {ADDON_3D.tagline}
                </span>
              </span>
              <span
                className={`inline-flex h-6 w-6 flex-none items-center justify-center rounded-full border transition ${
                  addon3d
                    ? "border-sky-300 bg-sky-500 text-white"
                    : "border-white/15 bg-white/[0.03] text-transparent"
                }`}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={2.8} />
              </span>
            </button>
            {addon3d ? (
              <div className="mt-3 rounded-2xl border border-sky-500/15 bg-sky-500/[0.025] p-3.5 sm:p-4">
                <label className="block">
                  <span className="mb-1.5 flex items-center justify-between">
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-sky-100/80">
                      Cosa scriviamo sulla stampa?
                    </span>
                    <span className="text-[10px] text-zinc-500">{addon3dText.length}/50</span>
                  </span>
                  <input
                    value={addon3dText}
                    onChange={(e) => setAddon3dText(e.target.value.slice(0, 50))}
                    maxLength={50}
                    placeholder={ADDON_3D.examples[0]}
                    className="h-11 w-full rounded-full border border-white/10 bg-black/30 px-4 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-sky-500/40 focus:ring-2 focus:ring-sky-500/15"
                  />
                </label>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {ADDON_3D.examples.map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => setAddon3dText(ex)}
                      className="min-h-8 shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 text-[11px] text-zinc-300 transition hover:border-sky-500/30 hover:bg-sky-500/[0.05] hover:text-white"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <a href="#voucher-preview" className="mt-6 flex min-h-12 items-center justify-center rounded-xl border border-[#d6b8a7]/30 px-4 py-3 text-sm text-[#f1d6c8] lg:hidden">Guarda il regalo e genera il PDF di test ↓</a>

          {!canSend && <p className="mt-6 text-sm text-zinc-400">Inserisci il tuo nome e quello del destinatario (almeno 2 caratteri). Per un voucher custom, aggiungi almeno 5 caratteri nelle note. Controlla le email eventualmente inserite.</p>}

          <motion.button
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={!canSend}
            className="mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-purple-600 px-5 py-4 text-sm font-semibold text-white shadow-[0_0_50px_-10px_rgba(168,85,247,0.6)] transition hover:from-purple-400 hover:via-fuchsia-400 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:from-purple-500 disabled:hover:via-fuchsia-500 disabled:hover:to-purple-600 sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" />
            Conferma e parla con noi su WhatsApp
          </motion.button>
          <p className="mt-3 text-xs text-zinc-500">
            Il form non invia nessun pagamento. Riceverai link Stripe o coordinate bonifico via WhatsApp in 5 minuti.
          </p>
        </form>
      </div>

      <aside id="voucher-preview" className="lg:col-span-2">
        <div className="space-y-6">
          <GiftPreview details={giftDetails} />

          {/* RIEPILOGO COMPATTO */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="noir-display text-base font-semibold text-white">{voucherObj.name}</div>
              <div className="text-xs font-medium text-zinc-400">{priceText(voucherObj)}</div>
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-zinc-500">
              {voucherObj.durationLabel} · Da {fromName || "—"} a {toName || "—"}
            </div>
            <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            {addon3d ? (
              <div className="mt-3 flex items-center justify-between rounded-xl border border-sky-500/20 bg-sky-500/[0.06] px-3 py-2 text-[11px] text-sky-100 sm:text-xs">
                <span className="inline-flex items-center gap-1.5">
                  <Box className="h-3.5 w-3.5 text-sky-200" strokeWidth={1.9} />
                  Stampa 3D · {addon3dText.trim() || "incisione a scelta"}
                </span>
                <span className="font-semibold">+€{ADDON_3D.price}</span>
              </div>
            ) : null}
          </div>

          <NoirAnchor
            href={`${noir.contacts.whatsapp}?text=${encodeURIComponent(
              "Ciao, vorrei info per un voucher Euphoria: taglie, tempi di invio e metodi di pagamento."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            variant="ghost"
            className="w-full"
          >
            Informazioni veloci · WhatsApp
          </NoirAnchor>
        </div>
      </aside>
    </div>
  );
}

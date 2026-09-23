"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Gift, Mail, MessageCircle, Sparkles, UserPlus, Users, type LucideIcon } from "lucide-react";
import { noir, vouchers, type VoucherSlug } from "@/lib/noir";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { trackEvent } from "@/lib/analytics";

function isVoucherSlug(s: unknown): s is VoucherSlug {
  return vouchers.some((v) => v.slug === s);
}

function priceText(v: (typeof vouchers)[number]) {
  if (v.slug === "custom") return v.priceLabel ?? "su misura";
  return `€${v.price}`;
}

export function VoucherForm() {
  const [voucher, setVoucher] = useState<VoucherSlug>("medium");
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [dedica, setDedica] = useState(
    "Perché hai passato settimane intere senza fermarti. Prendi queste 3 ore — o questa notte — e non pensarci. Da me a te."
  );
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [notes, setNotes] = useState("");
  const voucherObj = useMemo(
    () => vouchers.find((v) => v.slug === voucher) ?? vouchers[1],
    [voucher]
  );

  const canSend =
    fromName.trim().length >= 2 &&
    toName.trim().length >= 2 &&
    (toEmail.trim().length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(toEmail)) &&
    (senderEmail.trim().length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) &&
    (voucherObj.slug !== "custom" || notes.trim().length >= 5);

  const whatsappMsg = useMemo(() => {
    const price = priceText(voucherObj);
    const d = dedica.trim().length ? dedica.trim() : "— nessuna dedica —";
    return `Ciao Euphoria, vorrei un voucher ${voucherObj.name} (${price}).
— Da: ${fromName || "__"}
— A: ${toName || "__"}
— Email destinatario: ${toEmail || "__"}
— Mia email: ${senderEmail || "__"}
— Mio telefono: ${senderPhone || "__"}
— Dedica:
${d}
Note: ${notes || "—"}
Grazie!`;
  }, [voucherObj, fromName, toName, toEmail, dedica, senderEmail, senderPhone, notes]);

  const onWhatsApp = () => {
    trackEvent({
      name: "voucher_whatsapp_click",
      params: { voucher: voucherObj.slug, from: fromName.length ? "filled" : "empty" },
    });
  };

  return (
    <div className="mx-auto mt-10 grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
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

          <label className="mt-5 block">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-zinc-500">
              Dedica (quella che leggerà nel PDF)
            </span>
            <textarea
              value={dedica}
              onChange={(e) => setDedica(e.target.value)}
              rows={4}
              placeholder="Una frase dentro il biglietto..."
              className="mt-1 w-full rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-sm leading-relaxed text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10"
            />
          </label>

          <label className="mt-5 block">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-zinc-500">
              Note (opzionale) — importo custom, dati particolari, giorno preferibile
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Per Custom: importo, durata, dettagli..."
              className="mt-1 w-full rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10"
            />
          </label>

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

      <aside className="lg:col-span-2">
        <div className="sticky top-28 space-y-4">
          <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6">
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-purple-200/70">Riepilogo</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = voucherObj.icon as LucideIcon;
                  return (
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur ${voucherObj.iconAccent}`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </div>
                  );
                })()}
                <div>
                  <div className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                    {voucherObj.name.replace("Euphoria ", "")}
                  </div>
                  <div className="noir-display text-lg font-semibold text-white">{voucherObj.name}</div>
                </div>
              </div>
              <div className="noir-display text-2xl font-semibold text-white">{priceText(voucherObj)}</div>
            </div>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-zinc-500">Da</dt>
                <dd className="text-zinc-200">{fromName || <span className="text-zinc-600">—</span>}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">Per</dt>
                <dd className="text-zinc-200">{toName || <span className="text-zinc-600">—</span>}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">Valido</dt>
                <dd className="text-zinc-200">12 mesi · 2 persone incluse</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">Invio PDF</dt>
                <dd className="text-zinc-200">{toEmail || "Stampabile e consegnabile a mano"}</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-3xl border border-purple-500/15 bg-purple-500/[0.04] p-6 text-sm leading-relaxed text-zinc-300">
            <div className="mb-2 text-xs uppercase tracking-[0.2em] text-purple-200/80">Pagamento</div>
            Link Stripe, bonifico o Satispay — come preferisiti.
            Dopo il pagamento ricevi un PDF con: nome, dedica, codice QR e istruzioni per prenotare
            via WhatsApp. Tutto in 15 minuti, lavorativi.
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

"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, Globe2, Mail, MessageCircle, Phone, Sparkles, User } from "lucide-react";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { noir } from "@/lib/noir";
import { CATEGORIES, type PartnerCategorySlug } from "@/components/collaborations/partners-grid";
import { trackEvent } from "@/lib/analytics";

function isCategory(s: unknown): s is PartnerCategorySlug {
  return typeof s === "string" && CATEGORIES.some((c) => c.slug === s);
}

export function CollaborationsForm() {
  const [category, setCategory] = useState<PartnerCategorySlug>("ristoranti");
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [city, setCity] = useState("");
  const [proposal, setProposal] = useState("");
  const [why, setWhy] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (isCategory(cat)) setCategory(cat);
    const focus = params.get("focus");
    if (focus === "1") setTimeout(() => document.getElementById("collab-business")?.focus(), 300);
  }, []);

  const categoryObj = CATEGORIES.find((c) => c.slug === category) ?? CATEGORIES[0];
  const canSend =
    businessName.trim().length >= 2 &&
    contactName.trim().length >= 2 &&
    (email.trim().length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) &&
    phone.trim().length >= 6 &&
    proposal.trim().length >= 8;

  const waMsg = useMemo(() => {
    return `Ciao Euphoria, collaborazione ${categoryObj.title}.
— Attività: ${businessName || "__"}
— Contatto: ${contactName || "__"}
— Email: ${email || "__"}
— Telefono: ${phone || "__"}
— Sito: ${website || "__"}
— Città / Zona: ${city || "__"}
— Cosa proponi:
${proposal || "—"}
— Perché secondo voi funziona:
${why || "—"}
Grazie!`;
  }, [categoryObj, businessName, contactName, email, phone, website, city, proposal, why]);

  const onSubmit = () => {
    trackEvent({
      name: "collaboration_whatsapp_click",
      params: { category, businessLength: businessName.length },
    });
    const url = noir.contacts.whatsapp + `?text=${encodeURIComponent(waMsg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (canSend) onSubmit();
      }}
      className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-5"
    >
      <div className="lg:col-span-3">
        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-purple-200/70">
            <Sparkles className="h-3.5 w-3.5 text-purple-300" />
            La tua proposta
          </div>

          <fieldset>
            <legend className="mb-3 text-sm text-zinc-400">1 · Categoria</legend>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((c) => {
                const selected = c.slug === category;
                return (
                  <label
                    key={c.slug}
                    className={`group relative flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
                      selected
                        ? "border-purple-500/40 bg-purple-500/10 shadow-[0_0_0_1px_rgba(168,85,247,0.2)]"
                        : "border-white/5 bg-white/[0.02] hover:border-white/10"
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={c.slug}
                      checked={selected}
                      onChange={() => setCategory(c.slug)}
                      className="sr-only"
                    />
                    <span
                      className={`mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-xl ${
                        selected ? "bg-purple-500/20 text-purple-200" : "bg-white/[0.03] text-zinc-500"
                      }`}
                    >
                      {selected ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <c.icon className="h-4 w-4" />
                      )}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-white">{c.title}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-zinc-500">
                        {c.slug}
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
                <Building2 className="h-3.5 w-3.5" /> Nome attività
              </span>
              <input
                id="collab-business"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Es. Trattoria del Mare"
                className="mt-1 w-full rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-zinc-500">
                <User className="h-3.5 w-3.5" /> Referente
              </span>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Nome e cognome"
                className="mt-1 w-full rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-zinc-500">
                <Mail className="h-3.5 w-3.5" /> Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@attivita.it"
                className="mt-1 w-full rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-zinc-500">
                <Phone className="h-3.5 w-3.5" /> Telefono / WhatsApp
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+39 3xx xxx xxxx"
                className="mt-1 w-full rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-zinc-500">
                <Globe2 className="h-3.5 w-3.5" /> Sito / Instagram
              </span>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="link o @handle"
                className="mt-1 w-full rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-zinc-500">
                <Sparkles className="h-3.5 w-3.5" /> Città / Zona
              </span>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Porto Empedocle, Agrigento..."
                className="mt-1 w-full rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-zinc-500">
              Cosa proponi (servizi, prezzi, sconti dedicati, ecc.)
            </span>
            <textarea
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              rows={5}
              placeholder="Un paio di righe sulla tua attività: cosa fai, per chi, cosa potremmo proporre ai nostri ospiti in esclusiva..."
              className="mt-1 w-full rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-sm leading-relaxed text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10"
            />
          </label>

          <label className="mt-5 block">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-zinc-500">
              Perché secondo te funziona con Euphoria? (opzionale)
            </span>
            <textarea
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              rows={2}
              placeholder="Solo se hai un motivo in più..."
              className="mt-1 w-full rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-sm leading-relaxed text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10"
            />
          </label>

          <motion.button
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={!canSend}
            className="mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-purple-600 px-5 py-4 text-sm font-semibold text-white shadow-[0_0_50px_-10px_rgba(168,85,247,0.6)] transition hover:from-purple-400 hover:via-fuchsia-400 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:from-purple-500 disabled:hover:via-fuchsia-500 disabled:hover:to-purple-600 sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" />
            Invia proposta · Apri WhatsApp
          </motion.button>
          <p className="mt-3 text-xs text-zinc-500">
            Nessun invio automatico: i dati che compili diventano un messaggio precompilato
            che puoi rivedere e modificare prima di inviare su WhatsApp.
          </p>
        </div>
      </div>

      <aside className="lg:col-span-2">
        <div className="sticky top-28 space-y-4">
          <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6">
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-purple-200/70">
              Riepilogo proposta
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-200">
                <categoryObj.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                  Categoria
                </div>
                <div className="text-base font-semibold text-white">{categoryObj.title}</div>
              </div>
            </div>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-zinc-500">Attività</dt>
                <dd className="text-right text-zinc-200">
                  {businessName || <span className="text-zinc-600">—</span>}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-zinc-500">Referente</dt>
                <dd className="text-right text-zinc-200">
                  {contactName || <span className="text-zinc-600">—</span>}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-zinc-500">Contatti</dt>
                <dd className="text-right text-zinc-200">
                  {phone || email ? (
                    <div>
                      {phone && <div>{phone}</div>}
                      {email && <div className="text-xs text-zinc-400">{email}</div>}
                    </div>
                  ) : (
                    <span className="text-zinc-600">—</span>
                  )}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-zinc-500">Sito / Ig</dt>
                <dd className="max-w-[60%] truncate text-right text-zinc-200">
                  {website || <span className="text-zinc-600">—</span>}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-zinc-500">Zona</dt>
                <dd className="text-right text-zinc-200">
                  {city || <span className="text-zinc-600">—</span>}
                </dd>
              </div>
            </dl>
          </div>
          <div className="rounded-3xl border border-purple-500/15 bg-purple-500/[0.04] p-6 text-sm leading-relaxed text-zinc-300">
            <div className="mb-2 text-xs uppercase tracking-[0.2em] text-purple-200/80">
              Perché WhatsApp
            </div>
            Perché è il modo più veloce per confrontarci: mandiamo 2 messaggi,
            facciamo 10 minuti di call e decidiamo se e come procedere.
            Niente ticket aperti per settimane, niente email perse.
          </div>
          <NoirAnchor
            href={`${noir.contacts.whatsapp}?text=${encodeURIComponent(
              "Ciao, sto pensando a una collaborazione con Euphoria. Posso farvi 2 domande veloci?"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            variant="ghost"
            className="w-full"
          >
            Domande veloci prima del modulo · WhatsApp
          </NoirAnchor>
        </div>
      </aside>
    </form>
  );
}

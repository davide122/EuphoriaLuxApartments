"use client";

import { Coffee, Flower2, ImageIcon, Leaf, MapPin, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { noir } from "@/lib/noir";

export const CATEGORIES = [
  {
    slug: "ristoranti",
    icon: Coffee,
    title: "Ristoranti & trattorie",
    pitch: "I nostri ospiti chiedono: dove si mangia bene a Porto Empedocle o Agrigento, senza code? Se la tua cucina vale la pena, la consigliamo in check-in e nelle guide pre-arrivo.",
    valori: ["Pesce fresco", "Prodotti locali", "Menu degustazione"],
  },
  {
    slug: "wedding",
    icon: Flower2,
    title: "Wedding planner & celebranti",
    pitch: "Sposi che scelgono Euphoria per notte di nozze o pre-wedding hanno bisogno di fiori, torta, musica, celebranti o hair&makeup. Se sei uno del settore, entri nel giro.",
    valori: ["Pre-wedding", "Notte di nozze", "Sorpresa & allestimento"],
  },
  {
    slug: "fotografi",
    icon: ImageIcon,
    title: "Fotografi & videomaker",
    pitch: "Shooting in suite, proposal, servizio pre-matrimonio: i nostri ospiti cercano spesso chi sa cogliere l'atmosfera senza appesantire la giornata.",
    valori: ["Shooting privato", "Proposal", "Matrimonio"],
  },
  {
    slug: "noleggi",
    icon: Sparkles,
    title: "Auto, yacht, barche & transfer",
    pitch: "Aeroporto Palermo / Trapani, Scala dei Turchi, giro in barca al tramonto, auto d'epoca per un giorno. Se sposti le persone in modo pulito, ti consigliamo.",
    valori: ["Transfer aeroporto", "Barche & yacht", "Auto d'epoca"],
  },
  {
    slug: "experience",
    icon: Leaf,
    title: "Esperienze & tour",
    pitch: "Tour enogastronomico, degustazione vini, guida privata Valle dei Templi, trekking Scala dei Turchi all'alba. Se fai un'esperienza memorabile, noi portiamo clienti premium.",
    valori: ["Valle dei Templi", "Scala dei Turchi", "Enoturismo"],
  },
  {
    slug: "altro",
    icon: Users,
    title: "Altro · Agenzie, premi aziendali",
    pitch: "Agenzie viaggi, incentive, team building piccoli, premi aziendali in voucher. Non siamo per gruppi da 50 persone, ma per team 4-6 persone o premi singoli.",
    valori: ["Incentive", "Agenzie B2B", "Premi e benefit"],
  },
] as const;

export type PartnerCategorySlug = (typeof CATEGORIES)[number]["slug"];

export function PartnersGrid() {
  const [active, setActive] = useState<PartnerCategorySlug | null>("ristoranti");
  const activeData = CATEGORIES.find((c) => c.slug === active);
  return (
    <section className="relative z-10 border-t border-white/5 bg-zinc-950/40 py-16 sm:py-20">
      <div className="noir-container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-purple-200/70">
            Chi stiamo cercando
          </div>
          <h2 className="noir-display text-3xl font-semibold text-white sm:text-4xl">
            6 tipi di collaborazione, zero burocrazia.
          </h2>
        </div>

        <nav className="mt-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => {
            const isActive = active === c.slug;
            return (
              <button
                key={c.slug}
                onClick={() => setActive(c.slug)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] transition ${
                  isActive
                    ? "border-purple-500/40 bg-purple-500/10 text-purple-200 shadow-[0_0_0_1px_rgba(168,85,247,0.15)]"
                    : "border-white/5 bg-white/[0.02] text-zinc-400 hover:border-white/10 hover:text-zinc-200"
                }`}
              >
                <c.icon className="h-3.5 w-3.5" />
                {c.slug}
              </button>
            );
          })}
        </nav>

        {activeData && (
          <motion.article
            key={activeData.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-10 grid gap-8 rounded-3xl border border-white/5 bg-white/[0.02] p-6 lg:grid-cols-5 lg:p-10"
          >
            <header className="lg:col-span-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-200">
                  <activeData.icon className="h-6 w-6" />
                </div>
                <h3 className="noir-display text-2xl font-semibold text-white sm:text-3xl">
                  {activeData.title}
                </h3>
              </div>
              <p className="mt-5 text-base leading-relaxed text-zinc-300/90 sm:text-lg">
                {activeData.pitch}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {activeData.valori.map((v) => (
                  <span
                    key={v}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300"
                  >
                    <MapPin className="h-3 w-3 text-purple-300/70" />
                    {v}
                  </span>
                ))}
              </div>
            </header>
            <aside className="rounded-2xl border border-white/5 bg-zinc-950/60 p-6 lg:col-span-2">
              <div className="text-xs uppercase tracking-[0.2em] text-purple-200/70">Prossimo passo</div>
              <h4 className="noir-display mt-2 text-xl font-semibold text-white">
                Compila il modulo.
                <br />
                Risposta in 24h.
              </h4>
              <p className="mt-3 text-sm text-zinc-400">
                Seleziona categoria <strong>{activeData.slug}</strong>, dicci chi sei e come
                ti contattiamo. Niente spam, niente chiamate fredde.
              </p>
              <NoirAnchor
                href="#modulo"
                onClick={() => window.dispatchEvent(new CustomEvent("collaboration-select", { detail: activeData.slug }))}
                size="md"
                variant="primary"
                className="mt-5 w-full"
              >
                Seleziona questa categoria
              </NoirAnchor>
              <NoirAnchor
                href={`${noir.contacts.whatsapp}?text=${encodeURIComponent(
                  `Ciao Euphoria, sono un/a ${activeData.title.toLowerCase()} e vorrei proporre una collaborazione.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                variant="ghost"
                className="mt-2 w-full"
              >
                Oppure scrivici subito · WhatsApp
              </NoirAnchor>
            </aside>
          </motion.article>
        )}
      </div>
    </section>
  );
}

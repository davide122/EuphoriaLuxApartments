"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Box, Check, type LucideIcon } from "lucide-react";
import { euphoriaAddons, vouchers } from "@/lib/noir";
import { NoirAnchor } from "@/components/ui/noir-anchor";

const ADDON_3D = euphoriaAddons[0]!;

export function PremiumVoucherCards() {
  return (
    <>
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-purple-200/70">
            4 formule
          </div>
          <h2 className="noir-display max-w-3xl text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
            Scegli quanto vale questo regalo.
          </h2>
        </div>
        <p className="max-w-md text-sm text-zinc-400 sm:text-base">
          Ogni formula è modificabile dopo l'acquisto: nominativo, date, dettagli.
          Il custom lo costruiamo insieme su WhatsApp.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {vouchers.map((v, i) => (
          <Card key={v.slug} index={i} v={v} />
        ))}
      </div>
    </>
  );
}

function Card({
  v,
  index,
}: {
  v: (typeof vouchers)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const Icon = v.icon as LucideIcon;
  const isFeatured = Boolean(v.highlighted);
  const price =
    v.slug === "custom" ? (v.priceLabel ?? "Su misura") : `€${v.price}`;
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {
          opacity: 0,
          y: 32,
          color: "rgb(161 161 170)",
        },
        show: (custom: number) => ({
          opacity: 1,
          y: 0,
          color: "rgb(255 255 255)",
          transition: {
            delay: 0.06 * custom,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            color: { duration: 0.55, ease: "easeOut", delay: 0.18 + 0.04 * custom },
          },
        }),
      }}
      custom={index}
      style={isFeatured ? { zIndex: 2 } : undefined}
    >
      <article
        className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-500 ${
          isFeatured
            ? "border-purple-500/35 bg-gradient-to-br from-purple-900/45 via-zinc-900 to-zinc-950 shadow-[0_30px_120px_-24px_rgba(168,85,247,0.65)] xl:-translate-y-3"
            : "border-white/5 bg-white/[0.02] hover:-translate-y-1 hover:border-white/10"
        }`}
      >
        <div
          className={`pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full blur-[90px] transition-opacity duration-500 ${
            isFeatured
              ? "bg-purple-500/30 opacity-100"
              : "bg-white/5 opacity-0 group-hover:opacity-100"
          }`}
        />
        {isFeatured && (
          <div className="absolute right-5 top-5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur">
            più regalato
          </div>
        )}

        <div className="relative flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.14 + 0.06 * index, duration: 0.45, ease: "easeOut" }}
            className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur ${v.iconAccent}`}
          >
            <Icon className="h-6 w-6" strokeWidth={1.6} />
          </motion.div>
          <div className="noir-display text-right text-3xl font-semibold text-white sm:text-4xl">
            {price}
          </div>
        </div>

        <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          {v.durationLabel}
        </div>
        <h3 className="noir-display mt-1 text-2xl font-semibold text-white sm:text-[1.7rem]">
          {v.name.replace("Euphoria ", "")}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-[0.95rem] sm:leading-7">
          {v.tagline}
        </p>

        <ul className="relative mt-6 space-y-2.5 text-sm text-zinc-300/95 sm:text-[0.95rem]">
          {v.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-purple-500/20">
                <Check className="h-3 w-3 text-purple-100" strokeWidth={2.8} />
              </span>
              <span className="leading-snug">{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {v.suggestedFor.map((k) => (
            <span
              key={k}
              className="rounded-full border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-400"
            >
              {k}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between rounded-xl border border-sky-400/20 bg-sky-500/[0.07] px-3 py-2 text-[11px] text-sky-100 sm:text-xs">
          <span className="inline-flex items-center gap-1.5">
            <Box className="h-3.5 w-3.5 text-sky-200" strokeWidth={1.9} />
            {ADDON_3D.name} disponibile
          </span>
          <span className="font-semibold">+€{ADDON_3D.price}</span>
        </div>

        <div className="mt-5">
          <NoirAnchor
            href="#dedica"
            onClick={() => window.dispatchEvent(new CustomEvent("voucher-select", { detail: v.slug }))}
            size="md"
            variant={isFeatured ? "primary" : "ghost"}
            className="w-full"
            track={{ name: "voucher_card_cta", params: { voucher: v.slug, price: v.price } }}
          >
            {v.slug === "custom" ? "Personalizza via WhatsApp" : `Seleziona · ${price}`}
          </NoirAnchor>
        </div>
      </article>
    </motion.div>
  );
}

"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Gift, Sparkles } from "lucide-react";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { noir, vouchers } from "@/lib/noir";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function PremiumVoucherHero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgYOutput: [string, string] | [number, number] = reduced ? [0, 0] : ["0%", "22%"];
  const bgY = useTransform(scrollYProgress, [0, 1], bgYOutput as [string, string]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const scaleFade = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const featured = vouchers.find((v) => v.highlighted) ?? vouchers[1];

  return (
    <section
      ref={ref}
      data-ambient="noir"
      className="relative isolate z-10 min-h-[100svh] overflow-hidden pb-24 pt-8 sm:min-h-[98svh] sm:pt-14"
    >
      <motion.div
        style={{ y: bgY, scale: scaleFade, opacity: opacityFade }}
        aria-hidden
        className="absolute inset-0"
      >
        <Image
          src="/heroImage.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[64%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,3,9,0.2)_0%,rgba(6,3,9,0.55)_44%,rgba(6,3,9,0.98)_100%)] sm:bg-[linear-gradient(90deg,rgba(6,3,9,0.98)_0%,rgba(6,3,9,0.84)_35%,rgba(6,3,9,0.22)_68%,rgba(6,3,9,0.42)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_78%_14%,rgba(168,85,247,0.26),transparent_58%),radial-gradient(700px_circle_at_48%_72%,rgba(236,72,153,0.15),transparent_60%)]" />
        <div className="euphoria-stars absolute inset-0 opacity-30" />
      </motion.div>

      <div className="relative z-10 noir-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            <ScrollReveal y={14}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/[0.07] px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-purple-200">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
                Voucher regalo · Valido 12 mesi · Dedica inclusa
              </div>
            </ScrollReveal>

            <ScrollReveal y={22} delay={0.05}>
              <h1 className="noir-display max-w-[15ch] text-4xl font-semibold leading-[0.98] text-white sm:text-6xl sm:leading-[0.9] md:text-7xl">
                Regala un momento.
                <br />
                <motion.span
                  initial={{ backgroundPosition: "0% 50%" }}
                  whileInView={{ backgroundPosition: "100% 50%" }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block bg-[length:200%_auto] bg-gradient-to-r from-purple-200 via-fuchsia-300 to-purple-500 bg-clip-text text-transparent"
                >
                  Non un oggetto.
                </motion.span>
              </h1>
            </ScrollReveal>

            <ScrollReveal tint="color-shift" y={10} delay={0.14}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed sm:text-xl sm:leading-8">
                Euphoria non si regala solo a San Valentino. È il regalo per la mamma, la migliore
                amica, la sposa il giorno prima, il collega laureato, o chiunque si meriti 3 ore —
                o una notte — di nessuno intorno. Nessun pacchetto forzato, nessun prezzo nascosto.
              </p>
            </ScrollReveal>

            <ScrollReveal y={12} delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <NoirAnchor href="#scegli" size="lg" variant="primary">
                  Scegli il voucher
                  <Gift className="h-4 w-4" />
                </NoirAnchor>
                <NoirAnchor
                  href={`${noir.contacts.whatsapp}?text=${encodeURIComponent(
                    "Ciao, vorrei informazioni per un voucher Euphoria personalizzato."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  variant="ghost"
                >
                  Parliamone su WhatsApp
                </NoirAnchor>
              </div>
            </ScrollReveal>

            <ScrollReveal y={10} delay={0.28}>
              <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["Da €90", "Prezzo di partenza"],
                  ["12 mesi", "Valido sempre"],
                  ["2 persone", "incluse"],
                  ["PDF · QR", "Con dedica stampata"],
                ].map(([t, d]) => (
                  <div
                    key={t}
                    className="group rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur transition hover:border-purple-500/25 hover:bg-white/[0.05]"
                  >
                    <div className="noir-display text-xl font-semibold text-white transition group-hover:text-purple-200 sm:text-2xl">
                      {t}
                    </div>
                    <div className="mt-1 text-[11px] leading-relaxed text-zinc-400 sm:text-xs">
                      {d}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.16} y={16} className="lg:col-span-5">
            <article className="relative mx-auto max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-purple-900/50 via-zinc-900 to-zinc-950 p-7 shadow-[0_30px_120px_-30px_rgba(168,85,247,0.65)] backdrop-blur sm:p-9">
              <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-purple-500/25 blur-[90px]" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-[90px]" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
                      <Sparkles className="h-5 w-5 text-purple-200" strokeWidth={1.6} />
                    </span>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-purple-200/80">
                        Il più regalato
                      </div>
                      <div className="noir-display mt-0.5 text-sm font-semibold text-white/90">
                        {featured.name.replace("Euphoria ", "")}
                      </div>
                    </div>
                  </div>
                  <div className="noir-display text-right text-3xl font-semibold text-white sm:text-4xl">
                    {priceText(featured)}
                  </div>
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-400">
                  {featured.durationLabel}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-200/95">
                  {featured.tagline}
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-zinc-100/90">
                  {featured.bullets.map((b, i) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.4, delay: 0.04 * i, ease: "easeOut" }}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-1 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-purple-500/20 text-[10px] text-purple-100">
                        ✓
                      </span>
                      <span className="leading-snug">{b}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {featured.suggestedFor.map((k) => (
                    <span
                      key={k}
                      className="rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[11px] text-zinc-300"
                    >
                      {k}
                    </span>
                  ))}
                </div>
                <NoirAnchor className="mt-7 w-full" href="#dedica" size="lg" variant="primary">
                  Ordina {featured.name.replace("Euphoria ", "")}
                </NoirAnchor>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function priceText(v: (typeof vouchers)[number]) {
  if (v.slug === "custom") return v.priceLabel ?? "su misura";
  return `€${v.price}`;
}

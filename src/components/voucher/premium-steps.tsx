"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import type { ReactNode } from "react";

const STEPS = [
  {
    n: "01",
    eyebrow: "Scegli la taglia",
    title: "Quanto vale questo regalo?",
    body: "Small 3 ore di privacy, Medium 1 notte in suite Passion, Large 1 notte in Infinity con allestimento romantico, o Custom con importo a scelta.",
  },
  {
    n: "02",
    eyebrow: "Scrivi la dedica",
    title: "Da chi è, a chi è, una frase.",
    body: "Il PDF del voucher arriverà stampato con nome, dedica e codice QR. Puoi farlo recapitare alla persona che riceve, o stamparlo e consegnarlo a mano.",
  },
  {
    n: "03",
    eyebrow: "Consegnalo. Poi si godranno la suite.",
    title: "Nessuna fretta. 12 mesi di tempo.",
    body: "Chi riceve il voucher prenota via WhatsApp con il codice. Possono cambiare data, nominativo, dettagli: è flessibile, come dovrebbe essere un regalo.",
  },
] as const;

export function PremiumVoucherSteps() {
  return (
    <section className="relative z-10 border-t border-white/5 bg-zinc-950/50 py-16 sm:py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_50%_0%,rgba(168,85,247,0.14),transparent_58%)]" />
      </div>
      <div className="noir-container relative">
        <ScrollReveal y={12}>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-purple-200/70">
              Come funziona
            </div>
            <h2 className="noir-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
              Tre passi. Poi un PDF in casella.
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <StepCard key={s.n} i={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  n,
  eyebrow,
  title,
  body,
  i,
}: {
  n: string;
  eyebrow: string;
  title: string;
  body: string;
  i: number;
}) {
  const ref = useRef<HTMLLIElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4, margin: "-10% 0px" });

  return (
    <motion.li
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: (custom: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.08 * custom,
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          },
        }),
      }}
      custom={i}
      className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-7 transition-colors hover:border-purple-500/25 hover:bg-white/[0.035] sm:p-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-purple-500/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <StepNumberLabel n={n} inView={inView} index={i} />
        <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-purple-200/85">
          {eyebrow}
        </div>
        <ScrollReveal tint="color-shift" y={6} delay={0.06 + i * 0.08}>
          <h3 className="noir-display mt-2 text-2xl font-semibold leading-tight text-white sm:text-3xl">
            {title}
          </h3>
        </ScrollReveal>
        <ScrollReveal tint="color-shift" y={4} delay={0.18 + i * 0.08}>
          <p className="mt-4 text-sm leading-relaxed sm:text-base sm:leading-7">{body}</p>
        </ScrollReveal>
      </div>
    </motion.li>
  );
}

function StepNumberLabel({
  n,
  inView,
  index,
}: {
  n: string;
  inView: boolean;
  index: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <motion.span
        initial={{ opacity: 0.04, y: -4 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.04 * index, duration: 0.5, ease: "easeOut" }}
        className="noir-display text-5xl font-semibold leading-none bg-gradient-to-br from-purple-300/25 via-fuchsia-300/20 to-purple-400/25 bg-clip-text text-transparent sm:text-6xl"
      >
        {n}
      </motion.span>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        style={{ transformOrigin: "left" }}
        transition={{ delay: 0.18 + 0.06 * index, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-16 flex-none rounded-full bg-gradient-to-r from-purple-400/60 to-transparent"
      />
    </div>
  );
}

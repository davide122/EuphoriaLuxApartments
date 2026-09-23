"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gift, MessageCircle } from "lucide-react";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { noir } from "@/lib/noir";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function PremiumVoucherCTA() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  return (
    <section
      ref={ref}
      className="relative z-10 border-t border-white/5 bg-zinc-950/50 py-16 sm:py-24"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_50%,rgba(168,85,247,0.22),transparent_58%),radial-gradient(900px_circle_at_82%_40%,rgba(236,72,153,0.2),transparent_58%)]" />
      </div>
      <div className="noir-container relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <ScrollReveal y={14}>
              <div className="mb-3 text-xs uppercase tracking-[0.2em] text-purple-200/70">
                Ancora indeciso?
              </div>
            </ScrollReveal>
            <ScrollReveal y={20} delay={0.05}>
              <h2 className="noir-display max-w-3xl text-3xl font-semibold leading-[1.02] text-white sm:text-5xl sm:leading-[0.98]">
                Il regalo non si butta.
                <br />
                <motion.span
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={inView ? { backgroundPosition: "100% 50%" } : {}}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block bg-[length:200%_auto] bg-gradient-to-r from-purple-200 via-fuchsia-300 to-purple-500 bg-clip-text text-transparent"
                >
                  Si ricorda per anni.
                </motion.span>
              </h2>
            </ScrollReveal>
            <ScrollReveal tint="color-shift" y={8} delay={0.18}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300/90 sm:text-xl sm:leading-8">
                Non sbagli taglia, non sbagli colore, non rischi il doppione.
                Regali un momento. E nel 90% dei casi, chi lo riceve prenota entro 3 mesi.
                Se ti serve una mano a scegliere, siamo su WhatsApp in 2 minuti.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal y={14} delay={0.12} className="lg:col-span-5">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:justify-end">
              <NoirAnchor href="#scegli" size="lg" variant="primary" track={{ name: "voucher_final_cta_choose" }}>
                Scegli il voucher
                <Gift className="h-4 w-4" />
              </NoirAnchor>
              <NoirAnchor
                href={`${noir.contacts.whatsapp}?text=${encodeURIComponent(
                  "Ciao, ho bisogno di aiuto per scegliere un voucher Euphoria."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="ghost"
                track={{ name: "voucher_final_cta_whatsapp" }}
                className="inline-flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4 text-purple-200" />
                Aiutami a scegliere
              </NoirAnchor>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

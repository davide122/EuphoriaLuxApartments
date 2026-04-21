"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useSyncExternalStore } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { NoirLink } from "@/components/ui/noir-link";
import { noir } from "@/lib/noir";

const HeroCanvas = dynamic(
  async () => {
    const mod = await import("./hero-canvas");
    return mod.HeroCanvas;
  },
  { ssr: false }
);

function useMediaQuery(query: string, serverSnapshot = false) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => serverSnapshot
  );
}

function useLowPowerMode() {
  const coarse = useMediaQuery("(pointer: coarse)");
  const small = useMediaQuery("(max-width: 820px)");
  return coarse || small;
}

export function HeroSection() {
  const lowPower = useLowPowerMode();
  const portalId = useId();
  const whatsappHref =
    noir.contacts.whatsapp +
    `?text=${encodeURIComponent(
      "Ciao, vorrei verificare disponibilità per Passion o Infinity. Date: __/__/__ → __/__/__. Siamo in __. Grazie."
    )}`;

  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    const el = document.getElementById(portalId);
    if (!el) return;

    gsap.set(el, { clipPath: "circle(0% at 50% 55%)", opacity: 1 });
    gsap.to(el, {
      clipPath: "circle(110% at 50% 55%)",
      duration: 1.55,
      ease: "power3.out",
    });
  }, [portalId]);

  return (
    <section
      data-ambient="noir"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <div className="absolute inset-0">
        <div
          id={portalId}
          className="absolute inset-0 opacity-0 will-change-[clip-path]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_22%_18%,rgba(var(--ambient-a)/0.30),transparent_60%),radial-gradient(900px_circle_at_78%_24%,rgba(var(--ambient-c)/0.18),transparent_62%),radial-gradient(1200px_circle_at_50%_112%,rgba(var(--ambient-b)/0.16),transparent_62%)]" />
          {!lowPower ? <HeroCanvas /> : null}
        </div>
      </div>

      <div className="relative z-10 noir-container flex min-h-[100svh] flex-col justify-end pb-14 pt-28 sm:pb-16">
        <div className="noir-chip w-fit text-[11px] text-noir-mist/90">
          <Sparkles className="h-4 w-4 text-noir-aqua" />
          Private luxury experience — Porto Empedocle
        </div>

        <motion.h1
          className="noir-h1 mt-6 max-w-[16ch] text-balance text-5xl leading-[0.95] text-noir-mist sm:text-6xl md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        >
          Euphoria: Jacuzzi privata + Sauna. Una notte che non si dimentica.
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-pretty text-base leading-7 text-noir-muted sm:text-lg"
          initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
        >
          Porto Empedocle, Sicilia. Due suite per coppie: Passion (più intima) e Infinity
          (più scenografica). Privacy totale, luci immersive e benessere privato.
          Prenotazione diretta in 2 minuti su WhatsApp.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
        >
          <NoirAnchor
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            variant="primary"
            className="group"
          >
            Verifica disponibilità su WhatsApp
            <span className="h-1.5 w-1.5 rounded-full bg-white/80 transition group-hover:scale-125" />
          </NoirAnchor>
          <NoirLink href="#suites" variant="ghost" className="group">
            Guarda Passion e Infinity
            <ArrowDown className="h-4 w-4 text-noir-mist/80 transition group-hover:translate-y-0.5" />
          </NoirLink>
        </motion.div>

        <motion.div
          className="mt-7 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.44 }}
        >
          {[
            `Da €${noir.startingFrom}/notte`,
            "Jacuzzi privata",
            "Sauna interna",
            "Cucina completa + forno",
            "Wi‑Fi + condizionatori",
            noir.smartAccess,
          ].map((k) => (
            <span key={k} className="noir-chip text-noir-mist/80">
              {k}
            </span>
          ))}
        </motion.div>

        <div className="mt-14 flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-noir-mist/55">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <ArrowDown className="h-4 w-4" />
          </span>
          Scroll
        </div>
      </div>
    </section>
  );
}

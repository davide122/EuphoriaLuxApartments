"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowDown,
  Bath,
  CookingPot,
  Flame,
  KeyRound,
  MessageCircle,
  Tv,
  Wine,
} from "lucide-react";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { NoirLink } from "@/components/ui/noir-link";
import { noir } from "@/lib/noir";

const HERO_FEATURES = [
  { label: "Jacuzzi privata", icon: Bath },
  { label: "Sauna", icon: Flame },
  { label: "Aperitivo incluso", icon: Wine },
  { label: "Self check-in", icon: KeyRound },
  { label: "Netflix", icon: Tv },
  { label: "Cucina privata", icon: CookingPot },
] as const;

export function HeroSection() {
  const whatsappHref =
    noir.contacts.whatsapp +
    `?text=${encodeURIComponent(
      "Ciao, vorrei verificare disponibilità per Passion o Infinity. Date: __/__/__ → __/__/__. Siamo in __. Grazie."
    )}`;

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-noir-ink">
      <div className="absolute inset-0">
        <Image
          src="/heroImage.png"
          alt="Euphoria Luxury Suite con sauna, letto e jacuzzi privata"
          fill
          priority
          sizes="100vw"
          className="scale-[1.02] object-cover object-[61%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,3,9,0.98)_0%,rgba(6,3,9,0.86)_35%,rgba(6,3,9,0.25)_68%,rgba(6,3,9,0.42)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_76%_12%,rgba(139,92,246,0.22),transparent_58%),radial-gradient(600px_circle_at_58%_70%,rgba(237,63,166,0.12),transparent_60%)]" />
        <div className="euphoria-stars absolute inset-0 opacity-30" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-[linear-gradient(180deg,transparent,#060309)]" />
      </div>

      <div className="relative z-10 noir-container flex min-h-[100svh] flex-col justify-center pb-8 pt-24 sm:pb-20 sm:pt-32">
        <motion.div
          className="euphoria-kicker"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          Euphoria Luxury Suite · Porto Empedocle (AG)
        </motion.div>

        <motion.h1
          className="noir-h1 mt-5 max-w-[13ch] text-[3.1rem] leading-[0.9] text-noir-mist sm:mt-7 sm:text-7xl lg:text-[6.7rem]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          Suite con SPA privata a Porto Empedocle.
        </motion.h1>

        <motion.p
          className="mt-5 max-w-[42rem] text-pretty text-base leading-7 text-noir-mist/78 sm:mt-7 sm:text-lg"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18 }}
        >
          Due suite romantiche vicino ad Agrigento con Jacuzzi idromassaggio e sauna
          ad uso esclusivo. Privacy totale per fughe di coppia, compleanni,
          anniversari e proposte di matrimonio.
        </motion.p>

        <motion.ul
          className="mt-6 grid max-w-5xl grid-cols-2 border-l border-t border-fuchsia-200/15 text-[11px] leading-4 text-noir-mist/76 sm:mt-8 sm:grid-cols-3 sm:text-xs lg:grid-cols-6"
          aria-label="Servizi principali inclusi nelle suite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {HERO_FEATURES.map(({ label, icon: Icon }) => (
            <li
              key={label}
              className="flex min-h-12 items-center gap-2 border-b border-r border-white/10 px-3 py-2.5 sm:min-h-14"
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-noir-champagne sm:h-4 sm:w-4" />
              <span>{label}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-5 text-sm text-noir-mist/72"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.36 }}
        >
          Pernottamento da{" "}
          <strong className="font-medium text-noir-mist">€{noir.startingFrom} a coppia</strong>
        </motion.div>

        <motion.div
          className="mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
        >
          <NoirAnchor
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            variant="primary"
            className="group"
          >
            Chiedi le tue date
            <MessageCircle className="h-4 w-4" />
          </NoirAnchor>
          <NoirLink href="#suites" variant="ghost" className="group hidden sm:inline-flex">
            Scegli la suite
            <ArrowDown className="h-4 w-4 text-noir-mist/80 transition group-hover:translate-y-0.5" />
          </NoirLink>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-7 right-7 z-10 hidden items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/45 lg:flex">
        <span>Scopri Euphoria</span>
      </div>
    </section>
  );
}

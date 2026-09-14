"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { NoirLink } from "@/components/ui/noir-link";
import { noir, suites } from "@/lib/noir";

const suiteStories = {
  passion: {
    number: "01",
    image: "/passion/WhatsApp Image 2026-08-16 at 21.29.22.jpeg",
    promise: "Tutto vicino. Anche voi.",
    story:
      "Letto, jacuzzi e sauna vivono nello stesso ambiente. Passion è raccolta, calda, immediata: chiudete la porta e non serve più spostarsi.",
    details: ["55 m²", "Un unico ambiente", "Atmosfera più intima"],
    tone: "from-[#060309]/95 via-[#0c0611]/48 to-[#ed3fa6]/10",
    accent: "text-noir-champagne",
  },
  infinity: {
    number: "02",
    image: "/infinity-letto.jpg",
    promise: "Più spazio. Più modi di viverlo.",
    story:
      "Zona notte, living e cucina danno respiro alla serata. Infinity è più ampia e scenografica: una cena, la spa, un film. Sempre dentro.",
    details: ["77 m²", "Living e cucina", "Atmosfera più scenografica"],
    tone: "from-[#060309]/95 via-[#0c0611]/48 to-[#8b5cf6]/12",
    accent: "text-noir-champagne",
  },
} as const;

function SuiteScene({ suite }: { suite: (typeof suites)[number] }) {
  const story = suiteStories[suite.slug];
  const whatsappHref =
    noir.contacts.whatsapp +
    `?text=${encodeURIComponent(
      `Ciao, vorrei sapere se ${suite.name} è disponibile. Date: __/__/__ → __/__/__. Grazie.`
    )}`;

  return (
    <motion.article
      initial={{ opacity: 0.55, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -8 }}
      viewport={{ amount: 0.48 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="suite-duel-scene group relative min-h-[72svh] min-w-[86vw] snap-center overflow-hidden rounded-[2.5rem] border border-fuchsia-100/20 bg-noir-ink shadow-[0_34px_90px_rgba(0,0,0,.45)] sm:min-w-[72vw] lg:min-h-[82svh] lg:min-w-0 lg:basis-1/2 lg:rounded-[3rem] lg:transition-[flex-basis,transform] lg:duration-700 lg:ease-[cubic-bezier(.22,1,.36,1)]"
    >
      <Image
        src={encodeURI(story.image)}
        alt={`${suite.name}, suite Euphoria da ${suite.size}`}
        fill
        sizes="(max-width: 1024px) 100vw, 58vw"
        className={`object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.075] ${
          suite.slug === "passion" ? "object-[center_54%]" : "object-center"
        }`}
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${story.tone}`} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,3,9,.28),transparent_32%,rgba(6,3,9,.18)_48%,rgba(6,3,9,.96)_100%)]" />
      <div className={`absolute -right-20 top-24 h-64 w-64 rounded-full blur-[90px] transition duration-700 group-hover:scale-125 ${suite.slug === "passion" ? "bg-[#ff2aa1]/24" : "bg-[#7137ff]/28"}`} />

      <div className="relative flex min-h-[72svh] flex-col justify-between p-7 sm:p-10 lg:min-h-[82svh] lg:p-12 xl:p-14">
        <div className="flex items-start justify-between gap-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/85">
          <span>{story.number} · {suite.size}</span>
          <span className={story.accent}>{suite.mood}</span>
        </div>

        <div className="max-w-xl">
          <div className={`text-xs uppercase tracking-[0.26em] ${story.accent}`}>
            {story.promise}
          </div>
          <h3 className="noir-h1 mt-4 text-6xl leading-none text-white sm:text-7xl xl:text-8xl">
            {suite.name}
          </h3>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/90">
            {story.story}
          </p>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/82">
            {story.details.map((detail) => (
              <span key={detail} className="inline-flex items-center gap-2">
                <span className={`h-1 w-1 rounded-full bg-current ${story.accent}`} />
                {detail}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <NoirLink href={`/suites/${suite.slug}`} variant="ghost" className="border-white/25 bg-black/20 text-white backdrop-blur-md">
              Guarda {suite.name}
              <ArrowUpRight className="h-4 w-4" />
            </NoirLink>
            <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
              Chiedi le date
            </NoirAnchor>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function SuitesSection() {
  return (
    <section id="suites" data-ambient="noir" className="relative z-10 py-20 sm:py-28">
      <div className="noir-container">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="euphoria-kicker justify-center">Passion o Infinity</div>
            <h2 className="noir-h1 mt-6 text-4xl leading-[0.95] text-noir-mist sm:text-6xl md:text-7xl">
              Due modi diversi di stare insieme.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-noir-muted">
              Non scegliete i servizi: quelli ci sono in entrambe. Scegliete come volete sentirvi.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.06}>
        <div className="suite-duel euphoria-snap-rail relative mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-10 sm:px-8 lg:mx-auto lg:mt-14 lg:max-w-[1440px] lg:gap-6 lg:overflow-visible lg:px-12">
          {suites.map((suite) => (
            <SuiteScene key={suite.slug} suite={suite} />
          ))}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-fuchsia-100/35 bg-[#16081d]/75 text-[8px] uppercase tracking-[0.12em] text-white/90 shadow-[0_0_45px_rgba(237,63,166,.28)] backdrop-blur-xl lg:flex">
            oppure
          </div>
        </div>
      </Reveal>

      <div className="noir-container">
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-5xl border-b border-white/10 pb-10">
            <div className="text-center text-[10px] uppercase tracking-[0.28em] text-noir-champagne/70">
              In entrambe, sempre
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-noir-mist/72">
              {["Jacuzzi privata", "Sauna in suite", "Cucina completa", "Ingresso autonomo"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-noir-fuchsia" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

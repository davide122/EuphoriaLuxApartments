"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

type Moment = { slug: string; label: string; line: string; detail: string; image: { src: string; alt: string } };

export function OccasionsSection({ moments }: { moments: Moment[] }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const moment = moments[active];

  return (
    <section id="occasioni" data-ambient="night" className="occasion-section relative z-10 py-20 sm:py-28" aria-labelledby="occasions-heading">
      <div className="noir-container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="euphoria-kicker">Le vostre occasioni · Euphoria</div>
            <h2 id="occasions-heading" className="noir-h1 mt-5 text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">Che cosa volete<br /><span className="occasion-script">vivere?</span></h2>
          </div>
          <p className="max-w-xs text-base leading-7 text-noir-muted">Una ricorrenza, un’idea, una sorpresa.<br />Due suite. Il resto parla di voi.</p>
        </div>

        <div className="occasion-stage mt-10 grid overflow-hidden border border-white/15 lg:mt-14 lg:grid-cols-[0.85fr_1.6fr]">
          <div className="relative z-10 bg-[#130b19] p-5 sm:p-8 lg:p-10">
            <div className="mb-5 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-noir-champagne"><span>Scegliete il vostro momento</span><ArrowDown size={14} aria-hidden="true" /></div>
            <div className="grid grid-cols-2 gap-x-4 lg:grid-cols-1 lg:gap-x-0" aria-label="Scegli un’occasione">
              {moments.map((item, index) => (
                <button key={item.slug} type="button" aria-pressed={active === index} aria-controls="occasion-scene" onClick={() => setActive(index)} className="occasion-choice group flex min-h-14 cursor-pointer items-center gap-2 lg:gap-4 border-b border-white/10 py-4 text-left transition-colors hover:text-noir-champagne lg:min-h-20">
                  <span className="text-[10px] tracking-widest text-noir-champagne">0{index + 1}</span>
                  <span className="flex-1 font-display text-base sm:text-xl lg:text-2xl">{item.label}</span>
                  <ArrowUpRight className="hidden h-5 w-5 transition-transform motion-safe:group-hover:rotate-45 lg:block" aria-hidden="true" />
                </button>
              ))}
            </div>
            <p className="mt-7 hidden text-xs leading-6 text-noir-muted lg:block">Porto Empedocle, vicino ad Agrigento.<br />Passion · 55 m² &nbsp; / &nbsp; Infinity · 77 m²</p>
          </div>
          <div id="occasion-scene" className="relative isolate min-h-[530px] bg-noir-ink sm:min-h-[620px]" aria-live="polite" aria-atomic="true">
            <AnimatePresence initial={false}>
              <motion.div key={moment.slug} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.45 }}>
                <Image src={moment.image.src} alt={moment.image.alt} fill sizes="(max-width: 1023px) 100vw, 60vw" className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,3,9,.08)_0%,rgba(6,3,9,.2)_25%,rgba(6,3,9,.88)_70%,#060309_100%)]" />
              </motion.div>
            </AnimatePresence>
            <div className="relative flex h-full min-h-[530px] flex-col justify-between p-6 sm:min-h-[620px] sm:p-10 lg:p-12">
              <div className="flex justify-between gap-4 text-xs tracking-[0.18em] text-white"><span className="border border-white/30 bg-black/40 px-3 py-2">EUPHORIA / MOMENTI</span><span className="bg-black/40 px-3 py-2">0{active + 1} / {String(moments.length).padStart(2, "0")}</span></div>
              <div className="pt-24">
                <h3 className="whitespace-pre-line font-display text-[2.7rem] leading-[0.98] text-white sm:text-6xl">{moment.line}</h3>
                <p className="mt-5 max-w-sm text-base leading-7 text-white/85">{moment.detail}</p>
                <Link href={`/${moment.slug}`} className="mt-7 inline-flex min-h-12 items-center gap-6 border-b border-noir-champagne pb-2 text-sm text-white transition-colors hover:text-noir-champagne">Esplora questa occasione <ArrowUpRight size={19} aria-hidden="true" /></Link>
              </div>
            </div>
          </div>
        </div>
        <nav aria-label="Tutte le occasioni Euphoria" className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
          {moments.map((item) => <Link key={item.slug} href={`/${item.slug}`} className="inline-flex min-h-11 items-center gap-2 text-xs text-noir-muted underline decoration-white/25 underline-offset-4 hover:text-white">{item.label}<ArrowUpRight size={12} aria-hidden="true" /></Link>)}
        </nav>
      </div>
    </section>
  );
}

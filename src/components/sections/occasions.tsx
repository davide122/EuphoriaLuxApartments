"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, MoveHorizontal } from "lucide-react";

type Moment = { slug: string; label: string; line: string; detail: string; image: { src: string; alt: string } };

export function OccasionsSection({ moments }: { moments: Moment[] }) {
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLElement | null>>([]);
  const reduced = useReducedMotion();

  const cardLeft = useCallback((index: number) => {
    const rail = railRef.current;
    const card = cardsRef.current[index];
    if (!rail || !card) return 0;
    const padding = parseFloat(getComputedStyle(rail).paddingLeft);
    return card.getBoundingClientRect().left - rail.getBoundingClientRect().left + rail.scrollLeft - padding;
  }, []);

  const syncActive = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    let nearest = 0;
    let distance = Infinity;
    moments.forEach((_, index) => {
      const delta = Math.abs(cardLeft(index) - rail.scrollLeft);
      if (delta < distance) { nearest = index; distance = delta; }
    });
    setActive(nearest);
  }, [cardLeft, moments]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new ResizeObserver(syncActive);
    observer.observe(rail);
    return () => observer.disconnect();
  }, [syncActive]);

  const goTo = (index: number) => {
    const target = Math.max(0, Math.min(moments.length - 1, index));
    railRef.current?.scrollTo({ left: cardLeft(target), behavior: reduced ? "instant" : "smooth" });
  };

  if (!moments.length) return null;

  return (
    <section id="occasioni" data-ambient="night" className="occasion-section relative z-10 overflow-hidden py-20 sm:py-28" aria-labelledby="occasions-heading">
      <div className="noir-container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="euphoria-kicker">Le vostre occasioni · Euphoria</div>
            <h2 id="occasions-heading" className="noir-h1 mt-5 text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">Che cosa volete<br /><span className="occasion-script">vivere?</span></h2>
          </div>
          <p className="max-w-xs text-base leading-7 text-noir-muted">Una ricorrenza, un’idea, una sorpresa.<br />Due suite. Il resto parla di voi.</p>
        </div>

        <div className="mb-5 mt-9 flex items-center justify-between gap-4 sm:mt-12">
          <p className="text-[10px] uppercase tracking-[0.2em] text-noir-champagne sm:text-xs">Scegliete il vostro momento</p>
          <span className="flex items-center gap-2 text-xs text-noir-muted" aria-hidden="true"><span className="hidden sm:inline">Scorri e lasciati ispirare</span><MoveHorizontal size={20} /></span>
        </div>

        <div
          id="occasion-cards"
          ref={railRef}
          className="occasion-rail"
          role="region"
          aria-roledescription="carosello"
          aria-label="Le occasioni Euphoria"
          tabIndex={0}
          onScroll={syncActive}
          onKeyDown={(event) => {
            if (event.altKey || event.ctrlKey || event.metaKey) return;
            if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "Home" || event.key === "End") {
              event.preventDefault();
              goTo(event.key === "Home" ? 0 : event.key === "End" ? moments.length - 1 : active + (event.key === "ArrowRight" ? 1 : -1));
            }
          }}
        >
          {moments.map((moment, index) => (
            <article
              key={moment.slug}
              ref={(node) => { cardsRef.current[index] = node; }}
              className="occasion-card"
              data-active={active === index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} di ${moments.length}: ${moment.label}`}
            >
              <Link href={`/${moment.slug}`} className="occasion-card-link group" aria-label={`Esplora: ${moment.label}`}>
                <div className="relative aspect-[3/2] shrink-0 overflow-hidden">
                  <Image src={moment.image.src} alt={moment.image.alt} fill sizes="(max-width: 639px) 82vw, (max-width: 1023px) 60vw, 440px" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.035]" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/50 px-3 py-1.5 text-[10px] tracking-[0.16em] text-white">{String(index + 1).padStart(2, "0")} / EUPHORIA</span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-7">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-noir-champagne">{moment.label}</span>
                  <h3 className="mt-4 whitespace-pre-line font-display text-[2rem] leading-[1.06] text-white sm:text-[2.5rem]">{moment.line}</h3>
                  <p className="mb-6 mt-4 text-base leading-7 text-noir-muted">{moment.detail}</p>
                  <div className="mt-auto flex min-h-11 items-center justify-between gap-3 border-t border-white/15 pt-4 text-sm text-white">
                    <span>Vivi questo momento</span>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-noir-champagne group-hover:bg-white/10"><ArrowUpRight size={19} aria-hidden="true" /></span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-5 sm:mt-7">
          <span className="min-w-14 text-sm tabular-nums text-noir-champagne" aria-live="polite" aria-atomic="true"><span className="sr-only">Occasione </span>{String(active + 1).padStart(2, "0")}<span className="text-noir-muted"> / {String(moments.length).padStart(2, "0")}</span></span>
          <div className="h-px flex-1 overflow-hidden bg-white/15" aria-hidden="true"><div className="h-full origin-left bg-noir-champagne transition-transform duration-300" style={{ transform: `scaleX(${(active + 1) / moments.length})` }} /></div>
          <div className="flex gap-2">
            <button type="button" aria-label="Occasione precedente" aria-controls="occasion-cards" disabled={active === 0} onClick={() => goTo(active - 1)} className="occasion-arrow"><ArrowLeft size={20} aria-hidden="true" /></button>
            <button type="button" aria-label="Occasione successiva" aria-controls="occasion-cards" disabled={active === moments.length - 1} onClick={() => goTo(active + 1)} className="occasion-arrow"><ArrowRight size={20} aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useRef, useState } from "react";

const CHAPTERS = [
  {
    eyebrow: "01 · Arrivate",
    title: "Fuori resta tutto.",
    copy: "Entrate con il vostro codice. Nessun banco, nessuna chiave da ritirare. La porta si chiude e la sera comincia davvero.",
  },
  {
    eyebrow: "02 · Vi fermate",
    title: "L’acqua è già vostra.",
    copy: "La jacuzzi è dentro la suite. Nessun turno, nessun altro ospite. Entrate quando volete e restate finché vi va.",
  },
  {
    eyebrow: "03 · Restate",
    title: "La notte non ha fretta.",
    copy: "La sauna, una cena, un film, ancora acqua calda. Non c’è niente da raggiungere: siete già dove volevate essere.",
  },
] as const;

export function CinematicScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [chapter, setChapter] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextChapter = Math.min(CHAPTERS.length - 1, Math.floor(latest * CHAPTERS.length));
    setChapter((current) => (current === nextChapter ? current : nextChapter));

    if (!reduceMotion && videoRef.current && duration > 0) {
      const targetTime = Math.min(duration - 0.05, latest * duration);
      if (Math.abs(videoRef.current.currentTime - targetTime) > 0.035) {
        videoRef.current.currentTime = targetTime;
      }
    }
  });

  return (
    <section
      ref={sectionRef}
      data-ambient="night"
      className="relative z-10 h-[290svh] sm:h-[300svh] lg:h-[320svh]"
    >
      <div className="sticky top-0 flex h-[100svh] overflow-hidden lg:items-center">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_70%_45%,rgba(237,63,166,0.15),transparent_58%),radial-gradient(700px_circle_at_20%_50%,rgba(139,92,246,0.14),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[68svh] bg-[linear-gradient(180deg,transparent_0%,rgba(6,3,9,0.56)_24%,rgba(6,3,9,0.96)_62%,#060309_100%)] lg:hidden" />

        <div className="noir-container relative flex h-full flex-col justify-end gap-8 pb-24 lg:grid lg:grid-cols-12 lg:items-center lg:py-24">
          <div className="relative z-20 lg:col-span-5">
            <div className="euphoria-kicker">Dall’arrivo alla notte</div>
            <div className="relative mt-6 min-h-[16.5rem] sm:mt-8 sm:min-h-[16rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={chapter}
                  initial={reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -22, filter: "blur(8px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-[10px] uppercase tracking-[0.3em] text-noir-champagne/70">
                    {CHAPTERS[chapter].eyebrow}
                  </div>
                  <h2 className="noir-h1 mt-4 max-w-[9ch] text-[2.65rem] leading-[0.9] text-noir-mist sm:mt-5 sm:text-6xl lg:text-7xl">
                    {CHAPTERS[chapter].title}
                  </h2>
                  <p className="mt-5 max-w-md text-[0.9375rem] leading-6 text-noir-mist/75 sm:mt-6 sm:text-base sm:leading-7 lg:text-noir-muted">
                    {CHAPTERS[chapter].copy}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex gap-2" aria-hidden="true">
              {CHAPTERS.map((item, index) => (
                <span
                  key={item.eyebrow}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === chapter
                      ? "w-6 bg-noir-fuchsia"
                      : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.div
            className="absolute inset-x-0 top-0 h-[64svh] overflow-hidden rounded-b-[3.25rem] sm:h-[68svh] lg:static lg:col-span-7 lg:h-[82svh] lg:w-auto lg:rounded-[44%_44%_16%_44%]"
          >
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              poster="/euphoria-scroll-poster.webp"
              aria-label="Jacuzzi Euphoria illuminata da luci rosa e viola"
              onLoadedMetadata={(event) => {
                setDuration(event.currentTarget.duration);
                if (reduceMotion) event.currentTarget.currentTime = event.currentTarget.duration * 0.45;
              }}
              className="h-full w-full object-cover object-center"
            >
              <source
                src="/euphoria-scroll-mobile.mp4"
                type="video/mp4"
                media="(max-width: 767px)"
              />
              <source src="/euphoria-scroll.mp4" type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,3,9,0.04),transparent_48%,rgba(6,3,9,0.7))] lg:bg-[linear-gradient(90deg,rgba(6,3,9,0.62),transparent_45%),linear-gradient(180deg,rgba(6,3,9,0.08),transparent_60%,rgba(6,3,9,0.32))]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

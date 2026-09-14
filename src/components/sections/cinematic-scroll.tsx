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
      className="relative z-10 py-16 lg:h-[320svh] lg:py-0"
    >
      <div className="noir-container lg:hidden">
        <div className="relative aspect-[9/13] overflow-hidden rounded-2xl bg-noir-graphite">
          <video
            muted
            playsInline
            autoPlay={!reduceMotion}
            loop
            preload="metadata"
            poster="/euphoria-scroll-poster.webp"
            aria-label="Jacuzzi Euphoria illuminata da luci rosa e viola"
            className="h-full w-full object-cover object-center"
          >
            <source src="/euphoria-scroll-mobile.mp4" type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
        </div>

        <div className="mt-9">
          <div className="euphoria-kicker">Dall’arrivo alla notte</div>
          <h2 className="noir-h1 mt-5 text-4xl leading-[0.95] text-noir-mist">
            Tutto resta dentro la vostra suite.
          </h2>
        </div>

        <div className="mt-8 grid gap-0 border-t border-white/10">
          {CHAPTERS.map((item) => (
            <article key={item.eyebrow} className="border-b border-white/10 py-7">
              <div className="text-[10px] uppercase tracking-[0.26em] text-noir-champagne/70">
                {item.eyebrow}
              </div>
              <h3 className="noir-h1 mt-3 text-2xl text-noir-mist">{item.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-6 text-noir-mist/72">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="sticky top-0 hidden h-[100svh] overflow-hidden lg:flex lg:items-center">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_70%_45%,rgba(237,63,166,0.15),transparent_58%),radial-gradient(700px_circle_at_20%_50%,rgba(139,92,246,0.14),transparent_60%)]" />

        <div className="noir-container relative grid h-full grid-cols-12 items-center gap-8 py-24">
          <div className="relative z-20 lg:col-span-5">
            <div className="euphoria-kicker">Dall’arrivo alla notte</div>
            <div className="relative mt-8 min-h-[16rem]">
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
                  <h2 className="noir-h1 mt-5 max-w-[9ch] text-7xl leading-[0.9] text-noir-mist">
                    {CHAPTERS[chapter].title}
                  </h2>
                  <p className="mt-6 max-w-md text-base leading-7 text-noir-muted">
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
            className="relative col-span-7 h-[82svh] overflow-hidden rounded-2xl"
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
              <source src="/euphoria-scroll.mp4" type="video/mp4" media="(min-width: 1024px)" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,3,9,0.62),transparent_45%),linear-gradient(180deg,rgba(6,3,9,0.08),transparent_60%,rgba(6,3,9,0.32))]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

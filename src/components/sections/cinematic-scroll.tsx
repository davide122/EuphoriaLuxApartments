"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Pause, Play, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { NoirLink } from "@/components/ui/noir-link";
import { trackEvent } from "@/lib/analytics";

const SCENES = [
  {
    suite: "Passion",
    chapter: "01",
    kicker: "Il primo sguardo",
    title: "Chi inviteresti qui?",
    copy: "Una stanza raccolta, una luce che cambia tutto e la jacuzzi a pochi passi dal letto.",
    video: "/videos/passion-invito.mp4",
    poster: "/passion/WhatsApp Image 2026-08-16 at 21.29.22.jpeg",
    href: "/suites/passion",
    accent: "#ff6fbd",
  },
  {
    suite: "Passion",
    chapter: "02",
    kicker: "Solo per voi",
    title: "Un bacio è troppo poco.",
    copy: "Petali, acqua calda e silenzio. Fuori può aspettare: dentro avete già tutto.",
    video: "/videos/passion-bacio.mp4",
    poster: "/passion/WhatsApp Image 2026-08-16 at 21.29.23.jpeg",
    href: "/suites/passion",
    accent: "#f4b8df",
  },
  {
    suite: "Passion",
    chapter: "03",
    kicker: "La sorpresa",
    title: "Le parole possono aspettare.",
    copy: "Luci accese, atmosfera pronta. Voi dovete soltanto aprire la porta.",
    video: "/videos/passion-sorpresa.mp4",
    poster: "/passion/WhatsApp Image 2026-08-16 at 21.29.22 (1).jpeg",
    href: "/suites/passion",
    accent: "#ff4d9d",
  },
  {
    suite: "Infinity",
    chapter: "04",
    kicker: "Più spazio, stesso incanto",
    title: "Dove vorresti essere adesso?",
    copy: "Settantasette metri quadrati tra living, cucina, zona notte e una SPA che resta soltanto vostra.",
    video: "/videos/infinity-dove.mp4",
    poster: "/infinity/WhatsApp Image 2026-08-16 at 21.29.23 (2).jpeg",
    href: "/suites/infinity",
    accent: "#a98cff",
  },
] as const;

function VideoScene({
  index,
  active,
  playing,
  className = "",
}: {
  index: number;
  active: boolean;
  playing: boolean;
  className?: string;
}) {
  const scene = SCENES[index];

  return (
    <video
      data-cinematic-video
      data-scene-index={index}
      muted
      loop
      playsInline
      preload={active ? "metadata" : "none"}
      poster={scene.poster}
      aria-label={`${scene.suite}: ${scene.title}`}
      className={className}
      onCanPlay={(event) => {
        if (active && playing && event.currentTarget.offsetParent !== null) {
          void event.currentTarget.play().catch(() => undefined);
        }
      }}
    >
      <source src={scene.video} type="video/mp4" />
    </video>
  );
}

function PlayToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? "Metti in pausa il video" : "Riproduci il video"}
      className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/35 text-white shadow-[0_12px_36px_rgba(0,0,0,.3)] backdrop-blur-xl transition-colors duration-200 hover:border-fuchsia-200/70 hover:bg-fuchsia-500/25"
    >
      {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
    </button>
  );
}

export function CinematicScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewedScenes = useRef<Set<number>>(new Set());
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers = Array.from(section.querySelectorAll<HTMLElement>("[data-scene-trigger]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;

        const index = Number((visible.target as HTMLElement).dataset.sceneTrigger);
        if (Number.isNaN(index)) return;

        setActive(index);
        if (!viewedScenes.current.has(index)) {
          viewedScenes.current.add(index);
          trackEvent({ name: "reel_view", params: { reel: index + 1, title: SCENES[index].title } });
        }
      },
      { rootMargin: "-24% 0px -24% 0px", threshold: [0.2, 0.45, 0.7] }
    );

    triggers.forEach((trigger) => observer.observe(trigger));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const videos = sectionRef.current?.querySelectorAll<HTMLVideoElement>("[data-cinematic-video]");
    videos?.forEach((video) => {
      const isActive = Number(video.dataset.sceneIndex) === active;
      const isVisibleLayout = video.offsetParent !== null;

      if (!isActive || !playing || reduceMotion || !isVisibleLayout) {
        video.pause();
        return;
      }

      if (video.readyState === 0) video.load();
      void video.play().catch(() => setPlaying(false));
    });
  }, [active, playing, reduceMotion]);

  const togglePlaying = () => setPlaying((value) => !value);

  return (
    <section ref={sectionRef} id="reels" data-ambient="night" className="relative z-10 overflow-clip py-20 sm:py-28 lg:pb-36">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[-17rem] top-[10rem] h-[36rem] w-[36rem] rounded-full bg-[#7c2cff]/18 blur-[130px]" />
        <div className="absolute right-[-14rem] top-[48rem] h-[38rem] w-[38rem] rounded-full bg-[#ff2aa1]/18 blur-[130px]" />
      </div>

      <div className="noir-container relative">
        <Reveal>
          <div className="max-w-4xl">
            <div className="euphoria-kicker">Passion & Infinity · in movimento</div>
            <h2 className="noir-h1 mt-5 text-[2.8rem] leading-[0.9] text-white sm:text-6xl md:text-7xl lg:text-[5.6rem]">
              Non immaginatela.
              <br />
              <span className="text-white/48">Sentitela.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#eaddea] sm:text-lg">
              Quattro frammenti reali, nessun render. Scorrete lentamente: ogni scena racconta un modo diverso di vivere Euphoria.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 lg:mt-20 lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(21rem,.75fr)] lg:gap-16 xl:gap-24">
          <div className="hidden lg:block">
            <div className="sticky top-20 h-[calc(100svh-6.5rem)] min-h-[620px] overflow-hidden rounded-[3.5rem] border border-white/14 bg-[#0b050f] shadow-[0_44px_140px_rgba(0,0,0,.58)]">
              {SCENES.map((scene, index) => (
                <motion.div
                  key={scene.video}
                  animate={{ opacity: active === index ? 1 : 0, scale: active === index ? 1 : 1.035 }}
                  transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                  aria-hidden={active !== index}
                >
                  <VideoScene index={index} active={active === index} playing={playing && !reduceMotion} className="h-full w-full object-cover" />
                </motion.div>
              ))}

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,2,8,.1),transparent_42%,rgba(5,2,8,.86)_100%)]" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

              <div className="absolute inset-x-0 top-0 flex items-center gap-2 p-8" aria-hidden="true">
                {SCENES.map((scene, index) => (
                  <span key={scene.chapter} className={`h-[2px] flex-1 rounded-full transition-colors duration-500 ${index === active ? "bg-white" : index < active ? "bg-white/45" : "bg-white/18"}`} />
                ))}
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-8 xl:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={SCENES[active].title}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">{SCENES[active].chapter} · {SCENES[active].suite}</div>
                    <div className="noir-h1 mt-2 max-w-[12ch] text-4xl leading-none text-white">{SCENES[active].title}</div>
                  </motion.div>
                </AnimatePresence>
                {!reduceMotion ? <PlayToggle playing={playing} onToggle={togglePlaying} /> : null}
              </div>
            </div>
          </div>

          <div className="space-y-7 lg:space-y-0">
            {SCENES.map((scene, index) => (
              <motion.article
                key={scene.video}
                data-scene-trigger={index}
                initial={reduceMotion ? false : { opacity: 0.5, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.42 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex min-h-[82svh] flex-col justify-end overflow-hidden rounded-[2.35rem] border border-white/14 bg-[#100717] shadow-[0_28px_90px_rgba(0,0,0,.42)] lg:min-h-[92svh] lg:justify-center lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none"
              >
                <div className="absolute inset-0 lg:hidden">
                  <VideoScene index={index} active={active === index} playing={playing && !reduceMotion} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,2,8,.16),transparent_30%,rgba(5,2,8,.22)_48%,rgba(5,2,8,.96)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 opacity-45 blur-3xl" style={{ background: `radial-gradient(circle at 50% 100%, ${scene.accent}, transparent 62%)` }} />
                </div>

                <div className="relative z-10 p-7 sm:p-10 lg:p-0">
                  <div className="flex items-center justify-between gap-5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: scene.accent }}>{scene.chapter} · {scene.suite}</span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/55 lg:hidden">Video reale</span>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/68">
                    <Sparkles className="h-3.5 w-3.5" />
                    {scene.kicker}
                  </div>
                  <h3 className="noir-h1 mt-4 text-[2.75rem] leading-[0.92] text-white sm:text-6xl lg:text-6xl">{scene.title}</h3>
                  <p className="mt-5 max-w-md text-base leading-7 text-white/80 lg:text-[#d8cadb]">{scene.copy}</p>

                  <div className="mt-8 flex items-center gap-4">
                    <NoirLink href={scene.href} variant="ghost" className="border-white/24 bg-black/25 text-white backdrop-blur-xl lg:bg-white/[.04]">Scopri {scene.suite}</NoirLink>
                    <div className="lg:hidden">
                      {!reduceMotion ? <PlayToggle playing={playing && active === index} onToggle={togglePlaying} /> : null}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.26em] text-white/48 lg:hidden">
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          Scorri per cambiare scena
        </div>
      </div>
    </section>
  );
}

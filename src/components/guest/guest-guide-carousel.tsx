"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { noir } from "@/lib/noir";

export type GuestGuideSlide = {
  id: string;
  title: string;
  subtitle?: string;
  video?: { title: string; src?: string; poster?: string };
  highlight?: { label: string; value: string };
  steps: string[];
  notes?: string[];
  troubleshooting?: Array<{ q: string; a: string }>;
};

function safeTrim(v: string | undefined | null) {
  return (v ?? "").trim();
}

function normalizeVideoUrl(input: string) {
  const raw = safeTrim(input);
  if (!raw) return "";
  if (raw.toLowerCase().endsWith(".mp4")) return raw;

  try {
    const u = new URL(raw);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = u.pathname.split("/").filter(Boolean)[0] ?? "";
      if (!id) return raw;
      return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&origin=${encodeURIComponent(noir.siteUrl)}`;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname === "/watch") {
        const id = u.searchParams.get("v") ?? "";
        if (!id) return raw;
        return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&origin=${encodeURIComponent(noir.siteUrl)}`;
      }
      if (u.pathname.startsWith("/embed/")) return raw;
      return raw;
    }

    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0] ?? "";
      if (!id) return raw;
      return `https://player.vimeo.com/video/${id}?dnt=1`;
    }

    return raw;
  } catch {
    return raw;
  }
}

function VideoEmbed({ title, src, poster }: { title: string; src?: string; poster?: string }) {
  const url = safeTrim(src);
  if (!url) return null;

  const normalized = normalizeVideoUrl(url);
  const isMp4 = normalized.toLowerCase().endsWith(".mp4");
  if (isMp4) {
    return (
      <div className="mt-6 overflow-hidden rounded-2xl bg-black/25 p-3 sm:p-4">
        <div className="text-xs tracking-[0.18em] uppercase text-noir-mist/55">{title}</div>
        <video className="mt-3 w-full rounded-xl" controls playsInline preload="metadata" poster={poster}>
          <source src={normalized} type="video/mp4" />
        </video>
      </div>
    );
  }

  const showExternalLink = normalized !== url;

  return (
    <div className="mt-6 overflow-hidden rounded-2xl bg-black/25 p-3 sm:p-4">
      <div className="text-xs tracking-[0.18em] uppercase text-noir-mist/55">{title}</div>
      <div className="mt-3 overflow-hidden rounded-xl">
        <iframe
          title={title}
          src={normalized}
          className="h-[240px] w-full sm:h-[320px]"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
          allowFullScreen
        />
      </div>
      {showExternalLink ? (
        <div className="mt-3">
          <NoirAnchor href={url} target="_blank" rel="noreferrer" variant="ghost" className="w-full justify-center">
            Apri su YouTube/Vimeo
          </NoirAnchor>
        </div>
      ) : null}
    </div>
  );
}

function Card({
  badge,
  title,
  subtitle,
  video,
  highlight,
  steps,
  notes,
  troubleshooting,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  video?: { title: string; src?: string; poster?: string };
  highlight?: { label: string; value: string };
  steps: string[];
  notes?: string[];
  troubleshooting?: Array<{ q: string; a: string }>;
}) {
  return (
    <div className="noir-panel min-h-[84svh] p-10 sm:p-12">
      {badge ? (
        <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
          {badge}
        </div>
      ) : null}
      <div className={`font-medium tracking-tight text-noir-mist ${badge ? "mt-3" : ""} text-3xl sm:text-4xl`}>
        {title}
      </div>
      {subtitle ? <p className="mt-4 text-base leading-7 text-noir-muted sm:text-lg sm:leading-8">{subtitle}</p> : null}

      {highlight ? (
        <div className="mt-6 overflow-hidden rounded-2xl bg-white/5 px-6 py-5">
          <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">{highlight.label}</div>
          <div className="mt-3 text-3xl font-medium tracking-[0.14em] text-noir-mist sm:text-4xl">
            {highlight.value}
          </div>
        </div>
      ) : null}

      {video?.src ? <VideoEmbed title={video.title} src={video.src} poster={video.poster} /> : null}

      <div className="mt-7 grid gap-3">
        {steps.map((t, idx) => (
          <div key={`${idx}-${t}`} className="flex items-start gap-4 text-base leading-7 text-noir-mist/85 sm:text-lg sm:leading-8">
            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-noir-mist/90">
              {idx + 1}
            </span>
            <span>{t}</span>
          </div>
        ))}
      </div>

      {notes?.length ? (
        <div className="mt-7 rounded-2xl bg-white/5 px-6 py-5">
          <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">Note</div>
          <div className="mt-3 grid gap-2">
            {notes.map((t) => (
              <div key={t} className="flex items-start gap-3 text-base leading-7 text-noir-mist/80">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/45" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {troubleshooting?.length ? (
        <div className="mt-7 grid gap-3">
          <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">Problemi rapidi</div>
          <div className="grid gap-3">
            {troubleshooting.map((t) => (
              <details key={t.q} className="group rounded-2xl bg-white/5 px-6 py-5">
                <summary className="cursor-pointer list-none text-base font-medium text-noir-mist/85 [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between gap-6">
                    <span>{t.q}</span>
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/55 transition group-open:bg-white/80" />
                  </div>
                </summary>
                <div className="mt-3 text-base leading-7 text-noir-muted">{t.a}</div>
              </details>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function GuestGuideCarousel({
  slides,
}: {
  slides: GuestGuideSlide[];
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const dots = useMemo(() => slides.map((s) => ({ id: s.id, title: s.title })), [slides]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const els = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({ idx: Number((e.target as HTMLElement).dataset.idx ?? "0"), ratio: e.intersectionRatio }))
          .sort((a, b) => b.ratio - a.ratio)[0];
        if (visible) setActiveIndex(visible.idx);
      },
      { root, threshold: [0.5, 0.65, 0.8] }
    );

    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, [slides.length]);

  const scrollTo = (idx: number) => {
    const el = slideRefs.current[idx];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const prevDisabled = activeIndex <= 0;
  const nextDisabled = activeIndex >= slides.length - 1;

  return (
    <div className="mt-12">
      <div
        ref={scrollerRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s, idx) => (
          <div
            key={s.id}
            ref={(n) => {
              slideRefs.current[idx] = n;
            }}
            data-idx={idx}
            className="min-w-[100%] snap-start"
          >
            <Card
              badge={`${idx + 1}/${slides.length}`}
              title={s.title}
              subtitle={s.subtitle}
              video={s.video}
              highlight={s.highlight}
              steps={s.steps}
              notes={s.notes}
              troubleshooting={s.troubleshooting}
            />
          </div>
        ))}
      </div>

      {slides.length > 1 ? (
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            className={`noir-button rounded-full px-4 py-2 text-xs ${prevDisabled ? "opacity-40 pointer-events-none" : ""}`}
            onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
          >
            Indietro
          </button>

          <div className="flex items-center justify-center gap-2">
            {dots.map((d, idx) => (
              <button
                key={d.id}
                type="button"
                aria-label={d.title}
                className={`h-2.5 w-2.5 rounded-full ${idx === activeIndex ? "bg-white/80" : "bg-white/20"}`}
                onClick={() => scrollTo(idx)}
              />
            ))}
          </div>

          <button
            type="button"
            className={`noir-button noir-button-primary rounded-full px-4 py-2 text-xs ${nextDisabled ? "opacity-40 pointer-events-none" : ""}`}
            onClick={() => scrollTo(Math.min(slides.length - 1, activeIndex + 1))}
          >
            Avanti
          </button>
        </div>
      ) : null}
    </div>
  );
}

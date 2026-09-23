"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, ExternalLink, Globe2, MapPin, Sparkles, Star } from "lucide-react";
import { GOOGLE_REVIEWS_SUMMARY, type GoogleReview } from "@/lib/google-reviews";
import { NoirAnchor } from "@/components/ui/noir-anchor";

function StarRow({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} stelle su 5`}>
      {stars.map((on, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${on ? "fill-amber-300 text-amber-300" : "text-white/12"}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function InitialsAvatar({ name, i }: { name: string; i: number }) {
  const cleaned = name.trim().split(/\s+/).filter(Boolean);
  const first = (cleaned[0]?.[0] ?? "E").toUpperCase();
  const second = (cleaned[1]?.[0] ?? "").toUpperCase();
  const grads = [
    "from-fuchsia-400/40 via-purple-400/35 to-indigo-400/35",
    "from-sky-400/40 via-indigo-400/35 to-purple-400/35",
    "from-amber-400/40 via-fuchsia-400/35 to-purple-400/35",
    "from-emerald-400/40 via-sky-400/35 to-indigo-400/35",
    "from-rose-400/40 via-fuchsia-400/35 to-purple-400/35",
    "from-indigo-400/40 via-sky-400/35 to-emerald-400/35",
    "from-lime-400/40 via-amber-400/35 to-fuchsia-400/35",
    "from-cyan-400/40 via-sky-400/35 to-purple-400/35",
  ];
  return (
    <div
      className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br ${grads[i % grads.length]} backdrop-blur`}
    >
      <span className="noir-display text-[0.95rem] font-semibold tracking-tight text-white/95">
        {first}
        {second}
      </span>
    </div>
  );
}

function ReviewCard({
  r,
  index,
  inView,
}: {
  r: GoogleReview;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.02 * Math.min(index, 14),
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group snap-start shrink-0 w-[88%] max-w-[420px] sm:w-[400px] sm:max-w-[400px] flex h-full flex-col rounded-[1.75rem] border border-white/5 bg-white/[0.022] p-6 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/10"
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <InitialsAvatar name={r.author_name} i={index} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="noir-display truncate text-[0.95rem] font-semibold text-white sm:text-base">
                {r.author_name}
              </div>
              {r.isRecent ? (
                <span className="inline-flex h-5 items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-200">
                  <Sparkles className="h-2.5 w-2.5" /> Nuova
                </span>
              ) : null}
              {r.language === "es" ? (
                <span className="inline-flex h-5 items-center gap-1 rounded-full border border-sky-400/25 bg-sky-500/10 px-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-sky-100">
                  <Globe2 className="h-2.5 w-2.5" /> ES
                </span>
              ) : null}
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <StarRow rating={r.rating} />
              <span className="text-[11px] text-zinc-500 sm:text-xs">
                {r.relative_time_description}
              </span>
            </div>
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none inline-flex h-9 w-9 flex-none items-center justify-center rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.06] to-white/[0.015] text-[10px] font-semibold tracking-[0.16em] text-zinc-300/90"
        >
          G
        </div>
      </header>

      <div className="mt-3 flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
        Recensione di · Google
      </div>

      <blockquote className="mt-4 flex-1 text-[0.92rem] leading-7 text-zinc-200/90 sm:text-[0.98rem] sm:leading-8">
        <p className="line-clamp-[9]">“{r.text}”</p>
      </blockquote>

      <footer className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-[11px] text-zinc-500 sm:text-xs">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-purple-300/80" />
          Porto Empedocle · Sicilia
        </span>
        <span className="inline-flex items-center gap-1.5 text-emerald-300/80">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Verificata
        </span>
      </footer>
    </motion.article>
  );
}

function HeaderContent({
  rating,
  user_ratings_total,
}: {
  rating: number;
  user_ratings_total: number;
}) {
  const whole = Math.floor(rating);
  const frac = Math.round((rating - whole) * 10);
  return (
    <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-zinc-400 sm:text-xs">
          <span
            aria-hidden
            className="inline-flex h-4 w-4 items-center justify-center rounded-md bg-gradient-to-b from-white/[0.15] to-white/[0.02] text-[10px] font-semibold text-zinc-200"
          >
            G
          </span>
          Recensioni reali · Google Maps
        </div>
        <h2 className="noir-display max-w-2xl text-3xl font-semibold leading-[1.02] text-white sm:text-4xl md:text-5xl">
          Questo è quello che dicono,
          <br />
          dopo essere entrati.
        </h2>
      </div>

      <div className="flex w-full items-center gap-6 rounded-3xl border border-white/5 bg-white/[0.02] px-5 py-4 sm:w-auto sm:min-w-[340px]">
        <div className="flex flex-col">
          <div className="flex items-end gap-2">
            <span className="noir-display text-5xl font-semibold leading-none text-white sm:text-6xl">
              {rating.toFixed(1)}
            </span>
            <span className="mb-1 text-lg font-medium text-zinc-500">/ 5</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <StarRow rating={rating} />
            <span className="text-xs text-zinc-500">
              {user_ratings_total.toLocaleString("it-IT")} recensioni
            </span>
          </div>
        </div>
        <div className="ml-auto hidden h-12 w-px flex-none bg-gradient-to-b from-transparent via-white/10 to-transparent sm:block" />
        <div className="hidden flex-none flex-col items-end gap-1 text-right sm:flex">
          <span className="text-[11px] uppercase tracking-[0.18em] text-purple-300/80">
            rating medio
          </span>
          <span className="noir-display text-lg font-semibold text-white">
            {whole},{frac} stelle
          </span>
          <span className="text-xs text-zinc-500">
            più votato in zona · Porto Empedocle
          </span>
        </div>
      </div>
    </div>
  );
}

export function GoogleReviewsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });
  const { rating, user_ratings_total, place_url, reviews } = GOOGLE_REVIEWS_SUMMARY;

  return (
    <section
      ref={sectionRef}
      data-ambient="noir"
      className="relative z-10 overflow-hidden border-t border-white/5 bg-gradient-to-b from-zinc-950/50 via-zinc-950/70 to-zinc-950/50 py-16 sm:py-24"
      style={{ position: "relative" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12),transparent_60%)] blur-2xl" />
        <div className="absolute -left-40 bottom-0 h-[420px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.1),transparent_60%)] blur-2xl" />
      </div>

      <div className="noir-container relative">
        <HeaderContent rating={rating} user_ratings_total={user_ratings_total} />

        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 pl-[max(1.25rem,calc((100vw-1280px)/2+1.25rem))] pr-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5">
          {reviews.map((r, i) => (
            <ReviewCard
              key={`${r.author_name}-${i}-${r.relative_time_description}`}
              r={r}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        <motion.div
          className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.22, duration: 0.55, ease: "easeOut" }}
        >
          <p className="text-sm text-zinc-500 sm:text-[0.95rem]">
            Scorri per leggerle tutte · {reviews.length} recensioni Google reali, ordinate dalla più recente
          </p>
          <NoirAnchor
            href={place_url}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="md"
            className="inline-flex items-center gap-2"
            track={{
              name: "google_reviews_maps_cta",
              params: { total: user_ratings_total, rating },
            }}
          >
            <ExternalLink className="h-4 w-4 text-purple-200" />
            Leggile tutte su Google Maps
          </NoirAnchor>
        </motion.div>
      </div>
    </section>
  );
}

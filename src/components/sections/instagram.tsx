"use client";

import { useEffect, useState } from "react";
import { Camera, ExternalLink, MessageCircle, PlayCircle } from "lucide-react";
import { noir } from "@/lib/noir";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { trackEvent } from "@/lib/analytics";

type IgMedia = {
  id: string;
  caption?: string;
  media_url: string;
  thumbnail_url?: string | null;
  permalink: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  timestamp: string;
};

type FeedRes =
  | { ok: true; connected: true; data: IgMedia[]; count?: number; instagramUrl: string }
  | { ok: false; connected: boolean; data: IgMedia[]; message?: string; error?: unknown; instagramUrl: string };

export function InstagramSection() {
  const [res, setRes] = useState<FeedRes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/instagram", { cache: "force-cache" })
      .then((r) => r.json() as Promise<FeedRes>)
      .then((d) => {
        if (!mounted) return;
        setRes(d);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const gridSize = 6;
  const data = res?.ok ? res.data.slice(0, gridSize) : [];
  const placeholders = Array.from({ length: gridSize }, (_, i) => i);

  return (
    <section className="relative z-10 border-t border-white/5 bg-zinc-950/40 py-16 sm:py-20">
      <div className="noir-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-purple-200/70">
            <Camera className="h-3.5 w-3.5" />
            Instagram · @euphorialuxurysuites
          </div>
          <h2 className="noir-display text-3xl font-semibold text-white sm:text-4xl">
            Viverla, prima di viverla.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            {res?.ok && data.length > 0
              ? "Le ultime 6 foto pubblicate. Clicca per aprire su Instagram, vota, condividi."
              : res?.connected
                ? "Stiamo caricando il feed reale. Nel frattempo seguici su Instagram: foto, backstage e nuove esperienze."
                : "Collega il token Instagram Basic Display alle env vars per vedere qui le foto reali. Nel frattempo seguici per vedere gli scatti della suite."}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
          {loading
            ? placeholders.map((i) => (
                <div
                  key={i}
                  className="relative aspect-square animate-pulse overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03]"
                  aria-hidden
                />
              ))
            : data.length > 0
              ? data.map((m) => {
                  const isVideo = m.media_type === "VIDEO";
                  const src = isVideo && m.thumbnail_url ? m.thumbnail_url : m.media_url;
                  const caption = m.caption?.split("\n")[0]?.slice(0, 70) ?? "Apri su Instagram";
                  return (
                    <a
                      key={m.id}
                      href={m.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent({ name: "instagram_post_click", params: { id: m.id } })
                      }
                      className="group relative aspect-square overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 transition hover:-translate-y-0.5 hover:border-purple-500/25 hover:shadow-[0_0_50px_-16px_rgba(168,85,247,0.5)]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={caption || "Foto Instagram Euphoria"}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                        onError={(e) => {
                          const t = e.currentTarget;
                          t.style.display = "none";
                        }}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                      <div className="absolute inset-x-0 bottom-0 translate-y-2 px-3 pb-3 text-xs text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="flex items-center justify-between gap-2">
                          <span className="line-clamp-2 leading-snug">{caption || "Apri il post"}</span>
                          <ExternalLink className="h-3.5 w-3.5 flex-none text-white/80" />
                        </div>
                      </div>
                      {isVideo && (
                        <span className="absolute right-3 top-3 rounded-full bg-black/50 p-1.5 text-white backdrop-blur">
                          <PlayCircle className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </a>
                  );
                })
              : placeholders.map((i) => {
                  const gradients = [
                    "from-purple-900/40 via-zinc-900 to-zinc-950",
                    "from-fuchsia-900/30 via-zinc-900 to-zinc-950",
                    "from-indigo-900/30 via-zinc-900 to-zinc-950",
                    "from-zinc-800 via-zinc-900 to-zinc-950",
                    "from-purple-800/20 via-zinc-900 to-zinc-950",
                    "from-fuchsia-800/25 via-zinc-900 to-zinc-950",
                  ];
                  const emoji = ["🛁", "💜", "🕯️", "🛌", "🍷", "✨"];
                  return (
                    <a
                      key={i}
                      href={noir.contacts.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent({ name: "instagram_cta_click", params: { variant: "placeholder", i } })
                      }
                      className={`group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br ${gradients[i % gradients.length]} p-6 text-center transition hover:border-purple-500/25 hover:shadow-[0_0_50px_-18px_rgba(168,85,247,0.45)]`}
                    >
                      <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
                        {emoji[i % emoji.length]}
                      </span>
                      <div className="max-w-[85%] text-[11px] uppercase tracking-[0.15em] text-white/70">
                        Post {i + 1}
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/80 transition group-hover:bg-purple-500/10">
                        <MessageCircle className="h-3 w-3" />
                        Seguici su Instagram
                      </span>
                    </a>
                  );
                })}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <NoirAnchor
            href={noir.contacts.instagram}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="md"
            track={{ name: "instagram_profile_click", params: { section: "home_instagram" } }}
            className="inline-flex items-center gap-2"
          >
            <Camera className="h-4 w-4" />
            Apri profilo Instagram
          </NoirAnchor>
          {!res?.connected && (
            <span className="max-w-md text-xs text-zinc-500">
              Per mostrare il feed reale: aggiungi <code className="rounded-md bg-white/[0.04] px-1.5 py-0.5 text-[11px] text-zinc-300">INSTAGRAM_ACCESS_TOKEN</code> alle env vars.
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

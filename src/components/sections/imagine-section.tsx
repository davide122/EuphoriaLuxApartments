"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  PencilLine,
  Send,
  Sparkles,
  XCircle,
  Wand2,
  Hotel,
  MessageCircle,
  RefreshCcw,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { type ImagineScene } from "@/lib/imagine";
import { noir } from "@/lib/noir";

const EXAMPLES = [
  "Anniversario, luce viola e prosecco",
  "Compleanno con torta e petali",
] as const;

const YES = [
  { icon: Hotel, label: "Sceglie suite e atmosfera" },
  { icon: Sparkles, label: "Aggiunge oggetti reali" },
  { icon: MessageCircle, label: "Genera messaggio per WhatsApp" },
] as const;

const NO = [
  { label: "Non disegna suite nuove" },
  { label: "Non aggiunge persone" },
  { label: "Non sostituisce la foto vera" },
] as const;

const PHASES = {
  idle: { label: "Pronto", tone: "border-white/10" },
  imagining: { label: "In lavorazione", tone: "border-fuchsia-500/35" },
  ready: { label: "Pronta", tone: "border-emerald-400/25" },
} as const;

export function ImagineSection() {
  const reduceMotion = useReducedMotion();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [idea, setIdea] = useState("");
  const [scene, setScene] = useState<ImagineScene | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [phase, setPhase] = useState<keyof typeof PHASES>("idle");
  const [error, setError] = useState("");
  const visual = scene ?? null;
  const poster = visual?.suite === "Infinity"
    ? "/infinity/WhatsApp Image 2026-08-16 at 21.29.23 (2).jpeg"
    : "/passion/WhatsApp Image 2026-08-16 at 21.29.22.jpeg";

  const whatsappHref = useMemo(() => {
    const detail = scene?.details.join(" · ") || "";
    return (
      noir.contacts.whatsapp +
      `?text=${encodeURIComponent(
        `Ciao, vorrei questa Euphoria: ${scene ? `${scene.suite} · ${scene.setupTitle}. ${detail}. ` : ""}La mia idea: ${idea || "—"}`
      )}`
    );
  }, [idea, scene]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const cleanIdea = idea.trim();
    if (cleanIdea.length < 8 || phase === "imagining") return;
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    setError("");
    setScene(null);
    setImage(null);
    setPhase("imagining");
    try {
      const [response] = await Promise.all([
        fetch("/api/imagine", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idea: cleanIdea }),
        }),
        new Promise<void>((r) => setTimeout(r, reduceMotion ? 0 : 900)),
      ]);
      const p = (await response.json().catch(() => ({}))) as {
        scene?: ImagineScene;
        image?: string | null;
        error?: string;
      };
      if (!response.ok || !p.scene) throw new Error(p.error || "Riprova tra un attimo.");
      setScene(p.scene);
      setImage(p.image || null);
      setPhase("ready");
    } catch (caught) {
      setPhase("idle");
      setError(caught instanceof Error ? caught.message : "Riprova tra un attimo.");
    }
  };

  return (
    <section
      id="imagine"
      data-ambient="spa"
      className="relative z-10 overflow-hidden bg-zinc-950 py-14 sm:py-20"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_10%_0%,rgba(217,70,239,0.20),transparent_58%),radial-gradient(700px_circle_at_90%_100%,rgba(168,85,247,0.22),transparent_58%)]" />
      </div>

      <div className="noir-container relative">
        {/* HEADER — POCO TESTO */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/25 bg-fuchsia-500/[0.06] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-fuchsia-100/90">
            <Sparkles className="h-3 w-3 text-fuchsia-200" />
            Anteprima AI
          </div>
          <h2 className="noir-display text-[1.9rem] font-semibold leading-[1.04] text-white sm:text-4xl md:text-5xl">
            Immagina la serata.
            <br />
            <span className="text-white/60">Noi te la mostriamo.</span>
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
            Scrivi in italiano 1 riga: partiamo da una foto vera della suite.
          </p>
        </div>

        {/* SI / NO — CAPIRE SUBITO COSA PUOI / NON PUOI FARE */}
        <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.035] p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200/85">
                Cosa fa
              </div>
            </div>
            <ul className="grid gap-2.5">
              {YES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-zinc-200">
                  <span className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                    <Icon className="h-3.5 w-3.5 text-emerald-200" strokeWidth={1.8} />
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-rose-500/15 bg-rose-500/[0.035] p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2">
              <XCircle className="h-4 w-4 text-rose-300" />
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-200/85">
                Cosa non fa
              </div>
            </div>
            <ul className="grid gap-2.5">
              {NO.map(({ label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-zinc-300">
                  <span className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-rose-200">
                    ✕
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FORM + RISULTATO — SINGOLA CARD */}
        <div className="mx-auto mt-10 max-w-2xl">
          <motion.div
            layout
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`overflow-hidden rounded-3xl border bg-black/40 backdrop-blur-xl ${PHASES[phase].tone} shadow-[0_30px_110px_-30px_rgba(168,85,247,0.35)]`}
          >
            <AnimatePresence mode="wait">
              {phase === "ready" && scene ? (
                <motion.div
                  key="ready"
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-0 sm:grid-cols-[36%_1fr]"
                >
                  {/* Immagine o foto vera in miniatura */}
                  <div className="relative h-60 w-full sm:h-auto sm:min-h-[280px]">
                    <Image
                      src={image || poster}
                      fill
                      sizes="(max-width: 640px) 100vw, 360px"
                      className="object-cover"
                      unoptimized={Boolean(image)}
                      alt={`Anteprima ${scene.suite} — ${scene.occasion}`}
                    />
                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent" />
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur">
                      <Wand2 className="h-3 w-3 text-fuchsia-200" />
                      {image ? "Foto modificata" : "Foto reale"}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fuchsia-100/80">
                          {scene.suite} · {scene.occasion}
                        </div>
                        <h3 className="noir-display mt-2 text-xl font-semibold leading-tight text-white sm:text-2xl">
                          {scene.headline}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPhase("idle");
                          setError("");
                          setImage(null);
                          setTimeout(() => textareaRef.current?.focus(), 200);
                        }}
                        className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:bg-white/[0.08] hover:text-white"
                        aria-label="Modifica idea"
                      >
                        <PencilLine className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {scene.details.slice(0, 4).map((d) => (
                        <span
                          key={d}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-zinc-200"
                        >
                          {d}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 grid gap-2.5 sm:flex sm:items-center">
                      <NoirAnchor
                        href={whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        variant="primary"
                        size="md"
                        className="flex-1 justify-center"
                      >
                        Portala su WhatsApp
                      </NoirAnchor>
                      <button
                        type="button"
                        onClick={() => {
                          setIdea("");
                          setScene(null);
                          setImage(null);
                          setPhase("idle");
                          setError("");
                        }}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-zinc-200 transition hover:bg-white/[0.07]"
                      >
                        <RefreshCcw className="h-3.5 w-3.5" />
                        Ricomincia
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : phase === "imagining" ? (
                <motion.div
                  key="loading"
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-4 py-14 px-5 text-center"
                >
                  <motion.span
                    animate={reduceMotion ? {} : { rotate: 360 }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-fuchsia-500/30 bg-fuchsia-500/10"
                  >
                    <Wand2 className="h-5 w-5 text-fuchsia-200" strokeWidth={1.8} />
                  </motion.span>
                  <div>
                    <div className="noir-display text-lg font-semibold text-white sm:text-xl">
                      Creo la scena…
                    </div>
                    <div className="mt-1 text-xs text-zinc-400">
                      Leggo la foto, costruisco atmosfera e dettagli.
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  onSubmit={submit}
                  className="p-5 sm:p-7"
                >
                  <div className="flex flex-wrap gap-2 pb-3">
                    {EXAMPLES.map((ex) => (
                      <button
                        key={ex}
                        type="button"
                        onClick={() => {
                          setIdea(ex);
                          setError("");
                          setTimeout(() => textareaRef.current?.focus(), 100);
                        }}
                        className="min-h-9 shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-[11px] text-zinc-300 transition hover:border-fuchsia-500/40 hover:bg-fuchsia-500/[0.06] hover:text-white"
                      >
                        {ex}
                      </button>
                    ))}
                  </div>

                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                      <Wand2 className="h-3.5 w-3.5 text-fuchsia-200" />
                      La tua idea (1 riga)
                    </span>
                    <textarea
                      ref={textareaRef}
                      value={idea}
                      onChange={(e) => setIdea(e.target.value.slice(0, 280))}
                      rows={3}
                      placeholder="Es. anniversario, luce viola, prosecco, petali — ma non troppo sdolcinato"
                      className="mt-1 w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-fuchsia-500/50 focus:ring-2 focus:ring-fuchsia-500/15"
                    />
                    <div className="mt-1.5 flex items-center justify-between text-[10px] text-zinc-500">
                      <span>Minimo 8 caratteri · italiano o dialetto è uguale.</span>
                      <span>{idea.length}/280</span>
                    </div>
                  </label>

                  <div className="mt-5 grid gap-2.5 sm:grid-cols-[1fr_auto] sm:items-center">
                    <button
                      type="submit"
                      disabled={idea.trim().length < 8}
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 px-5 text-sm font-semibold text-white shadow-[0_10px_40px_-14px_rgba(217,70,239,0.70)] transition disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none sm:w-auto sm:min-w-[220px]"
                    >
                      <Send className="h-4 w-4" />
                      Crea anteprima
                    </button>
                    {error ? (
                      <span className="text-xs text-rose-300/85">{error}</span>
                    ) : (
                      <span className="hidden sm:block text-[11px] text-zinc-500">
                        1 tentativo ogni ~30 secondi · 4 per mezz'ora.
                      </span>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

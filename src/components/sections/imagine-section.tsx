"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Flower2, Mic, MicOff, PencilLine, Send, Sparkles, Volume2, VolumeX, Waves, Wine } from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { type ImagineScene } from "@/lib/imagine";
import { noir } from "@/lib/noir";

type SpeechResultEvent = {
  results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean }>;
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

type BrowserWithSpeech = Window & {
  SpeechRecognition?: new () => SpeechRecognitionLike;
  webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  AudioContext?: typeof AudioContext;
  webkitAudioContext?: typeof AudioContext;
};

type AmbientAudio = {
  context: AudioContext;
  gain: GainNode;
  oscillators: OscillatorNode[];
};

const DEFAULT_SCENE: ImagineScene = {
  suite: "Passion",
  occasion: "Serata speciale",
  atmosphere: "noir",
  jacuzzi: false,
  prosecco: false,
  flowers: false,
  petals: false,
  music: false,
  objects: [],
  setupTitle: "La vostra idea",
  headline: "Immaginatela. Poi lasciate fare a noi.",
  details: [],
};

const ATMOSPHERES = {
  purple: "rgba(110, 31, 255, .48)",
  rose: "rgba(237, 63, 166, .42)",
  warm: "rgba(255, 126, 45, .34)",
  noir: "rgba(20, 5, 29, .18)",
} as const;

const EXAMPLE = "È il nostro anniversario. Vorrei qualcosa di romantico, viola, con prosecco, ma non troppo sdolcinato.";
const IDEA_STARTERS = [
  "Anniversario intimo, luce viola e prosecco",
  "Compleanno elegante con torta e petali",
  "Una proposta semplice, calda e senza eccessi",
] as const;
const LOADING_COPY = [
  "Leggo la vostra idea",
  "Preparo luci e dettagli",
  "Creo la fotografia",
] as const;

export function ImagineSection() {
  const reduceMotion = useReducedMotion();
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const audioRef = useRef<AmbientAudio | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [idea, setIdea] = useState("");
  const [scene, setScene] = useState<ImagineScene | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [phase, setPhase] = useState<"idle" | "imagining" | "ready">("idle");
  const [error, setError] = useState("");
  const [canListen, setCanListen] = useState(false);
  const [listening, setListening] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const visual = scene ?? DEFAULT_SCENE;
  const video = visual.suite === "Infinity" ? "/videos/infinity-dove.mp4" : "/videos/passion-invito.mp4";
  const poster = visual.suite === "Infinity"
    ? "/infinity/WhatsApp Image 2026-08-16 at 21.29.23 (2).jpeg"
    : "/passion/WhatsApp Image 2026-08-16 at 21.29.22.jpeg";

  const whatsappHref = useMemo(() => {
    const detail = scene?.details.join(" · ") || "";
    return noir.contacts.whatsapp + `?text=${encodeURIComponent(
      `Ciao, vorrei vivere questa esperienza Euphoria. ${scene ? `${scene.suite} · ${scene.setupTitle}. ${detail}. ` : ""}La mia idea: ${idea}`
    )}`;
  }, [idea, scene]);

  useEffect(() => {
    const browser = window as BrowserWithSpeech;
    const Recognition = browser.SpeechRecognition || browser.webkitSpeechRecognition;
    setCanListen(Boolean(Recognition));
    if (!Recognition) return;

    const recognition = new Recognition();
    recognition.lang = "it-IT";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results).map((result) => result[0].transcript).join(" ");
      setIdea(transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, []);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      audio?.oscillators.forEach((oscillator) => oscillator.stop());
      void audio?.context.close();
    };
  }, []);

  useEffect(() => {
    if (phase !== "imagining") {
      setLoadingStep(0);
      return;
    }
    const interval = window.setInterval(() => {
      setLoadingStep((step) => (step + 1) % LOADING_COPY.length);
    }, 4200);
    return () => window.clearInterval(interval);
  }, [phase]);

  const primeAmbient = () => {
    if (audioRef.current) {
      void audioRef.current.context.resume();
      return audioRef.current;
    }

    const browser = window as BrowserWithSpeech;
    const AudioContextConstructor = browser.AudioContext || browser.webkitAudioContext;
    if (!AudioContextConstructor) return null;

    const context = new AudioContextConstructor();
    const gain = context.createGain();
    gain.gain.value = 0;
    gain.connect(context.destination);
    const oscillators = [110, 164.81, 220].map((frequency, index) => {
      const oscillator = context.createOscillator();
      const voiceGain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      voiceGain.gain.value = index === 0 ? 0.38 : 0.16;
      oscillator.connect(voiceGain).connect(gain);
      oscillator.start();
      return oscillator;
    });
    audioRef.current = { context, gain, oscillators };
    return audioRef.current;
  };

  const setAmbientVolume = (enabled: boolean) => {
    const audio = primeAmbient();
    if (!audio) return;
    const now = audio.context.currentTime;
    audio.gain.gain.cancelScheduledValues(now);
    audio.gain.gain.linearRampToValueAtTime(enabled ? 0.035 : 0, now + 0.8);
    setSoundOn(enabled);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanIdea = idea.trim();
    if (cleanIdea.length < 8 || phase === "imagining") {
      setError("Raccontaci qualche dettaglio in più.");
      return;
    }

    primeAmbient();
    if (audioRef.current) setAmbientVolume(false);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    setError("");
    setGeneratedImage(null);
    setPhase("imagining");
    try {
      const [response] = await Promise.all([
        fetch("/api/imagine", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idea: cleanIdea }),
        }),
        new Promise((resolve) => window.setTimeout(resolve, reduceMotion ? 0 : 1200)),
      ]);
      const payload = (await response.json()) as {
        scene?: ImagineScene;
        image?: string | null;
        imageGenerated?: boolean;
        error?: string;
      };
      if (!response.ok || !payload.scene) throw new Error(payload.error || "Non riesco a immaginare la scena.");

      setScene(payload.scene);
      setGeneratedImage(payload.image || null);
      setPhase("ready");
      if (!payload.imageGenerated) setError("La scena è pronta, ma la fotografia non è stata generata. Puoi riprovare.");
      if (payload.scene.music) setAmbientVolume(true);
    } catch (caught) {
      setPhase("idle");
      setError(caught instanceof Error ? caught.message : "Riprova tra un momento.");
    }
  };

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    if (listening) {
      recognition.stop();
      setListening(false);
      return;
    }
    setIdea("");
    setListening(true);
    recognition.start();
  };

  const editIdea = () => {
    setError("");
    setPhase("idle");
    window.setTimeout(() => textareaRef.current?.focus(), reduceMotion ? 0 : 350);
  };

  const chooseStarter = (starter: string) => {
    setIdea(starter);
    setError("");
    window.setTimeout(() => textareaRef.current?.focus(), reduceMotion ? 0 : 150);
  };

  return (
    <section
      id="imagine"
      data-ambient="spa"
      className="relative z-10 min-h-[100svh] overflow-hidden bg-[#050207] text-white supports-[height:100dvh]:min-h-[100dvh]"
    >
      <AnimatePresence mode="wait">
        {generatedImage ? (
          <motion.div
            key={generatedImage.slice(-48)}
            initial={reduceMotion ? false : { opacity: 0, scale: 1.025, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 1.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              fill
              unoptimized
              priority
              sizes="100vw"
              src={generatedImage}
              alt={`Euphoria ${visual.suite} allestita per ${visual.occasion.toLocaleLowerCase("it")}`}
              className="object-cover object-center"
            />
          </motion.div>
        ) : (
          <motion.video
            key={video}
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.015 }}
            transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            className="absolute inset-0 h-full w-full object-cover object-center"
          >
            <source src={video} type="video/mp4" />
          </motion.video>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ backgroundColor: ATMOSPHERES[visual.atmosphere], opacity: generatedImage ? 0.08 : 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.2 }}
        className="pointer-events-none absolute inset-0 mix-blend-color"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,1,6,.5)_0%,transparent_34%,rgba(4,1,6,.18)_52%,rgba(4,1,6,.94)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_110%,rgba(184,44,255,.24),transparent_56%)]" />

      <AnimatePresence>
        {visual.jacuzzi && !generatedImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute bottom-[28%] left-[8%] h-40 w-64 rounded-full bg-cyan-300/16 blur-[60px] sm:h-60 sm:w-[30rem]"
          >
            {!reduceMotion ? (
              <motion.span
                animate={{ scale: [0.7, 1.4], opacity: [0.6, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-6 rounded-full border border-cyan-100/50"
              />
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "imagining" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="status"
            aria-live="polite"
            className="pointer-events-none absolute inset-x-5 top-[32%] z-10 flex flex-col items-center text-center sm:top-[34%]"
          >
            <div className="relative flex h-14 w-14 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-white/18" />
              {!reduceMotion ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-transparent border-t-fuchsia-200/90"
                />
              ) : null}
              <Sparkles className="h-4 w-4 text-fuchsia-100" />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={loadingStep}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/86"
              >
                {LOADING_COPY[loadingStep]}
              </motion.div>
            </AnimatePresence>
            <div className="mt-2 max-w-[30ch] text-sm leading-5 text-white/58">
              La suite resta autentica. Cambiano soltanto atmosfera e dettagli.
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="relative flex min-h-[100svh] flex-col justify-between gap-10 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(5.75rem,env(safe-area-inset-top))] supports-[height:100dvh]:min-h-[100dvh] sm:px-8 sm:pb-8 sm:pt-28 lg:px-12">
        <div>
          <div className="flex items-center justify-between gap-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/82 backdrop-blur-xl">
              <Sparkles className="h-3 w-3 text-fuchsia-200" aria-hidden="true" />
              Euphoria Imagine · esperienza AI
            </div>
          {phase === "ready" && visual.music ? (
            <button
              type="button"
              onClick={() => setAmbientVolume(!soundOn)}
              className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/24 bg-black/35 backdrop-blur-xl transition-colors hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-200/80"
              aria-label={soundOn ? "Disattiva atmosfera sonora" : "Attiva atmosfera sonora"}
            >
              {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          ) : null}
          </div>

          <AnimatePresence mode="wait">
            {phase === "idle" ? (
              <motion.div
                key="imagine-intro"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 max-w-3xl sm:mt-10"
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-fuchsia-100/85">La vostra idea, dentro Euphoria</div>
                <h2 className="noir-h1 mt-3 max-w-[13ch] text-[2.55rem] leading-[0.94] text-white sm:text-6xl lg:text-7xl">
                  Raccontatela.<br /><span className="text-white/55">Noi ve la mostriamo.</span>
                </h2>
                <p id="imagine-explanation" className="mt-4 max-w-2xl text-sm leading-6 text-white/78 sm:text-base sm:leading-7">
                  Descrivete la serata che avete in mente. L’intelligenza artificiale parte da una fotografia reale di Passion o Infinity e crea un’anteprima con luci e dettagli ispirati alle vostre parole.
                </p>
                <div className="mt-5 grid max-w-2xl grid-cols-3 gap-2" aria-label="Come funziona">
                  {["Raccontate", "La vedete", "La organizziamo"].map((step, index) => (
                    <div key={step} className="border-t border-white/22 pt-2.5">
                      <span className="text-[9px] font-semibold tracking-[0.2em] text-fuchsia-200">0{index + 1}</span>
                      <div className="mt-1 text-[11px] leading-4 text-white/72 sm:text-sm">{step}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="mx-auto w-full max-w-3xl">
          <AnimatePresence mode="wait">
            {phase === "ready" && scene ? (
              <motion.div
                key="result"
                initial={reduceMotion ? false : { opacity: 0, y: 32, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="max-h-[68dvh] overflow-y-auto overscroll-contain rounded-2xl border border-white/18 bg-black/58 p-5 shadow-[0_24px_80px_rgba(0,0,0,.42)] backdrop-blur-2xl sm:p-7"
              >
                <div className="text-[9px] font-semibold uppercase tracking-[0.26em] text-fuchsia-100/82">
                  Ho immaginato questa Euphoria per voi
                </div>
                <h2 className="noir-h1 mt-2.5 max-w-[17ch] text-[2rem] leading-[0.98] sm:text-5xl">{scene.headline}</h2>
                <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/84">
                  {scene.suite} · {scene.setupTitle}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {scene.details.slice(0, 4).map((detail) => (
                    <span key={detail} className="border border-white/15 bg-white/[0.07] px-2.5 py-1.5 text-[11px] leading-none text-white/72">
                      {detail}
                    </span>
                  ))}
                </div>
                <p className="mt-4 max-w-xl text-sm leading-6 text-white/68">
                  Questa è una visualizzazione della vostra idea nella suite reale. Se vi rappresenta, inviatela: verifichiamo insieme cosa preparare davvero.
                </p>
                <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
                  <NoirAnchor
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    variant="primary"
                    className="min-h-12 w-full justify-center"
                  >
                    Portala su WhatsApp
                    <Sparkles className="h-4 w-4" />
                  </NoirAnchor>
                  <button
                    type="button"
                    onClick={editIdea}
                    className="inline-flex h-12 w-12 cursor-pointer items-center justify-center border border-white/18 bg-white/[0.06] text-white/72 transition-colors hover:bg-white/12 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-200/80"
                    aria-label="Modifica la tua idea"
                  >
                    <PencilLine className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className={`text-[10px] leading-4 ${error ? "text-rose-200/78" : "text-white/42"}`}>
                    {error || "Anteprima indicativa. Confermeremo con voi ogni dettaglio."}
                  </p>
                  <div className="flex shrink-0 items-center gap-2.5 text-white/45" aria-hidden="true">
                    {scene.jacuzzi ? <Waves className="h-3.5 w-3.5" /> : null}
                    {scene.prosecco ? <Wine className="h-3.5 w-3.5" /> : null}
                    {scene.flowers || scene.petals ? <Flower2 className="h-3.5 w-3.5" /> : null}
                  </div>
                </div>
              </motion.div>
            ) : phase === "idle" ? (
              <motion.div
                key="composer"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-white/18 bg-black/58 p-5 shadow-[0_24px_80px_rgba(0,0,0,.42)] backdrop-blur-2xl sm:p-7"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-fuchsia-200/35 bg-fuchsia-300/10 text-[10px] font-semibold text-fuchsia-100">01</span>
                  <div>
                    <label htmlFor="euphoria-idea" className="noir-h1 block text-[1.55rem] leading-[1.05] sm:text-3xl">
                      Come vorreste trovarla?
                    </label>
                    <p className="mt-1.5 text-xs leading-5 text-white/60">Occasione, atmosfera, colori e piccoli dettagli: scrivete liberamente.</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Idee di esempio">
                  {IDEA_STARTERS.map((starter) => (
                    <button
                      key={starter}
                      type="button"
                      onClick={() => chooseStarter(starter)}
                      className="min-h-11 shrink-0 cursor-pointer rounded-full border border-white/16 bg-white/[.06] px-3.5 text-left text-[11px] text-white/72 transition-colors hover:border-fuchsia-200/50 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-200/80"
                    >
                      {starter}
                    </button>
                  ))}
                </div>

                <form onSubmit={submit} className="mt-4">
                  <div className="rounded-xl border border-white/20 bg-black/28 p-3.5 transition-colors focus-within:border-fuchsia-200/80 focus-within:bg-black/40">
                    <textarea
                      ref={textareaRef}
                      id="euphoria-idea"
                      value={idea}
                      onChange={(event) => setIdea(event.target.value)}
                      rows={2}
                      maxLength={600}
                      enterKeyHint="send"
                      aria-describedby="imagine-explanation imagine-help"
                      placeholder={EXAMPLE}
                      className="block min-h-16 w-full resize-none bg-transparent text-base leading-6 text-white outline-none placeholder:text-white/38"
                    />
                    <div className="mt-2 flex items-center justify-between gap-3 border-t border-white/10 pt-2">
                      <span id="imagine-help" className="text-[10px] text-white/42">La foto richiede qualche istante.</span>
                      <span className="text-[10px] tabular-nums text-white/42">{idea.length}/600</span>
                    </div>
                  </div>
                  <div className="mt-3 flex min-h-12 items-center gap-3">
                    <div
                      className="min-w-0 flex-1 text-[10px] uppercase tracking-[0.16em] text-white/58"
                      aria-live="polite"
                    >
                      <span className={error ? "normal-case tracking-normal text-rose-200/85" : ""}>
                        {error || (listening ? "Ti ascolto…" : canListen ? "Puoi anche dettare la tua idea" : "Scrivi almeno qualche dettaglio")}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={toggleListening}
                      disabled={!canListen}
                      className="inline-flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/72 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-200/80 disabled:cursor-default disabled:opacity-30"
                      aria-label={listening ? "Ferma dettatura" : "Detta la tua idea"}
                    >
                      {listening ? <MicOff className="h-5 w-5 text-fuchsia-300" /> : <Mic className="h-5 w-5" />}
                    </button>
                    <button
                      type="submit"
                      disabled={idea.trim().length < 8}
                      className="inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-[#110717] transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-default disabled:opacity-35"
                      aria-label="Immagina questa esperienza"
                    >
                      Crea l’anteprima
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="waiting-note"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto mb-1 max-h-14 max-w-sm overflow-hidden border-t border-white/18 bg-black/28 px-4 pt-3 text-center text-xs leading-5 text-white/52 backdrop-blur-md"
              >
                “{idea}”
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

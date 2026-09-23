"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Check, Download, ImageIcon, LoaderCircle, Sparkles, Wand2 } from 'lucide-react';
import Image from 'next/image';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import { NoirAnchor } from '@/components/ui/noir-anchor';
import { imagineSuites, isImagineScene, type ImagineScene, type ImagineSuite } from '@/lib/imagine';
import { referenceUrl, suiteReferences, type ImagineView } from '@/lib/imagine-views';
import { noir } from '@/lib/noir';

const INSPIRATIONS = [
  { label: 'Il nostro anniversario', idea: 'Anniversario, luce ambrata, prosecco e pochi petali sul letto. Intimo, senza esagerare.' },
  { label: 'Una sorpresa', idea: 'Una sorpresa romantica con fiori freschi, un piccolo regalo e luce rosa soffusa.' },
  { label: 'Solo relax', idea: 'Jacuzzi accesa, luce viola delicata e prosecco. Senza petali, fiori o altre decorazioni.' },
];
type Result = { id: string; idea: string; scene: ImagineScene; image: string; view: ImagineView; reference: string };
const control = 'cursor-pointer transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-200 disabled:cursor-not-allowed disabled:opacity-50';

export function ImagineSection() {
  const reduced = useReducedMotion();
  const [suite, setSuite] = useState<ImagineSuite>('Passion');
  const [view, setView] = useState<ImagineView>('room');
  const [idea, setIdea] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [original, setOriginal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const requestRef = useRef<AbortController | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const active = results.find(item => item.id === activeId);
  const preview = active ? (original ? active.reference : active.image) : referenceUrl(suite, view);
  const previewSuite = active?.scene.suite ?? suite;
  const previewView = active?.view ?? view;
  const viewLabel = suiteReferences[previewSuite].find(item => item.id === previewView)?.label;
  const waIdea = active?.idea ?? idea;
  const whatsappHref = noir.contacts.whatsapp + `?text=${encodeURIComponent(`Ciao Euphoria, vorrei organizzare questa serata nella suite ${previewSuite}: ${waIdea || 'vorrei qualche consiglio per un allestimento speciale'}. ${active ? active.scene.details.join(' · ') : ''}`)}`;

  useEffect(() => () => requestRef.current?.abort(), []);
  useEffect(() => {
    if (!busy) return;
    const timer = window.setInterval(() => setElapsed(value => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [busy]);
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(() => setCooldown(value => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  function editSelection(nextSuite: ImagineSuite, nextView: ImagineView) {
    setSuite(nextSuite); setView(nextView); setActiveId(null); setOriginal(false); setError('');
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    const cleanIdea = idea.trim();
    if (cleanIdea.length < 8 || busy || cooldown > 0 || requestRef.current) return;
    const controller = new AbortController(); requestRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 115_000);
    setBusy(true); setError(''); setElapsed(0);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    resultRef.current?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
    try {
      const response = await fetch('/api/imagine', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: cleanIdea, suite, view }), signal: controller.signal,
      });
      const payload = await response.json().catch(() => ({}));
      if (response.status === 429) setCooldown(Number(payload.retryAfter) || 30);
      if (!response.ok || !isImagineScene(payload.scene) || typeof payload.image !== 'string' || !payload.image.startsWith('data:image/webp;base64,')) {
        throw new Error(payload.error || 'La foto non è pronta. Riprova tra un momento.');
      }
      const result: Result = { id: crypto.randomUUID(), idea: cleanIdea, scene: payload.scene, image: payload.image, view, reference: referenceUrl(payload.scene.suite, view) };
      setResults(previous => [result, ...previous].slice(0, 3));
      setActiveId(result.id); setOriginal(false);
    } catch (caught) {
      setError(controller.signal.aborted ? 'La generazione sta richiedendo troppo tempo. Riprova: la tua idea è ancora qui.' : caught instanceof Error ? caught.message : 'Riprova tra un momento.');
    } finally {
      window.clearTimeout(timeout); requestRef.current = null; setBusy(false);
    }
  }
  function download() {
    if (!active) return;
    const anchor = document.createElement('a'); anchor.href = active.image;
    anchor.download = `euphoria-${active.scene.suite.toLowerCase()}-${active.view}-anteprima-ai.webp`;
    document.body.appendChild(anchor); anchor.click(); anchor.remove();
  }

  return <section id="imagine" data-ambient="night" className="relative z-10 overflow-clip bg-[#08060c] py-20 sm:py-28" aria-labelledby="imagine-title">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(139,92,246,.16),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(237,63,166,.09),transparent_50%)]" />
    <div className="noir-container relative">
      <div className="mb-10 flex flex-col justify-between gap-7 lg:mb-14 lg:flex-row lg:items-end">
        <div>
          <p className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[.25em] text-noir-champagne"><span className="h-px w-9 bg-noir-champagne/60" /><Sparkles className="h-4 w-4" /> Euphoria Atelier · Anteprima AI</p>
          <h2 id="imagine-title" className="noir-display max-w-3xl text-[clamp(2.6rem,5.5vw,5.4rem)] leading-[1.04] tracking-tight text-white">La vostra serata.<br /><span className="text-noir-champagne">Prima di viverla.</span></h2>
        </div>
        <p className="max-w-sm text-base leading-7 text-zinc-400">Scegli una suite, trova il tuo punto di vista e raccontaci il momento. L’AI lo trasforma in una foto, partendo dai nostri ambienti reali.</p>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(350px,1fr)] lg:gap-7">
        <div id="imagine-result" ref={resultRef} className="min-w-0 scroll-mt-24">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-black shadow-[0_32px_90px_-25px_rgba(0,0,0,.8)]" aria-busy={busy}>
            <div className={active ? "relative min-h-64" : "relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]"}>
              <Image src={preview} alt={active && !original ? `Interpretazione AI di ${active.idea}, suite ${previewSuite}, ${viewLabel}` : `Foto reale della suite ${previewSuite}: ${viewLabel}`} {...(active ? { width: 1536, height: 1024 } : { fill: true })} sizes="(max-width: 1023px) 100vw, 58vw" unoptimized={Boolean(active && !original)} className={active ? 'block h-auto w-full' : 'object-cover'} />
              <div className={`pointer-events-none absolute inset-0 ${active ? "bg-gradient-to-b from-black/35 via-transparent to-transparent" : "bg-gradient-to-b from-black/40 via-transparent to-black/70"}`} />
              <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-2 text-[10px] uppercase tracking-[.18em] text-white backdrop-blur-md"><span className={`h-1.5 w-1.5 rounded-full ${active && !original ? 'bg-fuchsia-300' : 'bg-white/70'}`} />{active && !original ? 'La tua creazione · AI' : 'La suite reale'}</span>
              {active && !busy && <button type="button" aria-pressed={original} onClick={() => setOriginal(value => !value)} className={`${control} absolute right-4 top-16 min-h-11 rounded-full sm:top-4 border border-white/25 bg-black/70 px-4 text-xs text-white backdrop-blur-md`}>{original ? 'Mostra la creazione' : 'Confronta originale'}</button>}
              <div className={active ? "relative border-t border-white/10 bg-[#100b16] p-5 sm:p-7" : "absolute bottom-0 left-0 right-0 p-6 sm:p-8"}>
                <p className="mb-2 text-[10px] uppercase tracking-[.24em] text-white/65">{previewSuite} / {viewLabel}</p>
                <h3 className="noir-display max-w-lg text-3xl leading-tight text-white sm:text-4xl">{active ? active.scene.headline : 'Tutto comincia da qui.'}</h3>
                {!active && <p className="mt-3 max-w-xs text-sm leading-6 text-white/70">La suite è reale. L’atmosfera la scegli tu.</p>}
              </div>
              {busy && <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#09050f]/80 p-8 text-center backdrop-blur-md" role="status">
                <motion.div animate={reduced ? {} : { rotate: 360 }} transition={{ duration: 7, ease: 'linear', repeat: Infinity }} className="mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-fuchsia-200/20 shadow-[0_0_80px_rgba(192,82,226,.22)]"><Wand2 className="h-9 w-9 text-noir-champagne" strokeWidth={1} /></motion.div>
                <p className="noir-display text-3xl text-white">La tua idea prende luce.</p>
                <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-300">{elapsed < 40 ? 'Stiamo creando la tua foto a partire dalla prospettiva scelta.' : 'Stiamo ancora lavorando alla tua foto. Può servire fino a circa due minuti.'}</p>
                <span className="mt-6 text-xs tabular-nums text-zinc-500" aria-hidden="true">{elapsed}s</span>
              </div>}
            </div>
          </div>
          {active && <div className="mt-4 flex flex-wrap items-center gap-2">
            {active.scene.details.map(detail => <span key={detail} className="rounded-full border border-white/10 px-3 py-2 text-xs text-zinc-300">{detail}</span>)}
            <button type="button" onClick={download} className={`${control} ml-auto inline-flex min-h-11 items-center gap-2 px-3 text-sm text-noir-champagne`}><Download className="h-4 w-4" />Scarica foto</button>
          </div>}
          {results.length > 0 && <div className="mt-6">
            <p className="mb-3 text-xs text-zinc-400">Le tue ultime creazioni · conservate finché resti su questa pagina</p>
            <div className="flex gap-3">{results.map((result, index) => <button key={result.id} type="button" disabled={busy} aria-pressed={activeId === result.id} onClick={() => { setActiveId(result.id); setOriginal(false); setSuite(result.scene.suite); setView(result.view); setIdea(result.idea); setError(''); }} className={`${control} relative h-24 w-24 overflow-hidden rounded-xl border-2 ${activeId === result.id ? 'border-noir-champagne' : 'border-transparent'}`} aria-label={`Mostra creazione ${index + 1}, ${result.scene.suite}, ${result.view}`}><Image src={result.image} alt="" fill unoptimized sizes="96px" className="object-cover" /></button>)}</div>
          </div>}
          <p className="mt-4 text-xs leading-5 text-zinc-500">{active ? 'Interpretazione AI: dettagli e allestimenti sono indicativi, da confermare con noi. Il messaggio WhatsApp include la tua idea; puoi allegare la foto dopo averla scaricata.' : 'Le foto mostrate sono quelle reali delle suite. La tua anteprima AI apparirà qui.'}</p>
        </div>

        <form onSubmit={submit} className="min-w-0 rounded-[1.75rem] border border-white/10 bg-[#120d19]/90 p-5 sm:p-7">
          <div className="mb-7 flex items-center justify-between"><h3 className="noir-display text-2xl text-white">Disegna il tuo momento.</h3><Wand2 className="h-5 w-5 text-noir-champagne" strokeWidth={1.4} /></div>
          <fieldset disabled={busy}>
            <legend className="mb-3 text-xs uppercase tracking-[.16em] text-zinc-400">01 / La suite</legend>
            <div className="grid grid-cols-2 gap-3">{imagineSuites.map(name => <button key={name} type="button" aria-pressed={suite === name} onClick={() => editSelection(name, view)} className={`${control} rounded-2xl border p-4 text-left ${suite === name ? 'border-noir-champagne/70 bg-noir-champagne/10' : 'border-white/10 hover:border-white/30'}`}><span className="flex items-center justify-between text-base text-white">{name}{suite === name && <Check className="h-4 w-4 text-noir-champagne" />}</span><span className="mt-1 block text-xs text-zinc-400">{name === 'Passion' ? 'Intima. Solo vostra.' : 'Spazio alle emozioni.'}</span></button>)}</div>
          </fieldset>
          <fieldset disabled={busy} className="mt-7">
            <legend className="mb-3 text-xs uppercase tracking-[.16em] text-zinc-400">02 / Il punto di vista</legend>
            <div className="grid grid-cols-3 gap-2">{suiteReferences[suite].map(ref => <button type="button" key={ref.id} aria-pressed={view === ref.id} onClick={() => editSelection(suite, ref.id)} className={`${control} overflow-hidden rounded-xl border ${view === ref.id ? 'border-noir-champagne' : 'border-white/10 hover:border-white/40'}`}><span className="relative block aspect-[4/3]"><Image src={'/' + ref.file} alt="" fill sizes="150px" className="object-cover" />{view === ref.id && <span className="absolute right-1 top-1 rounded-full bg-noir-champagne p-1 text-black"><Check className="h-3 w-3" /></span>}</span><span className="block px-1 py-3 text-[10px] text-zinc-200 sm:text-xs">{ref.label}</span></button>)}</div>
          </fieldset>
          <fieldset disabled={busy} className="mt-7">
            <legend className="mb-3 text-xs uppercase tracking-[.16em] text-zinc-400">03 / La tua atmosfera</legend>
            <div className="mb-4 flex flex-wrap gap-2">{INSPIRATIONS.map(item => <button key={item.label} type="button" onClick={() => { setIdea(item.idea); setError(''); textareaRef.current?.focus({ preventScroll: true }); }} className={`${control} min-h-11 rounded-full border border-white/10 px-3 text-xs text-zinc-300 hover:border-noir-champagne/50 hover:text-white`}>{item.label}</button>)}</div>
            <label htmlFor="imagine-idea" className="sr-only">Descrivi la serata che vorresti vivere</label>
            <textarea id="imagine-idea" ref={textareaRef} value={idea} onChange={event => setIdea(event.target.value)} required minLength={8} maxLength={600} rows={4} placeholder="Una ricorrenza, un colore, un dettaglio per sorprendere… Come immagini la vostra serata?" className="w-full resize-y rounded-2xl border border-white/15 bg-black/30 p-4 text-base leading-7 text-white outline-none placeholder:text-zinc-500 focus:border-noir-champagne/70 focus:ring-2 focus:ring-noir-champagne/10" />
            <div className="mt-2 flex justify-between text-[11px] text-zinc-500"><span>Le tue parole fanno la differenza. Min. 8 caratteri.</span><span className="shrink-0 pl-2">{idea.length}/600</span></div>
          </fieldset>
          <button type="submit" disabled={busy || idea.trim().length < 8 || cooldown > 0} className={`${control} mt-6 flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#edb5db] to-[#c6b3ff] px-5 py-4 font-semibold text-[#1b0b25] shadow-[0_8px_35px_-10px_rgba(213,150,242,.4)] hover:brightness-110`}>
            {busy ? <LoaderCircle className="h-5 w-5 animate-spin motion-reduce:animate-none" /> : <Sparkles className="h-5 w-5" />}{busy ? 'Creazione in corso…' : cooldown > 0 ? `Riprova tra ${Math.floor(cooldown / 60)}:${String(cooldown % 60).padStart(2, '0')}` : 'Crea la mia foto'}
          </button>
          <p className="mt-3 text-center text-xs text-zinc-500">Una foto per volta · fino a 4 creazioni ogni 30 minuti</p>
          {error && <p role="alert" className="mt-4 rounded-xl border border-rose-300/20 bg-rose-300/5 p-4 text-sm leading-6 text-rose-200">{error}</p>}
          {active && <a href="#imagine-result" onClick={event => { event.preventDefault(); resultRef.current?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' }); }} className={`${control} mt-4 flex min-h-11 items-center justify-center gap-2 text-sm text-noir-champagne lg:hidden`}><ArrowDown className="h-4 w-4 rotate-180" />Rivedi la tua creazione</a>}
          <div className="mt-7 border-t border-white/10 pt-5">
            <NoirAnchor href={whatsappHref} target="_blank" rel="noopener noreferrer" className="w-full justify-between text-sm">{active ? 'Organizziamola insieme' : 'Preferisci immaginarla con noi?'}<ArrowUpRight className="h-4 w-4" /></NoirAnchor>
            <p className="mt-3 flex items-center justify-center gap-2 text-[11px] text-zinc-500"><ImageIcon className="h-3.5 w-3.5" />Foto reali. Un’atmosfera tutta vostra.</p>
          </div>
        </form>
      </div>
    </div>
  </section>;
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Gift, PenLine, Printer, CalendarHeart } from "lucide-react";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { vouchers } from "@/lib/noir";

export function VoucherSection() {
  const startingPrice = Math.min(...vouchers.filter(v => v.slug !== "custom").map(v => v.price));

  return (
    <section id="voucher" data-ambient="noir" aria-labelledby="voucher-heading" className="relative z-10 overflow-clip bg-[#080609] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,rgba(135,64,113,.16),transparent_55%)]" aria-hidden="true" />
      <div className="noir-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div>
            <p className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[.26em] text-noir-champagne sm:text-xs"><span className="h-px w-8 bg-noir-champagne/50" /><Gift className="h-4 w-4" strokeWidth={1.4} />Il regalo è un momento.</p>
            <h2 id="voucher-heading" className="font-display text-[clamp(2.8rem,5.6vw,5.5rem)] leading-[1.03] tracking-tight text-noir-mist">
              Ci sono regali<br />che diventano<br /><span className="italic text-noir-champagne">ricordi.</span>
            </h2>
            <p className="mt-7 max-w-md text-base leading-8 text-noir-muted sm:text-lg">Tre ore da dedicarsi. Una notte da ricordare. Regala una suite con jacuzzi e sauna private, e aggiungi le parole che la rendono speciale.</p>
            <div className="mt-8 flex items-baseline gap-3"><span className="text-xs uppercase tracking-[.18em] text-noir-muted">Un’esperienza per due, da</span><span className="font-display text-4xl text-noir-mist">€{startingPrice}</span></div>
            <div className="mt-8 flex flex-col items-start gap-4">
              <NoirAnchor href="/voucher#dedica" size="lg" variant="primary" className="w-full justify-between gap-7 sm:w-auto" track={{ name: "voucher_home_create_click" }}>Crea il tuo regalo<ArrowUpRight className="h-5 w-5" strokeWidth={1.5} /></NoirAnchor>
              <NoirAnchor href="/voucher#scegli" size="sm" className="min-h-11 border-transparent bg-transparent px-0 text-noir-muted shadow-none">Esplora tutte le formule<ArrowUpRight className="h-4 w-4" /></NoirAnchor>
            </div>
          </div>

          <div className="relative isolate px-3 pb-5 pt-4 sm:px-10 sm:py-8 lg:px-5">
            <div className="pointer-events-none absolute inset-[8%] -z-10 rounded-full bg-[#aa548b]/15 blur-[65px]" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-5 bottom-1 top-9 -z-10 rotate-[-5deg] rounded-sm border border-[#d5a5ac]/20 bg-gradient-to-br from-[#271623] to-[#110c12] sm:inset-x-12 lg:inset-x-7" aria-hidden="true" />
            <article aria-label="Esempio del biglietto regalo Euphoria" className="relative mx-auto max-w-[470px] rotate-[2deg] overflow-hidden border border-[#d5a5ac]/40 bg-[#080808] shadow-[0_35px_75px_-20px_rgba(0,0,0,.85)]">
              <div className="pointer-events-none absolute inset-3 z-10 border border-[#d5a5ac]/25 sm:inset-4" aria-hidden="true" />
              <div className="relative aspect-[16/10]">
                <Image src="/passion-letto-jacuzzi-sauna.jpg" alt="Luci soffuse nella suite Passion, sul biglietto regalo Euphoria" fill sizes="(max-width: 640px) 90vw, 470px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-[#080808]" />
                <div className="absolute inset-x-0 top-7 text-center sm:top-9"><p className="font-display text-3xl text-[#fff3ed] sm:text-4xl">Euphoria</p><p className="mt-1 text-[7px] uppercase tracking-[.35em] text-[#fff3ed]/75 sm:text-[9px]">Luxury Suite · Gift Collection</p></div>
              </div>
              <div className="relative -mt-3 px-7 pb-9 text-center sm:px-10 sm:pb-12">
                <span className="mx-auto mb-5 block h-8 w-px bg-[#d5a5ac]/70" aria-hidden="true" />
                <p className="text-[8px] uppercase tracking-[.28em] text-[#d5a5ac] sm:text-[10px]">Un regalo, solo per te</p>
                <p className="mt-3 font-display text-4xl text-[#fff3ed] sm:text-5xl">Il nostro tempo.</p>
                <blockquote className="mx-auto mt-6 max-w-xs font-display text-lg italic leading-relaxed text-[#fff3ed]/90 sm:text-[23px]">“Il mondo può aspettare.<br />Tu ed io, no.”</blockquote>
                <p className="mt-5 text-[9px] uppercase tracking-[.2em] text-[#d5a5ac]">Con amore.</p>
                <div className="mx-auto mt-7 max-w-xs border-t border-[#d5a5ac]/25 pt-4"><p className="text-[8px] uppercase tracking-[.2em] text-[#fff3ed]/65 sm:text-[10px]">Una suite. Due persone. Solo voi.</p></div>
              </div>
            </article>
            <p className="mt-8 text-center text-[10px] uppercase tracking-[.18em] text-noir-muted/65">Il tuo biglietto, le tue parole.</p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-[#d5a5ac]/15 pt-7 sm:mt-16 sm:grid-cols-3 sm:gap-8 sm:pt-9">
          {[
            { icon: PenLine, title: "La dedica è tua", text: "Nomi, parole e un’atmosfera da scegliere." },
            { icon: Printer, title: "Bello da consegnare", text: "Un PDF da stampare o regalare in digitale." },
            { icon: CalendarHeart, title: "Il momento lo scelgono loro", text: "12 mesi di validità, per due persone." },
          ].map(({ icon: Icon, title, text }) => <div key={title} className="flex items-start gap-4"><Icon className="mt-1 h-5 w-5 shrink-0 text-noir-champagne" strokeWidth={1.3} /><div><h3 className="text-sm font-medium text-noir-mist">{title}</h3><p className="mt-2 text-sm leading-6 text-noir-muted/75">{text}</p></div></div>)}
        </div>
        <p className="mt-8 text-sm text-noir-muted/60">Un pensiero anche per il tuo team? <Link href="/collabora" className="inline-flex min-h-11 items-center gap-1 text-noir-muted underline decoration-noir-champagne/30 underline-offset-4 transition hover:text-noir-champagne focus-visible:outline-2 focus-visible:outline-noir-champagne">Scopri i regali aziendali<ArrowUpRight className="h-3.5 w-3.5" /></Link></p>
      </div>
    </section>
  );
}

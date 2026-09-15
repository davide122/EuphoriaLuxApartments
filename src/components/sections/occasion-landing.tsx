import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TopNav } from "@/components/nav/top-nav";
import { FooterSection } from "@/components/sections/footer";
import { StickyCta } from "@/components/sticky-cta";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { OCCASIONS } from "@/lib/occasions";
import { suites } from "@/lib/noir";

export function OccasionLanding({ occasion, whatsappHref, schema }: { occasion: (typeof OCCASIONS)[number]; whatsappHref: string; schema: unknown[] }) {
  const suite = suites.find((s) => s.slug === occasion.suggestedSuite) ?? suites[1] ?? suites[0];
  return (
    <div className="relative flex min-h-screen flex-col">
      <TopNav />
      <main className="relative flex-1 pt-[72px]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        <section className="relative isolate flex min-h-[85svh] flex-col justify-end overflow-hidden bg-noir-ink">
          <Image src={occasion.hero.image.src} alt={occasion.hero.image.alt} fill preload sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,3,9,.3),rgba(6,3,9,.35)_20%,rgba(6,3,9,.9)_70%,#060309)]" />
          <div className="noir-container relative py-10 sm:py-16">
            <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/#occasioni", label: "Occasioni" }, { href: `/${occasion.slug}`, label: occasion.label }]} />
            <div className="euphoria-kicker mt-12">{occasion.hero.eyebrow}</div>
            <h1 className="mt-6 whitespace-pre-line font-display text-5xl leading-[0.96] sm:text-7xl lg:text-[6.5rem]">{occasion.line}</h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">{occasion.hero.sub}</p>
            <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary" className="mt-8">Raccontaci la tua idea <ArrowUpRight size={18} aria-hidden="true" /></NoirAnchor>
          </div>
        </section>
        <div className="noir-container py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <aside>
              <div className="lg:sticky lg:top-28">
                <div className="euphoria-kicker">Il vostro momento, in pratica</div>
                <h2 className="mt-5 font-display text-3xl leading-tight">{occasion.title}</h2>
                <nav aria-label="In questa pagina" className="mt-7 grid">
                  {occasion.blocks.map((block, i) => <a key={block.title} href={`#dettaglio-${i + 1}`} className="flex min-h-12 items-center gap-3 border-b border-white/10 py-3 text-sm leading-6 text-noir-muted hover:text-white"><span className="text-noir-champagne">0{i + 1}</span>{block.title}</a>)}
                </nav>
                <p className="mt-6 text-sm leading-6 text-noir-muted">Euphoria · Porto Empedocle<br />Passion 55 m² · Infinity 77 m²</p>
              </div>
            </aside>
            <article>
              {occasion.blocks.map((block, i) => (
                <section key={block.title} id={`dettaglio-${i + 1}`} className="scroll-mt-28 border-t border-white/15 py-9 first:pt-0 first:border-0 sm:py-12">
                  <span className="text-xs tracking-[0.2em] text-noir-champagne">0{i + 1} / {occasion.label}</span>
                  <h2 className="mt-5 font-display text-3xl leading-tight sm:text-4xl">{block.title}</h2>
                  <p className="mt-6 max-w-[65ch] text-base leading-8 text-noir-muted sm:text-lg">{block.body}</p>
                  {block.bullets && <ul className="mt-6 space-y-3 border-l border-noir-fuchsia/60 pl-6">{block.bullets.map((bullet) => <li key={bullet} className="text-base leading-7 text-noir-mist/85">{bullet}</li>)}</ul>}
                </section>
              ))}
            </article>
          </div>
          <section className="my-12 grid overflow-hidden border border-white/15 bg-noir-graphite lg:grid-cols-2">
            <div className="relative min-h-80"><Image src={suite.preview} alt={`Gli ambienti della suite ${suite.name}`} fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" /></div>
            <div className="p-7 sm:p-12">
              <div className="euphoria-kicker">Immaginatelo qui · {suite.size}</div>
              <h2 className="mt-5 font-display text-6xl">{suite.name}</h2>
              <p className="mt-5 text-base leading-7 text-noir-muted">{suite.tagline}</p>
              <Link href={`/suites/${suite.slug}`} className="mt-7 inline-flex min-h-12 items-center gap-5 border-b border-noir-champagne text-sm">Entrate in {suite.name}<ArrowUpRight size={18} aria-hidden="true" /></Link>
              <Link href="/suites" className="mt-5 block py-3 text-sm text-noir-muted underline underline-offset-4">Confrontate entrambe le suite</Link>
            </div>
          </section>
          <section className="mx-auto max-w-3xl py-12" aria-labelledby="occasion-faq">
            <div className="euphoria-kicker">Prima di scegliere</div>
            <h2 id="occasion-faq" className="mt-5 font-display text-4xl sm:text-5xl">Ogni dettaglio conta.</h2>
            <div className="mt-8">{occasion.faqs.map((faq) => <details key={faq.q} className="group border-b border-white/15 py-5"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 text-base [&::-webkit-details-marker]:hidden">{faq.q}<span className="text-2xl text-noir-champagne group-open:rotate-45" aria-hidden="true">+</span></summary><p className="mt-4 text-base leading-7 text-noir-muted">{faq.a}</p></details>)}</div>
            <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary" className="mt-8">Parliamone su WhatsApp <ArrowUpRight size={18} aria-hidden="true" /></NoirAnchor>
          </section>
          <nav aria-label="Altre occasioni" className="border-t border-white/15 pt-10">
            <h2 className="font-display text-3xl">Ci sono altri modi di viverla.</h2>
            <div className="mt-6 grid gap-x-8 sm:grid-cols-2">{OCCASIONS.filter((item) => item.slug !== occasion.slug).map((item) => <Link href={`/${item.slug}`} key={item.slug} className="flex min-h-16 items-center justify-between gap-5 border-b border-white/10 py-4 text-noir-muted hover:text-noir-champagne">{item.label}<ArrowUpRight size={18} aria-hidden="true" /></Link>)}</div>
          </nav>
        </div>
      </main>
      <FooterSection /><StickyCta href={whatsappHref} label="Raccontaci la tua idea" revealAfter={360} />
    </div>
  );
}

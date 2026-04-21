import { MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { NoirLink } from "@/components/ui/noir-link";
import { SectionHeader } from "@/components/ui/section-header";
import { noir } from "@/lib/noir";

function MiniMap() {
  return (
    <div className="noir-panel noir-glow overflow-hidden">
      <div className="relative aspect-[4/3]">
        <svg
          viewBox="0 0 800 600"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Mappa stilizzata"
        >
          <defs>
            <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="rgba(45,242,255,0.55)" />
              <stop offset="0.55" stopColor="rgba(138,46,255,0.55)" />
              <stop offset="1" stopColor="rgba(255,47,178,0.45)" />
            </linearGradient>
            <radialGradient id="g2" cx="55%" cy="45%" r="60%">
              <stop offset="0" stopColor="rgba(255,255,255,0.10)" />
              <stop offset="1" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>
          <rect width="800" height="600" fill="rgba(255,255,255,0.02)" />
          <rect width="800" height="600" fill="url(#g2)" />
          <path
            d="M80 420 C 140 350, 210 340, 280 360 C 330 374, 380 400, 420 390 C 510 365, 560 300, 640 275 C 710 254, 760 265, 780 280"
            fill="none"
            stroke="url(#g1)"
            strokeWidth="4"
            opacity="0.85"
          />
          <path
            d="M120 160 C 220 140, 280 175, 340 230 C 410 292, 480 320, 560 300 C 640 280, 700 230, 760 185"
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="2"
          />
          <circle cx="520" cy="320" r="10" fill="rgba(45,242,255,0.75)" />
          <circle cx="520" cy="320" r="26" fill="rgba(45,242,255,0.10)" />
          <circle cx="520" cy="320" r="44" fill="rgba(45,242,255,0.06)" />
        </svg>
        <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-noir-mist/80">
          <MapPin className="h-4 w-4 text-noir-aqua" />
          Porto Empedocle
        </div>
      </div>
    </div>
  );
}

export function LocationSection() {
  return (
    <section data-ambient="location" className="relative z-10 py-20 sm:py-28">
      <div className="noir-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHeader
                eyebrow="Location"
                title="Porto Empedocle, Sicilia: privacy e mare a pochi minuti."
                description={
                  <>
                    Una base elegante e riservata per coppie. Vicina al mare e ai luoghi
                    più suggestivi della zona, ma soprattutto lontana dal rumore: qui conta la vostra notte.
                  </>
                }
              />
            </Reveal>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {[
                { k: "Mare", v: "A pochi minuti" },
                { k: "Atmosfera", v: "Notturna & intima" },
                { k: "Esperienza", v: "Romantica" },
                { k: "Design", v: "Scenografico" },
              ].map((b, idx) => (
                <Reveal key={b.k} delay={0.06 + idx * 0.03}>
                  <div className="noir-panel px-6 py-5">
                    <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                      {b.k}
                    </div>
                    <div className="mt-2 text-sm text-noir-mist/80">{b.v}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.14}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <NoirAnchor
                  href={
                    noir.contacts.whatsapp +
                    `?text=${encodeURIComponent(
                      "Ciao, vorrei verificare disponibilità. Date: __/__/__ → __/__/__. Siamo in __. Grazie."
                    )}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                >
                  Chiedi disponibilità su WhatsApp
                </NoirAnchor>
                <NoirLink href="/prenota" variant="ghost">
                  Guarda il calendario
                </NoirLink>
                <NoirLink href="/#contatti" variant="ghost">
                  Contatti & WhatsApp
                </NoirLink>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.08}>
              <MiniMap />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

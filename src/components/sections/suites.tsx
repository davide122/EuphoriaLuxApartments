import { Reveal } from "@/components/motion/reveal";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { NoirLink } from "@/components/ui/noir-link";
import { SectionHeader } from "@/components/ui/section-header";
import { MediaFrame } from "@/components/ui/media-frame";
import { noir, suites } from "@/lib/noir";

export function SuitesSection() {
  return (
    <section
      id="suites"
      data-ambient="noir"
      className="relative z-10 py-20 sm:py-28"
    >
      <div className="noir-container">
        <Reveal>
          <SectionHeader
            eyebrow="Suites"
            title="Scegli la tua atmosfera: Passion o Infinity."
            description={
              <>
                Passion è più intima e raccolta. Infinity è più ampia e scenografica.
                In entrambi i casi: Jacuzzi privata, sauna, luci immersive e privacy totale.
              </>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {suites.map((s, idx) => (
            <Reveal key={s.name} delay={0.05 + idx * 0.06}>
              <div className="noir-panel group relative overflow-hidden transition hover:-translate-y-0.5 hover:border-white/22">
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(900px_circle_at_20%_8%,rgba(var(--ambient-a)/0.18),transparent_58%),radial-gradient(800px_circle_at_80%_24%,rgba(var(--ambient-c)/0.14),transparent_62%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.22))]" />
                <div className="relative">
                  <div className="p-4 sm:p-5">
                    <MediaFrame
                      label={`${s.name} — preview`}
                      tone={s.slug === "passion" ? "spa" : "night"}
                      src={s.cover}
                      alt={s.name}
                      className="aspect-[16/10]"
                      priority={idx === 0}
                    />
                  </div>

                  <div className="px-9 pb-9 sm:px-10 sm:pb-10">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                          Suite 0{idx + 1}
                        </div>
                        <div className="noir-h1 mt-4 text-4xl leading-[1.02] text-noir-mist sm:text-5xl">
                          {s.name}
                        </div>
                        <p className="mt-5 max-w-xl text-sm leading-6 text-noir-muted sm:text-base">
                          {s.tagline}
                        </p>
                      </div>
                      <div className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-white/45 transition group-hover:bg-white/70 sm:block" />
                    </div>

                    <div className="mt-8 grid gap-2">
                      {s.highlights.map((h) => (
                        <div
                          key={h}
                          className="flex items-start gap-3 text-sm leading-6 text-noir-mist/80"
                        >
                          <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/45" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                      <NoirLink href={`/suites/${s.slug}`} variant="ghost">
                        Dettagli suite
                      </NoirLink>
                      <NoirAnchor
                        href={
                          noir.contacts.whatsapp +
                          `?text=${encodeURIComponent(
                            `Ciao, vorrei verificare disponibilità per ${s.name}. Date: __/__/__ → __/__/__. Siamo in __. Grazie.`
                          )}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        variant="primary"
                      >
                        Verifica disponibilità (WhatsApp)
                      </NoirAnchor>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

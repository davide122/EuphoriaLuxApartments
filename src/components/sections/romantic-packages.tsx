import { Check, Gift } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { SectionHeader } from "@/components/ui/section-header";
import { noir, romanticPackages } from "@/lib/noir";

export function RomanticPackagesSection() {
  return (
    <section
      id="pacchetti"
      data-ambient="night"
      className="relative z-10 overflow-hidden py-16 sm:py-24"
    >
      <div className="absolute inset-0 hidden opacity-80 lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_18%_10%,rgba(var(--ambient-a)/0.18),transparent_60%),radial-gradient(1000px_circle_at_82%_16%,rgba(var(--ambient-c)/0.16),transparent_60%),radial-gradient(1200px_circle_at_50%_120%,rgba(var(--ambient-b)/0.12),transparent_62%)]" />
      </div>

      <div className="noir-container relative">
        <Reveal>
          <SectionHeader
            eyebrow="Un gesto in più"
            title="La suite vi aspetta già nell’atmosfera giusta."
            description={
              <>
                Il pacchetto romantico essenziale parte da €10. Per una sorpresa
                costruita su di voi, scriveteci direttamente.
              </>
            }
          />
        </Reveal>

        <div className="mt-10 grid gap-10 lg:-mx-12 lg:mt-12 lg:flex lg:snap-x lg:snap-mandatory lg:gap-12 lg:overflow-x-auto lg:px-12 lg:pb-6">
          {romanticPackages.map((pkg, idx) => {
            const text = `Ciao, vorrei informazioni sul pacchetto “${pkg.name}”. Date preferite: __/__/__ → __/__/__. Grazie.`;
            return (
              <Reveal key={pkg.name} delay={0.04 + idx * 0.04} className="border-l border-noir-fuchsia/30 pl-6 lg:min-w-[30vw] lg:snap-center lg:pl-7">
                <article className="relative flex h-full flex-col py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                        Scelta 0{idx + 1}
                      </div>
                      <h3 className="noir-h1 mt-4 text-3xl leading-tight text-noir-mist sm:text-4xl">
                        {pkg.name}
                      </h3>
                    </div>
                    <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-noir-fuchsia/25 bg-noir-fuchsia/5">
                      <Gift className="h-5 w-5 text-noir-aqua" />
                    </div>
                  </div>

                  <div className="mt-5 text-sm leading-6 text-noir-muted">{pkg.summary}</div>

                  <div className="mt-6 hidden gap-3 lg:grid">
                    {pkg.bullets.map((b) => (
                      <div
                        key={b}
                        className="flex items-start gap-3 text-sm leading-6 text-noir-mist/80"
                      >
                        <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
                          <Check className="h-3.5 w-3.5 text-noir-aqua" />
                        </span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-end justify-between gap-4 border-t border-fuchsia-100/10 pt-6">
                    <div>
                      <div className="text-xs tracking-[0.18em] uppercase text-noir-mist/55">
                        {idx === 0 ? "A partire da" : "Personalizzato"}
                      </div>
                      <div className="mt-1 text-2xl font-medium text-noir-mist">
                        {pkg.price}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <NoirAnchor
                      href={`${noir.contacts.whatsapp}?text=${encodeURIComponent(text)}`}
                      target="_blank"
                      rel="noreferrer"
                      variant={idx === 0 ? "primary" : "ghost"}
                      className="w-full justify-center"
                    >
                      {pkg.cta}
                    </NoirAnchor>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

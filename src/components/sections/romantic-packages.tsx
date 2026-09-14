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
      <div className="absolute inset-0 opacity-90">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_8%_18%,rgba(108,42,255,.24),transparent_58%),radial-gradient(900px_circle_at_92%_30%,rgba(255,42,161,.22),transparent_58%),radial-gradient(1100px_circle_at_50%_120%,rgba(255,105,55,.1),transparent_62%)]" />
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

        <div className="euphoria-snap-rail -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 sm:-mx-8 sm:px-8 lg:-mx-12 lg:mt-12 lg:gap-7 lg:px-12">
          {romanticPackages.map((pkg, idx) => {
            const text = `Ciao, vorrei informazioni sul pacchetto “${pkg.name}”. Date preferite: __/__/__ → __/__/__. Grazie.`;
            return (
              <Reveal key={pkg.name} delay={0.04 + idx * 0.04} className="min-w-[84vw] snap-center sm:min-w-[56vw] lg:min-w-[30vw]">
                <article className={`relative flex h-full min-h-[31rem] flex-col overflow-hidden rounded-[2.5rem_5rem_2.5rem_2.5rem] border p-7 shadow-[0_30px_90px_rgba(0,0,0,.3)] sm:p-9 ${idx % 2 === 0 ? "border-fuchsia-200/25 bg-[linear-gradient(145deg,rgba(111,35,155,.48),rgba(23,8,31,.92)_55%)]" : "border-violet-200/25 bg-[linear-gradient(145deg,rgba(70,42,180,.46),rgba(18,8,29,.94)_55%)]"}`}>
                  <div className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[80px] ${idx % 2 === 0 ? "bg-[#ff2aa1]/35" : "bg-[#7137ff]/40"}`} />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold tracking-[0.26em] uppercase text-[#ffc8ea]">
                        Scelta 0{idx + 1}
                      </div>
                      <h3 className="noir-h1 mt-4 text-3xl leading-tight text-noir-mist sm:text-4xl">
                        {pkg.name}
                      </h3>
                    </div>
                    <div className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 shadow-[0_0_30px_rgba(237,63,166,.22)]">
                      <Gift className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <div className="relative mt-5 text-sm leading-6 text-white/88">{pkg.summary}</div>

                  <div className="relative mt-6 grid gap-3">
                    {pkg.bullets.map((b) => (
                      <div
                        key={b}
                        className="flex items-start gap-3 text-sm leading-6 text-white/85"
                      >
                        <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
                          <Check className="h-3.5 w-3.5 text-noir-aqua" />
                        </span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-auto flex items-end justify-between gap-4 border-t border-white/15 pt-7">
                    <div>
                      <div className="text-xs tracking-[0.18em] uppercase text-white/70">
                        {idx === 0 ? "A partire da" : "Personalizzato"}
                      </div>
                      <div className="mt-1 text-2xl font-medium text-noir-mist">
                        {pkg.price}
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-6">
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

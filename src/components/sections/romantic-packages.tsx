import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { SectionHeader } from "@/components/ui/section-header";
import { noir, romanticPackages, type EuphoriaPackage } from "@/lib/noir";
import type { LucideIcon } from "lucide-react";

const CARD_GRADIENTS: Record<EuphoriaPackage["slug"], string> = {
  dayuse: "bg-[linear-gradient(145deg,rgba(217,119,6,.34),rgba(23,8,31,.92)_55%)]",
  pernotto: "bg-[linear-gradient(145deg,rgba(70,42,180,.46),rgba(18,8,29,.94)_55%)]",
  romantic: "bg-[linear-gradient(145deg,rgba(111,35,155,.48),rgba(23,8,31,.92)_55%)]",
};
const CARD_BORDERS: Record<EuphoriaPackage["slug"], string> = {
  dayuse: "border-amber-100/25",
  pernotto: "border-indigo-200/25",
  romantic: "border-fuchsia-200/25",
};
const CARD_GLOWS: Record<EuphoriaPackage["slug"], string> = {
  dayuse: "bg-[#ff8d4a]/35",
  pernotto: "bg-[#7137ff]/40",
  romantic: "bg-[#ff2aa1]/35",
};

export function RomanticPackagesSection() {
  return (
    <section
      id="pacchetti"
      data-ambient="night"
      className="relative z-10 overflow-hidden py-16 sm:py-24"
    >
      <div className="absolute inset-0 opacity-90">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_8%_18%,rgba(108,42,255,.24),transparent_58%),radial-gradient(900px_circle_at_92%_30%,rgba(255,42,161,.22),transparent_58%),radial-gradient(1100px_circle_at_50%_120%,rgba(255,165,55,.08),transparent_62%)]" />
      </div>

      <div className="noir-container relative">
        <Reveal>
          <SectionHeader
            eyebrow="Le 3 formule"
            title="Day Use, Pernotto o Romantic. Scegli la tua."
            description={
              <>
                3 pacchetti base, prezzi fissi, zero sorprese. Se vuoi aggiungere qualcosa
                (dolce, fiori, allestimento personalizzato), scrivici su WhatsApp.
              </>
            }
          />
        </Reveal>

        <div className="euphoria-snap-rail -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 sm:-mx-8 sm:px-8 lg:-mx-12 lg:mt-12 lg:gap-7 lg:px-12">
          {romanticPackages.map((pkg, idx) => {
            const Icon = pkg.icon as LucideIcon;
            const text = `Ciao, vorrei informazioni su ${pkg.name}. Date preferite: __/__/__ → __/__/__. Grazie.`;
            const wa = `${noir.contacts.whatsapp}?text=${encodeURIComponent(text)}`;
            const price = `€${pkg.price}`;
            return (
              <Reveal
                key={pkg.slug}
                delay={0.04 + idx * 0.04}
                className="min-w-[84vw] snap-center sm:min-w-[56vw] lg:min-w-[30vw]"
              >
                <article
                  className={`relative flex h-full min-h-[32rem] flex-col overflow-hidden rounded-2xl border p-7 shadow-[0_30px_90px_rgba(0,0,0,.3)] transition-transform duration-500 hover:-translate-y-1 sm:p-9 ${CARD_BORDERS[pkg.slug]} ${CARD_GRADIENTS[pkg.slug]} ${pkg.highlighted ? "lg:scale-[1.03]" : ""}`}
                >
                  <div
                    className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[80px] ${CARD_GLOWS[pkg.slug]}`}
                  />
                  {pkg.highlighted && (
                    <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
                      Formula consigliata
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold tracking-[0.26em] uppercase text-white/80">
                        Scelta 0{idx + 1} · {pkg.durationLabel}
                      </div>
                      <h3 className="noir-h1 mt-4 text-3xl leading-tight text-noir-mist sm:text-4xl">
                        {pkg.name.replace("Euphoria ", "")}
                      </h3>
                    </div>
                    <div
                      className={`relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-[0_0_40px_-8px_rgba(255,255,255,0.25)] backdrop-blur ${pkg.iconAccent}`}
                      aria-hidden
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.6} />
                    </div>
                  </div>

                  <div className="relative mt-5 text-sm leading-6 text-white/88">{pkg.tagline}</div>

                  <div className="relative mt-6 grid gap-3">
                    {pkg.bullets.map((b) => (
                      <div
                        key={b}
                        className="flex items-start gap-3 text-sm leading-6 text-white/85"
                      >
                        <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
                          <Check className="h-3.5 w-3.5 text-white/90" strokeWidth={2.4} />
                        </span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-auto flex items-end justify-between gap-4 border-t border-white/15 pt-7">
                    <div>
                      <div className="text-xs tracking-[0.18em] uppercase text-white/70">
                        Prezzo base · 2 persone
                      </div>
                      <div className="noir-display mt-1 text-3xl font-semibold text-noir-mist">
                        {price}
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-6">
                    <NoirAnchor
                      href={pkg.highlighted ? "/prenota" : wa}
                      target={pkg.highlighted ? undefined : "_blank"}
                      rel={pkg.highlighted ? undefined : "noreferrer"}
                      size="md"
                      variant="primary"
                      className="w-full"
                      track={{
                        name: pkg.highlighted ? "package_cta_prenota_click" : "package_whatsapp_click",
                        params: { package: pkg.slug, price: pkg.price },
                      }}
                    >
                      {pkg.highlighted ? "Verifica disponibilità" : "Chiedi info su WhatsApp"}
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

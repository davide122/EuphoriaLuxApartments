import { Reveal } from "@/components/motion/reveal";
import { MediaFrame } from "@/components/ui/media-frame";
import { noir } from "@/lib/noir";

export function IntroSection() {
  return (
    <section data-ambient="noir" className="relative z-10 py-20 sm:py-28">
      <div className="noir-container">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <div className="noir-panel noir-glow p-8 sm:p-10">
                <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                  Euphoria
                </div>
                <div className="noir-h1 mt-5 text-4xl leading-[1.02] text-noir-mist sm:text-5xl">
                  Non è un alloggio.
                  <br />
                  È un’esperienza privata.
                </div>
                <p className="mt-6 max-w-xl text-base leading-7 text-noir-muted">
                  Euphoria è pensata per coppie che cercano privacy, benessere e un’atmosfera
                  notturna fuori dall’ordinario. Jacuzzi privata, sauna interna e luci immersive
                  trasformano anche una sola notte in un ricordo. Prenotazione diretta, veloce.
                </p>
                <div className="mt-8">
                  <div className="text-sm text-noir-mist/70">
                    <span className="font-medium text-noir-mist/85">Da €{noir.startingFrom}/notte</span>
                    <span className="mx-2 text-white/25">•</span>
                    Jacuzzi privata
                    <span className="mx-2 text-white/25">•</span>
                    Sauna interna
                    <span className="mx-2 text-white/25">•</span>
                    Luci immersive
                    <span className="mx-2 text-white/25">•</span>
                    {noir.smartAccess}
                  </div>
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {["Cucina completa + forno", "Wi‑Fi + condizionatori"].map((t) => (
                      <div key={t} className="flex items-start gap-3 text-sm leading-6 text-noir-mist/80">
                        <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/45" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <div className="grid gap-5">
              <Reveal delay={0.05}>
                <MediaFrame
                  label="Jacuzzi Spa — riflessi e acqua"
                  tone="spa"
                  src="/passion-jacuzzi.jpg"
                  className="aspect-[4/3]"
                  priority
                />
              </Reveal>
              <Reveal delay={0.12}>
                <MediaFrame
                  label="Infinity — luci immersive (letto)"
                  tone="night"
                  src="/infinity-letto.jpg"
                  className="aspect-[7/5]"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

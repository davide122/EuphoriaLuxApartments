import { Reveal } from "@/components/motion/reveal";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { NoirLink } from "@/components/ui/noir-link";
import { noir } from "@/lib/noir";

export function NightSection() {
  return (
    <section
      data-ambient="night"
      className="relative z-10 overflow-hidden py-24 sm:py-32"
    >
      <div className="absolute inset-0 opacity-90">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_30%_10%,rgba(var(--ambient-a)/0.20),transparent_62%),radial-gradient(1100px_circle_at_78%_18%,rgba(var(--ambient-b)/0.18),transparent_62%),radial-gradient(1200px_circle_at_50%_120%,rgba(var(--ambient-c)/0.12),transparent_62%)]" />
        <div className="absolute inset-0 opacity-[0.14] bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.9)_1px,transparent_1.2px)] bg-[length:34px_34px] animate-[noir-drift_18s_linear_infinite]" />
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_70%_32%,rgba(255,255,255,0.9)_1px,transparent_1.2px)] bg-[length:46px_46px] animate-[noir-drift_26s_linear_infinite]" />
      </div>

      <div className="noir-container relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="noir-panel noir-glow p-9 sm:p-10">
                <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                  Notte / Atmosfera
                </div>
                <div className="noir-h1 mt-5 text-4xl leading-[1.02] text-noir-mist sm:text-5xl">
                  Luci che seducono.
                  <br />
                  Silenzi che restano.
                </div>
                <p className="mt-6 max-w-xl text-base leading-7 text-noir-muted">
                  È qui che Euphoria cambia ritmo: viola, fucsia, blu e un cielo scenografico.
                  Perfetta per anniversari, sorprese e fughe romantiche: una notte privata che resta.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <NoirAnchor
                    href={
                      noir.contacts.whatsapp +
                      `?text=${encodeURIComponent(
                        "Ciao, vorrei verificare disponibilità per una fuga romantica. Date: __/__/__ → __/__/__. Siamo in __. Grazie."
                      )}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    variant="primary"
                  >
                    Verifica disponibilità su WhatsApp
                  </NoirAnchor>
                  <NoirLink href="/#suites" variant="ghost">
                    Scegli la suite
                  </NoirLink>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <div className="noir-panel overflow-hidden p-8">
                <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                  Mood
                </div>
                <div className="mt-6 grid gap-3">
                  {[
                    "Cinematic luxury",
                    "Dark elegance",
                    "Futuristic wellness",
                    "Sensual but classy",
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                    >
                      <div className="text-sm text-noir-mist/80">{t}</div>
                      <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

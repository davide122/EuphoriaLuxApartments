import type { Metadata } from "next";
import { TopNav } from "@/components/nav/top-nav";
import { FooterSection } from "@/components/sections/footer";
import { Reveal } from "@/components/motion/reveal";
import { noir } from "@/lib/noir";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { CollaborationsForm } from "@/components/collaborations/collaborations-form";
import { PartnersGrid } from "@/components/collaborations/partners-grid";

export const metadata: Metadata = {
  title: `Collabora con Noi · Partner Euphoria Luxury Suite Porto Empedocle`,
  description:
    "Sei un ristorante, un wedding planner, un fotografo, un'agenzia di noleggi o fai esperienze intorno ad Agrigento? Collaboriamo: portiamo i nostri ospiti da te e i tuoi clienti qui. Modulo dedicato.",
  alternates: { canonical: "/collabora" },
  openGraph: {
    title: `Collabora con Noi · Partner Euphoria`,
    description:
      "Ristoranti, wedding planner, fotografi, noleggi, esperienze intorno a Scala dei Turchi e Valle dei Templi. Modulo collaborazioni Euphoria.",
    url: `${noir.siteUrl}/collabora`,
    type: "website",
    siteName: noir.name,
    images: [{ url: "/social/euphoria-home-v3.jpg", width: 1200, height: 630, alt: "Collabora con Euphoria" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Collabora con Noi · Partner Euphoria`,
    description:
      "Ristoranti, wedding planner, fotografi, noleggi. Modulo collaborazioni Euphoria Porto Empedocle.",
    images: ["/social/euphoria-home-v3.jpg"],
  },
};

export default function CollaboraPage() {
  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <TopNav />
      <main className="relative flex-1 pt-28">
        <section data-ambient="noir" className="relative z-10 overflow-hidden py-16 sm:py-20">
          <div className="noir-container relative">
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-purple-200/90">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
                    Collaborazioni · B2B · Nessun intermediario
                  </div>
                  <h1 className="noir-display max-w-4xl text-4xl font-semibold leading-[1.02] text-white sm:text-5xl md:text-6xl">
                    Più ospiti, meno intermediari.
                    <br />
                    <span className="bg-gradient-to-br from-purple-300 via-fuchsia-300 to-purple-500 bg-clip-text text-transparent">
                      Collaboriamo direttamente.
                    </span>
                  </h1>
                  <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300/90 sm:text-xl">
                    Euphoria porta a Porto Empedocle ospiti da tutta Italia e dall'estero:
                    coppie in luna di miele, gruppi pre-wedding, clienti premium in viaggio tra
                    Scala dei Turchi e Valle dei Templi. Se il tuo prodotto vale la pena,
                    lo consigliamo direttamente. Nessuna commissione di piattaforma,
                    nessun contratto quinquennale.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <NoirAnchor href="#modulo" size="lg" variant="primary">
                      Compila il modulo
                    </NoirAnchor>
                    <NoirAnchor
                      href={`${noir.contacts.whatsapp}?text=${encodeURIComponent(
                        "Ciao, vorrei proporre una collaborazione con Euphoria."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="lg"
                      variant="ghost"
                    >
                      Scrivici direttamente su WhatsApp
                    </NoirAnchor>
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ["100%", "Clienti privati, non OTAs"],
                      ["2 suite", "Private, zero pubblico"],
                      ["52 settimane", "Prenotazioni tutto l'anno"],
                      ["Riferimento", "Un solo contatto per tutto"],
                    ].map(([t, d]) => (
                      <div
                        key={t}
                        className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"
                      >
                        <div className="noir-display text-2xl font-semibold text-white">{t}</div>
                        <div className="mt-1 text-xs leading-relaxed text-zinc-400">{d}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <PartnersGrid />

        <section id="modulo" className="relative z-10 border-t border-white/5 bg-zinc-950/40 py-16 sm:py-20">
          <div className="noir-container">
            <Reveal>
              <div className="mx-auto max-w-3xl">
                <div className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-purple-200/70">
                  Modulo collaborazioni
                </div>
                <h2 className="noir-display text-center text-3xl font-semibold text-white sm:text-4xl">
                  Raccontaci chi sei.
                  <br />
                  Noi ti rispondiamo in 24h.
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-400">
                  Compila i campi: nel giro di un lavorativo ti scriviamo su WhatsApp o email
                  per capire insieme come incastrare i nostri ospiti con la tua attività.
                </p>
              </div>
            </Reveal>
            <CollaborationsForm />
          </div>
        </section>

        <section className="relative z-10 py-16 sm:py-20">
          <div className="noir-container">
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <div className="mb-3 text-xs uppercase tracking-[0.2em] text-purple-200/70">Come funziona</div>
                  <h2 className="noir-display max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    Una call di 10 minuti,
                    <br />
                    poi se funziona andiamo avanti.
                  </h2>
                  <p className="mt-5 max-w-xl text-zinc-400">
                    Niente riunioni infinite, nente PDF da 30 pagine. Se dopo una chiamata o due
                    su WhatsApp vediamo che c'è allineamento, partiamo con un accordo semplice,
                    parola a parola. Se non funziona, non ci si perde nulla.
                  </p>
                </div>
                <ol className="lg:col-span-5 grid gap-4">
                  {[
                    ["01", "Tu compili il modulo", "Nome attività, categoria, contatti."],
                    ["02", "Ti contattiamo noi", "WhatsApp o email, entro un lavorativo."],
                    ["03", "Allineamento veloce", "10 minuti per capire che consigliamo a chi."],
                    ["04", "Si inizia", "Ti mandiamo i nostri ospiti. Tu i tuoi clienti qui."],
                  ].map(([n, t, d]) => (
                    <li
                      key={n}
                      className="flex items-start gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-5"
                    >
                      <span className="noir-display text-2xl font-semibold text-purple-300/60">{n}</span>
                      <div>
                        <div className="font-medium text-white">{t}</div>
                        <div className="mt-1 text-sm text-zinc-400">{d}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}

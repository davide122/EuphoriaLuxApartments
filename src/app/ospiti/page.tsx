import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopNav } from "@/components/nav/top-nav";
import { FooterSection } from "@/components/sections/footer";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { MediaFrame } from "@/components/ui/media-frame";
import { GuestGuideCarousel, type GuestGuideSlide } from "@/components/guest/guest-guide-carousel";
import { noir } from "@/lib/noir";

export const metadata: Metadata = {
  title: `Guida Ospite (Arrivo & Manuale) | ${noir.name}`,
  description:
    "Guida ospite pratica: arrivo, smart check-in, istruzioni dispositivi (piano induzione, jacuzzi, sauna), parcheggi e consigli utili. Link da inviare prima del soggiorno.",
  alternates: { canonical: "/ospiti" },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: "/ospiti",
    siteName: noir.name,
    locale: "it_IT",
    title: `Guida Ospite | ${noir.name}`,
    description: "Arrivo, smart check-in, manuale dispositivi, parcheggi e consigli utili.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `Guida Ospite — ${noir.name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Guida Ospite | ${noir.name}`,
    description: "Arrivo, smart check-in, manuale dispositivi, parcheggi e consigli utili.",
    images: ["/opengraph-image"],
  },
};

type SuiteSlug = "passion" | "infinity";

function safeTrim(v: string | undefined | null) {
  return (v ?? "").trim();
}

function parseList(v: string) {
  return v
    .split(/\r?\n|\|/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function isSuiteSlug(v: string): v is SuiteSlug {
  return v === "passion" || v === "infinity";
}

function isOccasion(v: string) {
  return ["anniversario", "sorpresa", "proposta", "weekend"].includes(v);
}

function normalizeDoorCode(v: string) {
  const code = safeTrim(v).replace(/\s+/g, "");
  if (!code) return "";
  if (!/^[0-9]{4,10}$/.test(code)) return "";
  return code;
}

function normalizeMapsUrl(v: string) {
  const raw = safeTrim(v);
  if (!raw) return "";
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:" && u.protocol !== "http:") return "";
    return u.toString();
  } catch {
    return "";
  }
}

function normalizeWifiPassword(v: string) {
  const raw = safeTrim(v);
  if (!raw) return "";
  return raw.replace(/\s+/g, " ").trim();
}

export default async function OspitiPage({
  searchParams,
}: {
  searchParams?: Promise<{
    nome?: string;
    suite?: string;
    arrivo?: string;
    partenza?: string;
    occasione?: string;
    codice?: string;
    code?: string;
    checkin?: string;
    checkout?: string;
    wifi?: string;
    wifiPass?: string;
    maps?: string;
    parcheggio?: string;
    ristoranti?: string;
    note?: string;
    token?: string;
  }>;
}) {
  const sp = (await searchParams) ?? {};
  const nome = safeTrim(sp.nome);
  const suiteRaw = safeTrim(sp.suite).toLowerCase();
  const suite = suiteRaw ? (isSuiteSlug(suiteRaw) ? suiteRaw : null) : null;
  const arrivo = safeTrim(sp.arrivo);
  const partenza = safeTrim(sp.partenza);
  const occasione = safeTrim(sp.occasione).toLowerCase();
  const doorCode = normalizeDoorCode(sp.codice ?? sp.code ?? "");
  const checkInTime = safeTrim(sp.checkin);
  const checkOutTime = safeTrim(sp.checkout);
  const wifiName = safeTrim(sp.wifi);
  const wifiPass = normalizeWifiPassword(sp.wifiPass ?? "");
  const mapsOverride = normalizeMapsUrl(sp.maps ?? "");
  const parking = parseList(safeTrim(sp.parcheggio));
  const restaurants = parseList(safeTrim(sp.ristoranti));
  const customNotes = parseList(safeTrim(sp.note));

  if (suiteRaw && !suite) notFound();
  if (occasione && !isOccasion(occasione)) notFound();
  if (safeTrim(sp.codice ?? sp.code ?? "") && !doorCode) notFound();
  if (safeTrim(sp.maps ?? "") && !mapsOverride) notFound();

  const greeting = nome ? `Ciao ${nome}.` : "Ciao.";
  const suiteLabel = suite ? (suite === "passion" ? "Passion" : "Infinity") : null;
  const dateLine = arrivo || partenza ? `Date: ${arrivo || "__/__/__"} → ${partenza || "__/__/__"}` : null;

  const mapsQuery = encodeURIComponent(`${noir.name} Luxury Suite ${noir.location}`);
  const mapsHref = mapsOverride || `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  const whatsappText = [
    "Ciao! Ho una domanda per il soggiorno.",
    suiteLabel ? `Suite: ${suiteLabel}` : null,
    arrivo || partenza ? `Date: ${arrivo || "__/__/__"} → ${partenza || "__/__/__"}` : null,
    checkInTime ? `Check-in: ${checkInTime}` : null,
    checkOutTime ? `Check-out: ${checkOutTime}` : null,
    nome ? `Nome: ${nome}` : null,
  ]
    .filter(Boolean)
    .join(" ");
  const whatsappHref = noir.contacts.whatsapp + `?text=${encodeURIComponent(whatsappText)}`;

  const arrivalVideo = "https://www.youtube.com/watch?v=Bzv2DbJbiCU";
  const devicesVideo = "";
  const inductionVideo = "";
  const saunaVideo = "";
  const jacuzziVideo = "";

  const occasionPlan =
    occasione === "anniversario"
      ? ["Un’uscita semplice (cena)", "Rientro e spa privata", "Tempo lento (niente fretta)"]
      : occasione === "sorpresa"
        ? ["Tramonto o passeggiata", "Rientro e spa privata", "Messaggio/telefono spento (se vuoi stacco totale)"]
        : occasione === "proposta"
          ? ["Rientro e prepara la scena", "Momento in privacy", "Spa privata dopo"]
          : occasione === "weekend"
            ? ["1 tappa fuori (Scala dei Turchi o Valle dei Templi)", "Cena", "Spa privata la sera"]
            : null;

  const slides: GuestGuideSlide[] = [
    {
      id: "intro",
      title: "Info rapide",
      subtitle: "Tutto quello che serve, senza fronzoli.",
      highlight:
        suiteLabel || dateLine
          ? { label: "Riepilogo", value: suiteLabel ? `${suiteLabel}${dateLine ? ` · ${dateLine}` : ""}` : dateLine ?? "" }
          : undefined,
      steps: [
        "Scorri le schede per ogni dispositivo/azione.",
        "Se ti blocchi: usa il tasto WhatsApp in alto.",
        "Per arrivare: usa Google Maps in alto.",
      ],
    },
    {
      id: "arrivo",
      title: "Arrivo e accesso",
      subtitle: "Passaggi minimi per arrivare e non perdere tempo.",
      video: { title: "Video: arrivo", src: arrivalVideo },
      steps: [
        "Apri Google Maps (bottone sopra) e raggiungi la zona.",
        "Parcheggia in una zona comoda e ben illuminata.",
        "Vai alla porta e usa lo smart access (tastierino).",
        "Se qualcosa non torna: scrivi su WhatsApp.",
      ],
      notes: ["Tieni a portata questa pagina (preferiti).", "Arrivo e partenza sono in autonomia (smart access)."],
    },
    ...(occasionPlan
      ? [
          {
            id: "piano",
            title: "Piano semplice (giornata/sera)",
            subtitle: "Schema utile se vuoi fare poche cose ma fatte bene.",
            steps: occasionPlan,
          },
        ]
      : []),
    ...(wifiName || wifiPass
      ? [
          {
            id: "wifi",
            title: "Wi‑Fi",
            subtitle: "Se ti serve, trovi qui rete e password.",
            highlight: wifiName ? { label: "Rete", value: wifiName } : undefined,
            steps: [
              wifiPass ? `Password: ${wifiPass}` : "Password: (non inserita)",
              "Se la rete non compare: disattiva e riattiva il Wi‑Fi sul telefono.",
            ],
          },
        ]
      : []),
    ...(checkInTime || checkOutTime
      ? [
          {
            id: "orari",
            title: "Orari",
            subtitle: "Riepilogo check-in / check-out (se indicati).",
            steps: [
              checkInTime ? `Check-in: ${checkInTime}` : "Check-in: (non indicato)",
              checkOutTime ? `Check-out: ${checkOutTime}` : "Check-out: (non indicato)",
            ],
          },
        ]
      : []),
    {
      id: "accesso",
      title: "Smart access (tastierino)",
      subtitle: "Inserisci il codice, attendi lo sblocco e apri nel modo giusto.",
      video: { title: "Video: smart check-in / accesso", src: devicesVideo },
      highlight: doorCode ? { label: "Codice porta", value: doorCode } : undefined,
      steps: [
        "Accendi/illumina il tastierino (se serve).",
        "Inserisci il codice e conferma (tasto OK / simbolo).",
        "Attendi qualche secondo: senti lo sblocco.",
        "Apri così: tira un po’ la porta verso di te e poi spingi.",
        "Per richiudere: non sbattere. Accosta e attendi qualche secondo che si chiuda correttamente.",
      ],
      notes: [
        "Se non hai il codice in pagina, lo trovi nel messaggio di conferma.",
        "Se il tastierino non risponde o il codice non va: scrivi su WhatsApp.",
      ],
    },
    {
      id: "prima-cosa",
      title: "Appena entri (2 minuti)",
      subtitle: "Obiettivo: rendere tutto comodo e pronto, senza perdere tempo.",
      steps: [
        "Imposta temperatura (condizionatore) come preferisci.",
        "Metti in carica i telefoni se ti serve.",
        "Prepara il set: acqua da bere, asciugamani a portata.",
        "Poi passa a jacuzzi/sauna quando siete pronti.",
      ],
    },
    {
      id: "induzione",
      title: "Piano cottura a induzione",
      subtitle: "Schema rapido. Funziona solo con pentole compatibili (magnetiche).",
      video: { title: "Video: piano induzione", src: inductionVideo },
      steps: [
        "Metti una pentola compatibile su una zona.",
        "Accendi il piano (tasto Power).",
        "Seleziona la zona e imposta potenza (1–9).",
        "Booster (se presente) per aumentare velocemente.",
        "Per spegnere: porta a 0 o spegni il piano.",
      ],
      notes: [
        "Se la pentola non è compatibile, la zona non parte.",
        "Può comparire “H” (calore residuo): aspetta che sparisca.",
      ],
      troubleshooting: [
        { q: "Non scalda / si spegne subito", a: "Pentola compatibile e centrata sulla zona." },
        { q: "Vedo “L” o non risponde", a: "Blocco tasti attivo: tieni premuto il tasto blocco per sbloccare." },
        { q: "Compare “H”", a: "Calore residuo: non toccare, aspetta." },
      ],
    },
    {
      id: "jacuzzi",
      title: "Jacuzzi / idromassaggio",
      subtitle: "Schema d’uso per farla partire senza tentativi a caso.",
      video: { title: "Video: jacuzzi", src: jacuzziVideo },
      steps: [
        "Controlla livello acqua: deve stare sopra i getti.",
        "Accendi (Power).",
        "Attiva i getti (Jets).",
        "Se vuoi: luci (Light) e regolazioni disponibili.",
        "Fine: spegni getti, poi Power.",
      ],
      notes: ["Niente vetro vicino alla jacuzzi.", "Se si blocca: spegni e riaccendi dopo 30–60 secondi."],
      troubleshooting: [
        { q: "I getti non partono", a: "Acqua sopra i getti + Power attivo, poi Jets." },
        { q: "Si ferma dopo poco", a: "Protezione/timeout: spegni e riaccendi dopo 30–60 secondi." },
      ],
    },
    {
      id: "sauna",
      title: "Sauna",
      subtitle: "Uso semplice e sicuro: sessioni comode, poi pausa.",
      video: { title: "Video: sauna", src: saunaVideo },
      steps: [
        "Accendi (Power).",
        "Imposta temperatura (se regolabile) e avvia (Start).",
        "Attendi che arrivi in temperatura.",
        "Sessione comoda, poi pausa e acqua.",
        "Spegni (Off) quando hai finito.",
      ],
      notes: ["Bevi acqua.", "Se ti senti male/fiacco: interrompi e fai pausa."],
      troubleshooting: [{ q: "Non scalda", a: "Controlla Power e Start. Se non parte, scrivi su WhatsApp." }],
    },
    {
      id: "parcheggi",
      title: "Parcheggi e spostamenti",
      subtitle: "Indicazioni pratiche: niente giri inutili.",
      steps: [
        ...(parking.length ? parking : ["Parcheggio comodo e sicuro (zona illuminata)."]),
        "Se esci: 1 tappa, non 5.",
        "Rientra con margine: la parte utile è dentro.",
      ],
    },
    ...(restaurants.length
      ? [
          {
            id: "ristoranti",
            title: "Ristoranti consigliati",
            subtitle: "Scelte semplici e comode.",
            steps: restaurants,
          },
        ]
      : []),
    ...(customNotes.length
      ? [
          {
            id: "note",
            title: "Note utili",
            subtitle: "Dettagli extra per il tuo soggiorno.",
            steps: customNotes,
          },
        ]
      : []),
    {
      id: "zona",
      title: "Idee in zona (se vuoi uscire)",
      subtitle: "Tre opzioni semplici, senza pianificare troppo.",
      steps: ["Scala dei Turchi", "Valle dei Templi", "Tramonto sul mare"],
    },
    {
      id: "supporto",
      title: "Supporto rapido",
      subtitle: "Se ti blocchi: scrivi. Se devi arrivare: apri Maps.",
      steps: ["WhatsApp: messaggio rapido con la tua domanda.", "Google Maps: apri la posizione e vai."],
    },
  ];

  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <TopNav />
      <main className="relative flex-1 pt-28">
        <section data-ambient="noir" className="relative z-10 py-16 sm:py-20">
          <div className="noir-container">
            <Reveal>
              <div className="noir-panel noir-glow overflow-hidden p-9 sm:p-12">
                <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-6">
                    <SectionHeader
                      eyebrow="Guida Ospite"
                      title={`${greeting} Manuale pratico (arrivo + dispositivi).`}
                      description={
                        <>
                          Arrivo, smart check-in, istruzioni dispositivi (piano induzione, jacuzzi, sauna), parcheggi e consigli.{" "}
                          {suiteLabel ? `Suite: ${suiteLabel}. ` : null}
                          {dateLine ? dateLine : null}
                          {checkInTime ? ` · Check-in: ${checkInTime}` : null}
                          {checkOutTime ? ` · Check-out: ${checkOutTime}` : null}
                        </>
                      }
                    />
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                      <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
                        Assistenza (WhatsApp)
                      </NoirAnchor>
                      <NoirAnchor href={mapsHref} target="_blank" rel="noreferrer" variant="ghost">
                        Apri Google Maps
                      </NoirAnchor>
                    </div>
                    <div className="mt-8 text-sm text-noir-mist/70">
                      <span className="font-medium text-noir-mist/85">Smart access</span>
                      <span className="mx-2 text-white/25">•</span>
                      {noir.smartAccess}
                    </div>
                  </div>
                  <div className="lg:col-span-6">
                    <MediaFrame
                      label={suiteLabel ? `Guida — ${suiteLabel}` : "Guida — Arrivo"}
                      tone="night"
                      src={suite === "infinity" ? "/infinity-letto.jpg" : "/passion-letto-jacuzzi-sauna.jpg"}
                      alt="Guida ospite: arrivo e manuale"
                      className="aspect-[16/10]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <GuestGuideCarousel
              slides={slides}
            />
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}

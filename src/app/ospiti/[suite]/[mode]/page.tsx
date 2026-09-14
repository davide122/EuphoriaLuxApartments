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
import { openGraphImage, socialImages } from "@/lib/social";

type SuiteSlug = "passion" | "infinity";
type StayMode = "pernottamento" | "dayuse";

const GUIDE_BY_SUITE: Record<
  SuiteSlug,
  {
    label: string;
    hero: string;
    tone: "spa" | "sauna" | "night" | "noir";
    intro: string;
    insideSteps: string[];
  }
> = {
  passion: {
    label: "Passion",
    hero: "/passion-letto-jacuzzi-sauna.jpg",
    tone: "spa",
    intro:
      "La guida pratica della suite Passion: arrivo, accesso, jacuzzi, sauna e indicazioni semplici da seguire senza messaggi infiniti.",
    insideSteps: [
      "Passion è più raccolta e più intima: appena entri trovi subito il mood della suite.",
      "Jacuzzi, sauna e zona notte lavorano insieme: non devi spostarti o uscire dalla stanza.",
      "Prenditi 2 minuti all'inizio per impostare luce, clima e asciugamani: poi il resto scorre da solo.",
    ],
  },
  infinity: {
    label: "Infinity",
    hero: "/infinity-letto.jpg",
    tone: "night",
    intro:
      "La guida pratica della suite Infinity: arrivo, accesso, dispositivi e ritmo del soggiorno, tutto in un solo link semplice da consultare.",
    insideSteps: [
      "Infinity è più ampia e più scenografica: la suite va vissuta con calma, non di corsa.",
      "Usa prima la zona living e il set iniziale, poi passa a jacuzzi e sauna quando siete pronti.",
      "Luci, spazi e dettagli rendono bene soprattutto la sera: sfrutta il tempo dentro la suite, non solo fuori.",
    ],
  },
};

const MODE_BY_STAY: Record<
  StayMode,
  {
    label: string;
    intro: string;
    timingLabel: string;
    fallbackCheckIn: string;
    fallbackCheckOut: string;
    steps: string[];
    notes: string[];
  }
> = {
  pernottamento: {
    label: "Pernottamento",
    intro:
      "Questa guida è pensata per un soggiorno con notte inclusa: arrivo comodo, uso della suite senza fretta e uscita semplice il giorno dopo.",
    timingLabel: "Soggiorno",
    fallbackCheckIn: "dalle 15:00",
    fallbackCheckOut: "entro le 11:00",
    steps: [
      "Arriva con calma, entra e sistema subito temperatura, luci e cose essenziali.",
      "Usa jacuzzi e sauna senza fretta: la logica del pernottamento è vivere bene anche il tempo in suite.",
      "Prima di uscire il giorno dopo, controlla effetti personali, porta e spegnimento dei dispositivi.",
    ],
    notes: [
      "Se hai un orario concordato diverso, fa fede quello indicato nel link o nel messaggio ricevuto.",
      "Per qualsiasi dubbio operativo, usa direttamente il pulsante WhatsApp in pagina.",
    ],
  },
  dayuse: {
    label: "Day Use",
    intro:
      "Questa guida è pensata per un accesso a ore: tutto è organizzato per farti entrare, usare la suite e uscire senza perdere tempo.",
    timingLabel: "Accesso day use",
    fallbackCheckIn: "all'orario concordato",
    fallbackCheckOut: "entro la fine della fascia prenotata",
    steps: [
      "Entra e prepara subito la suite come vuoi usarla: clima, luci, asciugamani e set iniziale.",
      "Concentrati su jacuzzi e sauna: nel day use conta avere tutto chiaro e pronto nei primi minuti.",
      "A fine fascia, raccogli i tuoi effetti personali, controlla la porta e lascia la suite in ordine.",
    ],
    notes: [
      "Il day use ha tempi più compatti: conviene leggere la guida prima di arrivare.",
      "Se devi anticipare o hai un dubbio sull'orario, scrivi su WhatsApp prima di metterti in viaggio.",
    ],
  },
};

function safeTrim(v: string | undefined | null) {
  return (v ?? "").trim();
}

function isSuiteSlug(v: string): v is SuiteSlug {
  return v === "passion" || v === "infinity";
}

function isStayMode(v: string): v is StayMode {
  return v === "pernottamento" || v === "dayuse";
}

function normalizeDoorCode(v: string) {
  const code = safeTrim(v).replace(/\s+/g, "");
  if (!code) return "";
  if (!/^[0-9]{4,10}$/.test(code)) return "";
  return code;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { suite: "passion", mode: "pernottamento" },
    { suite: "passion", mode: "dayuse" },
    { suite: "infinity", mode: "pernottamento" },
    { suite: "infinity", mode: "dayuse" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ suite: string; mode: string }>;
}): Promise<Metadata> {
  const { suite, mode } = await params;
  if (!isSuiteSlug(suite) || !isStayMode(mode)) {
    return { robots: { index: false, follow: false } };
  }

  const suiteLabel = GUIDE_BY_SUITE[suite].label;
  const modeLabel = MODE_BY_STAY[mode].label;
  const title = `Guida ospite ${suiteLabel} ${modeLabel} | ${noir.name}`;
  const description = `Guida pratica ${suiteLabel}: posizione, accesso con tastierino, jacuzzi, sauna e istruzioni ${modeLabel.toLowerCase()}.`;
  const socialImage = suite === "infinity" ? socialImages.infinity : socialImages.passion;

  return {
    title,
    description,
    alternates: { canonical: `/ospiti/${suite}/${mode}` },
    robots: { index: false, follow: false },
    openGraph: {
      type: "website",
      url: `/ospiti/${suite}/${mode}`,
      siteName: noir.name,
      locale: "it_IT",
      title,
      description,
      images: [openGraphImage(socialImage, title)],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

function buildSlides(args: {
  suite: SuiteSlug;
  mode: StayMode;
  nome: string;
  arrivo: string;
  partenza: string;
  doorCode: string;
  checkInTime: string;
  checkOutTime: string;
}): GuestGuideSlide[] {
  const suiteConfig = GUIDE_BY_SUITE[args.suite];
  const modeConfig = MODE_BY_STAY[args.mode];
  const mapsLabel = `Apri Google Maps: ${noir.siteUrl}`;
  const checkIn = args.checkInTime || modeConfig.fallbackCheckIn;
  const checkOut = args.checkOutTime || modeConfig.fallbackCheckOut;

  return [
    {
      id: "intro",
      title: `${suiteConfig.label} · ${modeConfig.label}`,
      subtitle: suiteConfig.intro,
      highlight: {
        label: "Riepilogo",
        value: args.arrivo || args.partenza ? `${args.arrivo || "--"} · ${args.partenza || "--"}` : modeConfig.label,
      },
      steps: [
        "Scorri le schede una per una: trovi arrivo, accesso, uso dei dispositivi e uscita.",
        "Questa guida sostituisce i messaggi lunghi: tienila aperta quando stai arrivando.",
        "Se qualcosa non torna, usa il pulsante WhatsApp in alto.",
      ],
    },
    {
      id: "posizione",
      title: "Dove si trova",
      subtitle: "Raggiungi la struttura con un solo link e poi segui i passaggi d'ingresso.",
      steps: [
        `Apri Google Maps dal pulsante in alto e raggiungi ${noir.location}.`,
        "Parcheggia in modo semplice e comodo nella zona più vicina all'ingresso.",
        "Una volta davanti alla porta, passa subito alla scheda Smart access.",
        `Se hai dubbi mentre sei in macchina o a piedi, fermati e scrivi su WhatsApp.`,
      ],
      notes: [mapsLabel],
    },
    {
      id: "accesso",
      title: "Smart access e porta",
      subtitle: "Il passaggio più importante: tastierino, sblocco e apertura corretta della porta.",
      highlight: args.doorCode ? { label: "Codice porta", value: args.doorCode } : undefined,
      steps: [
        "Accendi o sfiora il tastierino, se serve per illuminare i numeri.",
        "Inserisci il codice e conferma con il tasto di apertura / conferma.",
        "Attendi qualche secondo: la serratura deve sbloccarsi, non avere fretta.",
        "Per aprire bene: tira leggermente la porta verso di te e poi spingi.",
        "Per richiuderla: accosta la porta e attendi qualche secondo, senza sbatterla.",
      ],
      notes: [
        "Se il codice non è mostrato qui, usa quello ricevuto nel messaggio di conferma.",
        "Se il tastierino non risponde o non si apre, scrivi subito su WhatsApp.",
      ],
      troubleshooting: [
        { q: "Il tastierino si accende ma la porta non apre", a: "Controlla di aver confermato il codice e attendi 2-3 secondi prima di muovere la porta." },
        { q: "La porta sembra bloccata", a: "Non forzare: tira leggermente verso di te e poi spingi con calma." },
      ],
    },
    {
      id: "soggiorno",
      title: modeConfig.label,
      subtitle: modeConfig.intro,
      highlight: {
        label: modeConfig.timingLabel,
        value: `${checkIn} → ${checkOut}`,
      },
      steps: modeConfig.steps,
      notes: modeConfig.notes,
    },
    {
      id: "suite",
      title: `Dentro ${suiteConfig.label}`,
      subtitle: "Piccola lettura iniziale per capire subito come vivere bene la suite.",
      steps: suiteConfig.insideSteps,
    },
    {
      id: "jacuzzi",
      title: "Jacuzzi privata",
      subtitle: "Uso semplice, senza tentativi a caso.",
      steps: [
        "Controlla che il livello dell'acqua sia sopra i getti prima di attivarla.",
        "Accendi la vasca con il tasto Power.",
        "Attiva i getti con Jets e regola eventuali luci o funzioni disponibili.",
        "Quando hai finito, spegni prima i getti e poi l'alimentazione generale.",
      ],
      notes: [
        "Evita vetro e oggetti delicati vicino alla jacuzzi.",
        "Se la vasca sembra ferma o in protezione, spegni e riaccendi dopo 30-60 secondi.",
      ],
      troubleshooting: [
        { q: "I getti non partono", a: "Controlla il livello dell'acqua e verifica di aver acceso prima Power e poi Jets." },
        { q: "La vasca si blocca", a: "Attendi qualche secondo e riparti da Power; se non cambia, scrivi su WhatsApp." },
      ],
    },
    {
      id: "sauna",
      title: "Sauna interna",
      subtitle: "Pochi passaggi, uso corretto e ritmo tranquillo.",
      steps: [
        "Accendi la sauna con il tasto Power.",
        "Imposta temperatura o avvio se il pannello lo richiede.",
        "Attendi il tempo necessario prima di entrarci davvero.",
        "Fai sessioni comode e brevi, poi pausa e acqua.",
        "Quando hai finito, spegni la sauna dal pannello.",
      ],
      notes: [
        "Tieniti idratato prima e dopo l'uso.",
        "Se non ti senti bene o hai troppo caldo, interrompi subito e fai pausa.",
      ],
      troubleshooting: [{ q: "La sauna non parte", a: "Ricontrolla accensione e avvio. Se il pannello non risponde, scrivi su WhatsApp." }],
    },
    {
      id: "uscita",
      title: "Prima di uscire",
      subtitle: "Ultimo check rapido per lasciare tutto in ordine.",
      steps: [
        "Controlla di non lasciare telefoni, documenti, caricabatterie o effetti personali.",
        "Spegni i dispositivi che hai usato, se non sono già tornati in stato di riposo.",
        "Accosta bene la porta e verifica che la chiusura avvenga correttamente.",
        `Se hai bisogno di assistenza finale, usa WhatsApp e indica ${args.nome ? `il nome ${args.nome}` : "la suite e l'orario"}.`,
      ],
    },
  ];
}

export default async function OspitiGuidePage({
  params,
  searchParams,
}: {
  params: Promise<{ suite: string; mode: string }>;
  searchParams?: Promise<{
    nome?: string;
    arrivo?: string;
    partenza?: string;
    codice?: string;
    code?: string;
    checkin?: string;
    checkout?: string;
  }>;
}) {
  const route = await params;
  if (!isSuiteSlug(route.suite) || !isStayMode(route.mode)) notFound();

  const sp = (await searchParams) ?? {};
  const nome = safeTrim(sp.nome);
  const arrivo = safeTrim(sp.arrivo);
  const partenza = safeTrim(sp.partenza);
  const doorCode = normalizeDoorCode(sp.codice ?? sp.code ?? "");
  const checkInTime = safeTrim(sp.checkin);
  const checkOutTime = safeTrim(sp.checkout);

  if (safeTrim(sp.codice ?? sp.code ?? "") && !doorCode) notFound();

  const suiteConfig = GUIDE_BY_SUITE[route.suite];
  const modeConfig = MODE_BY_STAY[route.mode];
  const greeting = nome ? `Ciao ${nome}.` : "Ciao.";
  const mapsQuery = encodeURIComponent(`${noir.name} Luxury Suite ${noir.location}`);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const whatsappText = [
    "Ciao! Ho bisogno di assistenza per la guida ospite.",
    `Suite: ${suiteConfig.label}`,
    `Formula: ${modeConfig.label}`,
    nome ? `Nome: ${nome}` : null,
    arrivo || partenza ? `Date: ${arrivo || "__/__/__"} → ${partenza || "__/__/__"}` : null,
  ]
    .filter(Boolean)
    .join(" ");
  const whatsappHref = noir.contacts.whatsapp + `?text=${encodeURIComponent(whatsappText)}`;
  const slides = buildSlides({
    suite: route.suite,
    mode: route.mode,
    nome,
    arrivo,
    partenza,
    doorCode,
    checkInTime,
    checkOutTime,
  });

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
                      title={`${greeting} ${suiteConfig.label} · ${modeConfig.label}.`}
                      description={
                        <>
                          Una sola pagina con tutto quello che serve davvero: posizione, accesso,
                          tastierino, porta, jacuzzi, sauna e uscita. Niente parametri inutili,
                          niente messaggi sparsi.
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
                      <span className="font-medium text-noir-mist/85">{suiteConfig.label}</span>
                      <span className="mx-2 text-white/25">•</span>
                      {modeConfig.label}
                      <span className="mx-2 text-white/25">•</span>
                      {noir.smartAccess}
                    </div>
                  </div>
                  <div className="lg:col-span-6">
                    <MediaFrame
                      label={`${suiteConfig.label} — guida ospite`}
                      tone={suiteConfig.tone}
                      src={suiteConfig.hero}
                      alt={`Guida ospite ${suiteConfig.label}`}
                      className="aspect-[16/10]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <GuestGuideCarousel slides={slides} />
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}

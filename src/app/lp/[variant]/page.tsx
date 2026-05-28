import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { NoirLink } from "@/components/ui/noir-link";
import { noir } from "@/lib/noir";

export const dynamicParams = false;

type Variant =
  | "bianco-spa"
  | "bianco-romantico"
  | "bianco-weekend";

function buildWhatsAppHref(text: string) {
  return noir.contacts.whatsapp + `?text=${encodeURIComponent(text)}`;
}

const VARIANTS: Record<
  Variant,
  {
    title: string;
    metaTitle: string;
    metaDescription: string;
    hero: {
      kicker: string;
      h1: string;
      sub: string;
      bullets: Array<{ label: string; tone: 1 | 2 | 3 }>;
      primaryCta: { label: string; href: string };
      secondaryCta: { label: string; href: string };
    };
    features: Array<{
      kicker: string;
      title: string;
      body: string;
      cta?: { label: string; href: string };
      image: { src: string; alt: string };
      tone: 1 | 2 | 3;
    }>;
    theme: {
      bg: string;
      text: string;
      muted: string;
      border: string;
      card: string;
      cardBorder: string;
      surface: string;
      accent: string;
      accentSoft: string;
      accent2: string;
      accent2Soft: string;
      accent3: string;
      accent3Soft: string;
    };
  }
> = {
  "bianco-spa": {
    title: "SPA privata (stile chiaro)",
    metaTitle: `SPA privata a Porto Empedocle: jacuzzi e sauna | ${noir.name}`,
    metaDescription:
      "Una landing chiara e semplice: SPA privata in suite con jacuzzi e sauna ad uso esclusivo. Prenotazione diretta su WhatsApp.",
    hero: {
      kicker: "SPA privata · uso esclusivo",
      h1: "Jacuzzi + sauna. Tutto privato. Tutto semplice.",
      sub: "Suite a Porto Empedocle (zona Agrigento). Zero spazi condivisi: entri e sei già dentro l’esperienza.",
      bullets: [
        { label: "Jacuzzi privata", tone: 1 },
        { label: "Sauna interna", tone: 2 },
        { label: noir.smartAccess, tone: 3 },
        { label: `Da €${noir.startingFrom}/notte`, tone: 1 },
      ],
      primaryCta: {
        label: "Scrivi su WhatsApp",
        href: buildWhatsAppHref(
          "Ciao, vorrei verificare disponibilità per una suite con SPA privata (jacuzzi + sauna). Date: __/__/__ → __/__/__. Siamo in __. Grazie."
        ),
      },
      secondaryCta: { label: "Vedi le suites", href: "/suites" },
    },
    features: [
      {
        kicker: "SPA in suite",
        title: "Wellness privato, senza turni.",
        body: "Jacuzzi e sauna sono interne alla suite: niente aree comuni, niente orari da inseguire. Entri e sei già nel punto giusto.",
        cta: { label: "Vedi suites", href: "/suites" },
        image: { src: "/passion-jacuzzi.jpg", alt: "Jacuzzi privata in suite" },
        tone: 1,
      },
      {
        kicker: "Zona Agrigento",
        title: "Fuori un’icona. Dentro il finale.",
        body: "Scala dei Turchi e Valle dei Templi sono a portata. La differenza è come finisce la giornata: rientro, porta chiusa, relax privato.",
        cta: { label: "Leggi le guide", href: "/blog" },
        image: { src: "/passion-letto-jacuzzi-sauna.jpg", alt: "Suite con jacuzzi e sauna: atmosfera privata" },
        tone: 2,
      },
      {
        kicker: "Dettagli pratici",
        title: "Comfort completo. Zero sbatti.",
        body: "Cucina con forno, Wi‑Fi e condizionatori. Smart access per arrivare e partire in autonomia.",
        cta: { label: "Prenota diretto", href: buildWhatsAppHref("Ciao, vorrei verificare disponibilità per una suite con SPA privata (jacuzzi + sauna). Date: __/__/__ → __/__/__. Siamo in __. Grazie.") },
        image: { src: "/infinity-cucina.jpg", alt: "Cucina completa con forno in suite" },
        tone: 3,
      },
    ],
    theme: {
      bg: "bg-white",
      text: "text-slate-900",
      muted: "text-slate-600",
      border: "border-slate-200",
      card: "bg-white",
      cardBorder: "border-slate-200",
      surface: "bg-sky-50",
      accent: "text-cyan-700",
      accentSoft: "bg-cyan-50",
      accent2: "text-indigo-700",
      accent2Soft: "bg-indigo-50",
      accent3: "text-fuchsia-700",
      accent3Soft: "bg-fuchsia-50",
    },
  },
  "bianco-romantico": {
    title: "Romantico (stile chiaro)",
    metaTitle: `Suite romantica a Porto Empedocle: jacuzzi e sauna | ${noir.name}`,
    metaDescription:
      "Una landing chiara e moderna per coppie: suite romantica con jacuzzi privata e sauna interna. Prenotazione diretta su WhatsApp.",
    hero: {
      kicker: "Coppie · privacy · notte speciale",
      h1: "Una notte romantica fatta bene.",
      sub: "Niente fronzoli: privacy, benessere privato e comfort. Porto Empedocle (zona Agrigento).",
      bullets: [
        { label: "Jacuzzi privata", tone: 1 },
        { label: "Sauna interna", tone: 2 },
        { label: "Zero spazi condivisi", tone: 3 },
        { label: noir.smartAccess, tone: 2 },
      ],
      primaryCta: {
        label: "Disponibilità (WhatsApp)",
        href: buildWhatsAppHref(
          "Ciao, vorrei verificare disponibilità per una suite romantica (jacuzzi + sauna). Date: __/__/__ → __/__/__. Siamo in __. Grazie."
        ),
      },
      secondaryCta: { label: "Passion o Infinity", href: "/suites" },
    },
    features: [
      {
        kicker: "Privacy",
        title: "Nessuna condivisione. Solo voi.",
        body: "Se cerchi un alloggio romantico, questo è il punto: zero spazi comuni e benessere dentro la suite.",
        cta: { label: "Vedi suites", href: "/suites" },
        image: { src: "/infinity-letto.jpg", alt: "Suite romantica: letto e atmosfera" },
        tone: 1,
      },
      {
        kicker: "Ritmo",
        title: "Jacuzzi, sauna, doccia. Senza orari.",
        body: "Il lusso qui è pratico: fai tutto quando vuoi. Niente turni, niente corridoi, niente “adesso si chiude”.",
        cta: {
          label: "Scrivi su WhatsApp",
          href: buildWhatsAppHref(
            "Ciao, vorrei verificare disponibilità per una suite romantica (jacuzzi + sauna). Date: __/__/__ → __/__/__. Siamo in __. Grazie."
          ),
        },
        image: { src: "/passion-letto-jacuzzi-sauna.jpg", alt: "Jacuzzi e sauna nella suite" },
        tone: 2,
      },
      {
        kicker: "Idee",
        title: "Una cosa fuori. Il resto dentro.",
        body: "Cena lenta o tramonto, poi rientro e spa privata. Se è una sorpresa, scrivilo: ti aiutiamo a scegliere la suite più adatta.",
        cta: { label: "Guida SPA privata", href: "/spa-porto-empedocle" },
        image: { src: "/passion-jacuzzi.jpg", alt: "Jacuzzi privata: relax di sera" },
        tone: 3,
      },
    ],
    theme: {
      bg: "bg-white",
      text: "text-slate-900",
      muted: "text-slate-600",
      border: "border-slate-200",
      card: "bg-white",
      cardBorder: "border-slate-200",
      surface: "bg-rose-50",
      accent: "text-rose-700",
      accentSoft: "bg-rose-50",
      accent2: "text-violet-700",
      accent2Soft: "bg-violet-50",
      accent3: "text-amber-700",
      accent3Soft: "bg-amber-50",
    },
  },
  "bianco-weekend": {
    title: "Weekend (stile chiaro)",
    metaTitle: `Weekend romantico zona Agrigento: suite con jacuzzi | ${noir.name}`,
    metaDescription:
      "Landing chiara per weekend in zona Agrigento: dormi a Porto Empedocle e chiudi la giornata in suite con jacuzzi privata e sauna interna.",
    hero: {
      kicker: "Weekend · zona Agrigento",
      h1: "Giorno fuori. Notte in SPA privata.",
      sub: "Base Porto Empedocle: muovi facile, rientri e ti rilassi davvero (jacuzzi + sauna).",
      bullets: [
        { label: "Scala dei Turchi", tone: 1 },
        { label: "Valle dei Templi", tone: 2 },
        { label: "Jacuzzi privata", tone: 3 },
        { label: "Sauna interna", tone: 2 },
      ],
      primaryCta: {
        label: "Chiedi disponibilità",
        href: buildWhatsAppHref(
          "Ciao, vorrei verificare disponibilità per un weekend (zona Agrigento). Date: __/__/__ → __/__/__. Siamo in __. Grazie."
        ),
      },
      secondaryCta: { label: "Guarda le guide", href: "/blog" },
    },
    features: [
      {
        kicker: "Itinerario",
        title: "Scegli 1 tappa. Non 6.",
        body: "Scala dei Turchi o Valle dei Templi. Poi cena e rientro: la parte migliore è la notte in suite.",
        cta: { label: "Guida weekend", href: "/blog/weekend-romantico-agrigento-itinerario-sera-notte" },
        image: { src: "/infinity-letto.jpg", alt: "Rientro in suite: atmosfera serale" },
        tone: 1,
      },
      {
        kicker: "Base",
        title: "Porto Empedocle: comodo e concreto.",
        body: "Ti muovi facile in zona Agrigento. Rientri e chiudi la giornata con jacuzzi privata e sauna interna.",
        cta: { label: "Vedi suites", href: "/suites" },
        image: { src: "/passion-letto-jacuzzi-sauna.jpg", alt: "Suite con jacuzzi privata e sauna interna" },
        tone: 2,
      },
      {
        kicker: "Diretto",
        title: "Disponibilità in 2 minuti.",
        body: "Scrivi date e preferenza. Risposta rapida e conferma semplice.",
        cta: {
          label: "Scrivi su WhatsApp",
          href: buildWhatsAppHref(
            "Ciao, vorrei verificare disponibilità per un weekend (zona Agrigento). Date: __/__/__ → __/__/__. Siamo in __. Grazie."
          ),
        },
        image: { src: "/passion-jacuzzi.jpg", alt: "Jacuzzi privata: relax" },
        tone: 3,
      },
    ],
    theme: {
      bg: "bg-white",
      text: "text-slate-900",
      muted: "text-slate-600",
      border: "border-slate-200",
      card: "bg-white",
      cardBorder: "border-slate-200",
      surface: "bg-emerald-50",
      accent: "text-emerald-700",
      accentSoft: "bg-emerald-50",
      accent2: "text-sky-700",
      accent2Soft: "bg-sky-50",
      accent3: "text-orange-700",
      accent3Soft: "bg-orange-50",
    },
  },
};

export function generateStaticParams() {
  return (Object.keys(VARIANTS) as Variant[]).map((variant) => ({ variant }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ variant: string }>;
}): Promise<Metadata> {
  const { variant } = await params;
  if (!(variant in VARIANTS)) return { robots: { index: false, follow: false } };
  const v = VARIANTS[variant as Variant];

  return {
    title: v.metaTitle,
    description: v.metaDescription,
    alternates: { canonical: `/lp/${variant}` },
    robots: { index: false, follow: true },
    openGraph: {
      type: "website",
      url: `/lp/${variant}`,
      siteName: noir.name,
      locale: "it_IT",
      title: v.metaTitle,
      description: v.metaDescription,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: v.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: v.metaTitle,
      description: v.metaDescription,
      images: ["/opengraph-image"],
    },
  };
}

function Badge({ children, className }: { children: string; className: string }) {
  return (
    <div className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${className}`}>
      {children}
    </div>
  );
}

function toneClass(t: (typeof VARIANTS)[Variant]["theme"], tone: 1 | 2 | 3) {
  if (tone === 1) return `${t.accentSoft} ${t.accent}`;
  if (tone === 2) return `${t.accent2Soft} ${t.accent2}`;
  return `${t.accent3Soft} ${t.accent3}`;
}

function HeroBulletCard({
  t,
  b,
}: {
  t: (typeof VARIANTS)[Variant]["theme"];
  b: (typeof VARIANTS)[Variant]["hero"]["bullets"][number];
}) {
  return (
    <div className={`rounded-[28px] border ${t.border} p-7 sm:p-8 ${toneClass(t, b.tone)}`}>
      <div className="text-lg font-semibold leading-[1.15] tracking-tight sm:text-xl">
        {b.label}
      </div>
    </div>
  );
}

function FeatureRow({
  t,
  f,
  flip,
}: {
  t: (typeof VARIANTS)[Variant]["theme"];
  f: (typeof VARIANTS)[Variant]["features"][number];
  flip: boolean;
}) {
  return (
    <div className={`rounded-[44px] border ${t.border} bg-white p-8 shadow-[0_24px_90px_rgba(15,23,42,0.10)] sm:p-12`}>
      <div className={`grid gap-8 lg:grid-cols-12 lg:items-center ${flip ? "lg:[&>div:first-child]:order-2" : ""}`}>
        <div className="lg:col-span-6">
          <Badge className={toneClass(t, f.tone)}>{f.kicker}</Badge>
          <div className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            {f.title}
          </div>
          <div className={`mt-5 text-lg leading-8 sm:text-xl sm:leading-9 ${t.muted}`}>
            {f.body}
          </div>
          {f.cta ? (
            <div className="mt-7">
              {f.cta.href.startsWith("http") ? (
                <NoirAnchor href={f.cta.href} target="_blank" rel="noreferrer" variant="primary" className="rounded-2xl px-8 py-4 text-base">
                  {f.cta.label}
                </NoirAnchor>
              ) : (
                <NoirLink href={f.cta.href} variant="ghost" className="rounded-2xl bg-slate-100 px-8 py-4 text-base text-slate-900">
                  {f.cta.label}
                </NoirLink>
              )}
            </div>
          ) : null}
        </div>

        <div className="lg:col-span-6">
          <div className={`relative overflow-hidden rounded-[36px] ${t.surface} p-5 sm:p-7`}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-white">
              <Image
                src={encodeURI(f.image.src)}
                alt={f.image.alt}
                fill
                sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className={`pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full ${toneClass(t, f.tone)} opacity-40 blur-3xl`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function LandingVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (!(variant in VARIANTS)) notFound();
  const v = VARIANTS[variant as Variant];

  const t = v.theme;

  return (
    <main className={`${t.bg} ${t.text} min-h-[100svh]`}>
      <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-16">
        <div className="flex items-center justify-between gap-4">
          <NoirLink href="/" variant="ghost" className="rounded-full bg-slate-900 text-white">
            {noir.name}
          </NoirLink>
          <div className="flex items-center gap-2">
            <NoirLink href="/suites" variant="ghost" className="rounded-full bg-slate-100 text-slate-900">
              Suites
            </NoirLink>
            <NoirAnchor href={v.hero.primaryCta.href} target="_blank" rel="noreferrer" variant="primary" className="rounded-full">
              WhatsApp
            </NoirAnchor>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <Badge className={`${t.accentSoft} ${t.accent}`}>{v.hero.kicker}</Badge>
            <h1 className="mt-6 text-6xl font-semibold leading-[1.02] tracking-tight sm:text-8xl">
              {v.hero.h1}
            </h1>
            <p className={`mt-6 text-xl leading-9 sm:text-2xl sm:leading-10 ${t.muted}`}>
              {v.hero.sub}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <NoirAnchor href={v.hero.primaryCta.href} target="_blank" rel="noreferrer" variant="primary" className="w-full justify-center rounded-2xl py-4 text-base sm:w-auto sm:px-10">
                {v.hero.primaryCta.label}
              </NoirAnchor>
              <NoirLink href={v.hero.secondaryCta.href} variant="ghost" className="w-full justify-center rounded-2xl bg-slate-100 py-4 text-base text-slate-900 sm:w-auto sm:px-10">
                {v.hero.secondaryCta.label}
              </NoirLink>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {v.hero.bullets.map((b) => (
                <HeroBulletCard key={b.label} t={t} b={b} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className={`rounded-[44px] border ${t.border} ${t.surface} p-8 sm:p-12`}>
              <div className="grid gap-7 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-5">
                  <div className="text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl">
                    Foto reali.
                  </div>
                  <div className={`mt-4 text-lg leading-8 sm:text-xl sm:leading-9 ${t.muted}`}>
                    Niente “effetto catalogo”. Solo quello che trovi davvero in suite.
                  </div>
                  <div className="mt-7 grid gap-4">
                    <div className={`rounded-[24px] border ${t.border} p-6 ${toneClass(t, 1)}`}>
                      <div className="text-lg font-semibold leading-[1.15] tracking-tight sm:text-xl">
                        {`Da €${noir.startingFrom}/notte`}
                      </div>
                    </div>
                    <div className={`rounded-[24px] border ${t.border} p-6 ${toneClass(t, 2)}`}>
                      <div className="text-lg font-semibold leading-[1.15] tracking-tight sm:text-xl">
                        WhatsApp diretto
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-[32px] bg-white">
                    <Image
                      src={encodeURI("/infinity-letto.jpg")}
                      alt="Suite preview"
                      fill
                      sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 40vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className={`mt-16 rounded-[52px] border ${t.border} ${t.surface} p-8 sm:p-12`}>
          <div className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Gestisci tutto in modo semplice.
          </div>
          <div className={`mt-5 text-lg leading-8 sm:text-xl sm:leading-9 ${t.muted}`}>
            Schede grandi, testi grandi, e contenuto leggibile. Senza atmosfera “dark”.
          </div>
          <div className="mt-10 grid gap-8">
            {v.features.map((f, idx) => (
              <FeatureRow key={`${f.kicker}-${idx}`} t={t} f={f} flip={idx % 2 === 1} />
            ))}
          </div>
        </section>

        <div className="mt-14 rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-9">
          <div className="text-3xl font-semibold tracking-tight">Vuoi sapere cosa è libero?</div>
          <div className={`mt-3 text-base leading-7 ${t.muted}`}>
            Scrivi data e preferenza. Ti rispondiamo in modo diretto.
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <NoirAnchor href={v.hero.primaryCta.href} target="_blank" rel="noreferrer" variant="primary" className="w-full justify-center rounded-2xl py-4 text-base sm:w-auto sm:px-10">
              {v.hero.primaryCta.label}
            </NoirAnchor>
            <NoirLink href="/suites" variant="ghost" className="w-full justify-center rounded-2xl bg-white py-4 text-base text-slate-900 sm:w-auto sm:px-10">
              Vedi Passion e Infinity
            </NoirLink>
          </div>
        </div>
      </div>
    </main>
  );
}

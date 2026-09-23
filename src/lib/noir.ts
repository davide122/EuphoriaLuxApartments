import { Heart, Hotel, Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const noir = {
  name: "Euphoria",
  location: "Porto Empedocle",
  address: "Via Marullo 2, 92014 Porto Empedocle (AG)",
  siteUrl: "https://euphorialuxurysuites.it",
  startingFrom: 150,
  welcomeIncluded: "Aperitivo di benvenuto con tagliere di salumi e una bottiglia di prosecco",
  smartAccess: "Check-in e check-out con tastierino",
  booking: {
    passion:
      "https://www.booking.com/hotel/it/suite-romantica-con-jacuzzi-e-sauna.it.html",
    infinity:
      "https://www.booking.com/hotel/it/infinity-suite-jacuzzi-sauna.it.html",
  },
  contacts: {
    whatsapp: "https://wa.me/393792810506",
    instagram: "https://instagram.com/",
    email: "info@noirsuites.it",
    phone: "+39 379 281 0506",
  },
} as const;

/** 3 pacchetti UFFICIALI: SKU fissi, icone Lucide, prezzi base */
export type PackageSlug = "dayuse" | "pernotto" | "romantic";
export type EuphoriaPackage = {
  slug: PackageSlug;
  name: string;
  tagline: string;
  price: number;
  durationLabel: string;
  icon: LucideIcon;
  iconAccent: string; // classe tailwind per il colore dell'icona
  bullets: readonly [string, string, string, string];
  includesProsecco: boolean;
  suggestedSuite: "passion" | "infinity" | "either";
  highlighted?: boolean;
};

export const packages: readonly EuphoriaPackage[] = [
  {
    slug: "dayuse",
    name: "Euphoria Day Use",
    tagline: "3 ore, proprio quando serve.",
    price: 90,
    durationLabel: "3 ore",
    icon: Sun,
    iconAccent: "text-amber-200",
    bullets: [
      "3 ore in suite Passion o Infinity",
      "Aperitivo di benvenuto + tagliere",
      "Jacuzzi privata e sauna interne",
      "Dalle 10 alle 22, fascia a scelta",
    ],
    includesProsecco: true,
    suggestedSuite: "either",
  },
  {
    slug: "pernotto",
    name: "Euphoria Pernotto",
    tagline: "Una notte. Porta chiusa. Nessuno.",
    price: 150,
    durationLabel: "1 notte",
    icon: Hotel,
    iconAccent: "text-indigo-200",
    bullets: [
      "1 notte in suite Passion o Infinity",
      "Aperitivo di benvenuto + prosecco",
      "Check-in con tastierino · 24h su 24",
      "Colazione opzionale in suite",
    ],
    includesProsecco: true,
    suggestedSuite: "either",
    highlighted: true, // pacchetto di default
  },
  {
    slug: "romantic",
    name: "Euphoria Romantic",
    tagline: "Petali, atmosfera e una sorpresa in più.",
    price: 170,
    durationLabel: "1 notte",
    icon: Heart,
    iconAccent: "text-fuchsia-200",
    bullets: [
      "1 notte in suite Infinity (o Passion su scelta)",
      "Allestimento romantico + petali",
      "Prosecco premium e tagliere deluxe",
      "Dedica personalizzata all'arrivo",
    ],
    includesProsecco: true,
    suggestedSuite: "infinity",
  },
] as const;

/** Alias retrocompatibile: la sezione "Pacchetti" home adesso mostra i 3 pacchetti Ufficiali */
export const romanticPackages = packages;

export const vouchers: readonly (Omit<EuphoriaPackage, "slug"> & {
  slug: "small" | "medium" | "large" | "custom";
  priceLabel?: string;
  suggestedFor: readonly string[];
})[] = [
  {
    slug: "small",
    name: "Euphoria Small",
    tagline: "3 ore in completa privacy. Aperitivo incluso.",
    price: 90,
    durationLabel: "Day Use · 3 ore",
    icon: Sun,
    iconAccent: "text-amber-200",
    bullets: [
      "Day Use 3 ore · Passion o Infinity",
      "Aperitivo di benvenuto",
      "Jacuzzi e sauna private",
      "Valido 12 mesi · 2 persone incluse",
    ],
    includesProsecco: true,
    suggestedSuite: "either",
    suggestedFor: ["mamma e figlia", "2 amiche", "pomeriggio relax"],
  },
  {
    slug: "medium",
    name: "Euphoria Medium",
    tagline: "Una notte intera in suite. Prosecco e tagliere inclusi.",
    price: 150,
    durationLabel: "1 Notte · Passion consigliata",
    icon: Hotel,
    iconAccent: "text-indigo-200",
    bullets: [
      "1 Notte · Suite Passion (55 m²)",
      "Prosecco + tagliere all'arrivo",
      "Jacuzzi privata con LED + sauna",
      "Self check-in con tastierino",
    ],
    includesProsecco: true,
    suggestedSuite: "passion",
    highlighted: true,
    suggestedFor: ["compleanno", "migliore amica", "dopo esami"],
  },
  {
    slug: "large",
    name: "Euphoria Large",
    tagline: "Una notte in Infinity + allestimento romantico.",
    price: 170,
    durationLabel: "1 Notte · Romantic consigliato",
    icon: Heart,
    iconAccent: "text-fuchsia-200",
    bullets: [
      "1 Notte · Suite Infinity (77 m²)",
      "Pacchetto Romantic incluso (petali + atmosfera)",
      "Cucina + living + jacuzzi + sauna",
      "Dedica personalizzabile",
    ],
    includesProsecco: true,
    suggestedSuite: "infinity",
    suggestedFor: ["anniversario", "proposta", "notte di nozze"],
  },
  {
    slug: "custom",
    name: "Euphoria Custom",
    tagline: "Importo e dettagli scelti insieme. Su WhatsApp.",
    price: 0,
    priceLabel: "su misura",
    durationLabel: "A tua scelta",
    icon: Heart,
    iconAccent: "text-purple-200",
    bullets: [
      "Importo personalizzato",
      "Durata a scelta (day use o pernottamento)",
      "Dedica e dettagli illimitati",
      "Conferma via WhatsApp in pochi minuti",
    ],
    includesProsecco: true,
    suggestedSuite: "either",
    suggestedFor: ["premio aziendale", "regalo gruppo", "occasioni speciali"],
  },
] as const;

export type VoucherSlug = (typeof vouchers)[number]["slug"];


export const suites = [
  {
    slug: "passion",
    name: "Passion",
    size: "55 m²",
    mood: "Raccolta, calda, vicina",
    tagline:
      "Un solo ambiente, tutto vicino: il letto, la jacuzzi, la sauna e voi.",
    cover: "/passion/WhatsApp Image 2026-08-16 at 21.29.22.jpeg",
    preview: "/passion/WhatsApp Image 2026-08-16 at 21.29.22 (1).jpeg",
    highlights: [
      "Jacuzzi privata con LED",
      "Sauna interna",
      "Letto king size",
      "Cucina con forno",
    ],
    forWho: "Per chi vuole sentirsi vicino dal primo momento all’ultimo.",
  },
  {
    slug: "infinity",
    name: "Infinity",
    size: "77 m²",
    mood: "Ampia, libera, scenografica",
    tagline:
      "Più spazio per la notte: zona letto, living, cucina e una luce che trasforma tutto.",
    cover: "/infinity/WhatsApp Image 2026-08-16 at 21.29.16 (1).jpeg",
    preview: "/infinity/WhatsApp Image 2026-08-16 at 21.29.16.jpeg",
    highlights: [
      "Jacuzzi privata",
      "Sauna interna",
      "Living + cucina completa",
      "Atmosfera scenografica",
    ],
    forWho: "Per chi vuole cambiare ritmo senza mai uscire dalla suite.",
  },
] as const;

export const galleryFrames = [
  { label: "Passion — letto e jacuzzi", tone: "spa", src: "/passion/WhatsApp Image 2026-08-16 at 21.29.22.jpeg" },
  { label: "Passion — jacuzzi privata", tone: "spa", src: "/passion/WhatsApp Image 2026-08-16 at 21.29.22 (1).jpeg" },
  { label: "Passion — preparazione romantica", tone: "night", src: "/passion/WhatsApp Image 2026-08-16 at 21.29.23.jpeg" },
  { label: "Infinity — sauna privata", tone: "night", src: "/infinity/WhatsApp Image 2026-08-16 at 21.29.15.jpeg" },
  { label: "Infinity — living", tone: "noir", src: "/infinity/WhatsApp Image 2026-08-16 at 21.29.16.jpeg" },
  { label: "Infinity — jacuzzi", tone: "spa", src: "/infinity/WhatsApp Image 2026-08-16 at 21.29.16 (2).jpeg" },
  { label: "Infinity — zona notte", tone: "night", src: "/infinity/WhatsApp Image 2026-08-16 at 21.29.16 (1).jpeg" },
  { label: "Infinity — living e cucina", tone: "noir", src: "/infinity/WhatsApp Image 2026-08-16 at 21.29.16 (4).jpeg" },
] as const;

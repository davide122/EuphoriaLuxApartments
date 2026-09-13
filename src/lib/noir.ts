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

export const romanticPackages = [
  {
    name: "Romantico essenziale",
    price: "€10",
    summary: "Entrate e trovate la suite già pronta ad accogliervi, calda e romantica.",
    bullets: [
      "Petali di rosa",
      "Atmosfera calda al vostro arrivo",
      "Luci e ambientazione già accese",
      "Suite già climatizzata",
    ],
    cta: "Aggiungilo al soggiorno",
  },
  {
    name: "Una sorpresa in più",
    price: "su richiesta",
    summary: "Fiori, torta, una dedica o un dettaglio preciso: raccontateci cosa avete in mente.",
    bullets: [
      "Preparazione prima del vostro arrivo",
      "Dettagli scelti insieme",
      "Soluzioni per anniversari e sorprese",
      "Preventivo diretto su WhatsApp",
    ],
    cta: "Parliamone insieme",
  },
  {
    name: "La vostra idea",
    price: "su richiesta",
    summary: "Non scegliete da un catalogo. Diteci cosa volete far trovare e costruiamo la scena intorno a voi.",
    bullets: [
      "Allestimento personalizzato",
      "Richieste speciali valutate insieme",
      "Tempi e dettagli confermati prima dell’arrivo",
      "Prezzo definito in base alla richiesta",
    ],
    cta: "Raccontateci la vostra idea",
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

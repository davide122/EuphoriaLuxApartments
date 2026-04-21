export const noir = {
  name: "Euphoria",
  location: "Porto Empedocle",
  siteUrl: "https://euphorialuxurysuites.it",
  startingFrom: 135,
  smartAccess: "Smart check-in e smart check-out completamente da soli (tastierino)",
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
    tagline: "La suite più intima. Un lusso vicino, sensuale, silenzioso.",
    cover: "/passion-letto-jacuzzi-sauna.jpg",
    highlights: [
      "Jacuzzi Spa privata con LED",
      "Sauna interna moderna",
      "Cucina completa con forno",
      "Wi‑Fi e condizionatori",
    ],
  },
  {
    slug: "infinity",
    name: "Infinity",
    tagline: "Spazio, luce, design. Un’esperienza ampia e scenografica.",
    cover: "/infinity-letto.jpg",
    highlights: [
      "Illuminazione viola / fucsia / blu",
      "Jacuzzi Spa privata",
      "Cucina completa con forno",
      "Wi‑Fi e condizionatori",
    ],
  },
] as const;

export const experiencePillars = [
  {
    title: "Jacuzzi Spa privata",
    description:
      "Acqua scura, riflessi, led. Un rituale di benessere che ti avvolge.",
  },
  {
    title: "Sauna interna",
    description:
      "Calore elegante, essenziale. Respiri l’aria, sparisce il mondo.",
  },
  {
    title: "Lights experience",
    description:
      "Viola, fucsia, blu e ciano: una regia luminosa pensata per emozionare.",
  },
  {
    title: "Romantic atmosphere",
    description:
      "Spazio, silenzio, pelle. L’intimità diventa design.",
  },
  {
    title: "Design esclusivo",
    description:
      "Marmo chiaro, pavimenti lucidi, dettagli scultorei. Nulla è casuale.",
  },
  {
    title: "Esperienza notturna",
    description:
      "Quando cala la luce, Euphoria si accende. E tu entri nella scena.",
  },
] as const;

export const galleryFrames = [
  { label: "Passion — letto, jacuzzi e sauna", tone: "spa", src: "/passion-letto-jacuzzi-sauna.jpg" },
  { label: "Infinity — letto", tone: "night", src: "/infinity-letto.jpg" },
  { label: "Infinity — cucina completa", tone: "noir", src: "/infinity-cucina.jpg" },
  { label: "Infinity — salotto", tone: "night", src: "/infinity-salotto.jpg" },
  { label: "Passion — jacuzzi privata", tone: "spa", src: "/passion-jacuzzi.jpg" },
  { label: "Infinity — jacuzzi e doccia a vista", tone: "spa", src: "/infinity-jacuzzi-doccia-vista.jpg" },
] as const;

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
    tagline: "Suite intima per coppie, con jacuzzi privata e sauna interna.",
    cover: "/passion-letto-jacuzzi-sauna.jpg",
    highlights: [
      "Jacuzzi privata in suite (uso esclusivo)",
      "Sauna interna moderna",
      "Cucina completa con forno",
      "Wi‑Fi e condizionatori",
    ],
  },
  {
    slug: "infinity",
    name: "Infinity",
    tagline: "Suite più spaziosa, con luci scenografiche e jacuzzi privata.",
    cover: "/infinity-letto.jpg",
    highlights: [
      "Illuminazione viola / fucsia / blu",
      "Jacuzzi privata in suite (uso esclusivo)",
      "Cucina completa con forno",
      "Wi‑Fi e condizionatori",
    ],
  },
] as const;

export const experiencePillars = [
  {
    title: "Jacuzzi Spa privata",
    description:
      "Jacuzzi privata in suite: relax per due, senza spazi condivisi.",
  },
  {
    title: "Sauna interna",
    description:
      "Sauna dentro la suite: benessere completo senza uscire dalla stanza.",
  },
  {
    title: "Lights experience",
    description:
      "Luci d’atmosfera (viola, fucsia, blu e ciano) per una serata più “speciale”.",
  },
  {
    title: "Romantic atmosphere",
    description:
      "Privacy, silenzio e dettagli curati: pensata per coppie.",
  },
  {
    title: "Design esclusivo",
    description:
      "Materiali chiari e finiture curate: una suite moderna, senza eccessi.",
  },
  {
    title: "Esperienza notturna",
    description:
      "Di sera l’atmosfera cambia grazie alle luci e al wellness privato.",
  },
] as const;

export const galleryFrames = [
  { label: "Passion — private spa (letto · jacuzzi · sauna)", tone: "spa", src: "/passion-letto-jacuzzi-sauna.jpg" },
  { label: "Infinity — letto (luci immersive)", tone: "night", src: "/infinity-letto.jpg" },
  { label: "Infinity — cucina completa + forno", tone: "noir", src: "/infinity-cucina.jpg" },
  { label: "Infinity — salotto (design)", tone: "night", src: "/infinity-salotto.jpg" },
  { label: "Passion — jacuzzi privata (LED)", tone: "spa", src: "/passion-jacuzzi.jpg" },
  { label: "Infinity — jacuzzi + doccia a vista", tone: "spa", src: "/infinity-jacuzzi-doccia-vista.jpg" },
] as const;

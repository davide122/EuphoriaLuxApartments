import { noir } from "@/lib/noir";

export type SeoLanding = {
  slug: string;
  primaryKeyword: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  suggestedSuite?: "passion" | "infinity";
  relatedBlogSlugs?: string[];
  hero: {
    eyebrow: string;
    h1: string;
    sub: string;
    image: { src: string; alt: string };
  };
  blocks: Array<{
    title: string;
    body: string;
    bullets?: string[];
  }>;
  faqs: Array<{ q: string; a: string }>;
};

export const SEO_LANDINGS = [
  {
    slug: "suite-romantica-porto-empedocle",
    primaryKeyword: "suite romantica Porto Empedocle",
    title: "Suite romantica a Porto Empedocle",
    suggestedSuite: "passion",
    relatedBlogSlugs: ["suite-romantica-sicilia-cosa-conta-davvero"],
    metaTitle: `Suite romantica a Porto Empedocle con jacuzzi e sauna | ${noir.name}`,
    metaDescription:
      "Una suite luxury per coppie a Porto Empedocle: jacuzzi privata, sauna interna, cucina con forno, Wi‑Fi e condizionatori. Da 135€/notte. Prenotazione diretta via WhatsApp.",
    ogTitle: "Suite romantica a Porto Empedocle — Jacuzzi privata & Sauna interna",
    ogDescription:
      "Euphoria è la scelta per una notte speciale: wellness privato, atmosfera cinematica, arrivo e partenza in autonomia.",
    hero: {
      eyebrow: "Suite Romantica",
      h1: "Suite romantica a Porto Empedocle. Wellness privato. Zero distrazioni.",
      sub: `Jacuzzi privata e sauna interna, luci immersive e comfort completo. Da €${noir.startingFrom}/notte. ${noir.smartAccess}.`,
      image: { src: "/passion-letto-jacuzzi-sauna.jpg", alt: "Suite romantica con jacuzzi privata e sauna" },
    },
    blocks: [
      {
        title: "Per chi è pensata",
        body: "Euphoria nasce per coppie che vogliono intimità reale: una suite da vivere in due, senza spazi condivisi e senza interruzioni.",
        bullets: [
          "Weekend romantico, anniversario, sorpresa",
          "Privacy totale: wellness e atmosfera sono solo tuoi",
          "Prenotazione diretta e risposta rapida su WhatsApp",
        ],
      },
      {
        title: "Cosa rende l’esperienza diversa",
        body: "Non è solo una camera: è una scena. Luci, materiali e silenzio costruiscono un mood sensuale ma elegante, con benessere privato incluso.",
        bullets: ["Jacuzzi Spa privata", "Sauna interna", "Cucina completa con forno"],
      },
      {
        title: "Porto Empedocle e dintorni (idee utili)",
        body: "Se vuoi aggiungere una parte “fuori” all’esperienza, qui sei nella posizione giusta: mare e icone della zona a distanza breve.",
        bullets: ["Scala dei Turchi", "Valle dei Templi (Agrigento)", "Tramonti e passeggiate sul mare"],
      },
    ],
    faqs: [
      {
        q: "La jacuzzi è privata?",
        a: "Sì: è interna alla suite ed è ad uso esclusivo.",
      },
      {
        q: "C’è anche la sauna?",
        a: "Sì: sauna interna moderna, per un percorso wellness completo in privacy.",
      },
      {
        q: "Come funziona l’arrivo?",
        a: noir.smartAccess,
      },
    ],
  },
  {
    slug: "jacuzzi-privata-porto-empedocle",
    primaryKeyword: "jacuzzi privata Porto Empedocle",
    title: "Jacuzzi privata a Porto Empedocle",
    suggestedSuite: "passion",
    relatedBlogSlugs: ["suite-romantica-sicilia-cosa-conta-davvero"],
    metaTitle: `Jacuzzi privata a Porto Empedocle | Suite luxury ${noir.name}`,
    metaDescription:
      "Jacuzzi privata in suite a Porto Empedocle: atmosfera notturna, sauna interna, comfort completo (cucina+forno, Wi‑Fi, condizionatori). Prenota via WhatsApp.",
    ogTitle: "Jacuzzi privata a Porto Empedocle — Suite luxury",
    ogDescription:
      "Rituale di benessere privato: luci immersive, privacy totale e prenotazione diretta via WhatsApp.",
    hero: {
      eyebrow: "Jacuzzi Privata",
      h1: "Jacuzzi privata a Porto Empedocle: la tua Spa, in suite.",
      sub: `Benessere privato, luci e silenzio. Da €${noir.startingFrom}/notte. ${noir.smartAccess}.`,
      image: { src: "/passion-jacuzzi.jpg", alt: "Jacuzzi privata in suite a Porto Empedocle" },
    },
    blocks: [
      {
        title: "Wellness privato (davvero)",
        body: "Niente orari, niente percorsi condivisi. Entri, chiudi la porta e l’esperienza diventa tua: acqua, luce, intimità.",
        bullets: ["Jacuzzi in suite", "Atmosfera LED", "Zero spazi comuni"],
      },
      {
        title: "Comfort completo per restare dentro la scena",
        body: "Quando scegli una suite con jacuzzi privata, la differenza la fanno i dettagli che non ti costringono a uscire: tutto è già lì.",
        bullets: ["Cucina completa con forno", "Wi‑Fi", "Condizionatori"],
      },
      {
        title: "Perché conviene il contatto diretto",
        body: "Scrivendo su WhatsApp ottieni conferma rapida delle date libere e la migliore opzione tra Passion e Infinity, in base al mood che vuoi.",
      },
    ],
    faqs: [
      { q: "È adatta a coppie?", a: "Sì: Euphoria è progettata per fughe romantiche e notti speciali." },
      { q: "La jacuzzi è ad uso esclusivo?", a: "Sì: privata e interna alla suite." },
      { q: "Check-in / check-out?", a: noir.smartAccess },
    ],
  },
  {
    slug: "weekend-romantico-agrigento",
    primaryKeyword: "weekend romantico Agrigento",
    title: "Weekend romantico ad Agrigento (zona)",
    suggestedSuite: "infinity",
    relatedBlogSlugs: ["weekend-romantico-agrigento-itinerario-sera-notte"],
    metaTitle: `Weekend romantico Agrigento: suite con jacuzzi e sauna | ${noir.name}`,
    metaDescription:
      "Idea weekend romantico in zona Agrigento: soggiorna a Porto Empedocle in una suite con jacuzzi privata e sauna interna. Da 135€/notte. Contatto diretto WhatsApp.",
    ogTitle: "Weekend romantico (zona Agrigento) — Jacuzzi & Sauna",
    ogDescription:
      "Dormire a Porto Empedocle e vivere Agrigento: wellness privato, luci immersive e zero stress.",
    hero: {
      eyebrow: "Weekend Romantico",
      h1: "Weekend romantico in zona Agrigento: base perfetta, notte indimenticabile.",
      sub: `Euphoria a Porto Empedocle: jacuzzi privata, sauna interna, design notturno. Da €${noir.startingFrom}/notte. ${noir.smartAccess}.`,
      image: { src: "/infinity-letto.jpg", alt: "Suite luxury per weekend romantico in zona Agrigento" },
    },
    blocks: [
      {
        title: "Il piano semplice (che funziona)",
        body: "Giorno fuori, notte dentro: esplori la zona e rientri in una suite che ti rimette al centro. Il mood non finisce quando rientri.",
        bullets: ["Valle dei Templi", "Scala dei Turchi", "Cena e rientro in Spa privata"],
      },
      {
        title: "Due suite, due mood",
        body: "Passion è più intima. Infinity è più scenografica. Stesso standard Euphoria, stesso benessere privato: scegli la sensazione.",
      },
      {
        title: "Prenotazione diretta (WhatsApp)",
        body: "Scrivi data e preferenza: confermiamo disponibilità e ti guidiamo nella scelta migliore per il tuo weekend.",
      },
    ],
    faqs: [
      { q: "È lontano da Agrigento?", a: "Porto Empedocle è in zona Agrigento: posizione comoda per muoversi tra mare e siti iconici." },
      { q: "La sauna è inclusa?", a: "Sì: sauna interna in suite." },
      { q: "Arrivo e partenza?", a: noir.smartAccess },
    ],
  },
  {
    slug: "suite-con-sauna-sicilia",
    primaryKeyword: "suite con sauna Sicilia",
    title: "Suite con sauna in Sicilia",
    suggestedSuite: "passion",
    relatedBlogSlugs: ["suite-romantica-sicilia-cosa-conta-davvero"],
    metaTitle: `Suite con sauna in Sicilia | Jacuzzi privata e luxury mood | ${noir.name}`,
    metaDescription:
      "Suite con sauna interna in Sicilia (Porto Empedocle): aggiungi jacuzzi privata e atmosfera notturna. Comfort completo e prenotazione diretta su WhatsApp.",
    ogTitle: "Suite con sauna in Sicilia — Privacy totale",
    ogDescription:
      "Calore, silenzio e design: un’esperienza per coppie, con arrivo e partenza in autonomia.",
    hero: {
      eyebrow: "Suite con Sauna",
      h1: "Suite con sauna in Sicilia: intimità, calore, benessere privato.",
      sub: `Sauna interna + jacuzzi privata. Da €${noir.startingFrom}/notte. ${noir.smartAccess}.`,
      image: { src: "/passion-letto-jacuzzi-sauna.jpg", alt: "Suite con sauna interna in Sicilia" },
    },
    blocks: [
      {
        title: "Sauna interna: il dettaglio che cambia tutto",
        body: "Il benessere è più profondo quando è privato. La sauna è dentro la suite: nessun percorso comune, solo il tuo ritmo.",
        bullets: ["Sauna interna moderna", "Perfetta per coppie", "Relax senza uscire dalla suite"],
      },
      {
        title: "Aggiungi la jacuzzi: percorso completo",
        body: "Calore e acqua si completano. Se cerchi una vera esperienza wellness, qui hai entrambi, nella stessa suite.",
        bullets: ["Jacuzzi Spa privata", "Luci immersive", "Atmosfera romantica"],
      },
      {
        title: "Comfort che non interrompe il mood",
        body: "Resti dentro la scena grazie a comfort reali: cucina completa con forno, Wi‑Fi e condizionatori in entrambe le suite.",
      },
    ],
    faqs: [
      { q: "La sauna è sempre privata?", a: "Sì: interna alla suite ed esclusiva." },
      { q: "È adatta anche d’estate?", a: "Sì: condizionatori inclusi, per comfort totale in ogni stagione." },
      { q: "Come prenoto?", a: "WhatsApp è il modo più rapido: scrivi date e preferenza." },
    ],
  },
  {
    slug: "suite-vicino-scala-dei-turchi",
    primaryKeyword: "suite vicino Scala dei Turchi",
    title: "Suite vicino Scala dei Turchi",
    suggestedSuite: "infinity",
    relatedBlogSlugs: ["weekend-romantico-agrigento-itinerario-sera-notte"],
    metaTitle: `Suite vicino Scala dei Turchi con jacuzzi privata | ${noir.name}`,
    metaDescription:
      "Vuoi dormire vicino Scala dei Turchi? Soggiorna a Porto Empedocle in una suite luxury con jacuzzi privata e sauna interna. Da 135€/notte. Prenotazione diretta WhatsApp.",
    ogTitle: "Suite vicino Scala dei Turchi — Jacuzzi privata & Sauna",
    ogDescription:
      "Giornata tra mare e luce, notte in wellness privato. Prenota diretto via WhatsApp.",
    hero: {
      eyebrow: "Scala dei Turchi",
      h1: "Suite vicino Scala dei Turchi: mare fuori, wellness privato dentro.",
      sub: `Base comoda per la zona, notte che vale il viaggio. Da €${noir.startingFrom}/notte. ${noir.smartAccess}.`,
      image: { src: "/infinity-letto.jpg", alt: "Suite vicino Scala dei Turchi con jacuzzi privata" },
    },
    blocks: [
      {
        title: "Posizione pratica per la zona",
        body: "Porto Empedocle ti mette vicino alle esperienze più iconiche della costa. Il valore aggiunto è rientrare in una suite che non spegne l’emozione, la amplifica.",
        bullets: ["Scala dei Turchi", "Mare e tramonti", "Rientro in spa privata"],
      },
      {
        title: "Il finale perfetto della giornata",
        body: "Dopo il mare, la sera cambia ritmo: jacuzzi privata e sauna interna, senza spazi condivisi, senza orari da inseguire.",
        bullets: ["Jacuzzi privata", "Sauna interna", "Zero spazi comuni"],
      },
      {
        title: "Prenotazione diretta (WhatsApp)",
        body: "Scrivi le date e l’occasione: ti diciamo disponibilità e la suite più adatta tra Passion e Infinity.",
      },
    ],
    faqs: [
      { q: "È una suite con jacuzzi privata?", a: "Sì: jacuzzi interna alla suite, ad uso esclusivo." },
      { q: "C’è la sauna?", a: "Sì: sauna interna moderna." },
      { q: "Arrivo e partenza?", a: noir.smartAccess },
    ],
  },
  {
    slug: "suite-vicino-valle-dei-templi",
    primaryKeyword: "suite vicino Valle dei Templi",
    title: "Suite vicino Valle dei Templi",
    suggestedSuite: "infinity",
    relatedBlogSlugs: ["weekend-romantico-agrigento-itinerario-sera-notte"],
    metaTitle: `Suite vicino Valle dei Templi: weekend romantico (zona Agrigento) | ${noir.name}`,
    metaDescription:
      "Cerchi una suite vicino Valle dei Templi? Soggiorna a Porto Empedocle: jacuzzi privata, sauna interna, comfort completo e prenotazione diretta WhatsApp.",
    ogTitle: "Suite vicino Valle dei Templi — Jacuzzi privata & Sauna",
    ogDescription:
      "Giorno tra bellezza e storia, notte in wellness privato. Prenota diretto via WhatsApp.",
    hero: {
      eyebrow: "Valle dei Templi",
      h1: "Suite vicino Valle dei Templi: vivi Agrigento, poi rientra nella tua scena.",
      sub: `La parte migliore è la notte: jacuzzi privata e sauna interna in totale privacy. Da €${noir.startingFrom}/notte. ${noir.smartAccess}.`,
      image: { src: "/passion-letto-jacuzzi-sauna.jpg", alt: "Suite vicino Valle dei Templi con jacuzzi privata e sauna" },
    },
    blocks: [
      {
        title: "Giorno fuori, notte dentro",
        body: "La Valle dei Templi è un’esperienza intensa. La differenza la fa come chiudi la giornata: in una suite che ti rimette al centro, senza rumore e senza frizioni.",
        bullets: ["Valle dei Templi (Agrigento)", "Cena lenta", "Rientro in spa privata"],
      },
      {
        title: "Wellness privato per coppie",
        body: "Jacuzzi privata e sauna interna sono il tuo rituale. Nessun orario, nessuna condivisione: solo il tuo ritmo.",
        bullets: ["Jacuzzi privata", "Sauna interna", "Atmosfera notturna"],
      },
      {
        title: "Contatto diretto: più semplice",
        body: "WhatsApp è il modo più rapido per confermare date e scegliere la suite giusta tra Passion e Infinity.",
      },
    ],
    faqs: [
      { q: "Quanto dista dalla zona Agrigento?", a: "Porto Empedocle è in zona Agrigento: posizione comoda per muoversi." },
      { q: "Wi‑Fi e condizionatori?", a: "Sì: inclusi in entrambe le suite." },
      { q: "Come funziona l’accesso?", a: noir.smartAccess },
    ],
  },
  {
    slug: "weekend-romantico-porto-empedocle",
    primaryKeyword: "weekend romantico Porto Empedocle",
    title: "Weekend romantico a Porto Empedocle",
    suggestedSuite: "passion",
    relatedBlogSlugs: ["suite-romantica-sicilia-cosa-conta-davvero"],
    metaTitle: `Weekend romantico a Porto Empedocle: suite con jacuzzi privata | ${noir.name}`,
    metaDescription:
      "Weekend romantico a Porto Empedocle: scegli una suite luxury con jacuzzi privata e sauna interna. Da 135€/notte. Prenotazione diretta via WhatsApp.",
    ogTitle: "Weekend romantico a Porto Empedocle — Jacuzzi privata & Sauna",
    ogDescription:
      "Un piano semplice: mare, silenzio e wellness privato. Prenota diretto su WhatsApp.",
    hero: {
      eyebrow: "Weekend Romantico",
      h1: "Weekend romantico a Porto Empedocle: la fuga perfetta, senza stress.",
      sub: `Jacuzzi privata, sauna interna, comfort completo. Da €${noir.startingFrom}/notte. ${noir.smartAccess}.`,
      image: { src: "/passion-letto-jacuzzi-sauna.jpg", alt: "Weekend romantico a Porto Empedocle in suite con jacuzzi privata" },
    },
    blocks: [
      {
        title: "La regola: togli il superfluo",
        body: "Un weekend romantico funziona quando non devi correre. Qui hai tutto per restare dentro la scena: privacy, benessere e dettagli reali.",
        bullets: ["Jacuzzi privata", "Sauna interna", "Zero spazi condivisi"],
      },
      {
        title: "Comfort che sostiene l’esperienza",
        body: "Cucina completa con forno, Wi‑Fi e condizionatori: resti libero, senza interrompere il mood.",
        bullets: ["Cucina completa con forno", "Wi‑Fi", "Condizionatori"],
      },
      {
        title: "Prenota diretto (WhatsApp)",
        body: "Scrivi le date e l’occasione: confermiamo disponibilità e scegliamo insieme tra Passion e Infinity.",
      },
    ],
    faqs: [
      { q: "È adatto a coppie?", a: "Sì: Euphoria è pensata per fughe romantiche e notti speciali." },
      { q: "Le suite sono indipendenti?", a: "Sì: zero spazi condivisi." },
      { q: "Arrivo e partenza?", a: noir.smartAccess },
    ],
  },
] satisfies SeoLanding[];

export const SEO_LANDINGS_BY_SLUG: Record<string, SeoLanding> = Object.fromEntries(
  SEO_LANDINGS.map((l) => [l.slug, l])
);

export type BlogPost = {
  slug: string;
  primaryKeyword: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  datePublishedISO: string;
  dateModifiedISO?: string;
  relatedLandingSlugs?: string[];
  heroImage: { src: string; alt: string };
  sections: Array<{ title: string; body: string; bullets?: string[] }>;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "suite-romantica-sicilia-cosa-conta-davvero",
    primaryKeyword: "suite romantica Sicilia",
    title: "Suite romantica in Sicilia: cosa conta davvero (e cosa evitare)",
    metaTitle: `Suite romantica in Sicilia: checklist luxury per coppie | ${noir.name}`,
    metaDescription:
      "Guida concreta per scegliere una suite romantica in Sicilia: privacy reale, jacuzzi privata, sauna interna e comfort. Prenotazione diretta via WhatsApp.",
    excerpt:
      "Una guida pratica per coppie: i segnali che una suite è davvero “romantica” e luxury (non solo nelle foto).",
    datePublishedISO: "2026-04-21",
    relatedLandingSlugs: ["suite-romantica-porto-empedocle", "jacuzzi-privata-porto-empedocle", "suite-con-sauna-sicilia"],
    heroImage: { src: "/infinity-letto.jpg", alt: "Suite romantica in Sicilia: atmosfera luxury" },
    sections: [
      {
        title: "Privacy reale (non “quasi privata”)",
        body: "Per una fuga romantica, il punto è uno: niente spazi condivisi e nessuna sensazione di struttura “affollata”.",
        bullets: ["Accessi chiari", "Spazi esclusivi", "Wellness dentro la suite"],
      },
      {
        title: "Wellness privato: jacuzzi + sauna fanno la differenza",
        body: "Una jacuzzi privata crea l’esperienza. Una sauna interna la completa. Non è un extra: è ciò che rende memorabile la notte.",
      },
      {
        title: "Comfort che sostiene il mood",
        body: "Cucina completa con forno, Wi‑Fi e condizionatori non sono dettagli: servono a non interrompere la tua esperienza.",
      },
    ],
  },
  {
    slug: "weekend-romantico-agrigento-itinerario-sera-notte",
    primaryKeyword: "weekend romantico Agrigento",
    title: "Weekend romantico in zona Agrigento: itinerario semplice (sera + notte)",
    metaTitle: `Weekend romantico Agrigento: itinerario e suite con jacuzzi | ${noir.name}`,
    metaDescription:
      "Itinerario concreto per un weekend romantico in zona Agrigento: cosa fare di giorno e come chiudere la serata in una suite con jacuzzi privata e sauna.",
    excerpt:
      "Un piano senza stress: scegli 1-2 esperienze fuori e tieni il cuore del weekend dentro la suite.",
    datePublishedISO: "2026-04-21",
    relatedLandingSlugs: ["weekend-romantico-agrigento", "suite-vicino-valle-dei-templi", "suite-vicino-scala-dei-turchi"],
    heroImage: { src: "/passion-letto-jacuzzi-sauna.jpg", alt: "Weekend romantico: jacuzzi e sauna in suite" },
    sections: [
      {
        title: "Scegli 1 highlight, non 6 tappe",
        body: "Per un weekend romantico, meno è meglio. L’obiettivo è arrivare a sera con energia e tempo per voi due.",
        bullets: ["Valle dei Templi", "Scala dei Turchi", "Cena lenta"],
      },
      {
        title: "La sera: chiudi la porta e cambia scena",
        body: "Rientrare in una suite con jacuzzi privata significa non “tornare in camera”, ma iniziare il momento più importante.",
      },
    ],
  },
];

export const BLOG_POSTS_BY_SLUG: Record<string, BlogPost> = Object.fromEntries(
  BLOG_POSTS.map((p) => [p.slug, p])
);

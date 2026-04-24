import { noir } from "@/lib/noir";

export type SeoLanding = {
  slug: string;
  primaryKeyword: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  dateModifiedISO?: string;
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
    dateModifiedISO: "2026-04-24",
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
    dateModifiedISO: "2026-04-24",
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
    slug: "spa-porto-empedocle",
    primaryKeyword: "spa privata Porto Empedocle",
    title: "SPA privata a Porto Empedocle con jacuzzi e sauna",
    dateModifiedISO: "2026-04-24",
    suggestedSuite: "passion",
    relatedBlogSlugs: [
      "spa-privata-porto-empedocle-coppie",
      "spa-privata-agrigento-dove-andare",
      "suite-con-idromassaggio-porto-empedocle",
      "weekend-scala-dei-turchi-suite-spa",
      "prenotare-suite-spa-whatsapp",
    ],
    metaTitle: `SPA privata a Porto Empedocle con jacuzzi e sauna | ${noir.name}`,
    metaDescription:
      "Vivi un’esperienza SPA privata a Porto Empedocle. Suite con jacuzzi idromassaggio e sauna ad uso esclusivo, perfetta per coppie. In zona Agrigento (Scala dei Turchi, Valle dei Templi). Da 135€/notte. Prenotazione diretta via WhatsApp.",
    ogTitle: "SPA privata a Porto Empedocle — Jacuzzi & Sauna ad uso esclusivo",
    ogDescription:
      "Suite SPA privata per coppie: idromassaggio, sauna interna, privacy totale e prenotazione diretta via WhatsApp.",
    hero: {
      eyebrow: "SPA Privata",
      h1: "SPA privata a Porto Empedocle con jacuzzi e sauna",
      sub: `Vivi un’esperienza SPA privata a Porto Empedocle. Suite con jacuzzi idromassaggio e sauna ad uso esclusivo, perfetta per coppie. Zona Agrigento. Da €${noir.startingFrom}/notte. ${noir.smartAccess}.`,
      image: { src: "/passion-jacuzzi.jpg", alt: "SPA privata a Porto Empedocle con jacuzzi idromassaggio e sauna" },
    },
    blocks: [
      {
        title: "SPA privata (senza condivisione)",
        body: "Se cerchi una SPA privata a Porto Empedocle, qui il concetto è semplice: benessere dentro la suite. Jacuzzi idromassaggio e sauna interna sono solo tue, senza spazi comuni.",
        bullets: ["Jacuzzi idromassaggio ad uso esclusivo", "Sauna interna in suite", "Privacy totale per coppie"],
      },
      {
        title: "Porto Empedocle (zona Agrigento): posizione comoda",
        body: "Se vuoi aggiungere mare e luoghi iconici, sei in una base pratica per muoverti in zona Agrigento. Il valore è rientrare e chiudere la porta: la serata continua in wellness privato.",
        bullets: ["Scala dei Turchi", "Valle dei Templi (Agrigento)", "Tramonti sul mare"],
      },
      {
        title: "Prenota diretto: più veloce",
        body: "Scrivi su WhatsApp con le date: confermiamo disponibilità e ti consigliamo la suite migliore tra Passion e Infinity in base al mood che vuoi.",
      },
    ],
    faqs: [
      { q: "Jacuzzi e sauna sono ad uso esclusivo?", a: "Sì: sono interne alla suite e private." },
      { q: "È adatta a coppie?", a: "Sì: è pensata per fughe romantiche e notti speciali." },
      { q: "Check-in / check-out?", a: noir.smartAccess },
    ],
  },
  {
    slug: "weekend-romantico-agrigento",
    primaryKeyword: "weekend romantico Agrigento",
    title: "Weekend romantico ad Agrigento (zona)",
    dateModifiedISO: "2026-04-24",
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
    dateModifiedISO: "2026-04-24",
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
    dateModifiedISO: "2026-04-24",
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
    dateModifiedISO: "2026-04-24",
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
    dateModifiedISO: "2026-04-24",
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
    relatedLandingSlugs: [
      "suite-romantica-porto-empedocle",
      "jacuzzi-privata-porto-empedocle",
      "spa-porto-empedocle",
      "suite-con-sauna-sicilia",
    ],
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
    relatedLandingSlugs: [
      "spa-porto-empedocle",
      "weekend-romantico-agrigento",
      "suite-vicino-valle-dei-templi",
      "suite-vicino-scala-dei-turchi",
    ],
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
  {
    slug: "spa-privata-porto-empedocle-coppie",
    primaryKeyword: "spa privata Porto Empedocle",
    title: "SPA privata a Porto Empedocle: guida rapida per coppie (jacuzzi + sauna)",
    metaTitle: `SPA privata Porto Empedocle: jacuzzi e sauna ad uso esclusivo | ${noir.name}`,
    metaDescription:
      "Cerchi una SPA privata a Porto Empedocle? Guida concreta: cosa significa davvero “privata”, perché scegliere una suite con jacuzzi idromassaggio e sauna, e come prenotare diretto via WhatsApp.",
    excerpt:
      "Se vuoi una SPA privata vera (non un centro benessere condiviso), ecco come scegliere in modo semplice e diretto.",
    datePublishedISO: "2026-04-24",
    relatedLandingSlugs: ["spa-porto-empedocle", "jacuzzi-privata-porto-empedocle", "suite-con-sauna-sicilia"],
    heroImage: { src: "/passion-jacuzzi.jpg", alt: "SPA privata a Porto Empedocle in suite con jacuzzi e sauna" },
    sections: [
      {
        title: "Cosa vuol dire davvero “SPA privata”",
        body: "Privata significa una cosa sola: nessuna condivisione. Jacuzzi idromassaggio e sauna sono dentro la suite, quindi non incroci nessuno e non segui orari.",
        bullets: ["Niente turni", "Niente spazi comuni", "Ritmo tuo (e della coppia)"],
      },
      {
        title: "Jacuzzi + sauna: combo completa",
        body: "L’acqua rilassa, il calore completa. Per una notte che si ricorda, la combinazione è più importante della “vista” o di una lista infinita di servizi.",
        bullets: ["Jacuzzi idromassaggio", "Sauna interna", "Atmosfera notturna"],
      },
      {
        title: "Porto Empedocle (zona Agrigento): perché conviene",
        body: "Se vuoi anche una parte “fuori”, sei vicino alle mete più iconiche della zona. La differenza la fa il rientro: il momento clou diventa la suite.",
      },
      {
        title: "Prenota diretto su WhatsApp",
        body: "Scrivi date e preferenza (Passion o Infinity): ti confermiamo disponibilità e ti guidiamo nella scelta. Meno passaggi, più veloce.",
      },
    ],
  },
  {
    slug: "spa-privata-agrigento-dove-andare",
    primaryKeyword: "spa privata Agrigento",
    title: "SPA privata in zona Agrigento: come scegliere (senza fregature)",
    metaTitle: `SPA privata Agrigento: guida per coppie (jacuzzi e sauna) | ${noir.name}`,
    metaDescription:
      "SPA privata in zona Agrigento: differenza tra spa condivisa e suite spa privata, quali dettagli contano (jacuzzi idromassaggio e sauna interna), e perché Porto Empedocle è una base comoda.",
    excerpt:
      "Vuoi una spa privata vicino Agrigento? Ecco cosa controllare prima di prenotare, senza giri di parole.",
    datePublishedISO: "2026-04-24",
    relatedLandingSlugs: ["spa-porto-empedocle", "weekend-romantico-agrigento", "suite-vicino-valle-dei-templi"],
    heroImage: { src: "/passion-letto-jacuzzi-sauna.jpg", alt: "SPA privata in zona Agrigento con jacuzzi e sauna" },
    sections: [
      {
        title: "Prima regola: privata ≠ “a turni”",
        body: "Se devi scegliere un orario e condividi spazi, non è privata. Una suite spa privata ti dà accesso esclusivo: jacuzzi e sauna sono nella tua stanza.",
      },
      {
        title: "I 3 dettagli che contano davvero",
        body: "Per coppie, servono poche cose fatte bene: privacy reale, benessere completo (acqua + calore) e comfort che non interrompe il mood.",
        bullets: ["Jacuzzi idromassaggio in suite", "Sauna interna", "Zero spazi condivisi"],
      },
      {
        title: "Dove dormire per muoversi in zona Agrigento",
        body: "Porto Empedocle è pratico per Scala dei Turchi e Valle dei Templi. Ma la scelta giusta è quella che rende anche la notte un’esperienza.",
      },
    ],
  },
  {
    slug: "suite-con-idromassaggio-porto-empedocle",
    primaryKeyword: "suite con idromassaggio Porto Empedocle",
    title: "Suite con idromassaggio a Porto Empedocle: cosa aspettarsi (jacuzzi privata)",
    metaTitle: `Suite con idromassaggio Porto Empedocle: jacuzzi privata + sauna | ${noir.name}`,
    metaDescription:
      "Suite con idromassaggio a Porto Empedocle: differenza tra idromassaggio e jacuzzi spa, cosa controllare (privacy, sauna interna, comfort), e come prenotare diretto via WhatsApp.",
    excerpt:
      "Idromassaggio in camera: bello. Idromassaggio privato con sauna e atmosfera: meglio. Ecco i punti chiave.",
    datePublishedISO: "2026-04-24",
    relatedLandingSlugs: ["spa-porto-empedocle", "jacuzzi-privata-porto-empedocle", "suite-con-sauna-sicilia"],
    heroImage: { src: "/passion-jacuzzi.jpg", alt: "Suite con idromassaggio a Porto Empedocle" },
    sections: [
      {
        title: "Idromassaggio: la domanda giusta è “è privato?”",
        body: "Molte offerte parlano di idromassaggio, ma la differenza è la privacy: se è dentro la suite e ad uso esclusivo, cambia tutto.",
      },
      {
        title: "Jacuzzi spa + sauna: esperienza completa",
        body: "Per coppie, acqua e calore sono un percorso. Sauna interna significa non interrompere l’esperienza e non uscire dalla tua scena.",
        bullets: ["Jacuzzi spa privata", "Sauna interna moderna", "Atmosfera notturna"],
      },
      {
        title: "Comfort che evita “uscite” inutili",
        body: "Cucina completa con forno, Wi‑Fi e condizionatori servono a tenere fluida la serata. Non sono extra: sono parte dell’esperienza.",
      },
    ],
  },
  {
    slug: "centro-benessere-privato-porto-empedocle",
    primaryKeyword: "centro benessere privato Porto Empedocle",
    title: "Centro benessere privato a Porto Empedocle? Meglio una suite SPA privata",
    metaTitle: `Centro benessere privato Porto Empedocle: alternativa migliore | ${noir.name}`,
    metaDescription:
      "Centro benessere privato a Porto Empedocle: se vuoi davvero privacy, la soluzione più semplice è una suite SPA privata con jacuzzi idromassaggio e sauna interna, senza spazi comuni e senza turni.",
    excerpt:
      "Se l’obiettivo è privacy totale, spesso una suite spa privata batte un “centro benessere” a turni.",
    datePublishedISO: "2026-04-24",
    relatedLandingSlugs: ["spa-porto-empedocle", "jacuzzi-privata-porto-empedocle"],
    heroImage: { src: "/infinity-letto.jpg", alt: "Suite SPA privata a Porto Empedocle" },
    sections: [
      {
        title: "Il problema dei “turni”",
        body: "Anche quando è “privato”, spesso è privato per un’ora. Se vuoi una notte intera, la suite spa privata è un’altra cosa.",
        bullets: ["Niente orari", "Niente uscita dopo 60 minuti", "Esperienza continua"],
      },
      {
        title: "Suite spa privata: cosa cambia davvero",
        body: "Jacuzzi idromassaggio e sauna interna sono dentro la suite: si passa da “servizio” a “scenario”.",
      },
      {
        title: "Per coppie: la privacy è il lusso",
        body: "Zero spazi condivisi e accesso autonomo rendono tutto più semplice e più intimo.",
      },
    ],
  },
  {
    slug: "suite-con-sauna-agrigento",
    primaryKeyword: "suite con sauna Agrigento",
    title: "Suite con sauna in zona Agrigento: perché sceglierla (e cosa controllare)",
    metaTitle: `Suite con sauna Agrigento: guida rapida per coppie | ${noir.name}`,
    metaDescription:
      "Suite con sauna in zona Agrigento: perché la sauna interna fa la differenza, come abbinarla a una jacuzzi privata, e perché Porto Empedocle è una base comoda per muoversi tra mare e Valle dei Templi.",
    excerpt:
      "La sauna interna cambia il livello dell’esperienza: ecco cosa controllare e come evitare scelte “mezze”.",
    datePublishedISO: "2026-04-24",
    relatedLandingSlugs: ["spa-porto-empedocle", "suite-con-sauna-sicilia", "suite-vicino-valle-dei-templi"],
    heroImage: { src: "/passion-letto-jacuzzi-sauna.jpg", alt: "Suite con sauna in zona Agrigento" },
    sections: [
      {
        title: "Sauna interna: benessere senza uscire",
        body: "Se la sauna è dentro la suite, non spegni l’esperienza: niente corridoi, niente aree comuni, niente interruzioni.",
      },
      {
        title: "La combo ideale: sauna + jacuzzi privata",
        body: "Calore e acqua sono il percorso completo. È il modo più semplice per trasformare una notte in un ricordo.",
        bullets: ["Sauna interna", "Jacuzzi privata", "Privacy totale"],
      },
      {
        title: "Zona Agrigento: giorno fuori, notte dentro",
        body: "Valle dei Templi e costa sono a portata. La vera differenza è come finisce la giornata: in wellness privato.",
      },
    ],
  },
  {
    slug: "suite-con-jacuzzi-agrigento",
    primaryKeyword: "suite con jacuzzi Agrigento",
    title: "Suite con jacuzzi in zona Agrigento: come scegliere (Porto Empedocle)",
    metaTitle: `Suite con jacuzzi Agrigento: guida pratica (privacy + sauna) | ${noir.name}`,
    metaDescription:
      "Suite con jacuzzi in zona Agrigento: cosa cercare davvero (jacuzzi privata in suite, sauna interna, zero spazi condivisi) e perché Porto Empedocle è comoda per la zona.",
    excerpt:
      "La parola “jacuzzi” la usano in tanti. Qui trovi i criteri che contano davvero per coppie.",
    datePublishedISO: "2026-04-24",
    relatedLandingSlugs: ["spa-porto-empedocle", "weekend-romantico-agrigento", "jacuzzi-privata-porto-empedocle"],
    heroImage: { src: "/passion-jacuzzi.jpg", alt: "Suite con jacuzzi in zona Agrigento" },
    sections: [
      {
        title: "Jacuzzi privata in suite: il criterio numero uno",
        body: "Non basta che “ci sia”. Deve essere interna alla suite e ad uso esclusivo: è questo che rende l’esperienza davvero privata.",
      },
      {
        title: "Se c’è anche la sauna, è un’altra categoria",
        body: "Sauna interna = percorso completo. È il dettaglio che fa passare da “camera carina” a “spa privata”.",
      },
      {
        title: "Porto Empedocle come base",
        body: "Zona Agrigento: sei vicino a mare e luoghi iconici. Il punto è rientrare e continuare la serata in privacy totale.",
      },
    ],
  },
  {
    slug: "weekend-scala-dei-turchi-suite-spa",
    primaryKeyword: "weekend Scala dei Turchi",
    title: "Weekend alla Scala dei Turchi: mare di giorno, SPA privata di notte",
    metaTitle: `Weekend Scala dei Turchi: itinerario + suite spa privata | ${noir.name}`,
    metaDescription:
      "Weekend alla Scala dei Turchi: idea semplice per coppie. Esplora la costa di giorno e chiudi la serata in una SPA privata a Porto Empedocle con jacuzzi idromassaggio e sauna interna.",
    excerpt:
      "Un weekend che funziona davvero: una sola esperienza fuori e una notte in spa privata dentro la suite.",
    datePublishedISO: "2026-04-24",
    relatedLandingSlugs: ["spa-porto-empedocle", "suite-vicino-scala-dei-turchi", "weekend-romantico-porto-empedocle"],
    heroImage: { src: "/infinity-letto.jpg", alt: "Weekend Scala dei Turchi con spa privata in suite" },
    sections: [
      {
        title: "Il piano: non riempire la giornata",
        body: "Scegli un momento clou (Scala dei Turchi) e lascia spazio alla sera. L’obiettivo è arrivare in suite con energia.",
        bullets: ["Mare", "Tramonto", "Cena lenta"],
      },
      {
        title: "La notte: spa privata in suite",
        body: "Jacuzzi idromassaggio e sauna interna trasformano la notte nel vero punto forte del weekend.",
        bullets: ["Jacuzzi privata", "Sauna interna", "Zero spazi comuni"],
      },
      {
        title: "Prenotazione diretta",
        body: "WhatsApp è il modo più rapido: date, occasione e preferenza. Risposta rapida.",
      },
    ],
  },
  {
    slug: "cosa-fare-porto-empedocle-coppia-sera",
    primaryKeyword: "cosa fare Porto Empedocle coppia",
    title: "Cosa fare a Porto Empedocle la sera (in coppia): piano semplice + suite spa",
    metaTitle: `Cosa fare Porto Empedocle in coppia: sera + spa privata | ${noir.name}`,
    metaDescription:
      "Cosa fare a Porto Empedocle la sera in coppia: un piano semplice (passeggiata, cena, rientro) e il finale migliore in una suite spa privata con jacuzzi e sauna ad uso esclusivo.",
    excerpt:
      "Se vuoi una serata romantica senza stress, ecco un piano rapido con un finale che vale più di mille tappe.",
    datePublishedISO: "2026-04-24",
    relatedLandingSlugs: ["spa-porto-empedocle", "weekend-romantico-porto-empedocle", "suite-romantica-porto-empedocle"],
    heroImage: { src: "/passion-letto-jacuzzi-sauna.jpg", alt: "Serata in coppia a Porto Empedocle con suite spa privata" },
    sections: [
      {
        title: "1) Passeggiata al mare + tramonto",
        body: "Una cosa sola fatta bene: aria, luce e tempo. Non serve correre.",
      },
      {
        title: "2) Cena lenta",
        body: "Scegli un posto tranquillo e non complicarti la logistica: il momento migliore deve ancora arrivare.",
      },
      {
        title: "3) Rientro in spa privata",
        body: "Chiudi la porta e cambia scena: jacuzzi idromassaggio, sauna interna, privacy totale. È qui che la serata diventa memorabile.",
      },
    ],
  },
  {
    slug: "regalo-spa-privata-agrigento",
    primaryKeyword: "regalo spa privata Agrigento",
    title: "Regalo SPA privata in zona Agrigento: idea semplice (suite con jacuzzi e sauna)",
    metaTitle: `Regalo spa privata Agrigento: suite con jacuzzi e sauna | ${noir.name}`,
    metaDescription:
      "Regalo SPA privata in zona Agrigento: un’idea che funziona per anniversario e sorpresa. Suite con jacuzzi idromassaggio e sauna interna ad uso esclusivo a Porto Empedocle. Prenotazione diretta WhatsApp.",
    excerpt:
      "Se vuoi fare un regalo che non resta “carino”: una notte in spa privata è un colpo sicuro.",
    datePublishedISO: "2026-04-24",
    relatedLandingSlugs: ["spa-porto-empedocle", "weekend-romantico-agrigento", "suite-romantica-porto-empedocle"],
    heroImage: { src: "/infinity-letto.jpg", alt: "Regalo spa privata in zona Agrigento" },
    sections: [
      {
        title: "Perché una notte in spa privata batte un oggetto",
        body: "Un’esperienza resta. Una suite con jacuzzi e sauna crea un ricordo immediato e condiviso.",
      },
      {
        title: "Cosa scrivere su WhatsApp per prenotare",
        body: "Date, occasione e preferenza (più intima o più scenografica). Ti diciamo disponibilità e opzione migliore.",
        bullets: ["Date", "Occasione", "Passion o Infinity"],
      },
      {
        title: "Il dettaglio che fa la differenza: privacy",
        body: "Niente spazi condivisi e accesso autonomo rendono tutto più semplice e più “senza frizioni”.",
      },
    ],
  },
  {
    slug: "prenotare-suite-spa-whatsapp",
    primaryKeyword: "prenotazione diretta suite spa",
    title: "Prenotazione diretta (WhatsApp): come bloccare la tua suite SPA in 2 minuti",
    metaTitle: `Prenotazione diretta WhatsApp: suite spa privata a Porto Empedocle | ${noir.name}`,
    metaDescription:
      "Prenotazione diretta via WhatsApp: come chiedere disponibilità e bloccare una suite spa privata a Porto Empedocle (jacuzzi idromassaggio + sauna interna). Messaggio pronto, risposta rapida.",
    excerpt:
      "Vuoi prenotare senza rimbalzi? Copia un messaggio e ottieni disponibilità in modo rapido e diretto.",
    datePublishedISO: "2026-04-24",
    relatedLandingSlugs: ["spa-porto-empedocle", "jacuzzi-privata-porto-empedocle", "weekend-romantico-porto-empedocle"],
    heroImage: { src: "/passion-jacuzzi.jpg", alt: "Prenotazione diretta WhatsApp per suite spa privata" },
    sections: [
      {
        title: "Il messaggio giusto (copiabile)",
        body: "Scrivi data di arrivo e partenza, numero di persone e se preferisci una suite più intima o più scenografica. Fine.",
        bullets: [
          "Date: __/__/__ → __/__/__",
          "Siamo in __",
          "Preferenza: Passion o Infinity",
        ],
      },
      {
        title: "Perché conviene il diretto",
        body: "Meno passaggi significa meno errori. Ti diciamo subito cosa è libero e cosa ha più senso per il tuo mood.",
      },
      {
        title: "Cosa includi nella richiesta",
        body: "Se è un anniversario o una sorpresa, scrivilo: possiamo consigliarti la suite migliore e il setup più adatto.",
      },
    ],
  },
];

export const BLOG_POSTS_BY_SLUG: Record<string, BlogPost> = Object.fromEntries(
  BLOG_POSTS.map((p) => [p.slug, p])
);

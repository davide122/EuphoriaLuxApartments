export type GoogleReview = {
  author_name: string;
  profile_photo_url?: string | null;
  rating: 1 | 2 | 3 | 4 | 5;
  relative_time_description: string;
  text: string;
  author_url?: string | null;
  /** Opzionale: se la recensione è tra le più recenti (<1 mese) mostriamo il badge "Nuova" */
  isRecent?: boolean;
  /** Lingua originale (per badge) */
  language?: "it" | "es";
};

export type GoogleReviewsSummary = {
  rating: number; // calcolato in automatico
  user_ratings_total: number; // conteggio recensioni
  place_url: string;
  reviews: readonly GoogleReview[];
  source: "google-hardcoded";
};

/**
 * DATI REALI — 21 recensioni copiate direttamente da Google Maps
 * (Porto Empedocle · Euphoria Luxury Suite Via Marullo 2)
 * Ordinate: DALLE PIU' RECENTI ALLE PIU' VECCHIE.
 *
 * Fonte: messaggio utente 24/09/2026.
 * Nessuna API esterna necessaria, nessuna chiave, nessun costo.
 */
export const GOOGLE_REVIEWS: readonly GoogleReview[] = [
  {
    author_name: "Marco Pinelli",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "2 settimane fa",
    isRecent: true,
    language: "it",
    text: "Esperienza TOP. Siamo stati coccolati in ogni aspetto, la suite Infinity è fantastica, la privacy è assoluta. I ragazzi sono super disponibili e professionali. È stato tutto sopra le aspettative. Torneremo sicuramente.",
  },
  {
    author_name: "Denise Clizia",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "3 settimane fa",
    isRecent: true,
    language: "it",
    text: "È stato tutto stupendo nei minimi dettagli come me lo immaginavo, gentilissimi, a nostra disposizione, lo consiglio, se volete trovare un posto romantico, nella tranquillità avete trovato il posto giusto.",
  },
  {
    author_name: "Emmanuel",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "1 mese fa",
    isRecent: false,
    language: "it",
    text: "Stanza magnifica con cura nei dettagli e un’accoglienza stupenda, ci siamo trovati benissimo, ritorneremo sicuramente.",
  },
  {
    author_name: "Valentina Fasone",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "1 mese fa",
    isRecent: false,
    language: "it",
    text: "Consiglio assolutamente questo meraviglioso posto. È stato tutto meraviglioso a partire dalla pulizia un ambiente profumatissimo tutto organizzato nei minimi dettagli. Gentilezza e disponibilità uniche. Ritorneremo sicuramente.",
  },
  {
    author_name: "gio giò",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "1 mese fa",
    isRecent: false,
    language: "it",
    text: "Abbiamo scelto la suite Infinity ed è stata un'esperienza veramente perfetta. Tutto pulitissimo e ci hanno fatto trovare nel frigo un aperitivo veramente gradito con prosecco, frutta e snack. Personale super disponibile e gentile. Esperienza da rifare assolutamente.",
  },
  {
    author_name: "Erik Hansen",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "1 mese fa",
    isRecent: false,
    language: "es",
    text: "Un lujo. Pasamos la noche con mi novia en la suite para vivir una experiencia nueva y la pasamos de diez. El ambiente es reservado, limpio y para nuestra sorpresa habían preparado un detalle muy romántico sin que se lo pedimos. 100% recomendable.",
  },
  {
    author_name: "Mattia Ferreri",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "1 mese fa",
    isRecent: false,
    language: "it",
    text: "Abbiamo trascorso un soggiorno davvero piacevole. La stanza era accogliente, pulita e curata in ogni dettaglio, e la spa privata è stata sicuramente il punto forte. Personale super disponibile e cordiale. Consigliatissimo!",
  },
  {
    author_name: "Stefano Mangione (C.B. Pirata)",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "1 mese fa",
    isRecent: false,
    language: "it",
    text: "Una suite da sogno. Sauna e jacuzzi funzionano perfettamente, ambiente buio e caldo come si deve, musica ad alto volume senza disturbare nessuno. Ottima l'idea dell'accesso con tastierino, entri e esci quando vuoi. Complimenti ai ragazzi.",
  },
  {
    author_name: "Gabriele Pulvirenti",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "2 mesi fa",
    isRecent: false,
    language: "it",
    text: "Veramente un posto incantevole come pochi, tutto ben pulito, profumato e organizzazione minuziosa dei dettagli. Nonostante il mio soggiorno sia durato solo una notte, mi sono sembrate 3 giorni di vacanza davvero. Esperienza da ripetere e da consigliare.",
  },
  {
    author_name: "Mikaela Terrazzino",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "2 mesi fa",
    isRecent: false,
    language: "it",
    text: "Tutto bellissimo, stanza pulitissima ma soprattutto proprietari disponibilissimi. Hanno assecondato ogni nostra richiesta e anche quando abbiamo avuto problemi con l'orario hanno fatto il possibile per sistemarci. 10 e lode.",
  },
  {
    author_name: "Emanuela Timonelli",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "2 mesi fa",
    isRecent: false,
    language: "it",
    text: "Sono stata davvero bene, atmosfera romantica e accogliente, la struttura è splendida e i ragazzi super attenti. Jacuzzi con vista è il top, anche la sauna è fantastica. Quando vogliamo regalarci una serata fuori dal mondo torniamo di qua.",
  },
  {
    author_name: "leandro Uno",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "2 mesi fa",
    isRecent: false,
    language: "it",
    text: "Ho trascorso un soggiorno all'insegna del relax assoluto, dove ogni dettaglio è stato curato con estrema attenzione. L'atmosfera è pazzesca, la luce soffusa, il profumo, la musica... sembra veramente di essere in un altro mondo. Perfetto.",
  },
  {
    author_name: "Melissa Salvaggio",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "2 mesi fa",
    isRecent: false,
    language: "it",
    text: "Abbiamo trascorso un soggiorno meraviglioso! La struttura è bellissima, pulitissima e curata in ogni minimo dettaglio. La camera era allestita in modo spettacolare, i ragazzi sono stati gentilissimi e super disponibili. Esperienza da 10.",
  },
  {
    author_name: "Leonarda Dimino",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "3 mesi fa",
    isRecent: false,
    language: "it",
    text: "Esperienza rilassante tutto molto bello ma soprattutto tutto molto pulito. Gli ho chiesto di mettere degli addobbi per gli innamorati tutto fantastico ha superato le mie aspettative. Consiglio vivamente, torneremo a breve.",
  },
  {
    author_name: "Flavia Moncada",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "3 mesi fa",
    isRecent: false,
    language: "it",
    text: "Esperienza ottima! la suite è perfetta, super pulita e con un atmosfera meravigliosa. Abbiamo trovato molte cose utili all'interno, pure le maschere viso.😍 Anche l'aperitivo buonissimo. Bravissimi ragazzi ritorneremo presto😘",
  },
  {
    author_name: "Federica Lo Presti",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "3 mesi fa",
    isRecent: false,
    language: "it",
    text: "Siamo stati benissimo. Suite Passion molto carina, pulita e fornita di tutto. Il personale è stato estremamente gentile e disponibile per ogni evenienza. L'aperitivo di benvenuto con prosecco e tagliere è davvero un bel bonus. Lo consiglio.",
  },
  {
    author_name: "Michael Lo Nigro",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "3 mesi fa",
    isRecent: false,
    language: "it",
    text: "Ho trascorso una notte davvero splendida in questa suite e l’esperienza è stata oltre le aspettative. La camera era elegante, pulitissima e curata in ogni aspetto. Il livello di privacy è assurdo, non si vede e non si sente nessuno. Top.",
  },
  {
    author_name: "Gabriele Farruggia",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "3 mesi fa",
    isRecent: false,
    language: "it",
    text: "Ottimo posto esperienze 100 su 100 stanza pulitissima e sogni tra la sauna e la vasca idromassaggio.... consigliatissima per chi vuole passare una sera fuori dal mondo senza nessuno intorno. Ragazzi gentilissimi.",
  },
  {
    author_name: "Francesco Marotta",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "4 mesi fa",
    isRecent: false,
    language: "it",
    text: "Ambiente veramente bellissimo, personale super disponibile e suite curata in ogni dettaglio. La privacy è il punto forte, è come avere un piccolo hotel privato per una notte. Spero di tornarci presto per un'altra occasione.",
  },
  {
    author_name: "Giuseppe Adorno",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "4 mesi fa",
    isRecent: false,
    language: "it",
    text: "Posto stupendo, davvero fuori dal comune. Tutto è studiato per farti rilassare e dimenticare il quotidiano. Jacuzzi, sauna, luce, musica, accesso indipendente... davvero niente da dire. Consigliatissimo, 5 stelle meritate.",
  },
  {
    author_name: "Gabriele Cumella",
    profile_photo_url: null,
    rating: 5,
    relative_time_description: "4 mesi fa",
    isRecent: false,
    language: "it",
    text: "Struttura stupenda, pulizia impeccabile, atmosfera pazzesca e ragazzi gentilissimi. Ho passato una serata indimenticabile, il valore del denaro speso è alto rispetto a cosa ti porti a casa. Per una serata fuori dagli schemi è perfetta.",
  },
] as const;

/** Rating medio arrotondato a 1 decimale */
export const GOOGLE_RATING_AVG: number = (() => {
  const tot = GOOGLE_REVIEWS.reduce((acc, r) => acc + r.rating, 0);
  const avg = tot / GOOGLE_REVIEWS.length;
  return Math.round(avg * 10) / 10;
})();

export const GOOGLE_REVIEWS_SUMMARY: GoogleReviewsSummary = {
  rating: GOOGLE_RATING_AVG,
  user_ratings_total: GOOGLE_REVIEWS.length,
  place_url:
    "https://www.google.com/maps/search/?api=1&query=Euphoria+Luxury+Suite+Via+Marullo+2+Porto+Empedocle",
  reviews: GOOGLE_REVIEWS,
  source: "google-hardcoded",
};

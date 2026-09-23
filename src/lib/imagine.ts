export const imagineAtmospheres = ["purple", "rose", "warm", "noir"] as const;
export const imagineSuites = ["Passion", "Infinity"] as const;
export const imagineObjects = ["candles", "cake", "balloons", "chocolates", "gift", "breakfast", "fruit"] as const;

export type ImagineAtmosphere = (typeof imagineAtmospheres)[number];
export type ImagineSuite = (typeof imagineSuites)[number];
export type ImagineObject = (typeof imagineObjects)[number];

export type ImagineScene = {
  suite: ImagineSuite;
  occasion: string;
  atmosphere: ImagineAtmosphere;
  jacuzzi: boolean;
  prosecco: boolean;
  flowers: boolean;
  petals: boolean;
  music: boolean;
  objects: ImagineObject[];
  setupTitle: string;
  headline: string;
  details: string[];
};

const has = (text: string, pattern: RegExp) => pattern.test(text.toLocaleLowerCase("it"));

export function interpretImagineLocally(input: string): ImagineScene {
  const text = input.toLocaleLowerCase("it");
  const exclusions = [...text.matchAll(/(?:senza|niente|\bno)\s+([^.!;\n]+)/g)].map(match => match[1].split(/\b(?:ma|con|però)\b/)[0]);
  const excludes = (pattern: RegExp) => exclusions.some(clause => pattern.test(clause));
  const requested = (pattern: RegExp) => has(text, pattern) && !excludes(pattern);
  const noDecorations = excludes(/decoraz|allestiment/);
  const understated = has(text, /non troppo|sobri|discret|minimal|semplic|non sdolcinat/);
  const infinity = has(text, /infinity|più spaz|ampia|living|cena|cinema|film/);
  const anniversary = has(text, /anniversar|anniversary/);
  const birthday = has(text, /compleann|birthday/);
  const proposal = has(text, /proposta|sposar|anello|proposal/);
  const surprise = has(text, /sorpres|sorprend/);
  const atmosphere: ImagineAtmosphere = has(text, /viola|purple|lilla|violet/)
    ? "purple"
    : has(text, /rosa|pink|fucsia/)
      ? "rose"
      : has(text, /cald|oro|ambra|candel/)
        ? "warm"
        : "noir";
  const occasion = anniversary
    ? "Anniversario"
    : birthday
      ? "Compleanno"
      : proposal
        ? "Proposta"
        : surprise
          ? "Sorpresa"
          : "Serata speciale";
  const petals = !noDecorations && requested(/petal/);
  const flowers = !noDecorations && requested(/fior|\brose\b/);
  const prosecco = !excludes(/prosecco|alcol|vino|bollicine/) && !has(text, /analcolic/) && (has(text, /prosecco|bollicine|vino/) || anniversary || proposal);
  const jacuzzi = !excludes(/jacuzzi/);
  const music = !has(text, /silenzio/) && !excludes(/musica/);
  const objects: ImagineObject[] = [
    !noDecorations && requested(/candel/) ? "candles" : null,
    requested(/tort[ae]|cake/) ? "cake" : null,
    !noDecorations && requested(/palloncin|balloon/) ? "balloons" : null,
    requested(/cioccolat|praline/) ? "chocolates" : null,
    requested(/regal|pacchett/) ? "gift" : null,
    requested(/colazione|breakfast/) ? "breakfast" : null,
    requested(/frutta|fragol/) ? "fruit" : null,
  ].filter((object): object is ImagineObject => Boolean(object)).slice(0, 3);
  const suite: ImagineSuite = infinity ? "Infinity" : "Passion";
  const atmosphereLabel = {
    purple: "Atmosfera viola",
    rose: "Atmosfera rosa",
    warm: "Luce calda",
    noir: "Atmosfera noir",
  }[atmosphere];
  const details = [
    jacuzzi ? "Jacuzzi" : null,
    prosecco ? "Prosecco" : null,
    atmosphereLabel,
    flowers ? "Fiori" : petals ? "Petali" : null,
  ].filter((detail): detail is string => Boolean(detail));

  return {
    suite,
    occasion,
    atmosphere,
    jacuzzi,
    prosecco,
    flowers,
    petals,
    music,
    objects,
    setupTitle: `${occasion} setup`,
    headline: understated
      ? "Intima, intensa. Senza esagerare."
      : proposal
        ? "Il momento prima del vostro sì."
        : anniversary
          ? "Una notte che parla soltanto di voi."
          : "La vostra serata, finalmente reale.",
    details,
  };
}

export function isImagineScene(value: unknown): value is ImagineScene {
  if (!value || typeof value !== "object") return false;
  const s = value as Record<string, unknown>;
  return imagineSuites.includes(s.suite as ImagineSuite)
    && imagineAtmospheres.includes(s.atmosphere as ImagineAtmosphere)
    && ["jacuzzi", "prosecco", "flowers", "petals", "music"].every(key => typeof s[key] === "boolean")
    && ["occasion", "setupTitle", "headline"].every(key => typeof s[key] === "string" && (s[key] as string).length <= 200)
    && Array.isArray(s.objects) && s.objects.length <= 3 && s.objects.every(item => imagineObjects.includes(item))
    && Array.isArray(s.details) && s.details.length <= 4 && s.details.every(item => typeof item === "string" && item.length <= 100);
}

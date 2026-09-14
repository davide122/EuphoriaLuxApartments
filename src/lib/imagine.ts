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
  const petals = !has(text, /senza petali|no petali/) && (has(text, /petal/) || (!understated && (anniversary || proposal)));
  const flowers = !has(text, /senza fiori|no fiori/) && has(text, /fior|\bros[ae]\b/);
  const prosecco = !has(text, /senza prosecco|no alcol|analcolic/) && (has(text, /prosecco|bollicine|vino/) || anniversary || proposal);
  const jacuzzi = !has(text, /senza jacuzzi|no jacuzzi/);
  const music = !has(text, /silenzio|senza musica|no musica/);
  const objects: ImagineObject[] = [
    has(text, /candel/) ? "candles" : null,
    has(text, /tort[ae]|cake/) ? "cake" : null,
    has(text, /palloncin|balloon/) ? "balloons" : null,
    has(text, /cioccolat|praline/) ? "chocolates" : null,
    has(text, /regal|pacchett/) ? "gift" : null,
    has(text, /colazione|breakfast/) ? "breakfast" : null,
    has(text, /frutta|fragol/) ? "fruit" : null,
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

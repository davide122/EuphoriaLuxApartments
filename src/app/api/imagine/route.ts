import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import {
  imagineAtmospheres,
  imagineObjects,
  imagineSuites,
  interpretImagineLocally,
  type ImagineObject,
  type ImagineScene,
} from "@/lib/imagine";

export const runtime = "nodejs";
export const maxDuration = 120;

const WINDOW_MS = 30 * 60 * 1000;
const MAX_REQUESTS = 4;
const requests = new Map<string, number[]>();
const imageCache = new Map<string, string>();
const MAX_CACHE_ENTRIES = 12;
const IMAGE_PROMPT_VERSION = "3";

const SUITE_REFERENCE: Record<ImagineScene["suite"], { file: string; name: string }> = {
  Passion: { file: "passion-letto-jacuzzi-sauna.jpg", name: "euphoria-passion.jpg" },
  Infinity: { file: "infinity-jacuzzi.jpg", name: "euphoria-infinity.jpg" },
};

const sceneSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    suite: { type: "string", enum: [...imagineSuites] },
    occasion: { type: "string" },
    atmosphere: { type: "string", enum: [...imagineAtmospheres] },
    jacuzzi: { type: "boolean" },
    prosecco: { type: "boolean" },
    flowers: { type: "boolean" },
    petals: { type: "boolean" },
    music: { type: "boolean" },
    objects: {
      type: "array",
      items: { type: "string", enum: [...imagineObjects] },
      maxItems: 3,
      uniqueItems: true,
    },
    setupTitle: { type: "string" },
    headline: { type: "string" },
    details: {
      type: "array",
      items: { type: "string", maxLength: 36 },
      maxItems: 4,
    },
  },
  required: ["suite", "occasion", "atmosphere", "jacuzzi", "prosecco", "flowers", "petals", "music", "objects", "setupTitle", "headline", "details"],
} as const;

function allowed(ip: string) {
  const now = Date.now();
  const recent = (requests.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return false;
  recent.push(now);
  requests.set(ip, recent);
  return true;
}

function outputText(payload: { output?: Array<{ content?: Array<{ type?: string; text?: string }> }> }) {
  return payload.output?.flatMap((item) => item.content ?? []).find((content) => content.type === "output_text")?.text;
}

async function interpretScene(idea: string, fallback: ImagineScene, apiKey: string) {
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_IMAGINE_MODEL || "gpt-5.6-terra",
        store: false,
        max_output_tokens: 500,
        instructions:
          "Sei il creative concierge di Euphoria Luxury Suites. Trasforma il desiderio dell'ospite in una configurazione reale, elegante, sobria e fisicamente realizzabile dal personale di una struttura ricettiva. Passion è intima e raccolta (55 m²); Infinity è ampia e scenografica (77 m²). Jacuzzi e sauna sono sempre disponibili. Prosecco è incluso. Petali costano da 10 euro. Fiori sono su richiesta. Gli unici altri oggetti selezionabili sono: candles, cake, balloons, chocolates, gift, breakfast, fruit; scegline al massimo tre e soltanto se richiesti esplicitamente. Non promettere installazioni, modifiche strutturali, oggetti enormi o servizi non elencati. Se l'ospite chiede qualcosa di irrealistico, traducilo nella versione semplice e realizzabile più vicina. Se chiede sobrietà, evita petali, fiori e decorazioni salvo richiesta esplicita. Scrivi microcopy breve in italiano e non menzionare AI o ChatGPT. details deve contenere al massimo quattro etichette concise, massimo quattro parole ciascuna, per esempio: Jacuzzi, Prosecco, Atmosfera viola, Fiori freschi.",
        input: idea,
        text: { format: { type: "json_schema", name: "euphoria_scene", strict: true, schema: sceneSchema } },
      }),
      signal: AbortSignal.timeout(18_000),
    });

    if (!response.ok) throw new Error(`OpenAI scene ${response.status}`);
    const payload = (await response.json()) as { output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
    const text = outputText(payload);
    if (!text) throw new Error("Empty structured output");
    return JSON.parse(text) as ImagineScene;
  } catch (error) {
    console.error("Imagine scene fallback", error);
    return fallback;
  }
}

function imagePrompt(idea: string, scene: ImagineScene) {
  const objectCopy: Record<ImagineObject, string> = {
    candles: "no more than four small elegant candles placed safely on existing surfaces",
    cake: "one small celebration cake on an existing table",
    balloons: "no more than five small matte balloons, with no arch or installation",
    chocolates: "one small box of chocolates",
    gift: "one realistically sized wrapped gift",
    breakfast: "one compact breakfast tray for two",
    fruit: "one small plate of fresh fruit",
  };
  const additions = [
    scene.jacuzzi ? "the existing jacuzzi filled, switched on and softly bubbling" : "the existing jacuzzi left off",
    scene.prosecco ? "one elegant chilled bottle of prosecco with exactly two glasses" : null,
    scene.flowers ? "a restrained arrangement of fresh flowers" : null,
    scene.petals ? "a sparse, tasteful scattering of rose petals" : null,
    ...scene.objects.map((object) => objectCopy[object]),
  ].filter(Boolean).join(", ");
  const exclusions = [
    !scene.prosecco ? "bottles and glasses" : null,
    !scene.flowers ? "flowers and floral arrangements" : null,
    !scene.petals ? "loose petals, rose petals and petal trails" : null,
    !scene.objects.includes("candles") ? "candles and tea lights" : null,
    !scene.objects.includes("balloons") ? "balloons" : null,
    !scene.objects.includes("cake") ? "cakes and desserts" : null,
  ].filter(Boolean).join(", ");

  const atmosphere = {
    purple: "a sophisticated deep violet ambience",
    rose: "a refined muted rose ambience",
    warm: "a warm amber ambience from the suite's existing lights",
    noir: "a dark, intimate noir ambience",
  }[scene.atmosphere];

  return `Edit the supplied real photograph of the Euphoria ${scene.suite} suite into a premium hospitality campaign photograph.

REFERENCE ROLE: the input is the master scene and the sole source of truth. This must remain the exact same real suite and exact same camera viewpoint.

PRESERVE: room geometry, scale, perspective, ceiling, walls, marble veining, floor, doors, windows, jacuzzi shape and position, bed, furniture, fixtures and existing circulation space. Keep permanent material colors unchanged. Color changes must come only from believable existing LED/ambient lighting and, when requested, small removable textiles or objects.

ALLOWED EDIT SCOPE: ordinary, realistically sized hospitality objects explicitly listed below; plausible lighting color and intensity; water inside the existing jacuzzi. Place objects only where staff could safely place them in reality, without blocking doors, walkways or the jacuzzi.

NEVER: redesign or enlarge the room; move or replace furniture; invent a second jacuzzi, windows, doors, fireplaces, pools, architectural lighting, outdoor views or extra rooms; add giant props, arches, installations, floating objects, fantasy effects, smoke, people, animals, text, logos, signs or watermarks.

Guest's request: "${idea}"
Create ${atmosphere}. Change ONLY the lighting and these physically plausible setup details: ${additions || "no extra objects"}. Do not add any decoration or object that is not explicitly listed. Absolutely exclude: ${exclusions || "all extra decorative objects"}. Use restrained quantities and normal human scale. The setup must be elegant, minimal, safe and genuinely bookable tonight by real staff. Avoid kitsch, excess decoration, event-stage styling, fantasy and artificial CGI appearance. The result must look like a truthful high-end editorial photograph shot in the real suite, with natural reflections, convincing contact shadows and accurate materials. Compose safely for a full-screen mobile crop, keeping the jacuzzi and the requested setup visible in the central area.`;
}

async function createSceneImage(idea: string, scene: ImagineScene, apiKey: string) {
  const model = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2.5-sunburst";
  const cacheKey = createHash("sha256")
    .update(`${IMAGE_PROMPT_VERSION}:${model}:${idea.toLocaleLowerCase("it")}:${JSON.stringify(scene)}`)
    .digest("hex");
  const cached = imageCache.get(cacheKey);
  if (cached) return cached;

  const reference = SUITE_REFERENCE[scene.suite];
  const buffer = await readFile(path.join(process.cwd(), "public", reference.file));
  const form = new FormData();
  form.append("model", model);
  form.append("image[]", new Blob([buffer], { type: "image/jpeg" }), reference.name);
  form.append("prompt", imagePrompt(idea, scene));
  form.append("size", "1024x1536");
  form.append("quality", process.env.OPENAI_IMAGE_QUALITY || "high");
  form.append("output_format", "webp");
  form.append("output_compression", "86");

  const response = await fetch("https://api.openai.com/v1/images/edits", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
    signal: AbortSignal.timeout(115_000),
  });
  const payload = (await response.json()) as { data?: Array<{ b64_json?: string }>; error?: { message?: string; code?: string } };
  if (!response.ok) throw new Error(`OpenAI image ${response.status}: ${payload.error?.code || payload.error?.message || "unknown"}`);
  const base64 = payload.data?.[0]?.b64_json;
  if (!base64) throw new Error("Empty image output");

  const dataUrl = `data:image/webp;base64,${base64}`;
  if (imageCache.size >= MAX_CACHE_ENTRIES) imageCache.delete(imageCache.keys().next().value as string);
  imageCache.set(cacheKey, dataUrl);
  return dataUrl;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!allowed(ip)) return NextResponse.json({ error: "Troppe richieste. Riprova tra qualche minuto." }, { status: 429 });

  const body = (await request.json().catch(() => null)) as { idea?: unknown } | null;
  const idea = typeof body?.idea === "string" ? body.idea.trim().slice(0, 600) : "";
  if (idea.length < 8) return NextResponse.json({ error: "Raccontaci qualche dettaglio in più." }, { status: 400 });

  const fallback = interpretImagineLocally(idea);
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ scene: fallback, image: null, imageGenerated: false, source: "local" });

  const scene = await interpretScene(idea, fallback, apiKey);
  try {
    const image = await createSceneImage(idea, scene, apiKey);
    return NextResponse.json({ scene, image, imageGenerated: true, source: "openai" });
  } catch (error) {
    console.error("Imagine image fallback", error);
    return NextResponse.json({ scene, image: null, imageGenerated: false, source: "openai" });
  }
}

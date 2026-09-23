import { NextResponse } from "next/server";
import { noir } from "@/lib/noir";

export const dynamic = "force-static";
export const revalidate = 1800; // 30 minuti cache

export type IgMedia = {
  id: string;
  caption?: string;
  media_url: string;
  thumbnail_url?: string | null;
  permalink: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  timestamp: string;
};

type IgResponseShape = { data: IgMedia[]; paging?: unknown };

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();

  if (!token) {
    return NextResponse.json(
      {
        ok: false,
        connected: false,
        data: [] as IgMedia[],
        message:
          "Nessun token Instagram Basic Display configurato. Aggiungi INSTAGRAM_ACCESS_TOKEN alle env vars per mostrare il feed reale.",
        hint: "Seguici su Instagram nel frattempo:",
        instagramUrl: noir.contacts.instagram,
      },
      { status: 200, headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
    );
  }

  try {
    const fields = "id,caption,media_url,thumbnail_url,permalink,media_type,timestamp";
    const url = `https://graph.instagram.com/me/media?fields=${encodeURIComponent(fields)}&access_token=${encodeURIComponent(token)}&limit=12`;
    const res = await fetch(url, {
      next: { revalidate: 1800, tags: ["instagram-feed"] },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      const err = await res.text().catch(() => "");
      return NextResponse.json(
        {
          ok: false,
          connected: true,
          data: [] as IgMedia[],
          error: { status: res.status, body: err.slice(0, 400) },
          instagramUrl: noir.contacts.instagram,
        },
        { status: 200, headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600" } }
      );
    }
    const json = (await res.json()) as IgResponseShape;
    const trimmed = (json.data ?? []).slice(0, 8).map((m) => ({
      id: m.id,
      caption: (m.caption ?? "").slice(0, 240),
      media_url: m.media_url,
      thumbnail_url: m.thumbnail_url ?? null,
      permalink: m.permalink,
      media_type: m.media_type,
      timestamp: m.timestamp,
    }));
    return NextResponse.json(
      { ok: true, connected: true, data: trimmed, count: trimmed.length, instagramUrl: noir.contacts.instagram },
      { headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400" } }
    );
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      {
        ok: false,
        connected: true,
        data: [] as IgMedia[],
        error: err.slice(0, 300),
        instagramUrl: noir.contacts.instagram,
      },
      { status: 200, headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600" } }
    );
  }
}

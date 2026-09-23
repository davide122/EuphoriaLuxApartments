import { NextResponse } from "next/server";
import { GOOGLE_REVIEWS_SUMMARY, type GoogleReviewsSummary } from "@/lib/google-reviews";

/**
 * Endpoint mantenuto per retro-compatibilità / test (es. preview in admin).
 * ORA I DATI SONO HARDCODATI, nessuna chiamata esterna a Google Places.
 * L'utente ha fornito 21 recensioni REALI copiate manualmente da Google Maps il 24/09/2026.
 *
 *   21 recensioni · rating medio 5,0/5.
 *   Place ID ufficiale (per link CTA Maps): ChIJyzD86oN5GhMR1Zu9y8MDaUc
 *
 * ISR 24h.
 */
export const revalidate = 86400;

export function GET(): NextResponse<GoogleReviewsSummary> {
  return NextResponse.json(GOOGLE_REVIEWS_SUMMARY, { status: 200 });
}

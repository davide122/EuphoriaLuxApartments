"use client";

import { track } from "@vercel/analytics";

export type AnalyticsEvent = {
  name: string;
  params?: Record<string, string | number | boolean | null | undefined>;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;

  const payload: Record<string, unknown> = {
    event: event.name,
    ...Object.fromEntries(
      Object.entries(event.params ?? {}).filter(([, v]) => v !== undefined)
    ),
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  if (typeof window.gtag === "function") {
    window.gtag("event", event.name, event.params ?? {});
  }

  // Vercel traccia gia le page view. Per gli eventi custom inviamo solo
  // proprieta aggregate e non identificative (massimo due, compatibile Pro).
  if (event.name !== "page_view") {
    const blockedKeys = new Set([
      "checkIn",
      "checkOut",
      "email",
      "fullName",
      "href",
      "id",
      "notes",
      "phone",
      "url",
    ]);
    const properties = Object.fromEntries(
      Object.entries(event.params ?? {})
        .filter(([key, value]) => !blockedKeys.has(key) && value !== undefined)
        .slice(0, 2)
        .map(([key, value]) => [
          key.slice(0, 255),
          typeof value === "string" ? value.slice(0, 255) : value,
        ])
    );

    track(event.name.slice(0, 255), properties);
  }
}

export function getAnalyticsContext(element: Element) {
  const section = element.closest("section[id]")?.getAttribute("id");
  const source =
    element.getAttribute("data-analytics-source") ??
    section ??
    (element.closest("header") ? "header" : element.closest("footer") ? "footer" : "page");
  const label =
    element.getAttribute("data-analytics-label") ??
    element.textContent?.replace(/\s+/g, " ").trim().slice(0, 80) ??
    "link";

  return { source, label };
}

export function isWhatsAppHref(href: string) {
  const h = href.toLowerCase();
  return h.includes("wa.me/") || h.includes("whatsapp.com/");
}

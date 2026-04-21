"use client";

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
}

export function isWhatsAppHref(href: string) {
  const h = href.toLowerCase();
  return h.includes("wa.me/") || h.includes("whatsapp.com/");
}

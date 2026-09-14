"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getAnalyticsContext, isWhatsAppHref, trackEvent } from "@/lib/analytics";

function getScrollProgress() {
  const doc = document.documentElement;
  const scrollTop = window.scrollY || doc.scrollTop || 0;
  const height = doc.scrollHeight - window.innerHeight;
  if (height <= 0) return 100;
  return Math.min(100, Math.max(0, Math.round((scrollTop / height) * 100)));
}

export function ClientAnalytics() {
  const pathname = usePathname();
  const urlRef = useRef<string>(pathname);

  const firedDepths = useRef<Set<number>>(new Set());
  const viewedSections = useRef<Set<string>>(new Set());
  const raf = useRef<number | null>(null);

  useEffect(() => {
    firedDepths.current = new Set();
    viewedSections.current = new Set();
    const search = typeof window !== "undefined" ? window.location.search : "";
    urlRef.current = `${pathname}${search}`;
    trackEvent({ name: "page_view", params: { path: pathname, url: urlRef.current } });
  }, [pathname]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const section = entry.target.id;
          if (!entry.isIntersecting || !section || viewedSections.current.has(section)) continue;
          viewedSections.current.add(section);
          trackEvent({ name: "section_view", params: { section } });
        }
      },
      { threshold: 0.35 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.dataset.analyticsTracked === "true") return;

      const href = anchor.href;
      trackEvent({
        name: isWhatsAppHref(href) ? "whatsapp_click" : "link_click",
        params: { ...getAnalyticsContext(anchor), href },
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const details = Array.from(document.querySelectorAll<HTMLDetailsElement>("details"));
    const onToggle = (event: Event) => {
      const detail = event.currentTarget;
      if (!(detail instanceof HTMLDetailsElement) || !detail.open) return;
      const summary = detail.querySelector("summary");
      trackEvent({
        name: "details_open",
        params: {
          source: detail.closest("section[id]")?.id ?? "page",
          label: summary?.textContent?.replace(/\s+/g, " ").trim().slice(0, 80) ?? "Dettaglio",
        },
      });
    };

    details.forEach((detail) => detail.addEventListener("toggle", onToggle));
    return () => details.forEach((detail) => detail.removeEventListener("toggle", onToggle));
  }, [pathname]);

  useEffect(() => {
    const thresholds = [25, 50, 75, 90];
    const onScroll = () => {
      if (raf.current !== null) return;
      raf.current = window.requestAnimationFrame(() => {
        raf.current = null;
        const p = getScrollProgress();
        for (const t of thresholds) {
          if (p >= t && !firedDepths.current.has(t)) {
            firedDepths.current.add(t);
            trackEvent({ name: "scroll_depth", params: { path: pathname, depth: t } });
          }
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current !== null) window.cancelAnimationFrame(raf.current);
    };
  }, [pathname]);

  return null;
}

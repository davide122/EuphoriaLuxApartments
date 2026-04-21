"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

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
  const raf = useRef<number | null>(null);

  useEffect(() => {
    firedDepths.current = new Set();
    const search = typeof window !== "undefined" ? window.location.search : "";
    urlRef.current = `${pathname}${search}`;
    trackEvent({ name: "page_view", params: { path: pathname, url: urlRef.current } });
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

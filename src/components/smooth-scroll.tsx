"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { type ReactNode, useEffect, useRef } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const mobileOrTouch =
      typeof window !== "undefined" &&
      window.matchMedia?.("(max-width: 820px), (pointer: coarse)")?.matches;

    if (reduceMotion || mobileOrTouch) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.9,
      touchMultiplier: 0.95,
      smoothWheel: true,
      anchors: { offset: -88 },
      allowNestedScroll: true,
    });

    lenisRef.current = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}

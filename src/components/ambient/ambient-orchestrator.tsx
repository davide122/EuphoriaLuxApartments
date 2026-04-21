"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

type AmbientKey = "noir" | "spa" | "sauna" | "night" | "location";

const AMBIENTS: Record<
  AmbientKey,
  { a: string; b: string; c: string }
> = {
  noir: { a: "138 46 255", b: "46 107 255", c: "45 242 255" },
  spa: { a: "45 242 255", b: "46 107 255", c: "255 47 178" },
  sauna: { a: "255 47 178", b: "138 46 255", c: "215 183 159" },
  night: { a: "138 46 255", b: "255 47 178", c: "46 107 255" },
  location: { a: "46 107 255", b: "45 242 255", c: "138 46 255" },
};

function setAmbient(key: AmbientKey) {
  const root = document.documentElement;
  const next = AMBIENTS[key];
  root.style.setProperty("--ambient-a", next.a);
  root.style.setProperty("--ambient-b", next.b);
  root.style.setProperty("--ambient-c", next.c);
}

export function AmbientOrchestrator() {
  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-ambient]")
    );

    if (sections.length === 0) return;

    setAmbient("noir");

    const triggers = sections.map((section) => {
      const key = (section.dataset.ambient as AmbientKey) || "noir";
      return ScrollTrigger.create({
        trigger: section,
        start: "top 62%",
        end: "bottom 38%",
        onEnter: () => setAmbient(key),
        onEnterBack: () => setAmbient(key),
        onLeaveBack: () => setAmbient("noir"),
      });
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.58]">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_12%_14%,rgba(var(--ambient-a)/0.28),transparent_62%),radial-gradient(900px_circle_at_84%_22%,rgba(var(--ambient-c)/0.18),transparent_62%),radial-gradient(1200px_circle_at_50%_118%,rgba(var(--ambient-b)/0.16),transparent_64%)]" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_-10%,rgba(0,0,0,0.0),rgba(0,0,0,0.60)),radial-gradient(900px_circle_at_50%_120%,rgba(0,0,0,0.0),rgba(0,0,0,0.78))]" />
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.55)_0.5px,transparent_0.6px)] bg-[length:9px_9px]" />
    </div>
  );
}


"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Ingrigisce il testo (zinc-400) e lo illumina a bianco mentre entra in viewport. 1 sola animazione. */
  tint?: "color-shift";
  y?: number;
};

/**
 * Scroll-reveal semplice, performante, MASSIMAMENTE PREDICIBILE.
 * - Nessun whileInView annidato (mai + di 1 per componente)
 * - amount basso per triggerare subito su mobile
 * - Rispetta reduced-motion
 * - Modalità tint: anima TUTTO insieme (color + opacity + filter + y) in 1 transizione
 */
export function ScrollReveal({
  children,
  delay = 0,
  className,
  tint,
  y = 14,
}: Props) {
  const reduced = useReducedMotion();
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: reduced ? 0 : y,
      filter: reduced ? "blur(0px)" : "blur(5px)",
      color: tint === "color-shift" ? "rgb(161 161 170)" : undefined, // zinc-400 spento
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      color: tint === "color-shift" ? "rgb(255 255 255)" : undefined, // white acceso
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay,
        opacity: { duration: 0.5, ease: "easeOut", delay },
        filter: { duration: 0.5, ease: "easeOut", delay },
        color: tint === "color-shift" ? { duration: 0.55, ease: "easeOut", delay } : undefined,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

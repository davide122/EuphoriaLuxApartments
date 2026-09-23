"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** testo grigio spento → bianco pieno mentre entra in viewport */
  tint?: "color-shift";
  as?: "div" | "section" | "article" | "header" | "li";
  y?: number;
};

export function ScrollReveal({
  children,
  delay = 0,
  className,
  tint,
  as = "div",
  y = 18,
}: Props) {
  const reduced = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay,
        opacity: { duration: 0.55, ease: "easeOut", delay },
        filter: { duration: 0.55, ease: "easeOut", delay },
      },
    },
  };
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25, margin: "-10% 0px -8% 0px" }}
      variants={variants}
      className={
        tint === "color-shift"
          ? `${className ?? ""} [color-interpolation:optimizeQuality]`
          : className
      }
      style={
        tint === "color-shift"
          ? ({
              // fallback grigio spento → JS trasforma in bianco via CSS var durante animazione
              ["--tint-p" as string]: "1",
            } as React.CSSProperties)
          : undefined
      }
    >
      {tint === "color-shift" ? <TintedText>{children}</TintedText> : children}
    </MotionTag>
  );
}

/**
 * Mentre il genitore ScrollReveal esegue la transizione (opacity + blur),
 * questo wrapper fa da "scivolo colore" passando il testo da spento (zinc-400)
 * a acceso (white / zinc-100). Veloce, < 550ms, nessuna dissolvenza lenta.
 */
function TintedText({ children }: { children: ReactNode }) {
  return (
    <motion.span
      initial={{ color: "rgb(161 161 170)" }} // zinc-400, grigio spento
      whileInView={{ color: "rgb(255 255 255)" }} // white
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="block"
    >
      {children}
    </motion.span>
  );
}

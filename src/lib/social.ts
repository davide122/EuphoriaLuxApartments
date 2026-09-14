import { noir } from "@/lib/noir";

const socialPath = (file: string) => `${noir.siteUrl}/social/${file}`;

export const socialImages = {
  home: socialPath("euphoria-home-v3.jpg"),
  passion: socialPath("euphoria-passion-v3.jpg"),
  infinity: socialPath("euphoria-infinity-v3.jpg"),
  journal: socialPath("euphoria-journal-v3.jpg"),
} as const;

export function socialImageForSource(source?: string) {
  if (source?.toLowerCase().includes("infinity")) return socialImages.infinity;
  if (source?.toLowerCase().includes("passion")) return socialImages.passion;
  return socialImages.home;
}

export function openGraphImage(url: string, alt: string) {
  return {
    url,
    secureUrl: url,
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt,
  } as const;
}

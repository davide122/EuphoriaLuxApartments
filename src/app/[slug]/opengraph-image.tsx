import { ImageResponse } from "next/og";
import { noir } from "@/lib/noir";
import { SEO_LANDINGS_BY_SLUG } from "@/lib/seo-content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Landing Euphoria Luxury Suite";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const landing = SEO_LANDINGS_BY_SLUG[slug];

  const title = landing?.title ?? noir.name;
  const keyword = landing?.primaryKeyword ?? noir.location;
  const subline = `${noir.name} · ${noir.location} · Jacuzzi privata · Sauna interna`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          backgroundColor: "#05060a",
          backgroundImage:
            "radial-gradient(900px circle at 18% 18%, rgba(34,211,238,0.22), transparent 55%), radial-gradient(900px circle at 85% 20%, rgba(168,85,247,0.18), transparent 58%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.4))",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ color: "rgba(230,232,246,0.72)", letterSpacing: "0.28em", fontSize: 18 }}>
            {keyword.toUpperCase()}
          </div>
          <div style={{ color: "rgba(248,250,252,0.92)", fontSize: 56, lineHeight: 1.05, fontWeight: 700 }}>
            {title}
          </div>
          <div style={{ color: "rgba(230,232,246,0.78)", fontSize: 24, lineHeight: 1.35, maxWidth: 1000 }}>
            {subline}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            `Da €${noir.startingFrom}/notte`,
            "Prenotazione diretta WhatsApp",
            "Zero spazi condivisi",
          ].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 14px",
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "rgba(230,232,246,0.82)",
                fontSize: 16,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}

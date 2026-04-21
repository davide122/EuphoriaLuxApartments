import { ImageResponse } from "next/og";
import { noir, suites } from "@/lib/noir";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BY_SLUG: Record<string, (typeof suites)[number]> = Object.fromEntries(
  suites.map((s) => [s.slug, s])
);

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const suite = BY_SLUG[slug];

  const title = suite ? `${suite.name} — ${noir.name}` : noir.name;
  const subtitle = suite
    ? "Suite con jacuzzi privata e sauna interna"
    : "Jacuzzi privata · Sauna interna · Prenotazione diretta WhatsApp";

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
            "radial-gradient(900px circle at 18% 18%, rgba(34,211,238,0.20), transparent 55%), radial-gradient(900px circle at 85% 20%, rgba(168,85,247,0.18), transparent 58%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.4))",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ color: "rgba(230,232,246,0.72)", letterSpacing: "0.28em", fontSize: 18 }}>
            {noir.location.toUpperCase()}
          </div>
          <div style={{ color: "rgba(248,250,252,0.92)", fontSize: 64, lineHeight: 1.04, fontWeight: 700 }}>
            {title}
          </div>
          <div style={{ color: "rgba(230,232,246,0.78)", fontSize: 26, lineHeight: 1.32, maxWidth: 1000 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            `Da €${noir.startingFrom}/notte`,
            noir.smartAccess,
            "Prenotazione diretta WhatsApp",
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


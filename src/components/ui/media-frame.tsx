import Image from "next/image";

const TONES = {
  noir: "rgba(var(--ambient-a) / 0.18)",
  spa: "rgba(var(--ambient-c) / 0.22)",
  sauna: "rgba(var(--ambient-b) / 0.18)",
  night: "rgba(var(--ambient-a) / 0.22)",
  location: "rgba(var(--ambient-b) / 0.16)",
} as const;

export function MediaFrame({
  label,
  tone = "noir",
  src,
  alt,
  priority = false,
  className = "",
}: {
  label: string;
  tone?: keyof typeof TONES;
  src?: string;
  alt?: string;
  priority?: boolean;
  className?: string;
}) {
  const glow = TONES[tone] ?? TONES.noir;
  const safeSrc = src ? encodeURI(src) : null;

  return (
    <div className={`noir-panel noir-glow overflow-hidden ${className}`}>
      <div
        className="relative h-full w-full"
        style={{
          background:
            `radial-gradient(900px circle at 20% 10%, ${glow}, transparent 55%),` +
            "radial-gradient(900px circle at 80% 20%, rgba(255,255,255,0.05), transparent 55%)," +
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.22))",
        }}
      >
        {safeSrc ? (
          <Image
            src={safeSrc}
            alt={alt ?? label}
            fill
            sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 33vw"
            priority={priority}
            className="object-cover opacity-[0.92]"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0.65))]" />
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.55)_0.6px,transparent_0.7px)] bg-[length:10px_10px]" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-6 py-5">
          <div className="text-xs tracking-[0.22em] uppercase text-noir-mist/70">
            {label}
          </div>
          <div className="h-1.5 w-1.5 rounded-full bg-white/65" />
        </div>
      </div>
    </div>
  );
}

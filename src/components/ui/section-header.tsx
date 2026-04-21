import { type ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  description,
  right,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
          {eyebrow}
        </div>
        <h2 className="noir-h1 mt-4 text-3xl leading-[1.02] text-noir-mist sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {description ? (
          <div className="mt-4 text-base leading-7 text-noir-muted">
            {description}
          </div>
        ) : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

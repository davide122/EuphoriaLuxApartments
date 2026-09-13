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
        <div className="euphoria-kicker">
          {eyebrow}
        </div>
        <h2 className="noir-h1 mt-5 text-4xl leading-[0.98] text-noir-mist sm:text-5xl md:text-6xl">
          {title}
        </h2>
        {description ? (
          <div className="mt-5 max-w-xl text-base leading-7 text-noir-muted">
            {description}
          </div>
        ) : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

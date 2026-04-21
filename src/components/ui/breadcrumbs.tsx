import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

export type BreadcrumbItem = {
  href: string;
  label: string;
};

export function Breadcrumbs({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  return (
    <Reveal>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-xs tracking-[0.22em] uppercase text-noir-mist/55">
          {items.map((it, idx) => (
            <li key={it.href} className="flex items-center gap-2">
              <Link href={it.href} className="transition hover:text-noir-mist">
                {it.label}
              </Link>
              {idx < items.length - 1 ? (
                <span className="h-1 w-1 rounded-full bg-white/35" />
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
    </Reveal>
  );
}

export function breadcrumbJsonLd(args: {
  baseUrl: string;
  items: BreadcrumbItem[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: args.items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      item: `${args.baseUrl}${it.href}`,
    })),
  };
}

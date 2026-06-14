import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export type Crumb = { name: string; path: string };

// Breadcrumbs + BreadcrumbList schema for all inner pages.
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const full: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(full)} />
      <nav aria-label="Breadcrumb" className="container-page pt-28">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
          {full.map((c, i) => {
            const last = i === full.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-ink">{c.name}</span>
                ) : (
                  <Link href={c.path} className="link-muted">{c.name}</Link>
                )}
                {!last && <span aria-hidden className="text-ink-muted/50">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

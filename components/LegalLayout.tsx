import { Breadcrumbs } from "./Breadcrumbs";
import { SITE } from "@/lib/site";

export type LegalSection = { heading: string; paragraphs: string[]; list?: string[] };

export function LegalLayout({
  title,
  intro,
  updated,
  path,
  crumb,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  path: string;
  crumb: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Breadcrumbs items={[{ name: crumb, path }]} />
      <article className="container-page mt-10">
        <div className="mx-auto max-w-prose">
          <h1 className="text-display-md font-semibold text-ink">{title}</h1>
          <p className="mt-3 text-sm text-ink-muted">Last updated: {updated}</p>
          <p className="mt-6 leading-relaxed text-ink-muted">{intro}</p>

          <div className="prose-content mt-10 space-y-10">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-xl font-semibold text-ink">{s.heading}</h2>
                <div className="mt-3 space-y-4">
                  {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                  {s.list && (
                    <ul className="list-disc space-y-2 pl-5">
                      {s.list.map((l, i) => <li key={i}>{l}</li>)}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-hairline bg-surface p-6 text-sm text-ink-muted">
            <p>
              Questions about this document? Email{" "}
              <a href={`mailto:${SITE.email}`} className="text-brand-bright">{SITE.email}</a>.
            </p>
            <p className="mt-3 text-xs">
              This is a general template provided for convenience and does not constitute legal advice.
              Please have it reviewed by a qualified legal professional before relying on it.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}

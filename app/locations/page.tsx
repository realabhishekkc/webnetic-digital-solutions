import Link from "next/link";
import type { Metadata } from "next";
import { LOCATIONS } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/Section";
import { CTABand } from "@/components/CTABand";
import { Reveal } from "@/components/Reveal";
import { Pin, ArrowRight } from "@/components/icons";

export const metadata: Metadata = pageMeta({
  title: "Web Design Locations | Western Sydney & Inner West — Webnetic",
  description:
    "Webnetic builds websites, SEO and AI for businesses across Sydney — Parramatta, Auburn, Ashfield, Granville and surrounding suburbs. Find your area.",
  path: "/locations",
});

export default function LocationsHub() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Locations", path: "/locations" }]} />

      <section className="container-page mt-10">
        <SectionHeading
          as="h1"
          eyebrow="Areas we serve"
          title="Web design and development across Sydney"
          intro="Webnetic Digital Solutions is a Sydney web and AI agency working with businesses across Western Sydney and the Inner West. We build fast, search-ready websites and the local SEO that helps nearby customers find you. Choose your area below, or get in touch wherever you are in Sydney."
        />
      </section>

      <section className="container-page mt-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {LOCATIONS.map((loc, i) => (
            <Reveal as="div" key={loc.slug} delay={i * 0.05}>
              <Link
                href={`/locations/${loc.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-hairline bg-surface p-7 transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-hairline text-brand">
                    <Pin size={20} />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-medium text-ink">{loc.name}</h2>
                    <p className="text-xs text-ink-muted">{loc.region} · {loc.postcode}</p>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">{loc.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright">
                  Web design in {loc.name}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-sm text-ink-muted">
          Not listed? We work with businesses right across Sydney and Australia.{" "}
          <Link href="/contact" className="text-brand-bright">Get in touch</Link> and we&apos;ll help.
        </p>
      </section>

      <CTABand title="Want to be found by customers near you?" />
    </>
  );
}

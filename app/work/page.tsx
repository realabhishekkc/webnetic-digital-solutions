import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/Section";
import { ProjectGrid } from "@/components/ProjectGrid";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = pageMeta({
  title: "Our Work | Web, SEO & AI Projects — Webnetic",
  description:
    "Selected Webnetic projects — tour sites, local services, a tech publication powered by an AI content pipeline, portfolios and premium domains.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Work", path: "/work" }]} />

      <section className="container-page mt-10">
        <SectionHeading
          as="h1"
          eyebrow="Work"
          title="Sites and systems we've shipped"
          intro="A selection of real projects across tourism, local services, publishing and personal brands, each designed, built and, where it counts, automated by Webnetic."
        />
      </section>

      <section className="container-page mt-16">
        <ProjectGrid />
      </section>

      <CTABand title="Your project could be next." />
    </>
  );
}

import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/Section";
import { BlogList } from "@/components/BlogList";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = pageMeta({
  title: "Blog | Web, SEO, AEO, GEO & AI Insights — Webnetic",
  description:
    "Practical articles on web development, SEO, AEO, GEO and AI automation from Webnetic — including what GEO is, AEO vs SEO, and cutting content costs with AI.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />

      <section className="container-page mt-10">
        <SectionHeading
          as="h1"
          eyebrow="Blog"
          title="Insights on web, search and AI"
          intro="Clear, practical writing on building fast websites, ranking on Google, getting cited by AI engines and automating the work behind the scenes."
        />
      </section>

      <section className="container-page mt-12">
        <BlogList />
      </section>

      <CTABand title="Want this kind of thinking applied to your business?" />
    </>
  );
}

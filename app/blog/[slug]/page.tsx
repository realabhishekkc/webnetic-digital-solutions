import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { POSTS, getPost, postSlugs, type Block } from "@/lib/posts";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABand } from "@/components/CTABand";
import { FAQAccordion } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, faqSchema } from "@/lib/schema";
import { Clock, ArrowRight, ArrowUpRight, LinkedIn, XLogo } from "@/components/icons";

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return pageMeta({
    title: post.titleTag,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    ogTitle: post.title,
    type: "article",
    publishedTime: post.date,
    image: `/blog/${post.slug}.jpg`,
  });
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h3":
      return <h3 className="mt-8 font-display text-xl font-medium text-ink">{block.text}</h3>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-5">
          {block.items.map((it, i) => <li key={i}>{it}</li>)}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-5">
          {block.items.map((it, i) => <li key={i}>{it}</li>)}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="my-6 border-l-2 border-brand pl-5 text-lg italic text-ink">
          {block.text}
        </blockquote>
      );
    case "links":
      return (
        <ul className="my-2 grid gap-2 sm:grid-cols-2">
          {block.items.map((l, i) => (
            <li key={i}>
              <Link
                href={l.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-hairline bg-surface px-4 py-3 text-sm font-medium !text-ink no-underline transition-colors hover:border-brand/40"
              >
                {l.label}
                <ArrowUpRight size={16} className="text-brand transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-raised">
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} className="px-4 py-3 font-medium text-ink">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-4 py-3 ${ci === 0 ? "font-medium text-ink" : "text-ink-muted"}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
  const shareUrl = `${SITE.url}/blog/${post.slug}`;
  const xShare = `https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`;
  const liShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <>
      <JsonLd data={post.faqs?.length ? [articleSchema(post), faqSchema(post.faqs)] : articleSchema(post)} />
      <Breadcrumbs
        items={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <article className="container-page mt-10">
        <header className="mx-auto max-w-prose">
          <div className="flex items-center gap-3 text-xs text-ink-muted">
            <span className="rounded-full border border-hairline bg-brand/5 px-3 py-1 font-medium text-brand-bright">
              {post.category}
            </span>
            <time dateTime={post.date}>{fmtDate(post.date)}</time>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} /> {post.readingTime} min read
            </span>
          </div>
          <h1 className="mt-5 text-display-md font-semibold leading-tight text-ink">{post.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{post.intro}</p>
          <p className="mt-5 text-sm text-ink-muted">By {post.author}</p>
        </header>

        {/* featured image */}
        <div className="relative mx-auto mt-10 aspect-[16/9] max-w-4xl overflow-hidden rounded-3xl border border-hairline">
          <Image
            src={`/blog/${post.slug}.jpg`}
            alt={post.heroAlt}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-12 lg:grid-cols-[220px_1fr]">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                On this page
              </p>
              <nav aria-label="Table of contents" className="mt-4 space-y-2 border-l border-hairline">
                {post.sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="-ml-px block border-l border-transparent pl-4 text-sm text-ink-muted transition-colors hover:border-brand hover:text-ink"
                  >
                    {s.heading}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Body */}
          <div className="prose-content max-w-prose space-y-5 text-base">
            {post.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="mt-10 font-display text-2xl font-semibold text-ink">{section.heading}</h2>
                <div className="mt-4 space-y-5">
                  {section.blocks.map((b, i) => (
                    <BlockRenderer key={i} block={b} />
                  ))}
                </div>
              </section>
            ))}

            {/* Share */}
            <div className="mt-12 flex items-center gap-3 border-t border-hairline pt-6">
              <span className="text-sm text-ink-muted">Share</span>
              <a
                href={xShare}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted transition-colors hover:border-brand/50 hover:text-ink"
              >
                <XLogo size={16} />
              </a>
              <a
                href={liShare}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted transition-colors hover:border-brand/50 hover:text-ink"
              >
                <LinkedIn size={18} />
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* FAQ (AEO) */}
      {post.faqs?.length ? (
        <section className="container-page mt-24">
          <div className="mx-auto max-w-prose">
            <h2 className="font-display text-display-sm font-semibold text-ink">Frequently asked questions</h2>
            <div className="mt-8">
              <FAQAccordion faqs={post.faqs} />
            </div>
          </div>
        </section>
      ) : null}

      {/* Related posts */}
      <section className="container-page mt-24">
        <h2 className="font-display text-display-sm font-semibold text-ink">Related articles</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:border-brand/40"
            >
              <span className="text-xs font-medium text-brand-bright">{p.category}</span>
              <span className="mt-2 font-display text-lg font-medium text-ink">{p.title}</span>
              <span className="mt-2 text-sm leading-relaxed text-ink-muted">{p.excerpt}</span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright">
                Read article
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}

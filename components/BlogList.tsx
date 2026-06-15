"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { POSTS, POST_CATEGORIES } from "@/lib/posts";
import { Search, ArrowRight, Clock } from "./icons";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });

export function BlogList() {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return POSTS.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return matchCat && matchQuery;
    }).sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {POST_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                category === c
                  ? "border-brand/50 bg-brand/10 text-brand-bright"
                  : "border-hairline text-ink-muted hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="relative md:w-64">
          <span className="sr-only">Search articles</span>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            className="w-full rounded-full border border-hairline bg-surface py-2 pl-9 pr-4 text-sm text-ink placeholder:text-ink-muted focus:border-brand/50 focus:outline-none"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-ink-muted">No articles match your search yet.</p>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-surface transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow"
              >
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[#0F1729] to-[#161F33]">
                  <div className="absolute inset-0 grid-backdrop opacity-40" />
                  <span className="absolute left-4 top-4 rounded-full border border-hairline bg-bg/50 px-3 py-1 text-xs font-medium text-brand-bright backdrop-blur-md">
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs text-ink-muted">
                    <time dateTime={p.date}>{fmtDate(p.date)}</time>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={13} /> {p.readingTime} min read
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-lg font-medium leading-snug text-ink">
                    {p.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{p.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright">
                    Read article
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import { SITE } from "./site";

type PageMetaArgs = {
  title: string;
  description: string;
  path: string; // e.g. "/services/seo"
  ogTitle?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

// Builds consistent, unique metadata (title, description, canonical, OG, Twitter) per page.
export function pageMeta({
  title,
  description,
  path,
  ogTitle,
  type = "website",
  publishedTime,
}: PageMetaArgs): Metadata {
  const url = `${SITE.url}${path === "/" ? "" : path}`;
  return {
    // absolute bypasses the layout title template — our titles are already complete (<= ~60 chars)
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle || title,
      description,
      url,
      siteName: SITE.name,
      locale: "en_AU",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle || title,
      description,
      images: ["/og.png"],
    },
  };
}

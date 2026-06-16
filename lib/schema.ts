// JSON-LD builders. Keep entity naming consistent for SEO + GEO.
import { SITE, SAME_AS } from "./site";
import type { FAQ } from "./services";
import type { Post } from "./posts";

const LOGO = `${SITE.url}/icon.svg`;
const OG = `${SITE.url}/og.png`;

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  alternateName: SITE.shortName,
  url: SITE.url,
  logo: LOGO,
  image: OG,
  description: SITE.description,
  email: SITE.email,
  foundingDate: SITE.founded,
  sameAs: SAME_AS,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.locality,
    addressRegion: SITE.region,
    addressCountry: SITE.countryCode,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: SITE.email,
    areaServed: "AU",
    availableLanguage: ["en"],
  },
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  publisher: { "@id": `${SITE.url}/#organization` },
  inLanguage: "en-AU",
});

export const localBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#localbusiness`,
  name: SITE.name,
  image: OG,
  url: SITE.url,
  email: SITE.email,
  priceRange: "$$",
  areaServed: { "@type": "City", name: "Sydney" },
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.locality,
    addressRegion: SITE.region,
    addressCountry: SITE.countryCode,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: SAME_AS,
});

export const serviceSchema = (s: {
  name: string;
  description: string;
  slug: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.name,
  description: s.description,
  serviceType: s.name,
  url: `${SITE.url}/services/${s.slug}`,
  provider: { "@id": `${SITE.url}/#organization` },
  areaServed: { "@type": "City", name: "Sydney" },
});

// Localised service for suburb landing pages — areaServed set to the suburb (local SEO).
export const localServiceSchema = (loc: {
  name: string;
  slug: string;
  postcode: string;
  region: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: `Web Design & Development in ${loc.name}`,
  serviceType: "Web design and development",
  description: `Fast, SEO-ready websites, AI and automation for businesses in ${loc.name} (${loc.postcode}), ${loc.region}, by Webnetic Digital Solutions.`,
  url: `${SITE.url}/locations/${loc.slug}`,
  provider: { "@id": `${SITE.url}/#organization` },
  areaServed: { "@type": "City", name: `${loc.name}, ${SITE.region}` },
});

export const faqSchema = (faqs: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${SITE.url}${item.path}`,
  })),
});

export const articleSchema = (post: Post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.metaDescription,
  datePublished: post.date,
  dateModified: post.updated || post.date,
  inLanguage: "en-AU",
  image: `${SITE.url}/blog/${post.slug}.jpg`,
  url: `${SITE.url}/blog/${post.slug}`,
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/blog/${post.slug}` },
  author: { "@type": "Organization", name: post.author, url: SITE.url },
  publisher: { "@id": `${SITE.url}/#organization` },
});

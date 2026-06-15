# Webnetic Digital Solutions

A premium marketing website for **Webnetic Digital Solutions** — a Sydney digital agency blending web craft with AI. Built for performance, conversion and to rank across Google search, answer engines (AEO) and generative AI engines (GEO).

> Where ideas become intelligent digital solutions.

## Tech stack

- **Next.js 14 (App Router) + TypeScript** — static generation (SSG) for every page
- **Tailwind CSS** — custom design tokens (dark theme + cyan glow, light-mode toggle)
- **Framer Motion** — reveal-on-scroll and UI motion
- **Canvas 2D** — the interactive neural-network hero animation (lighter than WebGL, 60fps, reduced-motion fallback)
- **next-sitemap** — automated `sitemap.xml` + `robots.txt`
- Self-contained JSON-LD structured data (Organization, WebSite, LocalBusiness, Service, FAQPage, BreadcrumbList, BlogPosting)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

### Build & run production

```bash
npm run build      # builds + runs next-sitemap (postbuild) to generate sitemap.xml & robots.txt
npm run start
```

### Regenerating brand assets (favicon / OG image)

The favicons and OG image are rasterised from the SVG sources in `public/` (`icon.svg`, `og.svg`):

```bash
npm install --no-save sharp png-to-ico
node scripts/gen-assets.mjs
```

### Refreshing project screenshots

The `/work` cards use real screenshots of each live site, stored in `public/projects/`.
To recapture them (e.g. after a project site changes):

```bash
npm install --no-save playwright && npx playwright install chromium
node scripts/shots-projects.mjs
```

Edit the site list and paths in `scripts/shots-projects.mjs` and `lib/projects.ts`.

## Project structure

```
app/                     Routes (App Router)
  layout.tsx             Root layout: fonts, metadata, header/footer, global JSON-LD
  page.tsx               Home (hero, services, process, work, why, FAQ)
  about/                 About
  services/              Services hub + /services/[slug] template (7 services)
  work/                  Projects / portfolio
  blog/                  Blog index + /blog/[slug] post template
  contact/               Contact (form + LocalBusiness schema)
  privacy-policy/  terms/ Legal
  not-found.tsx          Custom branded 404
components/              Header, Footer, Hero (canvas), cards, FAQ, etc.
lib/                     Content + config (single source of truth)
public/                  Brand assets, generated sitemap.xml / robots.txt
scripts/gen-assets.mjs   Favicon + OG generator
```

## Where to edit content

All copy and data live in `lib/` — no need to touch components for routine updates:

| What | File |
| --- | --- |
| Brand name, email, location, nav, socials | `lib/site.ts` |
| The 7 service pages (copy, deliverables, FAQs, links) | `lib/services.ts` |
| Portfolio projects shown on `/work` (incl. screenshot path) | `lib/projects.ts` |
| Blog articles (sections render automatically, incl. table of contents) | `lib/posts.ts` |
| Per-page metadata helper (title/description/OG/canonical) | `lib/seo.ts` |
| JSON-LD structured-data builders | `lib/schema.ts` |
| Design tokens (colours, type, motion) | `tailwind.config.ts` + `app/globals.css` |

Brand colours, fonts and spacing are defined once in `tailwind.config.ts` and `app/globals.css` (CSS variables, used by the light/dark theme).

## Connecting the contact form

The contact form (`components/ContactForm.tsx`) currently has **no backend** — on submit it validates, then composes a pre-filled email to `info@webnetic.com.au` via `mailto:` and shows a success state.

To wire a real handler, replace the body of `submit()` with a `fetch()` to your endpoint. Options:

1. **Next.js Route Handler** — create `app/api/contact/route.ts` and send mail (e.g. with [Resend](https://resend.com)). `POST` the form values to `/api/contact`.
2. **Form service** — point the `fetch()` at [Formspree](https://formspree.io), Basin or similar.

```ts
// inside submit(), instead of the mailto line:
await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(values),
});
```

## Configuration

- **Site URL** — set in `lib/site.ts` (`SITE.url`) and `next-sitemap.config.js` (`siteUrl`, or the `SITE_URL` env var). Update both if the domain changes.
- **Social profiles** — `SOCIALS` in `lib/site.ts` feed footer links and the `sameAs` JSON-LD used for entity consistency (GEO).

## SEO / AEO / GEO built in

- Unique title, meta description, canonical, Open Graph + Twitter tags per page (`lib/seo.ts`).
- Semantic HTML5 landmarks, one `<h1>` per page, logical heading hierarchy.
- FAQ blocks with `FAQPage` schema on the home page and every service page (AEO).
- Question-led headings with concise, self-contained answers (AEO).
- `Service`, `BreadcrumbList`, `Organization`, `WebSite`, `LocalBusiness`, `BlogPosting` JSON-LD.
- `robots.txt` explicitly allows AI crawlers (GPTBot, PerplexityBot, Google-Extended, ClaudeBot, CCBot…) to support GEO.
- Consistent entity naming and `sameAs` links so AI engines parse the brand correctly.

## Pre-launch SEO checklist

- [ ] Set the production domain in `lib/site.ts` and `next-sitemap.config.js`.
- [ ] Run `npm run build` and confirm `public/sitemap.xml` + `public/robots.txt` regenerate.
- [ ] Connect the contact form to a real backend (see above) and test an end-to-end submission.
- [ ] Verify each page's title (≤ ~60 chars) and meta description (≤ ~155 chars).
- [ ] Validate JSON-LD with [Google Rich Results Test](https://search.google.com/test/rich-results).
- [ ] Submit `sitemap.xml` in Google Search Console; verify the property.
- [ ] Create / link the Google Business Profile (Sydney) and confirm NAP consistency.
- [ ] Replace placeholder social URLs in `lib/site.ts` with real profiles.
- [ ] Run Lighthouse (mobile) — target 90+ for Performance, Accessibility, Best Practices, SEO.
- [ ] Confirm reduced-motion behaviour (hero falls back to a static gradient).
- [ ] Add analytics if desired — and enable the consent notice when you do.

## Accessibility & performance

- WCAG AA contrast on the dark theme, visible focus states, keyboard-navigable nav and menus, skip-to-content link.
- `prefers-reduced-motion` respected globally; the hero animation pauses off-screen and when the tab is hidden.
- Fully responsive from 360px to large desktop.

---

© Webnetic Digital Solutions. Contact: info@webnetic.com.au · Sydney, Australia.

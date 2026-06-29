// Generates on-brand featured images for each blog post → public/blog/<slug>.jpg (1200x675).
// Run: node scripts/gen-blog-images.mjs  (needs: npm i --no-save sharp)
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const pub = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "blog");
mkdirSync(pub, { recursive: true });

// accent pair per category
const ACCENT = {
  Web: ["#1E88E5", "#38B6FF", "#7DD3FF"],
  SEO: ["#1565C0", "#1E88E5", "#38B6FF"],
  AI: ["#6366F1", "#38B6FF", "#7DD3FF"],
  Automation: ["#1E88E5", "#38B6FF", "#7DD3FF"],
  Business: ["#38B6FF", "#6366F1", "#7DD3FF"],
};

const POSTS = [
  { slug: "what-is-geo-and-why-it-matters-in-2026", display: "What is GEO and why it matters in 2026", category: "AI" },
  { slug: "aeo-vs-seo-what-is-the-difference", display: "AEO vs SEO: what is the difference?", category: "SEO" },
  { slug: "how-ai-automation-cuts-content-costs", display: "How AI automation cuts content costs", category: "Automation" },
  { slug: "best-web-developer-near-me", display: "How to find the best web developer near you", category: "Web" },
  { slug: "affordable-web-development-sydney", display: "Affordable web development in Sydney", category: "Business" },
  { slug: "web-design-agency-near-me", display: "How to choose a web design agency near you", category: "Web" },
  { slug: "web-design-agency-parramatta", display: "Web design agency in Parramatta", category: "Business" },
  { slug: "web-design-auburn", display: "Web design & development in Auburn", category: "Business" },
  { slug: "web-design-ashfield", display: "Web design & development in Ashfield", category: "Business" },
  { slug: "web-design-granville", display: "Web design & development in Granville", category: "Business" },
  { slug: "wordpress-vs-custom-website", display: "WordPress vs custom website: which is right?", category: "Web" },
  { slug: "how-to-speed-up-your-website", display: "How to make your website load faster in 2026", category: "Web" },
  { slug: "local-seo-checklist-small-business", display: "Local SEO checklist for small businesses", category: "SEO" },
  { slug: "how-to-get-cited-by-ai-search", display: "How to get cited by ChatGPT and AI search", category: "AI" },
  { slug: "do-you-still-need-a-website-in-2026", display: "Do you still need a website in 2026?", category: "Business" },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function wrap(text, max = 22) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > max && line) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 4);
}

function svg({ display, category }) {
  const [a, b, c] = ACCENT[category] || ACCENT.Web;
  const lines = wrap(display, 22);
  const fs = lines.length >= 4 ? 56 : lines.length === 3 ? 64 : 72;
  const lh = fs * 1.12;
  const blockH = lines.length * lh;
  const startY = 540 - blockH + fs; // anchor block near lower area
  const tspans = lines
    .map((l, i) => `<tspan x="80" y="${Math.round(startY + i * lh)}">${esc(l)}</tspan>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="675" gradientUnits="userSpaceOnUse">
      <stop stop-color="#070B14"/><stop offset="1" stop-color="#0F1729"/>
    </linearGradient>
    <linearGradient id="acc" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
      <stop stop-color="${a}"/><stop offset="0.5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.12" r="0.7">
      <stop stop-color="${b}" stop-opacity="0.28"/><stop offset="1" stop-color="${b}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.5" fill="#ffffff" opacity="0.05"/>
    </pattern>
  </defs>

  <rect width="1200" height="675" fill="url(#bg)"/>
  <rect width="1200" height="675" fill="url(#dots)"/>
  <rect width="1200" height="675" fill="url(#glow)"/>

  <!-- big faint bulb-brain motif bottom-right -->
  <g transform="translate(820,300) scale(9)" opacity="0.07">
    <path d="M16 30.5c-2.6-2-4.3-5.2-4.3-8.8C11.7 14.9 17.2 9.5 24 9.5s12.3 5.4 12.3 12.2c0 3.6-1.7 6.8-4.3 8.8-1.2.9-1.9 2.3-1.9 3.8v.7H17.9v-.7c0-1.5-.7-2.9-1.9-3.8Z" stroke="${b}" stroke-width="1.6" fill="none"/>
    <path d="M24 14.5v8M24 22.5l-3-2.5M24 22.5l3-2.5" stroke="${c}" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M27 15.6c2 .4 3.4 2 3.4 3.9 0 1-.4 1.9-1 2.6.7.6 1.1 1.5 1.1 2.5 0 1.8-1.4 3.3-3.2 3.7" stroke="${b}" stroke-width="1.3" stroke-linecap="round" fill="none"/>
  </g>

  <!-- logo mark + wordmark -->
  <g transform="translate(80,68) scale(1.05)">
    <g stroke="url(#acc)" stroke-width="1.6" stroke-linecap="round" opacity="0.9">
      <path d="M24 4v3"/><path d="M9 10l2.2 2.2"/><path d="M39 10l-2.2 2.2"/><path d="M5 24h2.8"/><path d="M40.2 24H43"/>
    </g>
    <path d="M16 30.5c-2.6-2-4.3-5.2-4.3-8.8C11.7 14.9 17.2 9.5 24 9.5s12.3 5.4 12.3 12.2c0 3.6-1.7 6.8-4.3 8.8-1.2.9-1.9 2.3-1.9 3.8v.7H17.9v-.7c0-1.5-.7-2.9-1.9-3.8Z" stroke="url(#acc)" stroke-width="1.8" fill="rgba(56,182,255,0.08)"/>
    <path d="M24 14.5v8M24 22.5l-3-2.5M24 22.5l3-2.5" stroke="#7DD3FF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M27 15.6c2 .4 3.4 2 3.4 3.9 0 1-.4 1.9-1 2.6.7.6 1.1 1.5 1.1 2.5 0 1.8-1.4 3.3-3.2 3.7" stroke="#38B6FF" stroke-width="1.4" stroke-linecap="round" fill="none"/>
    <path d="M19 39.5h10M20.5 42.5h7" stroke="url(#acc)" stroke-width="1.8" stroke-linecap="round"/>
  </g>
  <text x="138" y="90" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="3" fill="#E6EDF5">WEBNETIC</text>
  <text x="139" y="112" font-family="Inter, Arial, sans-serif" font-size="12" letter-spacing="4" fill="#8B95A7">DIGITAL SOLUTIONS</text>

  <!-- category pill -->
  <g>
    <rect x="80" y="${startY - fs - 70}" width="${70 + category.length * 11}" height="38" rx="19" fill="rgba(56,182,255,0.08)" stroke="${b}" stroke-opacity="0.5"/>
    <text x="${100}" y="${startY - fs - 45}" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="600" letter-spacing="2" fill="${c}">${esc(category.toUpperCase())}</text>
  </g>

  <!-- title -->
  <text font-family="Inter, Arial, sans-serif" font-size="${fs}" font-weight="700" fill="#E6EDF5">${tspans}</text>

  <!-- footer -->
  <line x1="80" y1="612" x2="1120" y2="612" stroke="#ffffff" stroke-opacity="0.08"/>
  <text x="80" y="642" font-family="Inter, Arial, sans-serif" font-size="18" fill="#8B95A7">webnetic.com.au</text>
  <text x="1120" y="642" text-anchor="end" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="600" fill="${b}">Web · SEO · AI · Sydney</text>
</svg>`;
}

let done = 0;
await Promise.all(
  POSTS.map(async (p) => {
    await sharp(Buffer.from(svg(p))).jpeg({ quality: 86 }).toFile(join(pub, `${p.slug}.jpg`));
    done++;
  })
);
console.log(`Generated ${done} blog featured images in public/blog/`);

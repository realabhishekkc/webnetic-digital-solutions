// Generates abstract on-brand hero background images → public/heroes/<name>.jpg (1600x700).
// Run: node scripts/gen-hero-images.mjs   (needs: npm i --no-save sharp)
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "heroes");
mkdirSync(out, { recursive: true });

const W = 1600;
const H = 700;

const PALETTE = {
  cyan: ["#1E88E5", "#38B6FF", "#7DD3FF"],
  indigo: ["#6366F1", "#38B6FF", "#7DD3FF"],
  blue: ["#1565C0", "#1E88E5", "#38B6FF"],
};

// seeded PRNG so output is deterministic
function rng(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function glows(a, b) {
  return `
    <radialGradient id="g1" cx="0.78" cy="0.18" r="0.6">
      <stop stop-color="${b}" stop-opacity="0.45"/><stop offset="1" stop-color="${b}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="0.15" cy="0.9" r="0.6">
      <stop stop-color="${a}" stop-opacity="0.35"/><stop offset="1" stop-color="${a}" stop-opacity="0"/>
    </radialGradient>`;
}

function network(rand, [a, b, c]) {
  const n = 30;
  const nodes = Array.from({ length: n }, () => ({ x: rand() * W, y: rand() * H, r: rand() * 2 + 1.4 }));
  let lines = "";
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++) {
      const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
      const d = Math.hypot(dx, dy);
      if (d < 240) {
        const o = (1 - d / 240) * 0.45;
        lines += `<line x1="${nodes[i].x.toFixed(0)}" y1="${nodes[i].y.toFixed(0)}" x2="${nodes[j].x.toFixed(0)}" y2="${nodes[j].y.toFixed(0)}" stroke="${b}" stroke-opacity="${o.toFixed(2)}" stroke-width="1"/>`;
      }
    }
  const dots = nodes.map((p) => `<circle cx="${p.x.toFixed(0)}" cy="${p.y.toFixed(0)}" r="${p.r.toFixed(1)}" fill="${c}" fill-opacity="0.8"/>`).join("");
  return lines + dots;
}

function rings(rand, [a, b, c]) {
  const cx = W * 0.74, cy = H * 0.4;
  let r = "";
  for (let i = 1; i <= 9; i++) {
    r += `<circle cx="${cx}" cy="${cy}" r="${i * 78}" fill="none" stroke="${b}" stroke-opacity="${(0.4 - i * 0.035).toFixed(2)}" stroke-width="1.2"/>`;
  }
  r += `<circle cx="${cx}" cy="${cy}" r="6" fill="${c}"/>`;
  return r;
}

function mesh(rand, [a, b, c]) {
  // soft overlapping blobs
  let defs = "", shapes = "";
  const cols = [a, b, c, b];
  for (let i = 0; i < 4; i++) {
    const x = rand() * W, y = rand() * H, rad = 260 + rand() * 260;
    defs += `<radialGradient id="b${i}" cx="0.5" cy="0.5" r="0.5"><stop stop-color="${cols[i]}" stop-opacity="0.30"/><stop offset="1" stop-color="${cols[i]}" stop-opacity="0"/></radialGradient>`;
    shapes += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rad.toFixed(0)}" fill="url(#b${i})"/>`;
  }
  return `<defs>${defs}</defs>${shapes}`;
}

function grid(rand, [a, b, c]) {
  let lines = "";
  for (let gx = 0; gx <= W; gx += 64)
    lines += `<line x1="${gx}" y1="0" x2="${gx}" y2="${H}" stroke="${b}" stroke-opacity="0.06" stroke-width="1"/>`;
  for (let gy = 0; gy <= H; gy += 64)
    lines += `<line x1="0" y1="${gy}" x2="${W}" y2="${gy}" stroke="${b}" stroke-opacity="0.06" stroke-width="1"/>`;
  // a couple of bright accent lines
  lines += `<line x1="0" y1="${H * 0.5}" x2="${W}" y2="${H * 0.5}" stroke="${c}" stroke-opacity="0.18" stroke-width="1.5"/>`;
  lines += `<line x1="${W * 0.66}" y1="0" x2="${W * 0.66}" y2="${H}" stroke="${c}" stroke-opacity="0.14" stroke-width="1.5"/>`;
  return lines;
}

function beams(rand, [a, b, c]) {
  let defs = `<linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${c}" stop-opacity="0.22"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient>`;
  let r = `<defs>${defs}</defs><g transform="rotate(-24 ${W} 0)">`;
  for (let i = 0; i < 5; i++) {
    const x = 500 + i * 230;
    r += `<rect x="${x}" y="-200" width="${60 + (i % 2) * 50}" height="${H + 500}" fill="url(#beam)"/>`;
  }
  r += `</g>`;
  return r;
}

const STYLES = { network, rings, mesh, grid, beams };

function build({ style, palette, seed }) {
  const pal = PALETTE[palette];
  const rand = rng(seed);
  const inner = STYLES[style](rand, pal);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop stop-color="#070B14"/><stop offset="1" stop-color="#0E1626"/>
    </linearGradient>
    ${glows(pal[0], pal[1])}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${inner}
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <rect width="${W}" height="${H}" fill="url(#g2)"/>
</svg>`;
}

const IMAGES = {
  about: { style: "mesh", palette: "indigo", seed: 11 },
  services: { style: "network", palette: "cyan", seed: 22 },
  work: { style: "beams", palette: "cyan", seed: 33 },
  blog: { style: "grid", palette: "blue", seed: 44 },
  contact: { style: "rings", palette: "indigo", seed: 55 },
  locations: { style: "network", palette: "blue", seed: 66 },
  location: { style: "grid", palette: "cyan", seed: 77 },
  "service-web-development": { style: "network", palette: "cyan", seed: 101 },
  "service-seo": { style: "grid", palette: "blue", seed: 102 },
  "service-aeo": { style: "rings", palette: "cyan", seed: 103 },
  "service-geo": { style: "mesh", palette: "indigo", seed: 104 },
  "service-ai-integration": { style: "network", palette: "indigo", seed: 105 },
  "service-ai-automation": { style: "beams", palette: "cyan", seed: 106 },
  "service-social-media-management": { style: "rings", palette: "blue", seed: 107 },
};

let count = 0;
await Promise.all(
  Object.entries(IMAGES).map(async ([name, cfg]) => {
    await sharp(Buffer.from(build(cfg))).jpeg({ quality: 80 }).toFile(join(out, `${name}.jpg`));
    count++;
  })
);
console.log(`Generated ${count} hero background images in public/heroes/`);

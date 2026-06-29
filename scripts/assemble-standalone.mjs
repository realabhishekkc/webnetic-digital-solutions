/**
 * Assemble a complete, self-contained standalone build.
 *
 * Next.js `output: "standalone"` emits `.next/standalone/server.js` plus only
 * the node_modules it needs — but it deliberately does NOT copy `public/` or
 * `.next/static/` into that folder. Without them, CSS/JS/images 404 at runtime.
 *
 * This script copies both into the standalone folder so `.next/standalone/`
 * becomes the one directory you upload to Hostinger's Node.js app.
 *
 * Runs automatically after build via the `postbuild` script.
 */
import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");

if (!existsSync(standalone)) {
  console.error(
    "[assemble-standalone] .next/standalone not found. Is `output: \"standalone\"` set in next.config.mjs? Run `npm run build` first."
  );
  process.exit(1);
}

// 1 · public/  ->  .next/standalone/public/
const publicDir = join(root, "public");
if (existsSync(publicDir)) {
  cpSync(publicDir, join(standalone, "public"), { recursive: true });
  console.log("[assemble-standalone] copied public/ -> .next/standalone/public/");
}

// 2 · .next/static/  ->  .next/standalone/.next/static/
const staticDir = join(root, ".next", "static");
if (existsSync(staticDir)) {
  cpSync(staticDir, join(standalone, ".next", "static"), { recursive: true });
  console.log("[assemble-standalone] copied .next/static/ -> .next/standalone/.next/static/");
}

console.log("[assemble-standalone] Done. Upload the .next/standalone/ folder to your Node.js app.");

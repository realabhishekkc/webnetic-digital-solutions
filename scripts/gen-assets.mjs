// One-off asset generator: rasterises the brand SVGs into PNG/ICO favicons + OG image.
// Run with: node scripts/gen-assets.mjs
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

const icon = await readFile(join(pub, "icon.svg"));
const og = await readFile(join(pub, "og.svg"));

const tasks = [
  sharp(og).png().toFile(join(pub, "og.png")),
  sharp(icon).resize(180, 180).png().toFile(join(pub, "apple-icon.png")),
  sharp(icon).resize(192, 192).png().toFile(join(pub, "android-chrome-192.png")),
  sharp(icon).resize(512, 512).png().toFile(join(pub, "android-chrome-512.png")),
  sharp(icon).resize(32, 32).png().toFile(join(pub, "favicon-32.png")),
];
await Promise.all(tasks);

const ico = await pngToIco([join(pub, "favicon-32.png")]);
await writeFile(join(pub, "favicon.ico"), ico);

console.log("Generated: og.png, apple-icon.png, android-chrome-192/512.png, favicon.ico");

import { chromium } from "playwright";

const sites = [
  { slug: "sasa-grup", url: "https://sasagrup.com.au" },
  { slug: "tech-trends-central", url: "https://techtrendscentral.com" },
  { slug: "hashifyai", url: "https://hashifyai.com" },
  { slug: "abhishek-kc-portfolio", url: "https://abhishekkc.com" },
  { slug: "one-life-tours-zakynthos", url: "https://onelifetourszakynthos.com" },
];

const browser = await chromium.launch({ args: ["--ignore-certificate-errors"] });
for (const s of sites) {
  try {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1.5, ignoreHTTPSErrors: true });
    const page = await ctx.newPage();
    await page.goto(s.url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(3500);
    await page.screenshot({ path: `public/projects/${s.slug}.jpg`, type: "jpeg", quality: 78, clip: { x: 0, y: 0, width: 1280, height: 800 } });
    await ctx.close();
    console.log("OK", s.slug);
  } catch (e) {
    console.log("FAIL", s.slug, e.message.split("\n")[0]);
  }
}
await browser.close();

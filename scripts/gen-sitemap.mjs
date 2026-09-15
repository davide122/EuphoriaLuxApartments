import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const BASE = "https://euphorialuxurysuites.it";
const NOW = new Date().toISOString();
function xmlEscape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
const occ = readFileSync(resolve(ROOT, "src/lib/occasions.ts"), "utf8");
const seo = readFileSync(resolve(ROOT, "src/lib/seo-content.ts"), "utf8");
function getSlugs(text, start) {
  const i = text.indexOf(start);
  const t = i >= 0 ? text.slice(i) : text;
  return [...t.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}
function getDate(slug, ...files) {
  for (const text of files) {
    for (const f of ["dateModifiedISO", "datePublishedISO"]) {
      const re = new RegExp(`slug:\\s*"${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^}]*?${f}:\\s*"([^"]+)"`, "s");
      const m = text.match(re);
      if (m) return new Date(m[1]).toISOString();
    }
  }
  return NOW;
}
function getSuiteImg(slug, text) {
  const re = new RegExp(`slug:\\s*"${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[\\s\\S]{0,2000}?suggestedSuite:\\s*\"?([a-zA-Z0-9]+)`, "m");
  const m = text.match(re);
  if (m && m[1] === "infinity") return `${BASE}/infinity-letto.jpg`;
  return `${BASE}/passion-letto-jacuzzi-sauna.jpg`;
}
const OCCASION_SLUGS = getSlugs(occ, "const OCCASIONS");
const SEO_SLUGS = getSlugs(seo, "export const SEO_LANDINGS");
const LANDING_SLUGS = SEO_SLUGS.filter((s) => !OCCASION_SLUGS.includes(s));
const blogIdx = seo.indexOf("export const BLOG_POSTS");
const BLOG_SLUGS = getSlugs(blogIdx >= 0 ? seo.slice(blogIdx) : seo, "export const BLOG_POSTS");
const urls = [];
function add(u) { urls.push(u); }
add({ loc: `${BASE}/`, lastmod: NOW, changefreq: "weekly", priority: "1.00", images: [`${BASE}/passion-letto-jacuzzi-sauna.jpg`, `${BASE}/infinity-letto.jpg`] });
add({ loc: `${BASE}/suites`, lastmod: NOW, changefreq: "weekly", priority: "0.90", images: [`${BASE}/passion-letto-jacuzzi-sauna.jpg`, `${BASE}/infinity-letto.jpg`] });
for (const s of ["passion", "infinity"]) {
  add({ loc: `${BASE}/suites/${s}`, lastmod: NOW, changefreq: "weekly", priority: "0.85", images: [s === "passion" ? `${BASE}/passion-letto-jacuzzi-sauna.jpg` : `${BASE}/infinity-letto.jpg`] });
}
add({ loc: `${BASE}/prenota`, lastmod: NOW, changefreq: "weekly", priority: "0.88", images: [`${BASE}/infinity-letto.jpg`] });
add({ loc: `${BASE}/ospiti`, lastmod: NOW, changefreq: "monthly", priority: "0.70" });
for (const s of ["passion", "infinity"]) for (const m of ["pernottamento", "dayuse"])
  add({ loc: `${BASE}/ospiti/${s}/${m}`, lastmod: NOW, changefreq: "monthly", priority: "0.60" });
add({ loc: `${BASE}/blog`, lastmod: NOW, changefreq: "weekly", priority: "0.65" });
for (const s of OCCASION_SLUGS)
  add({ loc: `${BASE}/${s}`, lastmod: getDate(s, occ, seo), changefreq: "monthly", priority: "0.75", images: [getSuiteImg(s, occ)] });
for (const s of LANDING_SLUGS)
  add({ loc: `${BASE}/${s}`, lastmod: getDate(s, seo), changefreq: "monthly", priority: "0.70" });
for (const s of BLOG_SLUGS)
  add({ loc: `${BASE}/blog/${s}`, lastmod: getDate(s, seo), changefreq: "monthly", priority: "0.55" });
const seen = new Set();
const final = [];
for (const u of urls) {
  if (seen.has(u.loc)) continue;
  seen.add(u.loc);
  final.push(u);
}
final.sort((a, b) => Number(b.priority) - Number(a.priority) || a.loc.localeCompare(b.loc));
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;
for (const u of final) {
  xml += `  <url>\n`;
  xml += `    <loc>${xmlEscape(u.loc)}</loc>\n`;
  xml += `    <lastmod>${xmlEscape(u.lastmod)}</lastmod>\n`;
  xml += `    <changefreq>${xmlEscape(u.changefreq)}</changefreq>\n`;
  xml += `    <priority>${xmlEscape(u.priority)}</priority>\n`;
  for (const img of u.images || []) {
    xml += `    <image:image><image:loc>${xmlEscape(img)}</image:loc></image:image>\n`;
  }
  xml += `  </url>\n`;
}
xml += `</urlset>\n`;
writeFileSync(resolve(ROOT, "public/sitemap.xml"), xml, "utf8");
console.log("OK:", final.length, "URL →", resolve(ROOT, "public/sitemap.xml"));
console.log("");
const stats = { Home: 0, "Suites (index+detail)": 0, Prenota: 0, Ospiti: 0, Blog: 0, Occasioni: 0, "Landing SEO": 0 };
for (const u of final) {
  if (u.loc === BASE) stats.Home++;
  else if (u.loc.includes("/suites")) stats["Suites (index+detail)"]++;
  else if (u.loc.includes("/prenota")) stats.Prenota++;
  else if (u.loc.includes("/ospiti")) stats.Ospiti++;
  else if (u.loc.includes("/blog")) stats.Blog++;
  else if (OCCASION_SLUGS.some((s) => u.loc.endsWith("/" + s))) stats.Occasioni++;
  else stats["Landing SEO"]++;
}
for (const k in stats) console.log("  ·", k + ":", stats[k]);
console.log("");
console.log("Occasioni SEO (Layout Pro):");
for (const s of OCCASION_SLUGS) console.log("   - /" + s);
console.log("");
console.log("Nuovi Blog Posts:");
const nuoviBlog = [
  "spa-privata-mamma-figlia-perche-funziona",
  "pre-wedding-idea-spa-privata-sposa-amica",
  "perche-andare-in-spa-da-solo-persona-sola",
  "compleanno-diverso-senza-festa-spa-privata",
  "dopo-esami-lavoro-stacca-in-spa-privata",
  "regalo-esperienza-spa-privata-piu-forte-di-oggetti",
];
for (const s of nuoviBlog) console.log("   - /blog/" + s);

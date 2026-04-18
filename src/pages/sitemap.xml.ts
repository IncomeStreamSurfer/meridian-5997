import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ site }) => {
  const base = (site?.toString() ?? import.meta.env.PUBLIC_SITE_URL ?? "https://meridian.vercel.app").replace(/\/$/, "");
  const urls = ["/"].map(
    (p) =>
      `<url><loc>${base}${p}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "content-type": "application/xml" } });
};

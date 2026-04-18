import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ site }) => {
  const base = site?.toString() ?? import.meta.env.PUBLIC_SITE_URL ?? "https://meridian.vercel.app";
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${base.replace(/\/$/, "")}/sitemap.xml\n`;
  return new Response(body, { headers: { "content-type": "text/plain" } });
};

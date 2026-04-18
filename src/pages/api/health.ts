import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({ ok: true, service: "meridian", ts: Date.now() }),
    { headers: { "content-type": "application/json" } },
  );
};

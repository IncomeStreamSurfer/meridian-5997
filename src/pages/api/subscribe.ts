import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  let h = 5381;
  for (let i = 0; i < ip.length; i++) h = ((h << 5) + h + ip.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let payload: { email?: string; source?: string } = {};
  const ct = request.headers.get("content-type") || "";
  try {
    if (ct.includes("application/json")) {
      payload = await request.json();
    } else {
      const fd = await request.formData();
      payload = {
        email: String(fd.get("email") || ""),
        source: String(fd.get("source") || "landing"),
      };
    }
  } catch {
    return json({ ok: false, error: "invalid_request" }, 400);
  }

  const email = (payload.email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: "invalid_email" }, 400);
  }

  const ip = clientAddress ?? request.headers.get("x-forwarded-for")?.split(",")[0] ?? null;

  const { error } = await supabase.from("meridian_subscribers").insert({
    email,
    source: payload.source || "landing",
    ip_hash: hashIp(ip),
  });

  if (error) {
    if (error.code === "23505") {
      return json({ ok: true, already: true });
    }
    console.error("[meridian] subscribe insert failed", error);
    return json({ ok: false, error: "server_error" }, 500);
  }

  return json({ ok: true });
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

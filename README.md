# Meridian — Coming Soon

A specialty coffee brand landing page. Editorial dark/light aesthetic, Supabase-backed
email capture, single deployment on Vercel.

## What's built

- **Hero** with animated copper pulse, Fraunces display type, tagline pulled from Supabase.
- **Brand story** — two-column editorial chapter.
- **Three pillars** (Origin / Craft / Cup) — pulled live from `meridian_content`.
- **Email capture** — posts to `/api/subscribe`, writes to `meridian_subscribers`.
- **Theme toggle** — dark/light, respects `prefers-color-scheme`, persists to localStorage.
- **SEO** — Schema.org JSON-LD, dynamic sitemap, robots.txt, OG/Twitter meta.
- **Harbor hook** — `meridian_content` table ready for automated blog content.

## Stack

- Astro 6 (server output) + Vercel adapter
- Tailwind v4 (`@tailwindcss/vite`)
- Supabase (Postgres + RLS)

## Run locally

```bash
cp .env.example .env
npm install
npm run dev
```

## Env vars

| key | purpose |
| --- | --- |
| `PUBLIC_SUPABASE_URL` | Supabase project URL |
| `PUBLIC_SUPABASE_ANON_KEY` | Supabase anon / publishable key |
| `PUBLIC_SITE_URL` | Canonical URL |

## Next steps

- Point a custom domain at the Vercel project.
- Hook up Resend confirmation email once a domain is verified.

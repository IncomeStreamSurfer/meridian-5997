import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.warn("[meridian] Missing Supabase env vars; subscriber capture will fail.");
}

export const supabase = createClient(url ?? "", key ?? "", {
  auth: { persistSession: false },
});

export type ContentBlock = {
  id: string;
  slug: string;
  title: string;
  body: string | null;
  seo_description: string | null;
  published_at: string | null;
};

export async function getContent(slug: string): Promise<ContentBlock | null> {
  const { data, error } = await supabase
    .from("meridian_content")
    .select("id,slug,title,body,seo_description,published_at")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.warn("[meridian] getContent error", slug, error.message);
    return null;
  }
  return data as ContentBlock | null;
}

export async function getContentBySlugs(slugs: string[]): Promise<Record<string, ContentBlock>> {
  const { data, error } = await supabase
    .from("meridian_content")
    .select("id,slug,title,body,seo_description,published_at")
    .in("slug", slugs);
  if (error || !data) {
    console.warn("[meridian] getContentBySlugs error", error?.message);
    return {};
  }
  return Object.fromEntries((data as ContentBlock[]).map((b) => [b.slug, b]));
}

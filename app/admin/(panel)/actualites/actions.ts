"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fail, slugify, str } from "@/lib/admin";
import { logActivity } from "@/lib/activity";
import { requireAdmin } from "@/lib/admin-auth";
import { readNewsRaw, writeNewsRaw } from "@/lib/news";

const BACK = "/admin/actualites";

export async function saveNews(fd: FormData) {
  const me = await requireAdmin();
  const currentSlug = str(fd, "slug", 120);
  const title = str(fd, "title", 160);
  const date = str(fd, "date", 20);
  const category = str(fd, "category", 60);
  const excerpt = str(fd, "excerpt", 400);
  const image = str(fd, "image", 200);
  const imageAlt = str(fd, "imageAlt", 200);
  const body = String(fd.get("body") ?? "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const slug = currentSlug || slugify(title);
  const back = `/admin/actualites/${currentSlug || "new"}`;
  if (!title || !slug || !date || !excerpt) fail(back, "Titre, date et résumé sont obligatoires.");

  const posts = await readNewsRaw();
  const next = {
    slug,
    title,
    date,
    category: category || "La maison",
    excerpt,
    image: image || "/images/plates.jpg",
    imageAlt: imageAlt || title,
    body,
  };

  const index = posts.findIndex((post) => post.slug === slug);
  if (index >= 0) posts[index] = next;
  else posts.unshift(next);
  await writeNewsRaw(posts);

  revalidatePath("/");
  revalidatePath("/actualites");
  revalidatePath(`/actualites/${slug}`);
  await logActivity({
    actor: me.name,
    category: "news",
    summary: `${index >= 0 ? "a modifié" : "a publié"} l’actualité « ${title} »`,
    link: `/actualites/${slug}`,
  });
  redirect(`${BACK}?ok=${encodeURIComponent(index >= 0 ? "Actualité mise à jour." : "Actualité publiée.")}`);
}

export async function deleteNews(fd: FormData) {
  const me = await requireAdmin();
  const slug = str(fd, "slug", 120);
  const posts = await readNewsRaw();
  const target = posts.find((post) => post.slug === slug);
  await writeNewsRaw(posts.filter((post) => post.slug !== slug));

  revalidatePath("/");
  revalidatePath("/actualites");
  revalidatePath(`/actualites/${slug}`);
  await logActivity({
    actor: me.name,
    category: "news",
    summary: `a supprimé l’actualité « ${target?.title ?? slug} »`,
    link: "/actualites",
  });
  redirect(`${BACK}?ok=${encodeURIComponent("Actualité supprimée.")}`);
}


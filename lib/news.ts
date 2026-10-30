import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  category: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  body: string[];
};

const NEWS_FILE = path.join(process.cwd(), "data", "news.json");

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
}

function withDisplayDate(post: Omit<NewsPost, "displayDate">): NewsPost {
  return { ...post, displayDate: formatDate(post.date) };
}

export async function readNewsRaw(): Promise<Omit<NewsPost, "displayDate">[]> {
  try {
    const raw = await fs.readFile(NEWS_FILE, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Omit<NewsPost, "displayDate">[]) : [];
  } catch {
    return [];
  }
}

export async function writeNewsRaw(
  posts: Omit<NewsPost, "displayDate">[],
): Promise<void> {
  await fs.mkdir(path.dirname(NEWS_FILE), { recursive: true });
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  await fs.writeFile(NEWS_FILE, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
}

export async function getNews(): Promise<NewsPost[]> {
  const posts = await readNewsRaw();
  return posts
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(withDisplayDate);
}

export async function getPost(slug: string): Promise<NewsPost | undefined> {
  const posts = await getNews();
  return posts.find((post) => post.slug === slug);
}

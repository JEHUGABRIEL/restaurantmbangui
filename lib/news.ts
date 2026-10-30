import "server-only";

import { readStore, writeStore } from "./store";

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

const NEWS_FILE = "news.json";

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
  const rows = await readStore<Omit<NewsPost, "displayDate">[]>(NEWS_FILE, []);
  return Array.isArray(rows) ? rows : [];
}

export async function writeNewsRaw(
  posts: Omit<NewsPost, "displayDate">[],
): Promise<void> {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  await writeStore(NEWS_FILE, sorted);
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

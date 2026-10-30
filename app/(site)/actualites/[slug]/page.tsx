import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import NewsCard from "@/components/NewsCard";
import { getNews, getPost } from "@/lib/news";
import { FACEBOOK_URL } from "@/lib/site";
import { ArrowUpRight } from "@/components/icons";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Actualité introuvable" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

export default async function ActualitePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const news = await getNews();
  const related = news.filter((entry) => entry.slug !== slug).slice(0, 2);

  return (
    <>
      <PageHero
        label={`${post.category} · ${post.displayDate}`}
        title={post.title}
        lead={post.excerpt}
        image={post.image}
        imageAlt={post.imageAlt}
      />

      <article className="container article">
        <p className="article-meta">
          <time dateTime={post.date}>{post.displayDate}</time>
          <i aria-hidden>✦</i>
          <span>{post.category}</span>
        </p>

        <div className="article-body">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="article-foot">
          <Link className="gold-link" href="/actualites">
            ← Toutes les actualités
          </Link>
          <a
            className="gold-link"
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Nous suivre sur Facebook
            <ArrowUpRight width={12} height={12} />
          </a>
        </div>
      </article>

      <section className="section section-cream">
        <div className="container">
          <div className="center-copy">
            <span className="script">À lire</span>
            <span className="caps">Aussi</span>
            <span className="ornament" aria-hidden />
          </div>
          <div className="news-grid">
            {related.map((entry) => (
              <NewsCard post={entry} key={entry.slug} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

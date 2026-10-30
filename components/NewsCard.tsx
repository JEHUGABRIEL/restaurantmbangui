import Image from "next/image";
import Link from "next/link";
import type { NewsPost } from "@/lib/news";
import { ArrowUpRight } from "./icons";

export default function NewsCard({ post }: { post: NewsPost }) {
  const href = `/actualites/${post.slug}`;

  return (
    <article className="news-card">
      <Link className="news-card-media" href={href} aria-label={post.title}>
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 760px) 92vw, (max-width: 940px) 46vw, 380px"
        />
      </Link>
      <div className="news-card-body">
        <span className="news-meta">
          <span>{post.category}</span>
          <i aria-hidden>✦</i>
          <time dateTime={post.date}>{post.displayDate}</time>
        </span>
        <h3>
          <Link href={href}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <Link className="gold-link" href={href}>
          Lire la suite
          <ArrowUpRight width={12} height={12} />
        </Link>
      </div>
    </article>
  );
}

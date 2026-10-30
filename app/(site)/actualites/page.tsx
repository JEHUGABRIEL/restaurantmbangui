import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import NewsCard from "@/components/NewsCard";
import { getNews } from "@/lib/news";
import { FACEBOOK_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Les actualités du Restaurant M’ à Bangui : Menu Rose, nouvelle carte, terrasse, pizzas à emporter et vie de la maison.",
};

export default async function ActualitesPage() {
  const news = await getNews();

  return (
    <>
      <PageHero
        label="Le carnet · Bangui"
        title={
          <>
            Les nouvelles
            <br />
            <em>de la maison.</em>
          </>
        }
        lead="Ce qui change à la carte, les rendez-vous de saison et les nouvelles façons de commander. Tout ce qu’il faut savoir avant de passer nous voir."
        image="/images/terrace.jpg"
        imageAlt="La terrasse du Restaurant M’"
      />

      <section className="page-section">
        <div className="container news-page-head">
          <div>
            <span className="script">Actualités</span>
            <span className="caps">Tout le carnet</span>
            <span className="ornament ornament-left" aria-hidden />
          </div>
          <p>
            Nous publions ici les nouvelles de la maison au fil des semaines.
            Pour ne rien manquer, la page Facebook reste le fil le plus rapide.
          </p>
        </div>

        <div className="container news-grid">
          {news.map((post) => (
            <NewsCard post={post} key={post.slug} />
          ))}
        </div>

        <div className="container news-follow">
          <p>
            Une question sur une actualité, un menu ou une commande ? Écrivez-nous
            directement.
          </p>
          <div className="news-follow-actions">
            <a
              className="btn btn-gold"
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Suivre sur Facebook
              <ArrowUpRight width={13} height={13} />
            </a>
            <a className="btn btn-outline-dark" href={`tel:${PHONE_TEL}`}>
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

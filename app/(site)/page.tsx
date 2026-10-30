import Image from "next/image";
import Link from "next/link";
import HeroSlideshow from "@/components/HeroSlideshow";
import NewsCard from "@/components/NewsCard";
import ReviewCarousel from "@/components/ReviewCarousel";
import StoryCarousel from "@/components/StoryCarousel";
import { getNews } from "@/lib/news";
import { getLocale } from "@/lib/locale";
import {
  ChevronDown,
  Facebook,
  Mail,
  Phone,
  Pin,
  Utensils,
  WhatsApp,
} from "@/components/icons";
import {
  ADDRESS,
  EMAIL,
  FACEBOOK_URL,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  RESERVE_URL,
  whatsapp,
} from "@/lib/site";

const MAP_EMBED =
  "https://www.openstreetmap.org/export/embed.html?bbox=18.545%2C4.355%2C18.595%2C4.390&layer=mapnik&marker=4.372%2C18.560";

const copy = {
  fr: {
    heroA: "Restaurant & bar",
    heroB: "de l’hospitalité centrafricaine",
    storyScript: "Notre",
    storyCaps: "Histoire",
    storyText:
      "Restaurant & bar à Bangui, la maison réunit une salle, une terrasse et une cuisine semi-gastronomique. On y vient pour un déjeuner d’affaires, un dîner en famille ou simplement pour un café à l’ombre, face au Musée Barthélemy Boganda.",
    more: "En savoir plus",
    lunch: "Déjeuners",
    lunchB: "de la maison",
    lunchTime: "De 12h00 à 14h30",
    lunchDays: "en semaine",
    menuScript: "Notre",
    menuCaps: "Menu",
    menuText:
      "La carte suit le marché : entrées fraîches, plats mijotés, grillades au feu de bois, pizzas pétries sur place et desserts maison. Le soir, le bar reste ouvert pour un verre et quelques assiettes à partager.",
    seeMenu: "Voir la carte",
    quality: "Nous veillons",
    qualityB: "à la qualité de nos plats !",
    reviewsScript: "Avis",
    reviewsCaps: "De nos hôtes",
    reviewsText:
      "Chaque table compte. Nous lisons les retours de nos hôtes et ajustons la carte, le service et les horaires au fil des saisons. Votre avis nous aide à faire mieux.",
    leaveReview: "Laisser un avis",
    newsScript: "Actualités",
    newsCaps: "Les nouvelles",
    newsText:
      "La vie de la maison : la carte qui change, la terrasse qui rouvre, les commandes à emporter et les rendez-vous de saison.",
    allNews: "Toutes les actualités",
  },
  en: {
    heroA: "Restaurant & bar",
    heroB: "with Central African hospitality",
    storyScript: "Our",
    storyCaps: "Story",
    storyText:
      "A restaurant and bar in Bangui, bringing together a dining room, a terrace and semi-gastronomic cooking. Come for a business lunch, a family dinner or simply a coffee in the shade, opposite the Barthélemy Boganda Museum.",
    more: "Learn more",
    lunch: "Weekday",
    lunchB: "lunches",
    lunchTime: "12pm to 2.30pm",
    lunchDays: "Monday to Friday",
    menuScript: "Our",
    menuCaps: "Menu",
    menuText:
      "The menu follows the market: fresh starters, slow-cooked mains, wood-fired grills, pizzas made in-house and homemade desserts. In the evening the bar stays open for a drink and a few plates to share.",
    seeMenu: "See the menu",
    quality: "We care about",
    qualityB: "the quality of our food!",
    reviewsScript: "Reviews",
    reviewsCaps: "From our guests",
    reviewsText:
      "Every table matters. We read our guests’ feedback and adjust the menu, the service and the hours with the seasons. Your review helps us do better.",
    leaveReview: "Leave a review",
    newsScript: "News",
    newsCaps: "From the house",
    newsText:
      "Life at the house: the menu changing, the terrace reopening, takeaway orders and seasonal events.",
    allNews: "All news",
  },
} as const;

export default async function Home() {
  const news = await getNews();
  const locale = await getLocale();
  const t = copy[locale];

  return (
    <>
      <section className="hero">
        <HeroSlideshow />
        <div className="hero-shade" aria-hidden />
        <div className="hero-inner container">
          <h1 className="hero-title">
            <span>{t.heroA}</span>
            <span>{t.heroB}</span>
          </h1>
        </div>
        <div className="hero-notch" aria-hidden />
        <a className="hero-scroll" href="#histoire" aria-label="Découvrir la maison">
          <ChevronDown width={20} height={20} />
        </a>
      </section>

      <section className="section story" id="histoire">
        <div className="container story-grid">
          <div className="center-copy">
            <span className="script">{t.storyScript}</span>
            <span className="caps">{t.storyCaps}</span>
            <span className="ornament" aria-hidden />
            <p>{t.storyText}</p>
            <Link className="gold-link" href="/maison">
              {t.more}
            </Link>
          </div>

          <StoryCarousel />
        </div>
      </section>

      <section className="triptych" aria-label="Les déjeuners de la maison">
        <div className="triptych-panel">
          <span className="panel-icon" aria-hidden>
            <Utensils width={20} height={20} />
          </span>
          <h2 className="script script-light">
            {t.lunch}
            <br />
            {t.lunchB}
          </h2>
          <span className="ornament ornament-dark" aria-hidden />
          <p className="triptych-time">
            {t.lunchTime}
            <br />
            {t.lunchDays}
          </p>
        </div>
        <figure className="triptych-photo">
          <Image
            src="/images/ribs.jpg"
            alt="Travers de porc laqués, frites et crudités"
            fill
            sizes="(max-width: 700px) 100vw, 33vw"
          />
        </figure>
        <figure className="triptych-photo">
          <Image
            src="/images/plates.jpg"
            alt="Assiettes de la maison vues du dessus"
            fill
            sizes="(max-width: 700px) 100vw, 33vw"
          />
        </figure>
      </section>

      <section className="section menu-feature" id="carte">
        <div className="container menu-feature-grid">
          <div className="menu-tiles">
            <figure className="menu-tile">
              <Image
                src="/images/steak.jpg"
                alt="Pièce de bœuf grillée et frites maison"
                fill
                sizes="(max-width: 700px) 50vw, 280px"
              />
            </figure>
            <figure className="menu-tile">
              <Image
                src="/images/ribs.jpg"
                alt="Travers de porc laqués"
                fill
                sizes="(max-width: 700px) 50vw, 280px"
              />
            </figure>
            <figure className="menu-tile">
              <Image
                src="/images/salmon.jpg"
                alt="Saumon snacké et légumes verts"
                fill
                sizes="(max-width: 700px) 50vw, 280px"
              />
            </figure>
            <figure className="menu-tile">
              <Image
                src="/images/hero.jpg"
                alt="Saumon servi sur ardoise"
                fill
                sizes="(max-width: 700px) 50vw, 280px"
              />
            </figure>
          </div>

          <div className="center-copy menu-feature-copy">
            <span className="script">{t.menuScript}</span>
            <span className="caps">{t.menuCaps}</span>
            <span className="ornament" aria-hidden />
            <p>{t.menuText}</p>
            <Link className="gold-link" href="/carte">
              <Utensils width={14} height={14} />
              {t.seeMenu}
            </Link>
          </div>

          <div className="menu-deco" aria-hidden>
            <Image
              src="/images/steak.jpg"
              alt=""
              fill
              sizes="180px"
            />
          </div>
        </div>
      </section>

      <section className="quality-band">
        <div className="quality-media">
          <Image
            src="/images/terrace.jpg"
            alt=""
            fill
            sizes="100vw"
          />
        </div>
        <div className="quality-shade" aria-hidden />
        <h2 className="quality-title">
          {t.quality}
          <br />
          {t.qualityB}
        </h2>
        <span className="heart" aria-hidden />
      </section>

      <section className="section reviews" id="avis">
        <div className="container reviews-grid">
          <div className="center-copy reviews-copy">
            <span className="script">{t.reviewsScript}</span>
            <span className="caps">{t.reviewsCaps}</span>
            <span className="ornament" aria-hidden />
            <p>{t.reviewsText}</p>
            <a
              className="gold-link"
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.leaveReview}
            </a>
            <div className="reviews-deco" aria-hidden>
              <Image src="/images/salmon.jpg" alt="" fill sizes="220px" />
            </div>
          </div>

          <ReviewCarousel />
        </div>
      </section>

      <section className="section news-section" id="actualites">
        <div className="container">
          <div className="center-copy">
            <span className="script">{t.newsScript}</span>
            <span className="caps">{t.newsCaps}</span>
            <span className="ornament" aria-hidden />
            <p>{t.newsText}</p>
          </div>

          <div className="news-grid">
            {news.slice(0, 3).map((post) => (
              <NewsCard post={post} key={post.slug} />
            ))}
          </div>

          <div className="news-more">
            <Link className="btn btn-outline-dark" href="/actualites">
              {t.allNews}
            </Link>
          </div>
        </div>
      </section>

      <section className="map-section" id="contact">
        <iframe
          className="map-frame"
          title="Carte — Restaurant M’, Bangui"
          src={MAP_EMBED}
          loading="lazy"
        />
        <div className="container map-overlay">
          <div className="contact-card">
            <span className="script script-light">Contact</span>
            <span className="caps caps-light">Notre restaurant</span>
            <span className="ornament ornament-dark" aria-hidden />
            <a
              className="contact-line"
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Pin width={15} height={15} />
              <span>{ADDRESS}</span>
            </a>
            <a className="contact-line" href={`tel:${PHONE_TEL}`}>
              <Phone width={15} height={15} />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <a className="contact-line" href={`mailto:${EMAIL}`}>
              <Mail width={15} height={15} />
              <span>{EMAIL}</span>
            </a>
            <div className="contact-socials">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook width={15} height={15} />
              </a>
              <a
                href={whatsapp(
                  "Bonjour Restaurant M’, je vous contacte depuis votre site.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <WhatsApp width={15} height={15} />
              </a>
            </div>
            <Link className="gold-link gold-link-light" href="/contact">
              Nous écrire
            </Link>
          </div>
        </div>
      </section>

      <div className="map-cta">
        <div className="container map-cta-inner">
          <p>Une table pour ce soir ?</p>
          <a
            className="btn btn-gold"
            href={RESERVE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Réserver sur WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

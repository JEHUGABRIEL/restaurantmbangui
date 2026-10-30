import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import AddToCartButton from "@/components/AddToCartButton";
import { getLocale } from "@/lib/locale";
import type { Locale } from "@/lib/i18n";
import { MENU_ROSE, formatMoney, l10n, type Dish } from "@/lib/menu";
import { getMenu } from "@/lib/menu-data";
import { ORDER_URL } from "@/lib/site";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "La carte",
  description:
    "La carte du Restaurant M’ à Bangui : entrées, plats et grillades, pizzas, desserts et boissons. Carte de saison et Menu Rose d’octobre.",
};

const copy = {
  fr: {
    label: "La carte · Automne 2026",
    title: "Ce que l’on aime",
    em: "servir.",
    lead: "Une carte courte et lisible : des entrées fraîches, des plats mijotés, le feu de bois pour les grillades et une pâte à pizza pétrie sur place.",
    reserve: "Réserver une table",
    order: "Commander à emporter",
    rose: "Menu Rose",
    roseText:
      "Entrée + plat ou plat + dessert à 15 000 FCFA ; menu complet avec verre de vin, eau et café à 18 000 FCFA. Trois services de saison, servis midi et soir.",
    roseCta: "Découvrir le menu",
    note: "Prix en FCFA, service compris · Carte susceptible d’évoluer selon le marché · Allergies : prévenez-nous, nous adaptons les plats. Ajoutez un plat avec le + : votre panier se commande ensuite sur WhatsApp.",
  },
  en: {
    label: "The menu · Autumn 2026",
    title: "What we love",
    em: "to serve.",
    lead: "A short, readable menu: fresh starters, slow-cooked mains, wood-fired grills and pizza dough made in-house.",
    reserve: "Book a table",
    order: "Order takeaway",
    rose: "Pink Menu",
    roseText:
      "Starter + main or main + dessert at 15,000 FCFA; full menu with a glass of wine, water and coffee at 18,000 FCFA. Three seasonal courses, served at lunch and dinner.",
    roseCta: "See the menu",
    note: "Prices in FCFA, service included · The menu may change with the market · Allergies: tell us and we will adapt. Add a dish with + and order your basket on WhatsApp.",
  },
} as const;

function MenuLine({ dish, locale }: { dish: Dish; locale: Locale }) {
  const name = l10n(dish.name, locale);

  return (
    <div className="menu-line">
      <div className="menu-line-head">
        <span className="menu-line-name">
          {name}
          {dish.tag ? (
            <span className="menu-tag">{l10n(dish.tag, locale)}</span>
          ) : null}
        </span>
        <span className="menu-line-dots" aria-hidden />
        <span className="menu-line-price">
          {formatMoney(dish.price)}
          <small>F</small>
        </span>
        <AddToCartButton id={dish.id} name={name} price={dish.price} />
      </div>
      {dish.description ? (
        <p className="menu-line-desc">{l10n(dish.description, locale)}</p>
      ) : null}
    </div>
  );
}

export const dynamic = "force-dynamic";

export default async function CartePage() {
  const locale = await getLocale();
  const t = copy[locale];
  const menu = await getMenu();

  return (
    <>
      <PageHero
        label={t.label}
        title={
          <>
            {t.title}
            <br />
            <em>{t.em}</em>
          </>
        }
        lead={t.lead}
      >
        <div className="page-hero-actions">
          <Link className="btn btn-gold" href="/contact#reserver">
            {t.reserve}
          </Link>
          <a
            className="btn btn-outline-gold"
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.order}
          </a>
        </div>
      </PageHero>

      <section className="page-section">
        <div className="container menu-page">
          {menu.map((section) => (
            <section className="menu-cat" id={section.id} key={section.id}>
              <div className="menu-cat-head">
                <h2 className="script">{l10n(section.title, locale)}</h2>
                <span className="caps">{l10n(section.subtitle, locale)}</span>
              </div>
              <div className="menu-lines">
                {section.dishes.map((dish) => (
                  <MenuLine dish={dish} locale={locale} key={dish.id} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="container">
          <div className="dark-panel">
            <div>
              <span className="script script-light">{t.rose}</span>
              <span className="caps caps-gold">{l10n(MENU_ROSE.dates, locale)}</span>
              <p>{t.roseText}</p>
            </div>
            <Link className="btn btn-gold" href="/menu-rose">
              {t.roseCta}
              <ArrowUpRight width={14} height={14} />
            </Link>
          </div>

          <p className="menu-note">{t.note}</p>
        </div>
      </section>
    </>
  );
}

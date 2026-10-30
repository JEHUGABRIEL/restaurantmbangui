import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getLocale } from "@/lib/locale";
import { MENU_ROSE, l10n } from "@/lib/menu";
import { RESERVE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu Rose",
  description:
    "Le Menu Rose du Restaurant M’ à Bangui : trois services de saison, du 1er au 31 octobre 2026, à 15 000 ou 18 000 FCFA.",
};

const copy = {
  fr: {
    label: "Octobre rose",
    title: "Le Menu Rose,",
    em: "le plaisir a un sens.",
    lead: "Trois services de saison, servis pendant tout le mois d’octobre. Une assiette généreuse, une note fraîche et une attention particulière portée aux produits du marché.",
    reserve: "Réserver le Menu Rose",
    carte: "Voir toute la carte",
    script: "Le menu",
    caps: "Trois services",
    intro:
      "Le Menu Rose reprend les produits de la carte de saison. Il est servi à midi et le soir, sur réservation conseillée, tant que le marché le permet.",
    note: "le Menu Rose est proposé pendant tout le mois d’octobre, en écho à la campagne de sensibilisation. Le prix du menu reste celui de la carte.",
    stepsScript: "Comment ça se passe",
    stepsCaps: "Réserver, tout simplement",
    steps: [
      {
        title: "Choisissez votre moment",
        text: "Déjeuner entre 11h30 et 14h, dîner à partir de 18h30. Le service est continu en journée.",
      },
      {
        title: "Écrivez-nous",
        text: "WhatsApp ou téléphone au +236 72 05 34 34, en précisant le nombre de personnes et l’heure souhaitée.",
      },
      {
        title: "Venez, on s’occupe du reste",
        text: "Précisez le Menu Rose à l’arrivée. Une allergie ou un régime particulier ? Dites-le nous en amont.",
      },
    ],
    bandScript: "Jusqu’au 31 octobre",
    bandTitle: "Le plaisir a un sens,",
    bandTitle2: "partagez-le à table.",
    bandText:
      "Le Menu Rose est servi sur réservation, midi et soir, dans la limite des produits disponibles.",
    bandCta: "Réserver sur WhatsApp",
    labels: ["Entrée", "Plat", "Dessert"],
  },
  en: {
    label: "Pink October",
    title: "The Pink Menu,",
    em: "pleasure with a purpose.",
    lead: "Three seasonal courses, served throughout October. A generous plate, a fresh finish and careful attention to market produce.",
    reserve: "Book the Pink Menu",
    carte: "See the full menu",
    script: "The menu",
    caps: "Three courses",
    intro:
      "The Pink Menu follows the seasonal menu. It is served at lunch and dinner, booking recommended, while the market allows.",
    note: "the Pink Menu is offered throughout October, echoing the awareness campaign. The price remains the same as the menu.",
    stepsScript: "How it works",
    stepsCaps: "Simply book",
    steps: [
      {
        title: "Choose your moment",
        text: "Lunch between 11.30am and 2pm, dinner from 6.30pm. Service is continuous during the day.",
      },
      {
        title: "Write to us",
        text: "WhatsApp or phone +236 72 05 34 34, with the number of guests and your preferred time.",
      },
      {
        title: "Come in, we take care of the rest",
        text: "Mention the Pink Menu on arrival. An allergy or special diet? Tell us in advance.",
      },
    ],
    bandScript: "Until 31 October",
    bandTitle: "Pleasure with a purpose,",
    bandTitle2: "share it at the table.",
    bandText:
      "The Pink Menu is served by reservation, at lunch and dinner, while ingredients last.",
    bandCta: "Book on WhatsApp",
    labels: ["Starter", "Main", "Dessert"],
  },
} as const;

export default async function MenuRosePage() {
  const locale = await getLocale();
  const t = copy[locale];
  const courses = [MENU_ROSE.entree, MENU_ROSE.plat, MENU_ROSE.dessert];

  return (
    <>
      <PageHero
        tone="wine"
        image="/images/salmon.jpg"
        imageAlt="Saumon snacké et légumes verts"
        label={`${t.label} · ${l10n(MENU_ROSE.dates, locale)}`}
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
          <a
            className="btn btn-gold"
            href={RESERVE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.reserve}
          </a>
          <Link className="btn btn-outline-gold" href="/carte">
            {t.carte}
          </Link>
        </div>
      </PageHero>

      <section className="page-section">
        <div className="container rose-page-grid">
          <div className="rose-page-intro">
            <span className="script">{t.script}</span>
            <span className="caps">{t.caps}</span>
            <span className="ornament ornament-left" aria-hidden />
            <p>{t.intro}</p>
            <div className="wine-note">
              <strong>Octobre rose</strong> — {t.note}
            </div>
          </div>

          <div className="courses">
            {courses.map((course, index) => (
              <div className="course-row" key={t.labels[index]}>
                <span className="course-index">0{index + 1}</span>
                <div>
                  <span className="caps caps-gold">{t.labels[index]}</span>
                  <h2>{l10n(course.name, locale)}</h2>
                  <p>{l10n(course.description, locale)}</p>
                </div>
              </div>
            ))}

            <div className="price-cards">
              {MENU_ROSE.formulas.map((formula) => (
                <div
                  className={formula.featured ? "price-card is-featured" : "price-card"}
                  key={formula.price}
                >
                  <p>
                    <strong>{formula.price}</strong>
                    <span> FCFA</span>
                  </p>
                  <small>{l10n(formula.detail, locale)}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="center-copy">
            <span className="script">{t.stepsScript}</span>
            <span className="caps">{t.stepsCaps}</span>
            <span className="ornament" aria-hidden />
          </div>
          <div className="steps-row">
            {t.steps.map((step, index) => (
              <article className="step" key={step.title}>
                <span className="value-num">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-band">
        <div className="container center-copy center-copy-light">
          <span className="script script-light">{t.bandScript}</span>
          <h2 className="dark-band-title">
            {t.bandTitle}
            <br />
            {t.bandTitle2}
          </h2>
          <span className="ornament ornament-dark" aria-hidden />
          <p>{t.bandText}</p>
          <a
            className="btn btn-gold"
            href={RESERVE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.bandCta}
          </a>
        </div>
      </section>
    </>
  );
}

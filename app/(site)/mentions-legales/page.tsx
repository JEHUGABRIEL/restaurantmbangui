import type { Metadata } from "next";
import LegalContent from "@/components/LegalContent";
import PageHero from "@/components/PageHero";
import { getLocale } from "@/lib/locale";
import { ADDRESS, EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Éditeur, hébergement, propriété intellectuelle et responsabilité du site du Restaurant M’ à Bangui.",
};

const copy = {
  fr: {
    label: "Informations légales",
    title: "Mentions",
    em: "légales.",
    lead: "Qui édite le site, où il est hébergé et dans quel cadre il est mis à disposition.",
    sections: [
      {
        heading: "Éditeur du site",
        body: [
          `Le site est édité par le Restaurant M’, restaurant et bar situé ${ADDRESS} (République centrafricaine).`,
          `Téléphone : ${PHONE_DISPLAY}. Courriel : ${EMAIL}.`,
        ],
      },
      {
        heading: "Responsable de la publication",
        body: ["La direction du Restaurant M’."],
      },
      {
        heading: "Hébergement",
        body: [
          "Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis (vercel.com).",
          "Les données du back-office (réservations, messages, carte, actualités) sont stockées par Neon Inc. sur une base située dans l’Union européenne.",
        ],
      },
      {
        heading: "Activité",
        body: [
          "Le Restaurant M’ exerce une activité de restauration sur place, de bar et de vente de plats à emporter. Les réservations présentées sur le site sont des demandes : elles sont confirmées par téléphone ou par WhatsApp.",
        ],
      },
      {
        heading: "Propriété intellectuelle",
        body: [
          "Les textes, les photographies, le logo et les éléments graphiques du site appartiennent au Restaurant M’. Toute reproduction ou réutilisation, totale ou partielle, sans autorisation écrite préalable est interdite.",
        ],
      },
      {
        heading: "Responsabilité",
        body: [
          "La carte, les prix et les horaires sont donnés à titre indicatif et peuvent évoluer sans préavis. Le Restaurant M’ ne peut être tenu responsable d’une interruption temporaire du site ni d’une erreur de saisie sur une commande passée par un autre canal.",
        ],
      },
      {
        heading: "Droit applicable",
        body: [
          "Le site est soumis au droit centrafricain. En cas de litige, et à défaut d’accord amiable, les tribunaux de Bangui sont compétents.",
        ],
      },
    ],
    updated: "Dernière mise à jour : 30 octobre 2026.",
  },
  en: {
    label: "Legal information",
    title: "Legal",
    em: "notice.",
    lead: "Who publishes this site, where it is hosted and on what terms it is made available.",
    sections: [
      {
        heading: "Publisher",
        body: [
          `This site is published by Restaurant M’, a restaurant and bar located at ${ADDRESS} (Central African Republic).`,
          `Phone: ${PHONE_DISPLAY}. Email: ${EMAIL}.`,
        ],
      },
      {
        heading: "Publication manager",
        body: ["The management of Restaurant M’."],
      },
      {
        heading: "Hosting",
        body: [
          "The site is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, United States (vercel.com).",
          "Back-office data (reservations, messages, menu, news) is stored by Neon Inc. in a database located in the European Union.",
        ],
      },
      {
        heading: "Activity",
        body: [
          "Restaurant M’ operates a restaurant, a bar and a takeaway service. Reservations made on this site are requests: they are confirmed by phone or WhatsApp.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "The texts, photographs, logo and graphic elements of this site belong to Restaurant M’. Any reproduction or reuse, in whole or in part, without prior written permission is prohibited.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "The menu, prices and opening hours are indicative and may change without notice. Restaurant M’ cannot be held liable for a temporary interruption of the site or for an entry error in an order placed through another channel.",
        ],
      },
      {
        heading: "Governing law",
        body: [
          "This site is governed by Central African law. In the event of a dispute, and failing an amicable agreement, the courts of Bangui have jurisdiction.",
        ],
      },
    ],
    updated: "Last updated: 30 October 2026.",
  },
} as const;

export default async function LegalNoticePage() {
  const locale = await getLocale();
  const t = copy[locale];

  return (
    <>
      <PageHero
        label={t.label}
        title={
          <>
            {t.title} <em>{t.em}</em>
          </>
        }
        lead={t.lead}
        image="/images/plates.jpg"
      />
      <LegalContent sections={t.sections} updated={t.updated} />
    </>
  );
}

import type { Metadata } from "next";
import LegalContent from "@/components/LegalContent";
import PageHero from "@/components/PageHero";
import { getLocale } from "@/lib/locale";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Quelles données le site du Restaurant M’ collecte, pourquoi, combien de temps et comment exercer vos droits.",
};

const copy = {
  fr: {
    label: "Données personnelles",
    title: "Vos données,",
    em: "en confiance.",
    lead: "Réservations, messages et commandes : ce que nous recevons, ce que nous n’en faisons pas, et comment les faire supprimer.",
    sections: [
      {
        heading: "Qui traite vos données",
        body: [
          `Le Restaurant M’, ${"Rue de l’Industrie, face au Musée Barthélemy Boganda, Bangui"} (République centrafricaine), est responsable des données transmises depuis ce site. Contact : ${EMAIL} ou ${PHONE_DISPLAY}.`,
        ],
      },
      {
        heading: "Ce que nous recevons",
        body: [
          "Demande de réservation : nom et prénom, téléphone ou WhatsApp, date et heure souhaitées, nombre de personnes, préférence de salle et éventuelle demande particulière.",
          "Formulaire de contact : nom, e-mail, téléphone et contenu du message.",
          "Commande à emporter : les articles choisis dans le panier. Le message n’est transmis qu’au moment où vous le validez sur WhatsApp.",
          "Journal technique du back-office : connexions et actions de l’équipe (réservations, messages, carte), conservé pour la sécurité de l’accès.",
        ],
      },
      {
        heading: "Ce que nous ne faisons pas",
        body: [
          "Aucun compte client n’est créé, aucun paiement n’est encaissé en ligne et aucune donnée n’est vendue, louée ou transmise à des fins publicitaires.",
          "Le site n’utilise ni outil de mesure d’audience ni cookie publicitaire.",
        ],
      },
      {
        heading: "Pourquoi nous les utilisons",
        body: [
          "Pour traiter et confirmer votre réservation, répondre à votre message, préparer votre commande et assurer la sécurité du back-office. Ces usages reposent sur votre demande et sur l’exécution du service que vous sollicitez.",
        ],
      },
      {
        heading: "Cookies et stockage local",
        body: [
          "Deux cookies techniques seulement : rm_locale, qui retient la langue choisie pendant un an, et rm_admin, la session du back-office, réservée à l’équipe et valable douze heures.",
          "Le panier est enregistré dans votre navigateur (stockage local) et reste chez vous : il ne nous est pas transmis tant que vous ne validez pas la commande.",
        ],
      },
      {
        heading: "Qui peut y accéder",
        body: [
          "L’équipe du restaurant, pour les seules informations nécessaires au service, et nos prestataires techniques : Vercel pour l’hébergement du site et Neon pour la base de données. Aucun autre destinataire.",
        ],
      },
      {
        heading: "Combien de temps",
        body: [
          "Réservations et messages : douze mois après le dernier contact, puis suppression. Journal du back-office : six mois. Le contenu de votre panier reste dans votre navigateur jusqu’à ce que vous le vidiez.",
        ],
      },
      {
        heading: "Vos droits",
        body: [
          `Vous pouvez demander à consulter, corriger ou supprimer vos données, ou vous opposer à leur conservation, en écrivant à ${EMAIL} ou en appelant le ${PHONE_TEL}. Nous répondons dans un délai d’un mois.`,
        ],
      },
      {
        heading: "Sécurité",
        body: [
          "Le site est servi en HTTPS. L’accès au back-office est protégé par mot de passe et les mots de passe ne sont jamais stockés en clair.",
        ],
      },
    ],
    updated: "Dernière mise à jour : 30 octobre 2026.",
  },
  en: {
    label: "Personal data",
    title: "Your data,",
    em: "handled with care.",
    lead: "Reservations, messages and orders: what we receive, what we never do with it, and how to have it deleted.",
    sections: [
      {
        heading: "Who processes your data",
        body: [
          `Restaurant M’, Rue de l’Industrie, opposite the Barthélemy Boganda Museum, Bangui (Central African Republic), is responsible for the data sent from this site. Contact: ${EMAIL} or ${PHONE_DISPLAY}.`,
        ],
      },
      {
        heading: "What we receive",
        body: [
          "Reservation request: full name, phone or WhatsApp, preferred date and time, number of guests, room preference and any special request.",
          "Contact form: name, email, phone and the content of your message.",
          "Takeaway order: the items in your basket. The message is only sent when you confirm it on WhatsApp.",
          "Back-office log: staff sign-ins and actions (reservations, messages, menu), kept for access security.",
        ],
      },
      {
        heading: "What we never do",
        body: [
          "No customer account is created, no payment is taken online, and no data is sold, rented or shared for advertising.",
          "The site uses no analytics tool and no advertising cookie.",
        ],
      },
      {
        heading: "Why we use it",
        body: [
          "To handle and confirm your reservation, answer your message, prepare your order and keep the back-office secure. These uses rest on your request and on the service you are asking for.",
        ],
      },
      {
        heading: "Cookies and local storage",
        body: [
          "Two technical cookies only: rm_locale, which remembers your language for a year, and rm_admin, the back-office session, reserved for staff and valid for twelve hours.",
          "Your basket is stored in your browser (local storage) and stays with you: we do not receive it until you confirm the order.",
        ],
      },
      {
        heading: "Who can access it",
        body: [
          "The restaurant team, only for the information needed to serve you, and our technical providers: Vercel for hosting and Neon for the database. No other recipients.",
        ],
      },
      {
        heading: "How long",
        body: [
          "Reservations and messages: twelve months after the last contact, then deleted. Back-office log: six months. Your basket stays in your browser until you clear it.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          `You may ask to access, correct or delete your data, or object to its retention, by writing to ${EMAIL} or calling ${PHONE_TEL}. We reply within one month.`,
        ],
      },
      {
        heading: "Security",
        body: [
          "The site is served over HTTPS. The back-office is protected by a password and passwords are never stored in plain text.",
        ],
      },
    ],
    updated: "Last updated: 30 October 2026.",
  },
} as const;

export default async function PrivacyPage() {
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
        image="/images/terrace.jpg"
      />
      <LegalContent sections={t.sections} updated={t.updated} />
    </>
  );
}

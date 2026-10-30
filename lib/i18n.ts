export type Locale = "fr" | "en";

export const LOCALE_COOKIE = "rm_locale";
export const LOCALES: Locale[] = ["fr", "en"];

export const ui = {
  fr: {
    nav: {
      restaurant: "Le restaurant",
      carte: "La carte",
      rose: "Menu Rose",
      news: "Actualités",
      reviews: "Avis",
      contact: "Contacts",
    },
    common: {
      reserve: "Réserver",
      bookTable: "Réserver une table",
      seeMenu: "Voir la carte",
      readMore: "Lire la suite",
      allNews: "Toutes les actualités",
      close: "Fermer",
      language: "Langue",
      home: "Accueil",
    },
    cart: {
      open: "Ouvrir le panier",
      title: "Votre panier",
      countOne: "article",
      countMany: "articles",
      empty: "Votre panier est encore vide.",
      emptyCta: "Voir la carte",
      total: "Total",
      order: "Commander sur WhatsApp",
      note: "Commande à retirer sur place. Précisez l’heure souhaitée dans le message WhatsApp.",
      clear: "Vider le panier",
      remove: "Retirer",
      add: "Ajouter au panier",
      decrease: "Retirer un",
      increase: "Ajouter un",
    },
    form: {
      name: "Nom et prénom",
      phone: "Téléphone / WhatsApp",
      date: "Date souhaitée",
      time: "Heure",
      guests: "Nombre de personnes",
      person: "personne",
      people: "personnes",
      many: "9 personnes et plus",
      terrace: "Terrasse",
      noPref: "Sans préférence",
      outside: "En terrasse",
      inside: "À l’intérieur",
      message: "Une demande particulière ?",
      placeholder: "Anniversaire, allergies, table au calme…",
      submit: "Envoyer la demande",
      note: "Votre demande est enregistrée et arrive dans le back-office du restaurant. Nous confirmons la table par téléphone ou WhatsApp.",
      whatsapp: "Ou réserver directement sur WhatsApp",
    },
    footer: {
      location: "Restaurant M’ · Bangui, République centrafricaine",
      built: "Site réalisé pour la maison · 2026",
      bookings: "Réservations",
    },
  },
  en: {
    nav: {
      restaurant: "The restaurant",
      carte: "The menu",
      rose: "Pink Menu",
      news: "News",
      reviews: "Reviews",
      contact: "Contact",
    },
    common: {
      reserve: "Book",
      bookTable: "Book a table",
      seeMenu: "See the menu",
      readMore: "Read more",
      allNews: "All news",
      close: "Close",
      language: "Language",
      home: "Home",
    },
    cart: {
      open: "Open the basket",
      title: "Your basket",
      countOne: "item",
      countMany: "items",
      empty: "Your basket is still empty.",
      emptyCta: "See the menu",
      total: "Total",
      order: "Order on WhatsApp",
      note: "Takeaway order. Please give your preferred pickup time in the WhatsApp message.",
      clear: "Empty the basket",
      remove: "Remove",
      add: "Add to basket",
      decrease: "Remove one",
      increase: "Add one",
    },
    form: {
      name: "Full name",
      phone: "Phone / WhatsApp",
      date: "Preferred date",
      time: "Time",
      guests: "Number of guests",
      person: "guest",
      people: "guests",
      many: "9 guests and more",
      terrace: "Terrace",
      noPref: "No preference",
      outside: "On the terrace",
      inside: "Inside",
      message: "Any special request?",
      placeholder: "Birthday, allergies, quiet table…",
      submit: "Send request",
      note: "Your request is saved and appears in the restaurant back-office. We confirm your table by phone or WhatsApp.",
      whatsapp: "Or book directly on WhatsApp",
    },
    footer: {
      location: "Restaurant M’ · Bangui, Central African Republic",
      built: "Made for the house · 2026",
      bookings: "Bookings",
    },
  },
} as const;

export function getUi(locale: Locale) {
  return ui[locale];
}

export function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
}

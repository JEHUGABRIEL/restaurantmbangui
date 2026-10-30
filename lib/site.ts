export const NAME = "Restaurant M’";
export const PHONE_DISPLAY = "+236 72 05 34 34";
export const PHONE_TEL = "+23672053434";
export const EMAIL = "mlimbio@hotmail.com";
export const ADDRESS =
  "Rue de l’Industrie, face au Musée Barthélemy Boganda, Bangui";
export const CITY = "Bangui, République centrafricaine";
export const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=100057627602010";

export const HOURS = [
  {
    days: { fr: "Lundi – Jeudi", en: "Monday – Thursday" },
    time: "11h00 – 22h00",
  },
  {
    days: { fr: "Vendredi – Samedi", en: "Friday – Saturday" },
    time: "11h00 – 23h00",
  },
  { days: { fr: "Dimanche", en: "Sunday" }, time: "12h00 – 21h00" },
];

export const HOURS_SHORT = "Lun – Sam · 11h – 22h";

export function whatsapp(message: string) {
  return `https://wa.me/23672053434?text=${encodeURIComponent(message)}`;
}

export const RESERVE_MESSAGE =
  "Bonjour Restaurant M’, je souhaite réserver une table. Merci de me confirmer la disponibilité.";

export const RESERVE_URL = whatsapp(RESERVE_MESSAGE);

export const ORDER_URL = whatsapp(
  "Bonjour Restaurant M’, je souhaite passer une commande à emporter.",
);

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Restaurant M’ Rue de l’Industrie Bangui",
)}`;

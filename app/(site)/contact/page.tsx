import type { Metadata } from "next";
import MessageForm from "@/components/MessageForm";
import PageHero from "@/components/PageHero";
import ReservationForm from "@/components/ReservationForm";
import { getLocale } from "@/lib/locale";
import {
  ADDRESS,
  EMAIL,
  FACEBOOK_URL,
  HOURS,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/lib/site";
import { Facebook, Mail, Phone, Pin, WhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact & réservation",
  description:
    "Coordonnées, horaires et réservation du Restaurant M’ à Bangui : Rue de l’Industrie, face au Musée Barthélemy Boganda. Téléphone et WhatsApp au +236 72 05 34 34.",
};

const copy = {
  fr: {
    label: "Contact & accès",
    title: "Parlons de",
    em: "votre table.",
    lead: "Au cœur de Bangui, face au Musée Barthélemy Boganda. Une terrasse ombragée, un service continu et une réservation simple, par WhatsApp ou par téléphone.",
    find: "Nous trouver",
    hours: "Horaires",
    know: "À savoir",
    note: "Service continu en journée · Horaires indicatifs, confirmez par téléphone les jours fériés.",
    knowText:
      "Réservation conseillée le week-end et pour les groupes de six personnes et plus. Pizzas et plats disponibles à emporter sur commande WhatsApp.",
    itinerary: "Ouvrir l’itinéraire",
    reserveScript: "Réserver",
    reserveCaps: "Une table",
    reserveIntro:
      "Indiquez votre nom, la date et le nombre de personnes : votre demande est enregistrée et nous vous rappelons pour confirmer.",
    reservePhone: "Ou écrivez-nous au",
    reserveOk: "Votre demande est enregistrée. Nous confirmons la table par téléphone ou WhatsApp.",
    reserveIncomplete: "Merci d’indiquer votre nom, la date et l’heure de votre venue.",
    reservePhoneMissing:
      "Il nous manque un numéro pour vous rappeler. Ajoutez un téléphone ou écrivez-nous sur WhatsApp.",
    messageScript: "Un message",
    messageCaps: "Nous écrire",
    messageIntro:
      "Une question, un événement, un repas de groupe ? Écrivez-nous : votre message arrive directement dans la boîte de réception du restaurant.",
    messageOk: "Merci, votre message est bien arrivé. Nous vous répondons rapidement.",
    messageError: "Merci de vérifier votre nom, votre contact et votre message.",
    faqTitle: "Questions fréquentes",
    faqs: [
      {
        q: "Faut-il réserver ?",
        a: "Ce n’est pas obligatoire en semaine, mais vivement conseillé le week-end, le soir et pour les groupes de six personnes et plus.",
      },
      {
        q: "Peut-on commander à emporter ?",
        a: "Oui, pizzas et plats de la carte sont disponibles à emporter. Écrivez sur WhatsApp en précisant l’heure de retrait.",
      },
      {
        q: "Le Menu Rose est-il disponible toute l’année ?",
        a: "Non : il est servi pendant tout le mois d’octobre, à midi et le soir, tant que les produits de saison sont disponibles.",
      },
      {
        q: "Organisez-vous des repas de groupe ?",
        a: "Oui, en salle comme en terrasse, et en service traiteur. Prévenez-nous au moins 24 heures à l’avance.",
      },
    ],
  },
  en: {
    label: "Contact & directions",
    title: "Let’s talk about",
    em: "your table.",
    lead: "In the heart of Bangui, opposite the Barthélemy Boganda Museum. A shaded terrace, continuous service and simple booking by WhatsApp or phone.",
    find: "Find us",
    hours: "Opening hours",
    know: "Good to know",
    note: "Continuous service during the day · Hours are indicative; please call ahead on public holidays.",
    knowText:
      "Booking recommended at weekends and for groups of six or more. Pizzas and mains available to take away by WhatsApp order.",
    itinerary: "Open directions",
    reserveScript: "Book",
    reserveCaps: "A table",
    reserveIntro:
      "Give your name, date and number of guests: your request is saved and we call you back to confirm.",
    reservePhone: "Or write to us on",
    reserveOk: "Your request is saved. We confirm your table by phone or WhatsApp.",
    reserveIncomplete: "Please give your name, the date and the time of your visit.",
    reservePhoneMissing: "We need a number to call you back. Add a phone number or message us on WhatsApp.",
    messageScript: "A message",
    messageCaps: "Write to us",
    messageIntro:
      "A question, an event, a group meal? Write to us: your message arrives directly in the restaurant inbox.",
    messageOk: "Thank you, your message has arrived. We will reply shortly.",
    messageError: "Please check your name, your contact details and your message.",
    faqTitle: "Frequently asked",
    faqs: [
      {
        q: "Do we need to book?",
        a: "Not on weekdays, but strongly recommended at weekends, in the evening and for groups of six or more.",
      },
      {
        q: "Can we order takeaway?",
        a: "Yes, pizzas and mains are available to take away. Message us on WhatsApp with your pickup time.",
      },
      {
        q: "Is the Pink Menu available all year?",
        a: "No: it is served throughout October, at lunch and dinner, while seasonal produce lasts.",
      },
      {
        q: "Do you host group meals?",
        a: "Yes, indoors, on the terrace and through our catering service. Please let us know at least 24 hours in advance.",
      },
    ],
  },
} as const;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ reserve?: string; message?: string }>;
}) {
  const locale = await getLocale();
  const t = copy[locale];
  const { reserve, message } = await searchParams;

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
      />

      <section className="page-section">
        <div className="container contact-page-grid">
          <div className="contact-page-info">
            <div className="info-block">
              <span className="caps">{t.find}</span>
              <p className="info-line">
                <Pin width={15} height={15} />
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  {ADDRESS}
                </a>
              </p>
              <p className="info-line">
                <Phone width={15} height={15} />
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              </p>
              <p className="info-line">
                <Mail width={15} height={15} />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </p>
              <p className="info-line">
                <Facebook width={15} height={15} />
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                  Facebook — Restaurant M’
                </a>
              </p>
            </div>

            <div className="info-block">
              <span className="caps">{t.hours}</span>
              <table className="hours">
                <tbody>
                  {HOURS.map((row) => (
                    <tr key={row.time}>
                      <th scope="row">{row.days[locale]}</th>
                      <td>{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="info-note">{t.note}</p>
            </div>

            <div className="info-block">
              <span className="caps">{t.know}</span>
              <p>{t.knowText}</p>
              <a
                className="btn btn-outline-dark"
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.itinerary}
              </a>
            </div>
          </div>

          <div className="reserve-panel" id="reserver">
            <span className="script script-light">{t.reserveScript}</span>
            <span className="caps caps-gold">{t.reserveCaps}</span>
            <span className="ornament ornament-dark" aria-hidden />
            <p className="reserve-intro">{t.reserveIntro}</p>
            <ReservationForm locale={locale} />
            {reserve === "ok" ? <p className="form-note form-note--ok">{t.reserveOk}</p> : null}
            {reserve === "incomplete" ? (
              <p className="form-note form-note--error">{t.reserveIncomplete}</p>
            ) : null}
            {reserve === "phone" ? (
              <p className="form-note form-note--error">{t.reservePhoneMissing}</p>
            ) : null}
            <p className="reserve-phone">
              <WhatsApp width={14} height={14} />
              {t.reservePhone} {PHONE_DISPLAY}
            </p>
          </div>
        </div>

        <div className="container contact-message">
          <div className="contact-message__intro">
            <span className="script">{t.messageScript}</span>
            <span className="caps">{t.messageCaps}</span>
            <span className="ornament" aria-hidden />
            <p>{t.messageIntro}</p>
            {message === "ok" ? <p className="form-note form-note--ok">{t.messageOk}</p> : null}
            {message === "incomplete" ? (
              <p className="form-note form-note--error">{t.messageError}</p>
            ) : null}
          </div>
          <MessageForm locale={locale} />
        </div>

        <div className="container faq">
          <h2 className="faq-title">{t.faqTitle}</h2>
          {t.faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="map-section map-section-page">
        <iframe
          className="map-frame"
          title="Carte — Restaurant M’, Bangui"
          src="https://www.openstreetmap.org/export/embed.html?bbox=18.545%2C4.355%2C18.595%2C4.390&layer=mapnik&marker=4.372%2C18.560"
          loading="lazy"
        />
        <div className="container map-overlay">
          <div className="contact-card">
            <span className="script script-light">Contact</span>
            <span className="caps caps-light">{t.find}</span>
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
                href="https://wa.me/23672053434"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <WhatsApp width={15} height={15} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

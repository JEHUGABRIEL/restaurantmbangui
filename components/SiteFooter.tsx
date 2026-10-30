import Link from "next/link";
import {
  ADDRESS,
  EMAIL,
  FACEBOOK_URL,
  HOURS,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  whatsapp,
} from "@/lib/site";
import { getUi, type Locale } from "@/lib/i18n";
import {
  ArrowUpRight,
  Facebook,
  Mail,
  Phone,
  Pin,
  WhatsApp,
} from "./icons";

export default function SiteFooter({ locale }: { locale: Locale }) {
  const t = getUi(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <span className="footer-logo">
            <span className="footer-logo__mark" aria-hidden>
              M’
            </span>
            <span className="footer-logo__name">Restaurant M’</span>
          </span>
          <p className="footer-tagline">{t.footer.tagline}</p>
          <div className="footer-socials">
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
                locale === "fr"
                  ? "Bonjour Restaurant M’, je vous contacte depuis votre site."
                  : "Hello Restaurant M’, I am writing from your website.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <WhatsApp width={15} height={15} />
            </a>
          </div>
        </div>

        <nav className="footer-col" aria-label={t.footer.explore}>
          <h2 className="footer-col__title">{t.footer.explore}</h2>
          <Link href="/maison">{t.nav.restaurant}</Link>
          <Link href="/carte">{t.nav.carte}</Link>
          <Link href="/menu-rose">{t.nav.rose}</Link>
          <Link href="/actualites">{t.nav.news}</Link>
          <Link href="/#avis">{t.nav.reviews}</Link>
        </nav>

        <div className="footer-col">
          <h2 className="footer-col__title">{t.footer.visit}</h2>
          <a
            className="footer-line"
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Pin width={13} height={13} />
            <span>{ADDRESS}</span>
          </a>
          <a className="footer-line" href={`tel:${PHONE_TEL}`}>
            <Phone width={13} height={13} />
            <span>{PHONE_DISPLAY}</span>
          </a>
          <a className="footer-line" href={`mailto:${EMAIL}`}>
            <Mail width={13} height={13} />
            <span>{EMAIL}</span>
          </a>
          <Link className="footer-cta" href="/contact#reserver">
            {t.common.bookTable}
            <ArrowUpRight width={12} height={12} />
          </Link>
        </div>

        <div className="footer-col footer-col--hours">
          <h2 className="footer-col__title">{t.footer.hoursTitle}</h2>
          {HOURS.map((slot) => (
            <p className="footer-hours" key={slot.days.fr}>
              <span>{slot.days[locale]}</span>
              <span>{slot.time}</span>
            </p>
          ))}
          <span className="footer-note">{t.footer.note}</span>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <span>
            © {year} Restaurant M’. {t.footer.rights}
          </span>
          <span>{t.footer.built}</span>
        </div>
      </div>
    </footer>
  );
}

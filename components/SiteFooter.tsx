import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { getUi, type Locale } from "@/lib/i18n";

export default function SiteFooter({ locale }: { locale: Locale }) {
  const t = getUi(locale);

  return (
    <footer className="footer-bar">
      <div className="container footer-bar-inner">
        <span>{t.footer.location}</span>
        <span className="footer-bar-mid">
          <Link href="/carte">{t.nav.carte}</Link>
          <i aria-hidden>✦</i>
          <Link href="/actualites">{t.nav.news}</Link>
          <i aria-hidden>✦</i>
          <Link href="/contact">{t.footer.bookings}</Link>
          <i aria-hidden>✦</i>
          <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
        </span>
        <span>{t.footer.built}</span>
      </div>
    </footer>
  );
}

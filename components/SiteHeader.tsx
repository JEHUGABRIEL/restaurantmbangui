"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FACEBOOK_URL, PHONE_DISPLAY, RESERVE_URL, whatsapp } from "@/lib/site";
import { getUi, type Locale } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import LocaleSwitch from "./LocaleSwitch";
import {
  ArrowUpRight,
  CartIcon,
  Close,
  Facebook,
  MenuIcon,
  WhatsApp,
} from "./icons";

export default function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";
  const { count, openCart } = useCart();
  const t = getUi(locale);

  const links = [
    { href: "/maison", label: t.nav.restaurant },
    { href: "/carte", label: t.nav.carte },
    { href: "/menu-rose", label: t.nav.rose },
    { href: "/actualites", label: t.nav.news },
    { href: "/#avis", label: t.nav.reviews },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={isHome ? "site-header is-overlay" : "site-header is-solid"}
    >
      <div className="container header-row">
        <Link className="logo" href="/" aria-label="Restaurant M’">
          <span className="logo-mark" aria-hidden>
            M’
          </span>
          <span className="logo-text">Restaurant M’</span>
        </Link>

        <nav className="main-nav" aria-label="Navigation principale">
          {links.map((link) => {
            const active =
              link.href.startsWith("/") && link.href !== "/#avis"
                ? pathname === link.href || pathname.startsWith(`${link.href}/`)
                : false;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "is-active" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-utils">
          <LocaleSwitch locale={locale} />
          <a
            className="icon-btn"
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Facebook width={15} height={15} />
          </a>
          <a
            className="icon-btn"
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
          <button
            type="button"
            className="cart-btn"
            onClick={openCart}
            aria-label={
              count > 0
                ? `${t.cart.open}, ${count} ${
                    count > 1 ? t.cart.countMany : t.cart.countOne
                  }`
                : t.cart.open
            }
          >
            <CartIcon width={16} height={16} />
            {count > 0 ? <span className="cart-badge">{count}</span> : null}
          </button>
          <Link className="nav-reserve" href="/contact#reserver">
            {t.common.reserve}
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.common.close : "Menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <Close width={22} height={22} /> : <MenuIcon width={22} height={22} />}
          </button>
        </div>
      </div>

      <div className="mobile-menu" id="mobile-menu" hidden={!open}>
        <nav aria-label="Navigation mobile">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          <LocaleSwitch locale={locale} />
          <a href="tel:+23672053434">{PHONE_DISPLAY}</a>
          <button
            type="button"
            className="mobile-cart"
            onClick={() => {
              setOpen(false);
              openCart();
            }}
          >
            {t.cart.title} ({count})
          </button>
          <a
            className="btn btn-gold"
            href={RESERVE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.common.bookTable}
            <ArrowUpRight width={14} height={14} />
          </a>
        </div>
      </div>
    </header>
  );
}

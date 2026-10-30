"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FACEBOOK_URL, PHONE_TEL, RESERVE_URL, whatsapp } from "@/lib/site";
import { getUi, type Locale } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import LocaleSwitch from "./LocaleSwitch";
import {
  ArrowUpRight,
  CartIcon,
  Close,
  Facebook,
  MenuIcon,
  Phone,
  WhatsApp,
} from "./icons";

export default function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const { count, openCart } = useCart();
  const t = getUi(locale);

  const links = [
    { href: "/maison", label: t.nav.restaurant },
    { href: "/carte", label: t.nav.carte },
    { href: "/menu-rose", label: t.nav.rose },
    { href: "/actualites", label: t.nav.news },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      className={`site-header ${isHome ? "is-overlay" : "is-solid"}${
        scrolled ? " is-scrolled" : ""
      }`}
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
              pathname === link.href || pathname.startsWith(`${link.href}/`);
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
        <div className="mobile-menu__top">
          <span className="mobile-menu__brand">
            <span className="mobile-menu__mark" aria-hidden>
              M’
            </span>
            Restaurant M’
          </span>
          <button
            type="button"
            className="mobile-close"
            onClick={() => setOpen(false)}
            aria-label={t.common.close}
          >
            <Close width={18} height={18} />
          </button>
        </div>

        <nav aria-label="Navigation mobile">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
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

        <div className="mobile-menu__foot">
          <a className="mobile-call" href={`tel:${PHONE_TEL}`}>
            <Phone width={15} height={15} />
            {t.common.call}
          </a>
          <a
            className="btn btn-gold mobile-book"
            href={RESERVE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.common.bookTable}
            <ArrowUpRight width={14} height={14} />
          </a>
          <button
            type="button"
            className="mobile-cart"
            onClick={() => {
              setOpen(false);
              openCart();
            }}
          >
            <CartIcon width={14} height={14} />
            {t.cart.title} ({count})
          </button>
          <div className="mobile-menu__lang">
            <LocaleSwitch locale={locale} />
          </div>
        </div>
      </div>
    </header>
  );
}

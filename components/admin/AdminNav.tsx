"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "./icons";

type Badges = { reservations: number; messages: number };
type Category = { slug: string; label: string };

type NavLink = {
  href: string;
  label: string;
  badge?: keyof Badges;
  submenu?: boolean;
};

const links: NavLink[] = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/reservations", label: "Réservations", badge: "reservations" },
  { href: "/admin/messages", label: "Messages", badge: "messages" },
  { href: "/admin/menu", label: "Carte", submenu: true },
  { href: "/admin/actualites", label: "Actualités" },
  { href: "/admin/activite", label: "Activité" },
  { href: "/admin/compte", label: "Mon compte" },
];

export default function AdminNav({ badges, categories }: { badges: Badges; categories: Category[] }) {
  const pathname = usePathname();
  const inMenu = pathname.startsWith("/admin/menu");
  const [menuOpen, setMenuOpen] = useState(inMenu);
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <nav className="admin-nav" aria-label="Navigation back-office">
      {links.map((link) => {
        const count = link.badge ? badges[link.badge] : 0;
        if (!link.submenu) {
          return (
            <Link key={link.href} href={link.href} className={isActive(link.href) ? "is-active" : undefined}>
              {link.label}
              {count > 0 && <span className="badge">{count}</span>}
            </Link>
          );
        }
        const open = menuOpen || inMenu;
        return (
          <div key={link.href} className={`admin-nav__group${open ? " is-open" : ""}`}>
            <button
              type="button"
              className={inMenu ? "is-active" : undefined}
              aria-expanded={open}
              onClick={() => setMenuOpen((value) => !value)}
            >
              {link.label}
              <span className="admin-nav__chevron">
                <Icon name="chevron" size={14} />
              </span>
            </button>
            {open && (
              <div className="admin-nav__sub">
                <Link href="/admin/menu" className={pathname === "/admin/menu" ? "is-active" : undefined}>
                  Catégories
                </Link>
                {categories.map((category) => {
                  const href = `/admin/menu/${category.slug}`;
                  return (
                    <Link key={category.slug} href={href} className={pathname === href ? "is-active" : undefined}>
                      {category.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

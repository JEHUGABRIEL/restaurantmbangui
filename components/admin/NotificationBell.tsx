"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon, { type IconName } from "./icons";

type Item = {
  id: string;
  category: string;
  text: string;
  link: string | null;
  read: boolean;
  createdAt: string;
};

const POLL_MS = 30_000;

const categoryIcon: Record<string, IconName> = {
  reservation: "clock",
  message: "mail",
  menu: "note",
  news: "note",
  securite: "key",
  connexion: "user",
};

function ago(iso: string) {
  const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "à l’instant";
  if (seconds < 3600) return `il y a ${Math.floor(seconds / 60)} min`;
  if (seconds < 86400) return `il y a ${Math.floor(seconds / 3600)} h`;
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

/** Cloche de notifications : rafraîchie toutes les 30 s et à chaque changement de page. */
export default function NotificationBell({ initialUnread }: { initialUnread: number }) {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(initialUnread);
  const [items, setItems] = useState<Item[] | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/notifications", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { unread: number; items: Item[] };
      setUnread(data.unread);
      setItems(data.items);
    } catch {
      // Réseau indisponible : nouvel essai au prochain intervalle.
    }
  }, []);

  useEffect(() => {
    refresh();
    const id = setInterval(
      () => document.visibilityState === "visible" && refresh(),
      POLL_MS,
    );
    return () => clearInterval(id);
  }, [refresh, pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const post = async (body: object) => {
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) setUnread(((await res.json()) as { unread: number }).unread);
    } catch {
      // Le marquage sera retenté au prochain clic.
    }
  };

  const openItem = async (item: Item) => {
    if (!item.read) {
      setItems((list) => list?.map((row) => (row.id === item.id ? { ...row, read: true } : row)) ?? null);
      await post({ id: item.id });
    }
    setOpen(false);
    if (item.link) router.push(item.link);
  };

  const markAll = async () => {
    setItems((list) => list?.map((row) => ({ ...row, read: true })) ?? null);
    await post({ all: true });
  };

  return (
    <div className="bell" ref={root}>
      <button
        type="button"
        className={`bell__btn${open ? " is-open" : ""}`}
        aria-label={unread ? `Notifications (${unread} non lues)` : "Notifications"}
        aria-expanded={open}
        onClick={() => {
          setOpen((value) => !value);
          if (!open) refresh();
        }}
      >
        <Icon name="bell" size={19} />
        {unread > 0 && <span className="bell__count">{unread > 99 ? "99+" : unread}</span>}
      </button>
      {open && (
        <div className="bell__panel" role="dialog" aria-label="Notifications">
          <div className="bell__head">
            <strong>Notifications</strong>
            {unread > 0 && (
              <button type="button" className="linkbtn" onClick={markAll}>
                Tout marquer comme lu
              </button>
            )}
          </div>
          <div className="bell__list">
            {items === null && <p className="bell__empty">Chargement…</p>}
            {items?.length === 0 && <p className="bell__empty">Aucune notification pour le moment.</p>}
            {items?.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`bell__item${item.read ? "" : " is-unread"}`}
                onClick={() => openItem(item)}
              >
                <span className={`bell__icon bell__icon--${item.category}`}>
                  <Icon name={categoryIcon[item.category] ?? "activity"} size={15} />
                </span>
                <span className="bell__text">
                  <span>{item.text}</span>
                  <small>{ago(item.createdAt)}</small>
                </span>
              </button>
            ))}
          </div>
          <a
            href="/admin/activite"
            className="bell__foot"
            onClick={(event) => {
              event.preventDefault();
              setOpen(false);
              router.push("/admin/activite");
            }}
          >
            Voir toute l’activité
          </a>
        </div>
      )}
    </div>
  );
}

import "server-only";

import { randomUUID } from "node:crypto";
import { readStore, writeStore } from "./store";

export type NotificationCategory =
  | "reservation"
  | "message"
  | "menu"
  | "news"
  | "securite";

export type AppNotification = {
  id: string;
  category: NotificationCategory;
  text: string;
  link: string | null;
  read: boolean;
  createdAt: string;
};

const FILE = "notifications.json";
const MAX_ROWS = 120;

export async function getNotifications(): Promise<AppNotification[]> {
  const rows = await readStore<AppNotification[]>(FILE, []);
  return Array.isArray(rows) ? rows : [];
}

export async function unreadCount(): Promise<number> {
  return (await getNotifications()).filter((row) => !row.read).length;
}

/** Ajoute une notification. Best-effort : une écriture ratée ne bloque pas l'action métier. */
export async function notify(
  entry: Omit<AppNotification, "id" | "read" | "createdAt">,
): Promise<void> {
  try {
    const rows = await getNotifications();
    rows.unshift({
      ...entry,
      id: randomUUID(),
      read: false,
      createdAt: new Date().toISOString(),
    });
    await writeStore(FILE, rows.slice(0, MAX_ROWS));
  } catch {
    // Notifications best-effort : on n'interrompt pas l'action en cours.
  }
}

export async function markNotificationRead(id: string): Promise<void> {
  const rows = await getNotifications();
  let changed = false;
  const next = rows.map((row) => {
    if (row.id !== id || row.read) return row;
    changed = true;
    return { ...row, read: true };
  });
  if (changed) await writeStore(FILE, next);
}

export async function markAllRead(): Promise<void> {
  const rows = await getNotifications();
  if (rows.every((row) => row.read)) return;
  await writeStore(
    FILE,
    rows.map((row) => ({ ...row, read: true })),
  );
}

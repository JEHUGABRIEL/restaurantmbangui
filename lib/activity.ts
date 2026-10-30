import "server-only";

import { randomUUID } from "node:crypto";
import { readStore, writeStore } from "./store";

export type ActivityCategory =
  | "connexion"
  | "reservation"
  | "message"
  | "menu"
  | "news"
  | "securite";

export const activityCategories: Record<ActivityCategory, string> = {
  connexion: "Connexions",
  reservation: "Réservations",
  message: "Messages",
  menu: "Carte",
  news: "Actualités",
  securite: "Sécurité",
};

export type Activity = {
  id: string;
  actor: string;
  category: ActivityCategory;
  summary: string;
  link: string | null;
  createdAt: string;
};

const FILE = "activity.json";
const MAX_ROWS = 400;

export async function getActivity(): Promise<Activity[]> {
  const rows = await readStore<Activity[]>(FILE, []);
  return Array.isArray(rows) ? rows : [];
}

/** Enregistre une action. Les erreurs d'écriture ne doivent jamais bloquer l'action métier. */
export async function logActivity(entry: Omit<Activity, "id" | "createdAt">): Promise<void> {
  try {
    const rows = await getActivity();
    rows.unshift({ ...entry, id: randomUUID(), createdAt: new Date().toISOString() });
    await writeStore(FILE, rows.slice(0, MAX_ROWS));
  } catch {
    // Journal best-effort : on n'interrompt pas l'action en cours.
  }
}

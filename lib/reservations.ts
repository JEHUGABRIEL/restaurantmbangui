import "server-only";

import { randomUUID } from "node:crypto";
import { readStore, writeStore } from "./store";

export const reservationStatuses = ["en_attente", "confirmee", "annulee"] as const;
export type ReservationStatus = (typeof reservationStatuses)[number];

export type Reservation = {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seating: string;
  notes: string;
  status: ReservationStatus;
  adminNote: string | null;
  createdAt: string;
};

const FILE = "reservations.json";

export async function getReservations(): Promise<Reservation[]> {
  const rows = await readStore<Reservation[]>(FILE, []);
  return Array.isArray(rows) ? rows : [];
}

export async function saveReservations(rows: Reservation[]): Promise<void> {
  await writeStore(FILE, rows);
}

export async function addReservation(
  input: Omit<Reservation, "id" | "status" | "adminNote" | "createdAt">,
): Promise<Reservation> {
  const rows = await getReservations();
  const reservation: Reservation = {
    ...input,
    id: randomUUID(),
    status: "en_attente",
    adminNote: null,
    createdAt: new Date().toISOString(),
  };
  rows.push(reservation);
  await saveReservations(rows);
  return reservation;
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

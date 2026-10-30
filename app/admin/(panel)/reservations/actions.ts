"use server";

import { done, fail, str } from "@/lib/admin";
import { logActivity } from "@/lib/activity";
import { requireAdmin } from "@/lib/admin-auth";
import {
  formatDate,
  getReservations,
  reservationStatuses,
  saveReservations,
  type ReservationStatus,
} from "@/lib/reservations";

const backTo = (fd: FormData) => {
  const back = str(fd, "back");
  return back.startsWith("/admin/reservations") ? back : "/admin/reservations";
};

async function label(id: string) {
  const row = (await getReservations()).find((reservation) => reservation.id === id);
  return row ? `${row.name} (${formatDate(row.date)} à ${row.time})` : `n°${id}`;
}

export async function setReservationStatus(fd: FormData) {
  const me = await requireAdmin();
  const back = backTo(fd);
  const id = str(fd, "id", 80);
  const status = str(fd, "status") as ReservationStatus;
  if (!id || !reservationStatuses.includes(status)) fail(back, "Requête invalide.");

  const rows = await getReservations();
  const index = rows.findIndex((row) => row.id === id);
  if (index < 0) fail(back, "Réservation introuvable.");
  rows[index].status = status;
  await saveReservations(rows);

  const verb =
    status === "confirmee"
      ? "a confirmé"
      : status === "annulee"
        ? "a annulé"
        : "a remis en attente";
  await logActivity({
    actor: me.name,
    category: "reservation",
    summary: `${verb} la réservation de ${await label(id)}`,
    link: "/admin/reservations",
  });
  done(
    back,
    status === "confirmee"
      ? "Réservation confirmée."
      : status === "annulee"
        ? "Réservation annulée."
        : "Réservation remise en attente.",
  );
}

export async function saveReservationNote(fd: FormData) {
  const me = await requireAdmin();
  const back = backTo(fd);
  const id = str(fd, "id", 80);
  if (!id) fail(back, "Requête invalide.");

  const rows = await getReservations();
  const index = rows.findIndex((row) => row.id === id);
  if (index < 0) fail(back, "Réservation introuvable.");
  rows[index].adminNote = str(fd, "adminNote", 2000) || null;
  await saveReservations(rows);

  await logActivity({
    actor: me.name,
    category: "reservation",
    summary: `a modifié la note de la réservation de ${await label(id)}`,
    link: "/admin/reservations",
  });
  done(back, "Note enregistrée.");
}

export async function deleteReservation(fd: FormData) {
  const me = await requireAdmin();
  const back = backTo(fd);
  const id = str(fd, "id", 80);
  if (!id) fail(back, "Requête invalide.");

  const what = await label(id);
  const rows = await getReservations();
  await saveReservations(rows.filter((row) => row.id !== id));

  await logActivity({
    actor: me.name,
    category: "reservation",
    summary: `a supprimé la réservation de ${what}`,
    link: "/admin/reservations",
  });
  done(back, "Réservation supprimée.");
}

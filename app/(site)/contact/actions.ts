"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { str } from "@/lib/admin";
import { logActivity } from "@/lib/activity";
import { addMessage } from "@/lib/messages";
import { notify } from "@/lib/notifications";
import { addReservation } from "@/lib/reservations";

export async function createReservation(formData: FormData) {
  const name = str(formData, "name", 100);
  const phone = str(formData, "phone", 40);
  const date = str(formData, "date", 20);
  const time = str(formData, "time", 10);
  const guestsRaw = str(formData, "guests", 40);
  const guests = Number.parseInt(guestsRaw, 10);
  const seating = str(formData, "seating", 40);
  const notes = str(formData, "message", 1000);

  if (!name || !date || !time) redirect("/contact?reserve=incomplete");
  if (phone.replace(/\D/g, "").length < 6) redirect("/contact?reserve=phone");

  const reservation = await addReservation({
    name,
    phone,
    email: "",
    date,
    time,
    guests: Number.isFinite(guests) ? guests : 0,
    seating,
    notes,
  });

  revalidatePath("/admin", "layout");
  await logActivity({
    actor: name,
    category: "reservation",
    summary: `a envoyé une demande de réservation (${reservation.guests || "?"} pers., ${date} à ${time})`,
    link: "/admin/reservations",
  });
  await notify({
    category: "reservation",
    text: `${name} demande une table pour ${reservation.guests || "?"} pers. le ${date} à ${time}.`,
    link: "/admin/reservations",
  });
  redirect("/contact?reserve=ok");
}

export async function createMessage(formData: FormData) {
  const name = str(formData, "name", 100);
  const contact = str(formData, "contact", 200);
  const subject = str(formData, "subject", 120);
  const message = str(formData, "message", 2000);

  if (!name || !contact || message.length < 5) redirect("/contact?message=incomplete");

  await addMessage({ name, contact, subject, message });

  revalidatePath("/admin", "layout");
  await logActivity({
    actor: name,
    category: "message",
    summary: "a envoyé un message depuis la page Contact",
    link: "/admin/messages",
  });
  await notify({
    category: "message",
    text: `${name} a envoyé un message${subject ? ` : ${subject}` : ""}.`,
    link: "/admin/messages",
  });
  redirect("/contact?message=ok");
}

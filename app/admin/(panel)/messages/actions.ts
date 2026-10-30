"use server";

import { done, fail, str } from "@/lib/admin";
import { logActivity } from "@/lib/activity";
import { requireAdmin } from "@/lib/admin-auth";
import { getMessages, saveMessages } from "@/lib/messages";

const backTo = (fd: FormData) => {
  const back = str(fd, "back");
  return back.startsWith("/admin/messages") ? back : "/admin/messages";
};

export async function toggleMessageRead(fd: FormData) {
  const me = await requireAdmin();
  const id = str(fd, "id", 80);
  if (!id) fail("/admin/messages", "Requête invalide.");
  const read = str(fd, "read") === "1";

  const rows = await getMessages();
  const index = rows.findIndex((row) => row.id === id);
  if (index < 0) fail("/admin/messages", "Message introuvable.");
  rows[index].read = read;
  await saveMessages(rows);

  await logActivity({
    actor: me.name,
    category: "message",
    summary: `a marqué le message de ${rows[index].name} comme ${read ? "lu" : "non lu"}`,
    link: "/admin/messages",
  });
  done(backTo(fd), read ? "Message marqué comme lu." : "Message marqué comme non lu.");
}

export async function deleteMessage(fd: FormData) {
  const me = await requireAdmin();
  const id = str(fd, "id", 80);
  if (!id) fail("/admin/messages", "Requête invalide.");

  const rows = await getMessages();
  const target = rows.find((row) => row.id === id);
  await saveMessages(rows.filter((row) => row.id !== id));

  await logActivity({
    actor: me.name,
    category: "message",
    summary: `a supprimé le message de ${target?.name ?? `n°${id}`}`,
    link: "/admin/messages",
  });
  done(backTo(fd), "Message supprimé.");
}

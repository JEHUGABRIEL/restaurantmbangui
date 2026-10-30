"use server";

import { done, fail, str } from "@/lib/admin";
import { logActivity } from "@/lib/activity";
import {
  createSession,
  getAdmin,
  hashPassword,
  requireAdmin,
  saveAdmin,
  verifyPassword,
} from "@/lib/admin-auth";
import { notify } from "@/lib/notifications";

const ACCOUNT = "/admin/compte";

export async function updateProfile(fd: FormData) {
  const current = await requireAdmin();
  const name = str(fd, "name", 100);
  const email = str(fd, "email", 200).toLowerCase();
  if (name.length < 2) fail(ACCOUNT, "Merci d’indiquer un nom.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail(ACCOUNT, "Adresse e-mail invalide.");

  await saveAdmin({ ...current, name, email });
  const profile = await getAdmin();
  await createSession(profile);
  await logActivity({
    actor: name,
    category: "securite",
    summary: "a mis à jour son profil",
    link: ACCOUNT,
  });
  done(ACCOUNT, "Profil enregistré.");
}

export async function changePassword(fd: FormData) {
  const current = await requireAdmin();
  const before = str(fd, "current", 200);
  const next = str(fd, "password", 200);
  const confirm = str(fd, "confirm", 200);

  if (!verifyPassword(before, current.passwordHash)) fail(ACCOUNT, "Mot de passe actuel incorrect.");
  if (next.length < 8) fail(ACCOUNT, "Le nouveau mot de passe doit faire au moins 8 caractères.");
  if (next !== confirm) fail(ACCOUNT, "Les deux mots de passe ne correspondent pas.");

  const profile = { ...current, passwordHash: hashPassword(next) };
  await saveAdmin(profile);
  await createSession(profile);
  await logActivity({
    actor: profile.name,
    category: "securite",
    summary: "a changé son mot de passe",
    link: ACCOUNT,
  });
  await notify({
    category: "securite",
    text: "Mot de passe du back-office modifié : les autres sessions ont été fermées.",
    link: ACCOUNT,
  });
  done(ACCOUNT, "Mot de passe modifié. Les autres sessions sont fermées.");
}

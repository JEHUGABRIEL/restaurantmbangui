"use server";

import { redirect } from "next/navigation";
import { fail, str } from "@/lib/admin";
import { logActivity } from "@/lib/activity";
import {
  createSession,
  destroySession,
  getAdmin,
  isAdmin,
  verifyPassword,
} from "@/lib/admin-auth";

export async function login(formData: FormData) {
  const profile = await getAdmin();
  const email = str(formData, "email", 200).toLowerCase();
  const password = str(formData, "password", 200);

  if (email !== profile.email.toLowerCase() || !verifyPassword(password, profile.passwordHash)) {
    await logActivity({
      actor: email || "Inconnu",
      category: "connexion",
      summary: `Échec de connexion pour ${email || "(e-mail vide)"}`,
      link: "/admin/activite?type=connexion",
    });
    fail("/admin/login", "E-mail ou mot de passe incorrect.");
  }

  await createSession(profile);
  await logActivity({
    actor: profile.name,
    category: "connexion",
    summary: "s’est connecté au back-office",
    link: "/admin/activite?type=connexion",
  });
  redirect("/admin");
}

export async function logout() {
  if (await isAdmin()) {
    const profile = await getAdmin();
    await logActivity({
      actor: profile.name,
      category: "connexion",
      summary: "s’est déconnecté",
      link: "/admin/activite",
    });
  }
  await destroySession();
  redirect("/admin/login");
}

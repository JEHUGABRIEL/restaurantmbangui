import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import BackToSite from "@/components/admin/BackToSite";
import Flash from "@/components/admin/Flash";
import PasswordInput from "@/components/admin/PasswordInput";
import SubmitButton from "@/components/admin/SubmitButton";
import { getAdmin, isAdmin } from "@/lib/admin-auth";
import { login } from "../auth-actions";
import type { PageProps } from "@/lib/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Connexion", robots: { index: false } };

export default async function LoginPage({ searchParams }: PageProps) {
  if (await isAdmin()) redirect("/admin");
  const profile = await getAdmin();
  const { error, ok } = await searchParams;

  return (
    <div className="auth">
      <BackToSite />
      <div className="auth__card">
        <span className="admin-brand">
          <span className="admin-brand__script">Restaurant M’</span>
          <span className="admin-brand__sub">Back-office</span>
        </span>
        <h1>Connexion</h1>
        <Flash ok={ok} error={error} />
        <form action={login} className="aform">
          <div className="afield">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={profile.email}
              required
              autoFocus
            />
          </div>
          <div className="afield">
            <label htmlFor="password">Mot de passe</label>
            <PasswordInput id="password" name="password" autoComplete="current-password" required />
          </div>
          <SubmitButton>Se connecter</SubmitButton>
        </form>
        <p className="auth__text" style={{ marginTop: 18 }}>
          Accès réservé à la maison. Les réservations, les messages et la carte sont
          enregistrés dans des fichiers JSON en attendant la base Neon.
        </p>
        <p className="auth__foot">
          <Link href="/" className="auth__link">
            ← Retour au site
          </Link>
        </p>
      </div>
    </div>
  );
}

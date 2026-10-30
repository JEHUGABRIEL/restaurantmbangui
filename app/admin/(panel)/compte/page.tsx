import type { Metadata } from "next";
import Avatar from "@/components/admin/Avatar";
import Flash from "@/components/admin/Flash";
import PasswordInput from "@/components/admin/PasswordInput";
import SubmitButton from "@/components/admin/SubmitButton";
import { requireAdmin } from "@/lib/admin-auth";
import type { PageProps } from "@/lib/admin";
import { changePassword, updateProfile } from "./actions";

export const metadata: Metadata = { title: "Mon compte" };

export default async function AccountPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const profile = await requireAdmin();

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Mon compte</h1>
          <p>{profile.email} · Administrateur</p>
        </div>
      </div>
      <Flash ok={sp.ok} error={sp.error} />

      <div className="acard">
        <div className="profile-photo">
          <Avatar name={profile.name} size={96} />
          <div>
            <h2 style={{ margin: "0 0 6px" }}>{profile.name}</h2>
            <p className="muted" style={{ margin: 0 }}>
              Les initiales servent d’avatar tant qu’aucune photo n’est envoyée.
            </p>
          </div>
        </div>
      </div>

      <div className="acard">
        <h2>Profil</h2>
        <form action={updateProfile} className="aform">
          <div className="afield">
            <label htmlFor="name">Nom affiché</label>
            <input id="name" name="name" defaultValue={profile.name} required minLength={2} />
          </div>
          <div className="afield">
            <label htmlFor="email">E-mail de connexion</label>
            <input id="email" name="email" type="email" defaultValue={profile.email} required />
          </div>
          <div className="form-foot">
            <SubmitButton>Enregistrer</SubmitButton>
          </div>
        </form>
      </div>

      <div className="acard">
        <h2>Mot de passe</h2>
        <p className="muted" style={{ marginTop: 0 }}>
          Le mot de passe est stocké haché (scrypt) dans <code>data/admin.json</code>. Changer le mot de passe ferme les
          autres sessions ouvertes.
        </p>
        <form action={changePassword} className="aform aform--3">
          <div className="afield">
            <label htmlFor="current">Mot de passe actuel</label>
            <PasswordInput id="current" name="current" autoComplete="current-password" required />
          </div>
          <div className="afield">
            <label htmlFor="password">Nouveau mot de passe</label>
            <PasswordInput id="password" name="password" autoComplete="new-password" required minLength={8} />
          </div>
          <div className="afield">
            <label htmlFor="confirm">Confirmation</label>
            <PasswordInput id="confirm" name="confirm" autoComplete="new-password" required minLength={8} />
          </div>
          <div className="form-foot">
            <SubmitButton>Changer le mot de passe</SubmitButton>
          </div>
        </form>
      </div>
    </>
  );
}

import Link from "next/link";
import AdminFrame from "@/components/admin/AdminFrame";
import AdminNav from "@/components/admin/AdminNav";
import Avatar from "@/components/admin/Avatar";
import ConfirmAction from "@/components/admin/ConfirmAction";
import NotificationBell from "@/components/admin/NotificationBell";
import { requireAdmin } from "@/lib/admin-auth";
import { getMessages } from "@/lib/messages";
import { readMenu } from "@/lib/menu-data";
import { unreadCount } from "@/lib/notifications";
import { getReservations } from "@/lib/reservations";
import { logout } from "../auth-actions";

export const dynamic = "force-dynamic";

export default async function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const profile = await requireAdmin();
  const [reservations, messages, menu, unreadNotifications] = await Promise.all([
    getReservations(),
    getMessages(),
    readMenu(),
    unreadCount(),
  ]);

  const pending = reservations.filter((row) => row.status === "en_attente").length;
  const unread = messages.filter((row) => !row.read).length;
  const categories = menu.map((section) => ({
    slug: section.id,
    label: section.title.fr,
  }));

  const brand = (
    <span className="admin-brand">
      <span className="admin-brand__script">Restaurant M’</span>
      <span className="admin-brand__sub">Back-office</span>
    </span>
  );

  const sidebar = (
    <>
      {brand}
      <AdminNav badges={{ reservations: pending, messages: unread }} categories={categories} />
      <div className="admin-side__foot">
        <Link href="/admin/compte" className="admin-user">
          <Avatar name={profile.name} />
          <span>
            <strong>{profile.name}</strong>
            <span className="muted">{profile.email}</span>
          </span>
        </Link>
        <ConfirmAction
          action={logout}
          as="button"
          icon="logout"
          label="Déconnexion"
          title="Se déconnecter ?"
          message="Vous devrez saisir à nouveau votre e-mail et votre mot de passe pour accéder au back-office."
          confirmLabel="Se déconnecter"
        />
      </div>
    </>
  );

  const topRight = (
    <>
      <NotificationBell initialUnread={unreadNotifications} />
      <Link href="/admin/compte" className="admin-topbar__me" aria-label="Mon compte">
        <Avatar name={profile.name} size={34} />
      </Link>
    </>
  );

  return (
    <AdminFrame sidebar={sidebar} brand={brand} topRight={topRight}>
      {children}
    </AdminFrame>
  );
}

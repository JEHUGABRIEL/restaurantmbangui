import Link from "next/link";
import Flash from "@/components/admin/Flash";
import { getMessages } from "@/lib/messages";
import { getNews } from "@/lib/news";
import { getReservations, todayISO, formatDate } from "@/lib/reservations";
import type { PageProps } from "@/lib/admin";
import { StatusPill } from "./reservations/ui";

export default async function Dashboard({ searchParams }: PageProps) {
  const { ok } = await searchParams;
  const [reservations, messages, news] = await Promise.all([
    getReservations(),
    getMessages(),
    getNews(),
  ]);
  const today = todayISO();
  const pending = reservations.filter((row) => row.status === "en_attente");
  const confirmedToday = reservations.filter(
    (row) => row.status === "confirmee" && row.date === today,
  );
  const unread = messages.filter((row) => !row.read);
  const next = reservations
    .filter((row) => row.date >= today)
    .sort((a, b) => (a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date)))
    .slice(0, 8);

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Tableau de bord</h1>
          <p>Vue d’ensemble de l’activité du restaurant.</p>
        </div>
      </div>
      <Flash ok={ok} />

      <div className="stats">
        <Link href="/admin/reservations?statut=en_attente" className="stat stat--accent">
          <div className="stat__value">{pending.length}</div>
          <div className="stat__label">Réservations à confirmer</div>
        </Link>
        <div className="stat">
          <div className="stat__value">{confirmedToday.length}</div>
          <div className="stat__label">Tables confirmées aujourd’hui</div>
        </div>
        <Link href="/admin/messages" className="stat">
          <div className="stat__value">{unread.length}</div>
          <div className="stat__label">Messages non lus</div>
        </Link>
        <Link href="/admin/actualites" className="stat">
          <div className="stat__value">{news.length}</div>
          <div className="stat__label">Actualités en ligne</div>
        </Link>
      </div>

      <div className="acard acard--flush">
        <div className="cat-head">
          <h2>Prochaines réservations</h2>
          <Link href="/admin/reservations" className="abtn abtn--ghost abtn--sm">
            Tout voir
          </Link>
        </div>
        {next.length === 0 ? (
          <div className="empty">Aucune réservation à venir.</div>
        ) : (
          <div className="table-wrap">
            <table className="atable">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Client</th>
                  <th>Pers.</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {next.map((row) => (
                  <tr key={row.id}>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <strong>{formatDate(row.date)}</strong>
                      <div className="muted">{row.time}</div>
                    </td>
                    <td>
                      {row.name}
                      <div className="muted">{row.phone}</div>
                    </td>
                    <td>{row.guests}</td>
                    <td>
                      <StatusPill status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="acard">
        <h2>Derniers messages</h2>
        {messages.length === 0 ? (
          <p className="muted">Aucun message reçu pour le moment.</p>
        ) : (
          <ul className="timeline">
            {messages.slice(0, 3).map((message) => (
              <li key={message.id} className="timeline__item">
                <div className="timeline__body">
                  <p>
                    <strong>{message.name}</strong> — {message.subject || "Sans objet"}
                    {!message.read ? <span className="pill pill--en_attente"> Nouveau</span> : null}
                  </p>
                  <span className="muted">
                    {new Date(message.createdAt).toLocaleString("fr-FR", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Link href="/admin/messages" className="admin-note">
          Ouvrir la boîte de réception →
        </Link>
      </div>
    </>
  );
}

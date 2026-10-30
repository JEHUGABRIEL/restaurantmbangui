import type { Metadata } from "next";
import Link from "next/link";
import ActionMenu from "@/components/admin/ActionMenu";
import ConfirmAction from "@/components/admin/ConfirmAction";
import Flash from "@/components/admin/Flash";
import IconButton from "@/components/admin/IconButton";
import Modal, { ModalCancel } from "@/components/admin/Modal";
import Pagination from "@/components/admin/Pagination";
import SubmitButton from "@/components/admin/SubmitButton";
import { pageParam, type PageProps } from "@/lib/admin";
import {
  formatDate,
  getReservations,
  reservationStatuses,
  todayISO,
  type ReservationStatus,
} from "@/lib/reservations";
import { deleteReservation, saveReservationNote, setReservationStatus } from "./actions";
import { StatusPill, statusLabels } from "./ui";

export const metadata: Metadata = { title: "Réservations" };

const PER_PAGE = 20;

const statusActions = {
  confirmee: { icon: "check", label: "Confirmer", tone: "success" },
  annulee: { icon: "x", label: "Annuler la réservation", tone: "default" },
  en_attente: { icon: "clock", label: "Remettre en attente", tone: "default" },
} as const;

export default async function ReservationsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const statut = reservationStatuses.includes(sp.statut as ReservationStatus)
    ? (sp.statut as ReservationStatus)
    : undefined;
  const passees = sp.periode === "passees";
  const page = pageParam(sp.page);
  const today = todayISO();

  const all = await getReservations();
  const filtered = all
    .filter((row) => (passees ? row.date < today : row.date >= today))
    .filter((row) => (statut ? row.status === statut : true))
    .sort((a, b) => {
      const dateOrder = a.date.localeCompare(b.date);
      if (dateOrder !== 0) return passees ? -dateOrder : dateOrder;
      const timeOrder = a.time.localeCompare(b.time);
      return timeOrder !== 0 ? timeOrder : b.createdAt.localeCompare(a.createdAt);
    });
  const total = filtered.length;
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const filters = { statut, periode: passees ? "passees" : undefined };
  const qs = (patch: Record<string, string | undefined>, keepPage = false) => {
    const q = new URLSearchParams();
    const merged = {
      ...filters,
      ...patch,
      page: keepPage && page > 1 ? String(page) : undefined,
    };
    for (const [key, value] of Object.entries(merged)) if (value) q.set(key, value);
    const query = q.toString();
    return `/admin/reservations${query ? `?${query}` : ""}`;
  };
  const back = qs({}, true);

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Réservations</h1>
          <p>Demandes envoyées depuis le formulaire du site. Rappelez le client puis confirmez.</p>
        </div>
      </div>
      <Flash ok={sp.ok} error={sp.error} />

      <div className="subnav">
        <Link href={qs({ periode: undefined })} className={!passees ? "is-active" : undefined}>
          À venir
        </Link>
        <Link href={qs({ periode: "passees" })} className={passees ? "is-active" : undefined}>
          Passées
        </Link>
        <span style={{ width: 16 }} />
        <Link href={qs({ statut: undefined })} className={!statut ? "is-active" : undefined}>
          Tous statuts
        </Link>
        {reservationStatuses.map((status) => (
          <Link key={status} href={qs({ statut: status })} className={statut === status ? "is-active" : undefined}>
            {statusLabels[status]}
          </Link>
        ))}
      </div>

      <div className="acard acard--flush">
        {rows.length === 0 ? (
          <div className="empty">Aucune réservation.</div>
        ) : (
          <div className="table-wrap">
            <table className="atable">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Client</th>
                  <th>Pers.</th>
                  <th>Détails</th>
                  <th>Statut</th>
                  <th className="th-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <strong>{formatDate(row.date)}</strong>
                      <div className="muted">{row.time}</div>
                    </td>
                    <td>
                      {row.name}
                      <div className="muted">
                        <a href={`tel:${row.phone.replace(/\s/g, "")}`}>{row.phone}</a>
                        {row.email ? (
                          <>
                            <br />
                            {row.email}
                          </>
                        ) : null}
                      </div>
                    </td>
                    <td>{row.guests}</td>
                    <td style={{ maxWidth: 320 }}>
                      {row.seating ? <div className="muted">Espace : {row.seating}</div> : null}
                      {row.notes ? <div style={{ fontSize: 13 }}>« {row.notes} »</div> : null}
                      {row.adminNote ? <div className="admin-note">{row.adminNote}</div> : null}
                      <div className="muted" style={{ marginTop: 4 }}>
                        Reçue le {new Date(row.createdAt).toLocaleDateString("fr-FR")}
                      </div>
                    </td>
                    <td>
                      <StatusPill status={row.status} />
                    </td>
                    <td className="td-actions">
                      <ActionMenu>
                        {(["confirmee", "annulee", "en_attente"] as const)
                          .filter((status) => status !== row.status)
                          .map((status) => (
                            <form key={status} action={setReservationStatus}>
                              <input type="hidden" name="id" value={row.id} />
                              <input type="hidden" name="back" value={back} />
                              <input type="hidden" name="status" value={status} />
                              <IconButton {...statusActions[status]} />
                            </form>
                          ))}
                        <Modal
                          title={`Note interne — ${row.name}`}
                          trigger={{
                            kind: "icon",
                            icon: "note",
                            label: row.adminNote ? "Modifier la note" : "Ajouter une note",
                          }}
                        >
                          <form action={saveReservationNote} className="aform aform--1">
                            <input type="hidden" name="id" value={row.id} />
                            <input type="hidden" name="back" value={back} />
                            <div className="afield">
                              <label htmlFor={`note-${row.id}`}>
                                Note (visible uniquement dans le back-office)
                              </label>
                              <textarea id={`note-${row.id}`} name="adminNote" defaultValue={row.adminNote ?? ""} autoFocus />
                            </div>
                            <div className="modal__foot">
                              <ModalCancel />
                              <SubmitButton>Enregistrer</SubmitButton>
                            </div>
                          </form>
                        </Modal>
                        <ConfirmAction
                          action={deleteReservation}
                          fields={{ id: row.id, back }}
                          label="Supprimer"
                          title="Supprimer la réservation ?"
                          message={
                            <>
                              La réservation de <strong>{row.name}</strong> du {formatDate(row.date)} sera
                              définitivement supprimée.
                            </>
                          }
                          confirmLabel="Supprimer"
                        />
                      </ActionMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Pagination page={page} total={total} perPage={PER_PAGE} path="/admin/reservations" params={filters} />
    </>
  );
}

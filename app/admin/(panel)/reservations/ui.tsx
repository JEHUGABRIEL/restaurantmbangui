import type { ReservationStatus } from "@/lib/reservations";

export const statusLabels: Record<ReservationStatus, string> = {
  en_attente: "En attente",
  confirmee: "Confirmée",
  annulee: "Annulée",
};

export function StatusPill({ status }: { status: ReservationStatus }) {
  return <span className={`pill pill--${status}`}>{statusLabels[status]}</span>;
}

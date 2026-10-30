import type { Metadata } from "next";
import Link from "next/link";
import Avatar from "@/components/admin/Avatar";
import Flash from "@/components/admin/Flash";
import Pagination from "@/components/admin/Pagination";
import type { PageProps } from "@/lib/admin";
import { pageParam } from "@/lib/admin";
import { activityCategories, getActivity, type ActivityCategory } from "@/lib/activity";

export const metadata: Metadata = { title: "Activité" };

const PER_PAGE = 25;

export default async function ActivityPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = pageParam(sp.page);
  const type =
    sp.type && sp.type in activityCategories ? (sp.type as ActivityCategory) : undefined;
  const rows = (await getActivity()).filter((row) => (type ? row.category === type : true));
  const shown = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const href = (value?: string) => (value ? `/admin/activite?type=${value}` : "/admin/activite");

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Activité</h1>
          <p>Connexions, réservations, messages et modifications de la carte ou des actualités.</p>
        </div>
      </div>
      <Flash ok={sp.ok} error={sp.error} />

      <div className="subnav">
        <Link href={href()} className={!type ? "is-active" : undefined}>
          Tout
        </Link>
        {Object.entries(activityCategories).map(([key, label]) => (
          <Link key={key} href={href(key)} className={type === key ? "is-active" : undefined}>
            {label}
          </Link>
        ))}
      </div>

      <div className="acard acard--flush">
        {shown.length === 0 ? (
          <div className="empty">Aucune activité enregistrée.</div>
        ) : (
          <ul className="timeline">
            {shown.map((row) => (
              <li key={row.id} className="timeline__item">
                <Avatar name={row.actor} size={34} />
                <div className="timeline__body">
                  <p>
                    {row.link ? <Link href={row.link}>{`${row.actor} ${row.summary}`}</Link> : `${row.actor} ${row.summary}`}
                  </p>
                  <span className="muted">
                    {new Date(row.createdAt).toLocaleString("fr-FR", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}{" "}
                    · {activityCategories[row.category]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Pagination page={page} total={rows.length} perPage={PER_PAGE} path="/admin/activite" params={{ type }} />
    </>
  );
}

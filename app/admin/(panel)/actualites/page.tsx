import type { Metadata } from "next";
import Link from "next/link";
import ActionMenu from "@/components/admin/ActionMenu";
import ConfirmAction from "@/components/admin/ConfirmAction";
import Flash from "@/components/admin/Flash";
import { getNews } from "@/lib/news";
import type { PageProps } from "@/lib/admin";
import { deleteNews } from "./actions";

export const metadata: Metadata = { title: "Actualités" };

export default async function AdminNews({ searchParams }: PageProps) {
  const sp = await searchParams;
  const news = await getNews();

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Actualités</h1>
          <p>Créez, modifiez et supprimez les nouvelles de la maison.</p>
        </div>
        <Link href="/admin/actualites/new" className="abtn abtn--primary">
          + Nouvelle actualité
        </Link>
      </div>
      <Flash ok={sp.ok} error={sp.error} />

      <div className="acard acard--flush">
        {news.length === 0 ? (
          <div className="empty">Aucune actualité. Commencez par en créer une.</div>
        ) : (
          <div className="table-wrap">
            <table className="atable">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Date</th>
                  <th>Catégorie</th>
                  <th className="th-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {news.map((post) => (
                  <tr key={post.slug}>
                    <td>
                      <Link href={`/admin/actualites/${post.slug}`} className="strong-link">
                        {post.title}
                      </Link>
                      <div className="muted">/actualites/{post.slug}</div>
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>{post.displayDate}</td>
                    <td>{post.category}</td>
                    <td className="td-actions">
                      <ActionMenu>
                        <Link href={`/admin/actualites/${post.slug}`} className="amenu__item" role="menuitem">
                          Modifier
                        </Link>
                        <Link
                          href={`/actualites/${post.slug}`}
                          target="_blank"
                          className="amenu__item"
                          role="menuitem"
                        >
                          Voir sur le site
                        </Link>
                        <ConfirmAction
                          action={deleteNews}
                          fields={{ slug: post.slug }}
                          label="Supprimer"
                          title="Supprimer l’actualité ?"
                          message={
                            <>
                              <strong>{post.title}</strong> sera définitivement supprimée du site.
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
      <p className="admin-note">
        Les articles sont lus depuis <code>data/news.json</code>. Ce fichier sera remplacé par Neon lorsque la base
        sera branchée.
      </p>
    </>
  );
}

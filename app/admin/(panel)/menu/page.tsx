import type { Metadata } from "next";
import Link from "next/link";
import ActionMenu from "@/components/admin/ActionMenu";
import ConfirmAction from "@/components/admin/ConfirmAction";
import Flash from "@/components/admin/Flash";
import IconButton from "@/components/admin/IconButton";
import Modal, { ModalCancel } from "@/components/admin/Modal";
import SubmitButton from "@/components/admin/SubmitButton";
import type { PageProps } from "@/lib/admin";
import { readMenu } from "@/lib/menu-data";
import { createCategory, deleteCategory, moveCategory, renameCategory } from "./actions";

export const metadata: Metadata = { title: "Catégories de la carte" };

export default async function CategoriesPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const sections = await readMenu();

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Catégories de la carte</h1>
          <p>Chaque catégorie est une section de la carte sur le site, dans cet ordre.</p>
        </div>
        <Modal title="Nouvelle catégorie" trigger={{ kind: "button", label: "Nouvelle catégorie", icon: "plus" }}>
          <form action={createCategory} className="aform">
            <div className="afield">
              <label htmlFor="cat-label">Nom (français) *</label>
              <input id="cat-label" name="label" placeholder="Ex. Desserts" required maxLength={60} autoFocus />
            </div>
            <div className="afield">
              <label htmlFor="cat-label-en">Nom (anglais)</label>
              <input id="cat-label-en" name="labelEn" placeholder="Desserts" maxLength={60} />
            </div>
            <div className="modal__foot">
              <ModalCancel />
              <SubmitButton>Créer</SubmitButton>
            </div>
          </form>
        </Modal>
      </div>
      <Flash ok={sp.ok} error={sp.error} />

      <div className="acard acard--flush">
        {sections.length === 0 ? (
          <div className="empty">Créez une première catégorie (ex. Plats, Boissons).</div>
        ) : (
          <div className="table-wrap">
            <table className="atable">
              <thead>
                <tr>
                  <th>Catégorie</th>
                  <th>Plats</th>
                  <th>Visible</th>
                  <th className="th-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sections.map((section, index) => {
                  const visible = section.dishes.filter((dish) => dish.available !== false).length;
                  return (
                    <tr key={section.id}>
                      <td>
                        <Link href={`/admin/menu/${section.id}`} className="strong-link">
                          {section.title.fr}
                        </Link>
                        <div className="muted">{section.title.en}</div>
                      </td>
                      <td>
                        {section.dishes.length}
                        <div className="muted">{visible} visible(s)</div>
                      </td>
                      <td>
                        <span className="pill pill--confirmee">Sur la carte</span>
                      </td>
                      <td className="td-actions">
                        <ActionMenu>
                          <form action={moveCategory}>
                            <input type="hidden" name="id" value={section.id} />
                            <input type="hidden" name="dir" value="up" />
                            {index > 0 ? <IconButton icon="up" label="Monter" /> : null}
                          </form>
                          <form action={moveCategory}>
                            <input type="hidden" name="id" value={section.id} />
                            <input type="hidden" name="dir" value="down" />
                            {index < sections.length - 1 ? <IconButton icon="down" label="Descendre" /> : null}
                          </form>
                          <Modal title="Modifier la catégorie" trigger={{ kind: "icon", icon: "edit", label: "Modifier" }} wide>
                            <form action={renameCategory} className="aform">
                              <input type="hidden" name="id" value={section.id} />
                              <div className="afield">
                                <label htmlFor={`cat-${section.id}`}>Nom (français) *</label>
                                <input
                                  id={`cat-${section.id}`}
                                  name="label"
                                  defaultValue={section.title.fr}
                                  required
                                  maxLength={60}
                                  autoFocus
                                />
                              </div>
                              <div className="afield">
                                <label htmlFor={`cat-${section.id}-en`}>Nom (anglais)</label>
                                <input id={`cat-${section.id}-en`} name="labelEn" defaultValue={section.title.en} maxLength={60} />
                              </div>
                              <div className="afield afield--full">
                                <label htmlFor={`cat-${section.id}-sub`}>Sous-titre (français)</label>
                                <input
                                  id={`cat-${section.id}-sub`}
                                  name="subtitleFr"
                                  defaultValue={section.subtitle.fr}
                                  maxLength={160}
                                />
                              </div>
                              <div className="afield afield--full">
                                <label htmlFor={`cat-${section.id}-sub-en`}>Sous-titre (anglais)</label>
                                <input
                                  id={`cat-${section.id}-sub-en`}
                                  name="subtitleEn"
                                  defaultValue={section.subtitle.en}
                                  maxLength={160}
                                />
                              </div>
                              <div className="modal__foot">
                                <ModalCancel />
                                <SubmitButton>Enregistrer</SubmitButton>
                              </div>
                            </form>
                          </Modal>
                          <ConfirmAction
                            action={deleteCategory}
                            fields={{ id: section.id }}
                            label="Supprimer"
                            title="Supprimer la catégorie ?"
                            message={
                              <>
                                La catégorie <strong>{section.title.fr}</strong> et ses {section.dishes.length} plat(s)
                                seront définitivement supprimés.
                              </>
                            }
                            confirmLabel="Supprimer"
                          />
                        </ActionMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <p className="admin-note">
        Les modifications sont écrites dans <code>data/menu.json</code> et apparaissent immédiatement sur la carte
        publique. Les plats masqués restent dans le back-office.
      </p>
    </>
  );
}

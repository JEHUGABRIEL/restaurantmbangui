import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ActionMenu from "@/components/admin/ActionMenu";
import ConfirmAction from "@/components/admin/ConfirmAction";
import Flash from "@/components/admin/Flash";
import IconButton from "@/components/admin/IconButton";
import Modal, { ModalCancel } from "@/components/admin/Modal";
import SubmitButton from "@/components/admin/SubmitButton";
import { formatMoney } from "@/lib/menu";
import { readMenu } from "@/lib/menu-data";
import { createItem, deleteItem, moveItem, toggleItem, updateItem } from "../actions";
import ItemFields from "../ItemFields";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const section = (await readMenu()).find((row) => row.id === slug);
  return { title: section ? `Carte — ${section.title.fr}` : "Carte" };
}

export default async function CategoryItemsPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const sections = await readMenu();
  const section = sections.find((row) => row.id === slug);
  if (!section) notFound();

  const categories = sections.map((row) => ({ id: row.id, label: row.title.fr }));
  const back = `/admin/menu/${section.id}`;
  const visible = section.dishes.filter((dish) => dish.available !== false).length;

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>{section.title.fr}</h1>
          <p>
            {section.dishes.length} plat(s), {visible} visible(s) sur le site. Prix en FCFA.
          </p>
        </div>
        <div className="row-actions">
          <Link href="/admin/menu" className="abtn abtn--ghost">
            ← Toutes les catégories
          </Link>
          <Modal
            title={`Ajouter dans « ${section.title.fr} »`}
            trigger={{ kind: "button", label: "Ajouter un plat", icon: "plus" }}
            wide
          >
            <form action={createItem} className="aform">
              <input type="hidden" name="back" value={back} />
              <ItemFields categories={categories} defaultCategoryId={section.id} />
              <div className="modal__foot">
                <ModalCancel />
                <SubmitButton>Ajouter</SubmitButton>
              </div>
            </form>
          </Modal>
        </div>
      </div>
      <Flash ok={sp.ok} error={sp.error} />

      <div className="acard acard--flush">
        {section.dishes.length === 0 ? (
          <div className="empty">Aucun plat dans cette catégorie.</div>
        ) : (
          <div className="table-wrap">
            <table className="atable">
              <thead>
                <tr>
                  <th>Plat</th>
                  <th style={{ textAlign: "right" }}>Prix</th>
                  <th>Visibilité</th>
                  <th className="th-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {section.dishes.map((dish, index) => (
                  <tr key={dish.id} className={dish.available === false ? "row--muted" : undefined}>
                    <td>
                      <strong>{dish.name.fr}</strong>
                      {dish.name.en !== dish.name.fr ? <div className="muted">{dish.name.en}</div> : null}
                      {dish.description?.fr ? <div className="muted">{dish.description.fr}</div> : null}
                      {dish.tag ? <div className="muted">{dish.tag.fr}</div> : null}
                    </td>
                    <td style={{ whiteSpace: "nowrap", textAlign: "right" }}>
                      <strong>{formatMoney(dish.price)}</strong>
                    </td>
                    <td>
                      {dish.available === false ? (
                        <span className="pill pill--off">Masqué</span>
                      ) : (
                        <span className="pill pill--confirmee">Visible</span>
                      )}
                    </td>
                    <td className="td-actions">
                      <ActionMenu>
                        <form action={moveItem}>
                          <input type="hidden" name="id" value={dish.id} />
                          <input type="hidden" name="dir" value="up" />
                          <input type="hidden" name="back" value={back} />
                          {index > 0 ? <IconButton icon="up" label="Monter" /> : null}
                        </form>
                        <form action={moveItem}>
                          <input type="hidden" name="id" value={dish.id} />
                          <input type="hidden" name="dir" value="down" />
                          <input type="hidden" name="back" value={back} />
                          {index < section.dishes.length - 1 ? <IconButton icon="down" label="Descendre" /> : null}
                        </form>
                        <Modal
                          title={`Modifier « ${dish.name.fr} »`}
                          trigger={{ kind: "icon", icon: "edit", label: "Modifier" }}
                          wide
                        >
                          <form action={updateItem} className="aform">
                            <input type="hidden" name="id" value={dish.id} />
                            <input type="hidden" name="back" value={back} />
                            <ItemFields item={dish} categories={categories} defaultCategoryId={section.id} />
                            <div className="modal__foot">
                              <ModalCancel />
                              <SubmitButton>Enregistrer</SubmitButton>
                            </div>
                          </form>
                        </Modal>
                        <form action={toggleItem}>
                          <input type="hidden" name="id" value={dish.id} />
                          <input type="hidden" name="available" value={dish.available === false ? "1" : "0"} />
                          <input type="hidden" name="back" value={back} />
                          <IconButton
                            icon={dish.available === false ? "eye" : "eyeOff"}
                            label={dish.available === false ? "Afficher sur le site" : "Masquer du site"}
                          />
                        </form>
                        <ConfirmAction
                          action={deleteItem}
                          fields={{ id: dish.id, back }}
                          label="Supprimer"
                          title="Supprimer le plat ?"
                          message={
                            <>
                              <strong>{dish.name.fr}</strong> sera définitivement retiré de la carte. Pour le retirer
                              temporairement, utilisez plutôt « Masquer ».
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
        Fichier de données : <code>data/menu.json</code> · les plats masqués disparaissent de la carte publique.
      </p>
    </>
  );
}

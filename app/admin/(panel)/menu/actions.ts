"use server";

import { done, fail, int, slugify, str } from "@/lib/admin";
import { logActivity } from "@/lib/activity";
import { requireAdmin } from "@/lib/admin-auth";
import { readMenu, writeMenu } from "@/lib/menu-data";
import type { Dish, Localized, MenuSection } from "@/lib/menu";

const BACK = "/admin/menu";

const backTo = (fd: FormData) => {
  const back = str(fd, "back");
  return back.startsWith("/admin/menu") ? back : BACK;
};

const localized = (fr: string, en: string): Localized => ({ fr, en: en || fr });

function readDish(fd: FormData, back: string) {
  const nameFr = str(fd, "nameFr", 120);
  const price = int(fd, "price");
  if (!nameFr) fail(back, "Le nom du plat est obligatoire.");
  if (price === null || Number.isNaN(price)) fail(back, "Prix invalide (nombre entier en FCFA).");
  const tagFr = str(fd, "tagFr", 40);
  const tagEn = str(fd, "tagEn", 40);
  return {
    name: localized(nameFr, str(fd, "nameEn", 120)),
    description: str(fd, "descriptionFr") || str(fd, "descriptionEn")
      ? localized(str(fd, "descriptionFr", 300), str(fd, "descriptionEn", 300))
      : undefined,
    price,
    tag: tagFr || tagEn ? localized(tagFr, tagEn) : undefined,
    available: fd.get("available") === "on",
  };
}

const findSection = (sections: MenuSection[], id: string, back: string) => {
  const section = sections.find((row) => row.id === id);
  if (!section) fail(back, "Catégorie introuvable.");
  return section;
};

const findDish = (sections: MenuSection[], id: string, back: string) => {
  for (const section of sections) {
    const index = section.dishes.findIndex((dish) => dish.id === id);
    if (index >= 0) return { section, index };
  }
  fail(back, "Plat introuvable.");
};

export async function createItem(fd: FormData) {
  const me = await requireAdmin();
  const back = backTo(fd);
  const sections = await readMenu();
  const section = findSection(sections, str(fd, "categoryId", 60) || str(fd, "section", 60), back);
  const dish = readDish(fd, back);

  let id = slugify(dish.name.fr);
  if (section.dishes.some((row) => row.id === id)) id = `${id}-${Date.now().toString(36)}`;
  section.dishes.push({ ...dish, id } as Dish);
  await writeMenu(sections);

  await logActivity({
    actor: me.name,
    category: "menu",
    summary: `a ajouté « ${dish.name.fr} » (${dish.price} FCFA) dans ${section.title.fr}`,
    link: `/admin/menu/${section.id}`,
  });
  done(back, `« ${dish.name.fr} » ajouté à la carte.`);
}

export async function updateItem(fd: FormData) {
  const me = await requireAdmin();
  const back = backTo(fd);
  const sections = await readMenu();
  const { section, index } = findDish(sections, str(fd, "id", 80), back);
  const current = section.dishes[index];
  const dish = readDish(fd, back);
  const targetId = str(fd, "categoryId", 60);
  const destination = targetId ? findSection(sections, targetId, back) : section;
  const updated = { ...current, ...dish };

  if (destination.id !== section.id) {
    // Le plat change de catégorie : on le retire de la section d'origine.
    section.dishes.splice(index, 1);
    destination.dishes.push(updated);
  } else {
    section.dishes[index] = updated;
  }
  await writeMenu(sections);

  await logActivity({
    actor: me.name,
    category: "menu",
    summary: `a modifié le plat « ${dish.name.fr} »${destination.id !== section.id ? ` et l’a déplacé dans ${destination.title.fr}` : ""}`,
    link: `/admin/menu/${destination.id}`,
  });
  done(destination.id === section.id ? back : `/admin/menu/${destination.id}`, `« ${dish.name.fr} » mis à jour.`);
}

export async function toggleItem(fd: FormData) {
  const me = await requireAdmin();
  const back = backTo(fd);
  const sections = await readMenu();
  const { section, index } = findDish(sections, str(fd, "id", 80), back);
  const available = str(fd, "available") === "1";
  section.dishes[index].available = available;
  await writeMenu(sections);

  await logActivity({
    actor: me.name,
    category: "menu",
    summary: `a ${available ? "affiché" : "masqué"} le plat « ${section.dishes[index].name.fr} »`,
    link: `/admin/menu/${section.id}`,
  });
  done(back, available ? "Plat de nouveau visible sur le site." : "Plat masqué du site.");
}

export async function deleteItem(fd: FormData) {
  const me = await requireAdmin();
  const back = backTo(fd);
  const sections = await readMenu();
  const { section, index } = findDish(sections, str(fd, "id", 80), back);
  const name = section.dishes[index].name.fr;
  section.dishes.splice(index, 1);
  await writeMenu(sections);

  await logActivity({
    actor: me.name,
    category: "menu",
    summary: `a supprimé le plat « ${name} »`,
    link: `/admin/menu/${section.id}`,
  });
  done(back, "Plat supprimé.");
}

/** Échange la position d'un plat avec son voisin dans la même catégorie. */
export async function moveItem(fd: FormData) {
  const me = await requireAdmin();
  const back = backTo(fd);
  const sections = await readMenu();
  const { section, index } = findDish(sections, str(fd, "id", 80), back);
  const target = index + (str(fd, "dir") === "up" ? -1 : 1);
  if (target < 0 || target >= section.dishes.length) done(back, "Ordre inchangé.");
  [section.dishes[index], section.dishes[target]] = [section.dishes[target], section.dishes[index]];
  await writeMenu(sections);

  await logActivity({
    actor: me.name,
    category: "menu",
    summary: `a déplacé le plat « ${section.dishes[target].name.fr} »`,
    link: `/admin/menu/${section.id}`,
  });
  done(back, "Ordre mis à jour.");
}

export async function createCategory(fd: FormData) {
  const me = await requireAdmin();
  const label = str(fd, "label", 60);
  if (!label) fail(BACK, "Nom de catégorie obligatoire.");
  const sections = await readMenu();
  let id = slugify(label);
  if (sections.some((section) => section.id === id)) id = `${id}-${Date.now().toString(36)}`;
  sections.push({
    id,
    title: { fr: label, en: str(fd, "labelEn", 60) || label },
    subtitle: { fr: "", en: "" },
    dishes: [],
  });
  await writeMenu(sections);

  await logActivity({
    actor: me.name,
    category: "menu",
    summary: `a créé la catégorie « ${label} »`,
    link: BACK,
  });
  done(BACK, `Catégorie « ${label} » créée.`);
}

export async function renameCategory(fd: FormData) {
  const me = await requireAdmin();
  const sections = await readMenu();
  const section = findSection(sections, str(fd, "id", 60), BACK);
  const before = section.title.fr;
  const label = str(fd, "label", 60);
  if (!label) fail(BACK, "Nom de catégorie obligatoire.");
  section.title = localized(label, str(fd, "labelEn", 60));
  section.subtitle = localized(str(fd, "subtitleFr", 160), str(fd, "subtitleEn", 160));
  await writeMenu(sections);

  await logActivity({
    actor: me.name,
    category: "menu",
    summary: `a renommé la catégorie « ${before} » en « ${label} »`,
    link: BACK,
  });
  done(BACK, "Catégorie mise à jour.");
}

export async function moveCategory(fd: FormData) {
  const me = await requireAdmin();
  const sections = await readMenu();
  const index = sections.findIndex((section) => section.id === str(fd, "id", 60));
  if (index < 0) fail(BACK, "Catégorie introuvable.");
  const target = index + (str(fd, "dir") === "up" ? -1 : 1);
  if (target < 0 || target >= sections.length) done(BACK, "Ordre inchangé.");
  [sections[index], sections[target]] = [sections[target], sections[index]];
  await writeMenu(sections);

  await logActivity({
    actor: me.name,
    category: "menu",
    summary: `a déplacé la catégorie « ${sections[target].title.fr} »`,
    link: BACK,
  });
  done(BACK, "Ordre des catégories mis à jour.");
}

export async function deleteCategory(fd: FormData) {
  const me = await requireAdmin();
  const sections = await readMenu();
  const section = findSection(sections, str(fd, "id", 60), BACK);
  await writeMenu(sections.filter((row) => row.id !== section.id));

  await logActivity({
    actor: me.name,
    category: "menu",
    summary: `a supprimé la catégorie « ${section.title.fr} » et ses plats`,
    link: BACK,
  });
  done(BACK, "Catégorie et plats associés supprimés.");
}

import "server-only";

import { MENU, type MenuSection } from "./menu";
import { readStore, writeStore } from "./store";

const FILE = "menu.json";

/** Carte brute, y compris les plats masqués. Crée le fichier au premier accès. */
export async function readMenu(): Promise<MenuSection[]> {
  const rows = await readStore<MenuSection[]>(FILE, []);
  if (Array.isArray(rows) && rows.length > 0) return rows;
  await writeStore(FILE, MENU);
  return MENU;
}

export async function writeMenu(sections: MenuSection[]): Promise<void> {
  await writeStore(FILE, sections);
}

/** Carte publique : les plats masqués dans le back-office sont retirés. */
export async function getMenu(): Promise<MenuSection[]> {
  const sections = await readMenu();
  return sections.map((section) => ({
    ...section,
    dishes: section.dishes.filter((dish) => dish.available !== false),
  }));
}

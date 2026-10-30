import "server-only";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/** Redirige vers `path` avec un message de succès affiché par <Flash>. */
export function done(path: string, message: string): never {
  revalidatePath("/", "layout");
  redirect(withParam(path, "ok", message));
}

/** Redirige vers `path` avec un message d'erreur affiché par <Flash>. */
export function fail(path: string, message: string): never {
  redirect(withParam(path, "error", message));
}

function withParam(path: string, key: string, value: string) {
  const [base, query = ""] = path.split("?");
  const params = new URLSearchParams(query);
  params.delete("ok");
  params.delete("error");
  params.set(key, value);
  return `${base}?${params}`;
}

export const str = (fd: FormData, key: string, max = 500) => {
  const value = fd.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
};

export const int = (fd: FormData, key: string) => {
  const value = str(fd, key).replace(/[\s.]/g, "");
  if (!value) return null;
  const n = Number(value);
  return Number.isInteger(n) && n >= 0 ? n : NaN;
};

export const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || "element";

export type PageProps = { searchParams: Promise<Record<string, string | undefined>> };

/** Numéro de page à partir de `?page=` (1 par défaut). */
export const pageParam = (value: string | undefined) => {
  const n = Number(value);
  return Number.isInteger(n) && n > 1 ? n : 1;
};

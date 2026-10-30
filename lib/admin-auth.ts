import "server-only";

import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readStore, writeStore } from "./store";

export const ADMIN_COOKIE = "rm_admin";
export const DEFAULT_ADMIN_EMAIL = "contact@restaurant-m.cf";
const DEFAULT_PASSWORD = "restaurant2026";
const FILE = "admin.json";

export type AdminProfile = {
  name: string;
  email: string;
  /** `null` tant que le mot de passe par défaut (ou ADMIN_PASSWORD) est utilisé. */
  passwordHash: string | null;
};

export async function getAdmin(): Promise<AdminProfile> {
  const stored = await readStore<AdminProfile | null>(FILE, null);
  if (stored && stored.email) return stored;
  const initial: AdminProfile = {
    name: "La maison",
    email: DEFAULT_ADMIN_EMAIL,
    passwordHash: null,
  };
  await writeStore(FILE, initial);
  return initial;
}

export async function saveAdmin(profile: AdminProfile): Promise<void> {
  await writeStore(FILE, profile);
}

const defaultPassword = () => process.env.ADMIN_PASSWORD ?? DEFAULT_PASSWORD;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string | null): boolean {
  if (!stored) {
    const expected = Buffer.from(defaultPassword());
    const given = Buffer.from(password);
    return given.length === expected.length && timingSafeEqual(given, expected);
  }
  const [scheme, salt, hash] = stored.split("$");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const given = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return given.length === expected.length && timingSafeEqual(given, expected);
}

/** Jeton de session : change si le mot de passe change, ce qui ferme les sessions ouvertes. */
async function sessionToken(profile: AdminProfile): Promise<string> {
  const secret = process.env.ADMIN_SECRET ?? "restaurant-m-admin-session";
  const material = `${profile.email}:${profile.passwordHash ?? defaultPassword()}`;
  return createHmac("sha256", secret).update(material).digest("hex");
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const value = store.get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  const expected = await sessionToken(await getAdmin());
  const given = Buffer.from(value);
  const wanted = Buffer.from(expected);
  return given.length === wanted.length && timingSafeEqual(given, wanted);
}

export async function requireAdmin(): Promise<AdminProfile> {
  const profile = await getAdmin();
  if (!(await isAdmin())) redirect("/admin/login");
  return profile;
}

export async function createSession(profile: AdminProfile): Promise<void> {
  const store = await cookies();
  store.set(ADMIN_COOKIE, await sessionToken(profile), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

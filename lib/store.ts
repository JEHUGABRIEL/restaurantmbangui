import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

const DATA_DIR = path.join(process.cwd(), "data");
/** Si Neon est injoignable, on retente ce délai avant de relancer une vérification. */
const PROBE_RETRY_MS = 30_000;
const PROBE_TIMEOUT_MS = 6_000;

type Sql = NeonQueryFunction<false, false>;
type Storage = "db" | "file";

let client: Sql | null = null;
let schema: Promise<unknown> | null = null;
let storage: Storage | null = null;
let retryAt = 0;

function database(): Sql | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!client) client = neon(url);
  return client;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`délai dépassé (${ms} ms)`)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: Error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

/** Choisit une fois par processus entre Neon et les fichiers locaux. */
async function pickStorage(): Promise<Storage> {
  if (storage === "db") return "db";
  if (storage === "file" && Date.now() < retryAt) return "file";

  const sql = database();
  if (!sql) {
    storage = "file";
    retryAt = Date.now() + PROBE_RETRY_MS;
    return storage;
  }

  try {
    await withTimeout(sql`select 1`, PROBE_TIMEOUT_MS);
    storage = "db";
    retryAt = Number.POSITIVE_INFINITY;
    return storage;
  } catch (error) {
    console.warn(
      `[store] Neon injoignable, repli sur data/ : ${(error as Error).message}`,
    );
    storage = "file";
    retryAt = Date.now() + PROBE_RETRY_MS;
    return storage;
  }
}

/** Un document par magasin, la table est créée au premier accès. */
async function ensureSchema(sql: Sql) {
  schema ??= sql`
    create table if not exists store_documents (
      key text primary key,
      data jsonb not null,
      updated_at timestamptz not null default now()
    )
  `;
  return schema;
}

async function readFile<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeFile<T>(file: string, value: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const target = path.join(DATA_DIR, file);
  const tmp = `${target}.${process.pid}.tmp`;
  await fs.writeFile(tmp, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await fs.rename(tmp, target);
}

/**
 * Lit un magasin : Neon en production, fichier `data/*.json` en local (ou en
 * secours si la base est injoignable). Un document absent de la base est
 * amorcé depuis le fichier livré avec le projet (carte, actualités).
 */
export async function readStore<T>(file: string, fallback: T): Promise<T> {
  const sql = database();
  if (sql && (await pickStorage()) === "db") {
    try {
      await ensureSchema(sql);
      const rows = (await sql`
        select data from store_documents where key = ${file}
      `) as Array<{ data: T }>;
      if (rows.length > 0) return rows[0].data;
      const seeded = await readFile<T | null>(file, null);
      if (seeded !== null) {
        await writeStore(file, seeded);
        return seeded;
      }
      return fallback;
    } catch (error) {
      console.error(`[store] lecture ${file} : ${(error as Error).message}`);
      return readFile(file, fallback);
    }
  }
  return readFile(file, fallback);
}

/** Écrit un magasin entier (upsert atomique côté base). */
export async function writeStore<T>(file: string, value: T): Promise<void> {
  const sql = database();
  if (sql && (await pickStorage()) === "db") {
    try {
      await ensureSchema(sql);
      await sql`
        insert into store_documents (key, data, updated_at)
        values (${file}, ${JSON.stringify(value)}::jsonb, now())
        on conflict (key) do update set data = excluded.data, updated_at = now()
      `;
      return;
    } catch (error) {
      console.error(`[store] écriture ${file} : ${(error as Error).message}`);
      // On tente le fichier local avant d'abandonner.
    }
  }
  await writeFile(file, value);
}

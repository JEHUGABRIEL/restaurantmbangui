import "server-only";

import { randomUUID } from "node:crypto";
import { readStore, writeStore } from "./store";

export type Message = {
  id: string;
  name: string;
  contact: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

const FILE = "messages.json";

export async function getMessages(): Promise<Message[]> {
  const rows = await readStore<Message[]>(FILE, []);
  return Array.isArray(rows) ? rows : [];
}

export async function saveMessages(rows: Message[]): Promise<void> {
  await writeStore(FILE, rows);
}

export async function addMessage(
  input: Omit<Message, "id" | "read" | "createdAt">,
): Promise<Message> {
  const rows = await getMessages();
  const message: Message = {
    ...input,
    id: randomUUID(),
    read: false,
    createdAt: new Date().toISOString(),
  };
  rows.unshift(message);
  await saveMessages(rows);
  return message;
}

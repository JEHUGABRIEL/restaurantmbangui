import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import {
  getNotifications,
  markAllRead,
  markNotificationRead,
  unreadCount,
} from "@/lib/notifications";

export const dynamic = "force-dynamic";

const unauthorized = () =>
  NextResponse.json({ error: "Non autorisé." }, { status: 401 });

export async function GET() {
  if (!(await isAdmin())) return unauthorized();
  const [items, unread] = await Promise.all([getNotifications(), unreadCount()]);
  return NextResponse.json(
    { unread, items: items.slice(0, 12) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return unauthorized();

  let body: { id?: unknown; all?: unknown } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (body.all === true) await markAllRead();
  else if (typeof body.id === "string") await markNotificationRead(body.id);

  return NextResponse.json({ unread: await unreadCount() });
}

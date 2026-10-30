import type { Metadata } from "next";
import ConfirmAction from "@/components/admin/ConfirmAction";
import Flash from "@/components/admin/Flash";
import IconButton from "@/components/admin/IconButton";
import Pagination from "@/components/admin/Pagination";
import { pageParam, type PageProps } from "@/lib/admin";
import { getMessages } from "@/lib/messages";
import { deleteMessage, toggleMessageRead } from "./actions";

export const metadata: Metadata = { title: "Messages" };

const PER_PAGE = 10;

export default async function MessagesPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = pageParam(sp.page);
  const all = await getMessages();
  const rows = all.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const back = page > 1 ? `/admin/messages?page=${page}` : "/admin/messages";

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Messages</h1>
          <p>Messages reçus via la page Contact.</p>
        </div>
      </div>
      <Flash ok={sp.ok} error={sp.error} />

      {rows.length === 0 && <div className="acard empty">Aucun message pour le moment.</div>}

      {rows.map((message) => {
        const isEmail = message.contact.includes("@");
        return (
          <div className={`acard message${message.read ? " message--read" : ""}`} key={message.id}>
            <div className="message__head">
              <div>
                <strong>{message.name}</strong>{" "}
                {!message.read ? <span className="pill pill--en_attente">Nouveau</span> : null}
                <div className="muted">
                  <a href={isEmail ? `mailto:${message.contact}` : `tel:${message.contact.replace(/\s/g, "")}`}>
                    {message.contact}
                  </a>
                  {message.subject ? ` · ${message.subject}` : ""} ·{" "}
                  {new Date(message.createdAt).toLocaleString("fr-FR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              </div>
              <div className="row-actions">
                <form action={toggleMessageRead}>
                  <input type="hidden" name="id" value={message.id} />
                  <input type="hidden" name="read" value={message.read ? "0" : "1"} />
                  <input type="hidden" name="back" value={back} />
                  <IconButton
                    icon={message.read ? "mail" : "mailOpen"}
                    label={message.read ? "Marquer non lu" : "Marquer lu"}
                  />
                </form>
                <ConfirmAction
                  action={deleteMessage}
                  fields={{ id: message.id, back }}
                  label="Supprimer"
                  title="Supprimer le message ?"
                  message={
                    <>
                      Le message de <strong>{message.name}</strong> sera définitivement supprimé.
                    </>
                  }
                  confirmLabel="Supprimer"
                />
              </div>
            </div>
            <p className="message__body">{message.message}</p>
          </div>
        );
      })}
      <Pagination page={page} total={all.length} perPage={PER_PAGE} path="/admin/messages" />
    </>
  );
}

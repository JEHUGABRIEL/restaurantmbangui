import { createMessage } from "@/app/(site)/contact/actions";
import type { Locale } from "@/lib/i18n";

const copy = {
  fr: {
    name: "Nom",
    contact: "E-mail ou téléphone",
    subject: "Objet",
    message: "Votre message",
    submit: "Envoyer le message",
  },
  en: {
    name: "Name",
    contact: "Email or phone",
    subject: "Subject",
    message: "Your message",
    submit: "Send message",
  },
} as const;

export default function MessageForm({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <form className="reserve-form" action={createMessage}>
      <label className="field">
        {t.name}
        <input type="text" name="name" required autoComplete="name" />
      </label>
      <label className="field">
        {t.contact}
        <input type="text" name="contact" required />
      </label>
      <label className="field">
        {t.subject}
        <input type="text" name="subject" />
      </label>
      <label className="field">
        {t.message}
        <textarea name="message" rows={4} required />
      </label>
      <div className="form-actions">
        <button type="submit" className="btn btn-outline-dark">
          {t.submit}
        </button>
      </div>
    </form>
  );
}

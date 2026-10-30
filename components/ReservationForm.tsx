"use client";

import { useFormStatus } from "react-dom";
import { createReservation } from "@/app/(site)/contact/actions";
import { getUi, type Locale } from "@/lib/i18n";
import { RESERVE_URL } from "@/lib/site";
import { ArrowUpRight } from "./icons";

const times = [
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-gold" disabled={pending}>
      {pending ? "Envoi…" : label}
      <ArrowUpRight width={15} height={15} />
    </button>
  );
}

export default function ReservationForm({ locale }: { locale: Locale }) {
  const t = getUi(locale);

  return (
    <form className="reserve-form" action={createReservation}>
      <label className="field">
        {t.form.name}
        <input type="text" name="name" required autoComplete="name" />
      </label>

      <label className="field">
        {t.form.phone}
        <input type="tel" name="phone" required autoComplete="tel" placeholder="+236 …" />
      </label>

      <div className="form-row">
        <label className="field">
          {t.form.date}
          <input type="date" name="date" required />
        </label>
        <label className="field">
          {t.form.time}
          <select name="time" defaultValue="19:30" required>
            {times.map((time) => (
              <option key={time} value={time}>
                {time.replace(":", "h")}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-row">
        <label className="field">
          {t.form.guests}
          <select name="guests" defaultValue="2" required>
            {Array.from({ length: 8 }, (_, index) => index + 1).map((count) => (
              <option key={count} value={String(count)}>
                {count} {count > 1 ? t.form.people : t.form.person}
              </option>
            ))}
            <option value="9">{t.form.many}</option>
          </select>
        </label>
        <label className="field">
          {t.form.terrace}
          <select name="seating" defaultValue={t.form.noPref}>
            <option>{t.form.noPref}</option>
            <option>{t.form.outside}</option>
            <option>{t.form.inside}</option>
          </select>
        </label>
      </div>

      <label className="field">
        {t.form.message}
        <textarea name="message" placeholder={t.form.placeholder} />
      </label>

      <div className="form-actions">
        <SubmitButton label={t.form.submit} />
      </div>

      <p className="form-note">{t.form.note}</p>
      <p className="form-note">
        <a href={RESERVE_URL} target="_blank" rel="noopener noreferrer">
          {t.form.whatsapp}
        </a>
      </p>
    </form>
  );
}

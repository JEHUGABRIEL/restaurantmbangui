"use client";

import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n";

export default function LocaleSwitch({ locale }: { locale: Locale }) {
  const router = useRouter();

  function change(next: Locale) {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <div className="locale-switch" role="group" aria-label="Langue / Language">
      <button
        type="button"
        className={locale === "fr" ? "is-active" : undefined}
        aria-pressed={locale === "fr"}
        onClick={() => change("fr")}
      >
        FR
      </button>
      <span aria-hidden>/</span>
      <button
        type="button"
        className={locale === "en" ? "is-active" : undefined}
        aria-pressed={locale === "en"}
        onClick={() => change("en")}
      >
        EN
      </button>
    </div>
  );
}

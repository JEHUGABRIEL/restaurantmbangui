"use client";

import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n";
import { ChevronDown, Globe } from "./icons";

export default function LocaleSwitch({ locale }: { locale: Locale }) {
  const router = useRouter();

  function change(next: string) {
    const value: Locale = next === "en" ? "en" : "fr";
    if (value === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${value}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <span className="locale-select">
      <Globe width={13} height={13} aria-hidden />
      <select
        value={locale}
        onChange={(event) => change(event.target.value)}
        aria-label="Langue / Language"
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
      <ChevronDown width={10} height={10} aria-hidden />
    </span>
  );
}

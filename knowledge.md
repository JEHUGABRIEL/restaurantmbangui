# Project knowledge

## What this is
Site for **Restaurant M’**, a semi-gastronomic restaurant, pizzeria and caterer in Bangui (Rue de l’Industrie, face au Musée Barthélemy Boganda). Next.js 16 App Router, React 19, French/English, JSON storage instead of a database.

Public site and admin are separate route trees:
- `app/(site)/` — public pages, wrapped in `app/(site)/layout.tsx` (header, footer, cart, locale).
- `app/admin/` — back-office with its own layout and CSS; never wrapped by the public chrome.
- `app/layout.tsx` — only `<html lang>` (from locale cookie), fonts and global CSS.

## Commands
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Typecheck: `npm run typecheck`

No test runner or linter.

## Design
Public site follows the Midnight-style reference: ivory background, near-black brown, antique gold; **Marck Script** display + **Jost** body. Full-bleed hero slideshow with cream notch, gold script/uppercase pairs, `::after` ✦ ornaments, framed photo carousels, triptych, menu mosaic, quality band with CSS metallic heart, reviews carousel, OpenStreetMap iframe with dark contact card. Tokens in `app/globals.css`.

## Routes
- `/` home, `/#avis`, `/#contact` anchors.
- `/carte` full menu (reads `data/menu.json`), `/maison`, `/menu-rose`, `/contact`.
- `/actualites`, `/actualites/[slug]`.
- Admin: `/admin/login`, `/admin`, `/admin/reservations`, `/admin/messages`, `/admin/menu`, `/admin/menu/[slug]`, `/admin/actualites`, `/admin/actualites/[slug]`, `/admin/activite`, `/admin/compte`.

## Data storage: Neon Postgres
All reads/writes go through `lib/store.ts` (`readStore` / `writeStore`).
- Backend: `store_documents (key text primary key, data jsonb, updated_at)`, one document per store (`menu.json`, `news.json`, …). Created on first access.
- `DATABASE_URL` comes from `.env.local` locally and from Vercel env vars in production (project `restaurantmbangui`, added for production, preview and development).
- Without `DATABASE_URL`, or if Neon cannot be reached within 6 s, the store falls back to `data/*.json` and retries the probe after 30 s. A document missing in the database is seeded from the file shipped with the project, so `menu.json` / `news.json` boot themselves.
- Driver: `@neondatabase/serverless` over HTTP. Note: outbound network from the dev machine is broken for Node (`fetch` and TCP time out while `curl` works), so local DB access cannot be verified from here — production is the place to test it.
- `data/menu.json` — `MenuSection[]`; seeded from the static `MENU` in `lib/menu.ts` on first access. `lib/menu-data.ts` exposes `readMenu` (all dishes), `getMenu` (hides `available === false`), `writeMenu`.
- `data/reservations.json` — `{ id, name, phone, email, date, time, guests, seating, notes, status, adminNote, createdAt }`, status `en_attente | confirmee | annulee`. `lib/reservations.ts`.
- `data/messages.json` — `{ id, name, contact, subject, message, read, createdAt }`. `lib/messages.ts`.
- `data/news.json` — posts: `slug, title, date, category, excerpt, image, imageAlt, body[]`. `lib/news.ts`.
- `data/activity.json` — journal entries `{ id, actor, category, summary, link, createdAt }`, capped at 400. `lib/activity.ts` (`logActivity` is best-effort).
- `data/notifications.json` — `{ id, category, text, link, read, createdAt }`, capped at 120. `lib/notifications.ts`: `notify` (best-effort), `unreadCount`, `markNotificationRead`, `markAllRead`. Raised on new reservation, new message and password change; `GET/POST /api/admin/notifications` serves the bell.
- `data/admin.json` — `{ name, email, passwordHash }`; `passwordHash: null` means the env/default password is used.
- Seeded content in `reservations.json` was demo data (`id` prefixed `demo-`), now only in local files; the production database was started empty.

## Back-office (modelled on `../royal_beach_mboko`)
- Shell: `components/admin/AdminFrame.tsx` (fixed sidebar + mobile drawer), `AdminNav.tsx` (active route, badges, menu sub-menu), sticky topbar with `NotificationBell` (30 s polling, unread count, mark-as-read) and avatar. No “view site” link in the panel topbar.
- Shared UI: `ActionMenu` (⋮ row actions), `Modal` / `ModalCancel`, `ConfirmAction`, `IconButton`, `SubmitButton`, `Pagination`, `Flash`, `PasswordInput`, `Avatar`, `BackToSite` (login screens only), `NotificationBell`.
- Login: e-mail + password (`app/admin/login`), scrypt hashes (`lib/admin-auth.ts`), HMAC session cookie `rm_admin`, 12 h. Default account: `contact@restaurant-m.cf` / `restaurant2026` (override with `ADMIN_PASSWORD`; `ADMIN_SECRET` signs the cookie). Changing the password invalidates sessions.
- Helpers: `lib/admin.ts` — `done`/`fail` redirect with `?ok=` / `?error=`, `str`, `int`, `slugify`, `pageParam`, `PageProps`.
- Every page and action calls `requireAdmin()`. `app/admin/(panel)/layout.tsx` sets `dynamic = "force-dynamic"`.
- Actions live next to their screen: `app/admin/auth-actions.ts`, `(panel)/reservations/actions.ts`, `(panel)/messages/actions.ts`, `(panel)/menu/actions.ts`, `(panel)/actualites/actions.ts`, `(panel)/compte/actions.ts`.

## Public forms
- `components/ReservationForm.tsx` posts to `createReservation` (`app/(site)/contact/actions.ts`): saves to `data/reservations.json`, logs activity, redirects to `/contact?reserve=ok|phone|incomplete`. A WhatsApp link stays available as a secondary path.
- `components/MessageForm.tsx` posts to `createMessage`: saves to `data/messages.json`, redirects to `/contact?message=ok|incomplete`.
- No e-mail is sent; the back-office is the inbox.

## Cart and i18n
- `lib/cart.tsx` client context, localStorage `restaurant-m-cart-v1`; `components/CartDrawer.tsx` builds a WhatsApp order. Dish IDs come from `Dish.id`.
- Cookie `rm_locale`, `lib/locale.ts`, dictionary in `lib/i18n.ts`, switch in `components/LocaleSwitch.tsx`.
- Still French-only: `maison`, actualités pages, and news content (JSON has no EN fields). The admin is French-only by design.

- Deployment is Vercel, project **`restaurantmbangui`** (team `jehubins-projects`), site at `https://restaurantmbangui.vercel.app`. `metadataBase` matches. The old project `restaurant_m` (alias `restaurantm-rouge.vercel.app`) is disconnected from Git and kept only as an archive.
- SSO deployment protection was disabled on the project (`vercel project protection disable --sso restaurantmbangui`), otherwise every URL answers a 302 to Vercel SSO.
- Deploy with `vercel --prod --yes --archive=tgz`: plain uploads fail intermittently with `Error: fetch failed` on this machine.

## Gotchas
- `getLocale()` uses `cookies()`, so public pages render dynamically. Do not add `generateStaticParams` to news pages.
- `/carte` is `force-dynamic` so back-office menu edits show immediately; news actions call `revalidatePath`.
- `.env.local` holds `DATABASE_URL` (plus a Vercel OIDC token written by `vercel link`) and is gitignored; do not commit or print it.
- `news.json` lives in `data/` but is committed on purpose, it is the seed for the production database.
- `lib/menu.ts` must keep the `MENU` export: it seeds `data/menu.json` when the file is missing.
- Fonts: `--font-marck` / `--font-jost` from `next/font`; CSS aliases to `--font-script` / `--font-sans`. Do not reuse alias names in font config.
- `.ornament` glyph masks its line with `--ornament-bg`; use `.ornament-dark` on dark backgrounds.
- Admin CSS is a full copy of the Royal Beach back-office stylesheet plus a Restaurant M’ palette block at the end (`--gold`, `--font-serif`, `.admin-brand`, `.cat-head`, `.confirm`, skeleton).
- Sample reviews in `components/ReviewCarousel.tsx` must be replaced by real guest reviews.
- Next 16 removed `next lint`; Node 20.9+ required. `metadataBase` is `https://restaurantlembangui.com`.

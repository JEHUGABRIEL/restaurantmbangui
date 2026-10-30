import "./site.css";
import CartDrawer from "@/components/CartDrawer";
import PublicMotion from "@/components/PublicMotion";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { CartProvider } from "@/lib/cart";
import { getLocale } from "@/lib/locale";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <CartProvider locale={locale}>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <SiteHeader locale={locale} />
      <main id="contenu">{children}</main>
      <SiteFooter locale={locale} />
      <CartDrawer />
      <PublicMotion />
    </CartProvider>
  );
}

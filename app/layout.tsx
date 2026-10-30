import type { Metadata, Viewport } from "next";
import { Jost, Marck_Script } from "next/font/google";
import { getLocale } from "@/lib/locale";
import "./globals.css";

const marck = Marck_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marck",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://restaurantmbangui.vercel.app"),
  title: {
    default: "Restaurant M’ — Restaurant & bar à Bangui",
    template: "%s · Restaurant M’ — Bangui",
  },
  description:
    "Restaurant & bar à Bangui : cuisine semi-gastronomique, pizzeria et traiteur, terrasse ombragée face au Musée Barthélemy Boganda. Carte de saison, Menu Rose d’octobre et réservation par WhatsApp.",
  keywords: [
    "restaurant Bangui",
    "Restaurant M’",
    "bar Bangui",
    "pizzeria Bangui",
    "traiteur Bangui",
    "Menu Rose octobre",
  ],
  openGraph: {
    type: "website",
    locale: "fr_CF",
    siteName: "Restaurant M’",
    title: "Restaurant M’ — Restaurant & bar à Bangui",
    description:
      "Une table généreuse au cœur de Bangui : restaurant, pizzeria et traiteur, face au Musée Barthélemy Boganda.",
    images: [
      {
        url: "/images/plates.jpg",
        width: 900,
        height: 600,
        alt: "Assiettes dressées du Restaurant M’",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#171310",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${marck.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}

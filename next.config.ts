import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Les pages lisent la carte et les actualités dans data/ : on embarque ces
  // fichiers dans chaque fonction pour qu'ils soient disponibles après déploiement.
  outputFileTracingIncludes: {
    "/**/*": ["./data/menu.json", "./data/news.json"],
  },
};

export default nextConfig;

import Image from "next/image";
import type { ReactNode } from "react";

type PageHeroProps = {
  label: string;
  title: ReactNode;
  lead?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  tone?: "dark" | "wine";
};

export default function PageHero({
  label,
  title,
  lead,
  image = "/images/plates.jpg",
  imageAlt = "Assiettes dressées du Restaurant M’",
  children,
  tone = "dark",
}: PageHeroProps) {
  return (
    <section className={tone === "wine" ? "page-hero is-wine" : "page-hero"}>
      <div className="page-hero-media">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" />
      </div>
      <div className="page-hero-shade" aria-hidden />
      <div className="container page-hero-inner">
        <span className="caps caps-gold">{label}</span>
        <h1 className="page-title">{title}</h1>
        <span className="ornament ornament-dark" aria-hidden />
        {lead ? <p className="page-lead">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}

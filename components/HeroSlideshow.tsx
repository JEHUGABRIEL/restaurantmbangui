"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/images/plates.jpg",
    alt: "Table dressée du Restaurant M’ : assiettes, herbes et épices",
  },
  {
    src: "/images/terrace.jpg",
    alt: "La terrasse du Restaurant M’ à Bangui",
  },
  {
    src: "/images/ribs.jpg",
    alt: "Travers de porc laqués, frites et crudités",
  },
];

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <>
      <div
        className="hero-media"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((slide, index) => (
          <div
            className={index === active ? "hero-slide is-active" : "hero-slide"}
            key={slide.src}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      <div className="hero-dots" aria-label="Choisir l’image d’accueil">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={index === active ? "is-active" : undefined}
            aria-label={`Image ${index + 1} : ${slide.alt}`}
            aria-current={index === active}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </>
  );
}

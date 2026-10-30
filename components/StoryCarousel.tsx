"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "./icons";

const photos = [
  { src: "/images/terrace.jpg", alt: "La terrasse du Restaurant M’" },
  { src: "/images/plates.jpg", alt: "Trois assiettes dressées sur une table en bois" },
  { src: "/images/ribs.jpg", alt: "Travers de porc laqués et crudités" },
];

export default function StoryCarousel() {
  const [index, setIndex] = useState(0);

  const move = (step: number) => {
    setIndex((current) => (current + step + photos.length) % photos.length);
  };

  const visible = [photos[index], photos[(index + 1) % photos.length]];

  return (
    <div className="story-carousel">
      <button
        type="button"
        className="carousel-arrow carousel-arrow-left"
        onClick={() => move(-1)}
        aria-label="Photos précédentes"
      >
        <ChevronLeft width={26} height={26} />
      </button>

      <div className="carousel-frame">
        {visible.map((photo) => (
          <div className="carousel-slide" key={photo.src}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 920px) 45vw, 300px"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="carousel-arrow carousel-arrow-right"
        onClick={() => move(1)}
        aria-label="Photos suivantes"
      >
        <ChevronRight width={26} height={26} />
      </button>
    </div>
  );
}

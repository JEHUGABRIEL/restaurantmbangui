"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "./icons";

const reviews = [
  {
    name: "Sandra M.",
    date: "Déjeuner en terrasse",
    text:
      "Une table généreuse et un service attentionné. Le poisson était parfaitement cuit et la terrasse est un vrai havre de paix en fin de journée.",
  },
  {
    name: "Jean-Paul K.",
    date: "Dîner en famille",
    text:
      "Nous avons réservé pour un dîner de famille : tout le monde a trouvé son bonheur, des grillades aux pizzas. Le Menu Rose vaut le détour.",
  },
  {
    name: "Aïcha B.",
    date: "Habituée du midi",
    text:
      "Le cadre est simple et soigné, l’équipe connaît ses habitués. J’y retourne pour le déjeuner chaque semaine.",
  },
];

export default function ReviewCarousel() {
  const [index, setIndex] = useState(0);

  const move = (step: number) => {
    setIndex((current) => (current + step + reviews.length) % reviews.length);
  };

  const visible = [reviews[index], reviews[(index + 1) % reviews.length]];

  return (
    <div className="reviews-carousel">
      <button
        type="button"
        className="review-arrow review-arrow-left"
        onClick={() => move(-1)}
        aria-label="Avis précédents"
      >
        <ChevronLeft width={24} height={24} />
      </button>

      <div className="reviews-list">
        {visible.map((review) => (
          <article className="review" key={review.name}>
            <span className="review-quote" aria-hidden>
              “
            </span>
            <h3>{review.name}</h3>
            <span className="review-date">{review.date}</span>
            <p>{review.text}</p>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="review-arrow review-arrow-right"
        onClick={() => move(1)}
        aria-label="Avis suivants"
      >
        <ChevronRight width={24} height={24} />
      </button>
    </div>
  );
}

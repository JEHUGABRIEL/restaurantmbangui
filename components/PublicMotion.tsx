"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Blocs révélés à l'entrée dans le viewport. La liste s'appuie sur les classes
 * existantes du site pour éviter d'annoter chaque page.
 */
const REVEAL_SELECTORS = [
  ".center-copy",
  ".news-grid > *",
  ".news-page-head",
  ".menu-cat",
  ".course-row",
  ".price-cards > *",
  ".values-row > *",
  ".steps-row > *",
  ".triptych-panel",
  ".contact-page-info > *",
  ".reserve-panel",
  ".dark-panel",
  ".article-body",
].join(",");

/** Transitions du site public : fondu entre les pages et révélation au défilement. */
export default function PublicMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.getElementById("contenu");
    if (main) {
      main.classList.remove("is-entering");
      void main.offsetWidth;
      main.classList.add("is-entering");
    }

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS));
    if (nodes.length === 0) return;

    document.documentElement.classList.add("js-reveal");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    nodes.forEach((node) => {
      node.classList.add("reveal-ready");
      const siblings = Array.from(node.parentElement?.children ?? []);
      const rank = Math.min(siblings.indexOf(node), 4);
      node.style.transitionDelay = `${Math.max(rank, 0) * 70}ms`;

      if (node.getBoundingClientRect().top < window.innerHeight * 0.92) {
        node.classList.add("is-revealed");
      } else {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

import { useEffect, useRef, useState } from "react";

export interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
  /** Keep the element revealed after it re-enters the viewport. */
  once?: boolean;
}

/**
 * IntersectionObserver-based scroll reveal. Returns a `revealed` flag instead
 * of animating directly so components stay in control of their own motion.
 */
export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>(options: RevealOptions = {}) {
  const { threshold = 0.18, rootMargin = "0px 0px -10% 0px", once = true } = options;
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setRevealed(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, revealed };
}

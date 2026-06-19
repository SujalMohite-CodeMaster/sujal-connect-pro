import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll: adds `is-visible` once the element enters the viewport.
 * Use with the `reveal`, `reveal-left`, or `reveal-right` utility classes.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  once?: boolean;
  delay?: number;
}) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (options?.delay) {
            const t = setTimeout(() => setVisible(true), options.delay);
            return () => clearTimeout(t);
          }
          setVisible(true);
          if (options?.once !== false) observer.unobserve(el);
        } else if (options?.once === false) {
          setVisible(false);
        }
      },
      { threshold: options?.threshold ?? 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.once, options?.delay]);

  return { ref, visible };
}
